import { createServerFn } from "@tanstack/react-start";
import { getRequestIP, getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";

const leadSchema = z.object({
  nome: z.string().trim().min(2).max(120),
  nascimento: z.string().trim().min(8).max(20), // ISO yyyy-mm-dd or br
  sexo: z.enum(["Feminino", "Masculino", "Não-binário", "Prefiro não informar"]),
  whatsapp: z.string().trim().min(8).max(30),
  email: z.string().trim().email().max(200),
  instagram: z.string().trim().max(80).optional().default(""),
  preferenciaContato: z.enum(["WhatsApp", "E-mail", "Instagram", "Telefone"]),
  cep: z.string().trim().min(8).max(10),
  cidade: z.string().trim().min(2).max(80),
  bairro: z.string().trim().min(2).max(80),
  estado: z.string().trim().length(2).default("SC"),
  filiacaoPT: z.enum(["Sim", "Não", "Em processo"]),
  causas: z.array(z.string().min(2).max(40)).min(1).max(10),
  apoioDigital: z.array(z.string().min(2).max(60)).max(10).default([]),
  mobilizacaoRua: z.array(z.string().min(2).max(60)).max(10).default([]),
  optIn: z.boolean(),
  recaptchaToken: z.string().min(10).max(4000),
  // Honeypot — must be empty. Bots typically fill all fields.
  website: z.string().max(0).optional().default(""),
});

export type LeadInput = z.infer<typeof leadSchema>;

async function checkRateLimit(ip: string): Promise<{ ok: boolean }> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return { ok: true };
  try {
    const { Ratelimit } = await import("@upstash/ratelimit");
    const { Redis } = await import("@upstash/redis");
    const redis = new Redis({ url, token });
    const limiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(3, "10 m"),
      prefix: "rodolfo:leads",
    });
    const r = await limiter.limit(ip);
    return { ok: r.success };
  } catch (e) {
    console.error("Rate limit error:", e);
    return { ok: true };
  }
}

async function verifyRecaptcha(token: string, ip: string): Promise<{ ok: boolean; score: number }> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    console.warn("RECAPTCHA_SECRET_KEY ausente — pulando verificação");
    return { ok: true, score: 0 };
  }
  try {
    const params = new URLSearchParams({ secret, response: token, remoteip: ip });
    const r = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });
    const data = (await r.json()) as { success: boolean; score?: number; "error-codes"?: string[] };
    const score = typeof data.score === "number" ? data.score : 0;
    const ok = data.success && score >= 0.3;
    if (!ok) console.warn("reCAPTCHA falhou:", data);
    return { ok, score };
  } catch (e) {
    console.error("reCAPTCHA verify error:", e);
    return { ok: false, score: 0 };
  }
}

function partialIp(ip: string): string {
  if (!ip) return "";
  if (ip.includes(":")) {
    // IPv6 — keep first 4 groups
    return ip.split(":").slice(0, 4).join(":") + "::";
  }
  const parts = ip.split(".");
  if (parts.length === 4) return `${parts[0]}.${parts[1]}.${parts[2]}.x`;
  return ip;
}

function normalizePrivateKey(raw: string): string {
  let key = raw.replace(/\\n/g, "\n").trim();
  if ((key.startsWith('"') && key.endsWith('"')) || (key.startsWith("'") && key.endsWith("'"))) {
    key = key.slice(1, -1).trim();
  }
  if (!key.includes("BEGIN")) {
    const body = key.replace(/\s+/g, "");
    const lines = body.match(/.{1,64}/g)?.join("\n") ?? body;
    key = `-----BEGIN PRIVATE KEY-----\n${lines}\n-----END PRIVATE KEY-----\n`;
  }
  if (!key.endsWith("\n")) key += "\n";
  return key;
}

function sanitizeCell(value: string | number | boolean): string | number | boolean {
  if (typeof value !== "string") return value;
  // Prevent spreadsheet formula injection by prefixing dangerous leading chars
  if (/^[=+\-@\t\r]/.test(value)) return `'${value}`;
  return value;
}

function b64url(input: ArrayBuffer | Uint8Array | string): string {
  let bytes: Uint8Array;
  if (typeof input === "string") bytes = new TextEncoder().encode(input);
  else if (input instanceof Uint8Array) bytes = input;
  else bytes = new Uint8Array(input);
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function pemToArrayBuffer(pem: string): ArrayBuffer {
  const b64 = pem
    .replace(/-----BEGIN [^-]+-----/g, "")
    .replace(/-----END [^-]+-----/g, "")
    .replace(/\s+/g, "");
  const bin = atob(b64);
  const buf = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i);
  return buf.buffer;
}

async function getGoogleAccessToken(email: string, pemKey: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const claims = {
    iss: email,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };
  const unsigned = `${b64url(JSON.stringify(header))}.${b64url(JSON.stringify(claims))}`;
  const key = await crypto.subtle.importKey(
    "pkcs8",
    pemToArrayBuffer(pemKey),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, new TextEncoder().encode(unsigned));
  const jwt = `${unsigned}.${b64url(sig)}`;
  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }).toString(),
  });
  if (!r.ok) throw new Error(`Google OAuth failed: ${r.status} ${await r.text()}`);
  const data = (await r.json()) as { access_token: string };
  return data.access_token;
}

async function appendToSheet(row: (string | number | boolean)[]) {
  const sheetId =
    process.env.GOOGLE_SHEETS_SPREADSHEET_ID || process.env.GOOGLE_SHEETS_ID;
  const email =
    process.env.GOOGLE_SHEETS_CLIENT_EMAIL || process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey =
    process.env.GOOGLE_SHEETS_PRIVATE_KEY || process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  const sheetName = process.env.GOOGLE_SHEETS_SHEET_NAME || "Leads";

  if (!sheetId || !email || !rawKey) {
    throw new Error("Google Sheets não configurado.");
  }
  const key = normalizePrivateKey(rawKey);
  const accessToken = await getGoogleAccessToken(email, key);

  const range = encodeURIComponent(`${sheetName}!A:S`);
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(
    sheetId,
  )}/values/${range}:append?valueInputOption=RAW`;

  const r = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ values: [row.map(sanitizeCell)] }),
  });
  if (!r.ok) throw new Error(`Sheets append failed: ${r.status} ${await r.text()}`);
}

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => leadSchema.parse(input))
  .handler(async ({ data }) => {
    // Use CF-Connecting-IP (set by Cloudflare, cannot be spoofed).
    // Fallback: take the LAST entry of X-Forwarded-For (the one Cloudflare appends).
    const xff = getRequestHeader("x-forwarded-for");
    const xffLast = xff ? xff.split(",").map((s) => s.trim()).filter(Boolean).pop() : undefined;
    const ip =
      getRequestHeader("cf-connecting-ip") ||
      xffLast ||
      getRequestIP() ||
      "anon";

    const rl = await checkRateLimit(ip);
    if (!rl.ok) {
      return {
        success: false as const,
        error: "Muitos envios. Aguarde alguns minutos e tente novamente.",
      };
    }

    // Honeypot check — if filled, silently pretend success to avoid signaling bots.
    if (data.website && data.website.length > 0) {
      console.warn("Honeypot triggered, IP:", partialIp(ip));
      return { success: true as const };
    }

    const captcha = await verifyRecaptcha(data.recaptchaToken, ip);
    if (!captcha.ok) {
      return {
        success: false as const,
        error: "Falha na verificação anti-spam. Recarregue a página e tente novamente.",
      };
    }

    try {
      const row = [
        new Date().toISOString(),         // Timestamp
        data.nome,                         // Nome Completo
        data.nascimento,                   // Data de Nascimento
        data.sexo,                         // Sexo
        data.whatsapp,                     // Telefone WhatsApp
        data.email,                        // E-mail
        data.instagram || "",              // Instagram
        data.preferenciaContato,           // Preferência de Contato
        data.cep,                          // CEP
        data.cidade,                       // Cidade
        data.bairro,                       // Bairro
        data.estado,                       // Estado
        data.filiacaoPT,                   // Filiação PT
        data.causas.join(", "),            // Causas
        data.apoioDigital.join(", "),      // Apoio Digital
        data.mobilizacaoRua.join(", "),    // Mobilização de Rua
        data.optIn ? "Sim" : "Não",        // Opt-in
        partialIp(ip),                     // IP (parcial)
        captcha.score,                     // reCAPTCHA Score
      ];
      await appendToSheet(row);
      return { success: true as const };
    } catch (e) {
      console.error("submitLead error:", e);
      return {
        success: false as const,
        error: "Erro ao salvar. Por favor, tente novamente.",
      };
    }
  });
