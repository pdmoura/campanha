import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useServerFn } from "@tanstack/react-start";
import { Check, ChevronLeft, ChevronRight, Loader2, PartyPopper } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import logo from "@/assets/logo.webp";
import { submitLead } from "@/server/leads.functions";
import { useRecaptcha } from "@/hooks/useRecaptcha";

async function fireConfetti() {
  if (typeof window === "undefined") return;
  const { default: confetti } = await import("canvas-confetti");
  const colors = ["#E4002B", "#FFC72C", "#009639", "#ffffff"];
  const end = Date.now() + 1500;
  (function frame() {
    confetti({ particleCount: 6, angle: 60, spread: 70, origin: { x: 0 }, colors });
    confetti({ particleCount: 6, angle: 120, spread: 70, origin: { x: 1 }, colors });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
  confetti({ particleCount: 160, spread: 100, origin: { y: 0.6 }, colors });
}

const cidades = [
  "Florianópolis", "Joinville", "Blumenau", "São José", "Chapecó", "Itajaí", "Lages",
  "Criciúma", "Jaraguá do Sul", "Palhoça", "Balneário Camboriú", "Brusque", "Tubarão",
  "Concórdia", "São Bento do Sul", "Caçador", "Camboriú", "Navegantes", "Outra cidade",
];
const causas = ["Educação", "Saúde", "Trabalho", "Moradia", "Meio Ambiente", "Direitos Humanos"];
const apoioDigitalOpts = [
  "Compartilhar conteúdo nas redes",
  "Criar artes e vídeos",
  "Engajar nos comentários",
  "Administrar grupo de WhatsApp",
];
const mobilizacaoOpts = [
  "Panfletagem",
  "Organizar evento no bairro",
  "Bandeiraço",
  "Porta a porta",
];

function maskPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}
function maskCep(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 8);
  if (d.length <= 5) return d;
  return `${d.slice(0, 5)}-${d.slice(5)}`;
}

const step1 = z.object({
  nome: z.string().trim().min(2, "Informe seu nome"),
  nascimento: z.string().min(8, "Informe sua data de nascimento"),
  sexo: z.string().min(1, "Selecione"),
  whatsapp: z.string().trim().min(14, "WhatsApp inválido"),
  email: z.string().trim().email("E-mail inválido"),
  instagram: z.string().max(80).optional(),
  preferenciaContato: z.string().min(1, "Selecione a preferência"),
});
const step2 = z.object({
  cep: z.string().min(8, "CEP inválido"),
  cidade: z.string().min(2, "Selecione sua cidade"),
  bairro: z.string().trim().min(2, "Informe seu bairro"),
  estado: z.string().length(2),
  filiacaoPT: z.string().min(1, "Selecione"),
  causas: z.array(z.string()).min(1, "Escolha ao menos 1"),
});
const step3 = z.object({
  apoioDigital: z.array(z.string()),
  mobilizacaoRua: z.array(z.string()),
});

type Form = {
  nome: string;
  nascimento: string;
  sexo: "Feminino" | "Masculino" | "Não-binário" | "Prefiro não informar" | "";
  whatsapp: string;
  email: string;
  instagram: string;
  preferenciaContato: "WhatsApp" | "E-mail" | "Instagram" | "Telefone" | "";
  cep: string;
  cidade: string;
  bairro: string;
  estado: string;
  filiacaoPT: "Sim" | "Não" | "Em processo" | "";
  causas: string[];
  apoioDigital: string[];
  mobilizacaoRua: string[];
  optIn: boolean;
  website: string;
};

export function Stepper() {
  const submit = useServerFn(submitLead);
  const { execute: executeRecaptcha } = useRecaptcha();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState<Form>({
    nome: "",
    nascimento: "",
    sexo: "",
    whatsapp: "",
    email: "",
    instagram: "",
    preferenciaContato: "",
    cep: "",
    cidade: "",
    bairro: "",
    estado: "SC",
    filiacaoPT: "",
    causas: [],
    apoioDigital: [],
    mobilizacaoRua: [],
    optIn: true,
    website: "",
  });

  const set = <K extends keyof Form>(k: K, v: Form[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const toggle = (k: "causas" | "apoioDigital" | "mobilizacaoRua", v: string) =>
    set(k, form[k].includes(v) ? form[k].filter((x) => x !== v) : [...form[k], v]);

  const validate = (): boolean => {
    const schema = step === 0 ? step1 : step === 1 ? step2 : step3;
    const r = schema.safeParse(form);
    if (!r.success) {
      const errs: Record<string, string> = {};
      for (const issue of r.error.issues) errs[issue.path[0] as string] = issue.message;
      setErrors(errs);
      return false;
    }
    setErrors({});
    return true;
  };

  const next = () => {
    if (!validate()) return;
    const messages = [
      "Identificação concluída! Vamos para localização.",
      "Localização e causas salvas! Falta só o compromisso.",
    ];
    toast.success(messages[step] ?? "Etapa concluída!");
    setStep((s) => Math.min(s + 1, 2));
  };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const finish = async () => {
    if (!validate()) return;
    setLoading(true);
    setServerError(null);
    try {
      const recaptchaToken = await executeRecaptcha("submit_lead");
      const res = await submit({
        data: {
          ...form,
          sexo: form.sexo as Exclude<Form["sexo"], "">,
          preferenciaContato: form.preferenciaContato as Exclude<
            Form["preferenciaContato"],
            ""
          >,
          filiacaoPT: form.filiacaoPT as Exclude<Form["filiacaoPT"], "">,
          recaptchaToken,
          website: form.website,
        },
      });
      if (res.success) {
        setDone(true);
        fireConfetti();
        toast.success("Agora você faz parte do time! 🎉", {
          description: "Bem-vindo(a) à Rede Rodolfo PT/SC.",
          duration: 6000,
        });
      } else setServerError(res.error || "Erro ao enviar.");
    } catch (e) {
      setServerError(e instanceof Error ? e.message : "Erro ao enviar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="formulario" className="py-20 bg-[var(--pt-red)] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background:
            "repeating-linear-gradient(45deg, var(--sc-yellow), var(--sc-yellow) 10px, transparent 10px, transparent 30px)",
        }}
      />
      <div className="relative mx-auto max-w-3xl px-4">
        <div className="text-center text-white mb-10">
          <p className="font-bold text-xs tracking-widest text-[var(--sc-yellow)] uppercase">
            Fluxo de engajamento
          </p>
          <h2 className="mt-2 font-display text-4xl md:text-5xl">Entre na Rede</h2>
          <p className="mt-2 text-white/80">3 passos rápidos. Menos de 2 minutos.</p>
        </div>

        <div className="rounded-3xl bg-white shadow-2xl p-6 md:p-10 border-4 border-[var(--sc-yellow)]">
          {done ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-10"
            >
              <img
                src={logo}
                alt="Rodolfo PT/SC"
                className="mx-auto h-32 md:h-44 w-auto mb-6 drop-shadow-xl"
                width={360}
                height={180}
              />
              <div className="mx-auto h-20 w-20 rounded-full bg-[var(--sc-green)]/15 flex items-center justify-center mb-4">
                <PartyPopper className="h-10 w-10 text-[var(--sc-green)]" />
              </div>
              <h3 className="font-display text-4xl md:text-5xl text-[var(--pt-red)]">
                Agora você faz parte do time!
              </h3>
              <p className="mt-3 text-lg text-foreground/70">
                Recebemos seus dados. Em breve você receberá novidades pelo {form.preferenciaContato || "WhatsApp"}.
              </p>
            </motion.div>
          ) : (
            <>
              <div className="flex gap-2 mb-8">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex-1 h-2 rounded-full bg-foreground/10 overflow-hidden">
                    <motion.div
                      initial={false}
                      animate={{ width: step >= i ? "100%" : "0%" }}
                      transition={{ duration: 0.4 }}
                      className="h-full rounded-full"
                      style={{
                        background:
                          i === 0 ? "var(--sc-green)" : i === 1 ? "var(--sc-yellow)" : "var(--pt-red)",
                      }}
                    />
                  </div>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  {step === 0 && (
                    <div className="space-y-4">
                      {/* Honeypot — hidden from real users, bots will fill it */}
                      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}>
                        <label>
                          Não preencha este campo:
                          <input
                            type="text"
                            tabIndex={-1}
                            autoComplete="off"
                            value={form.website}
                            onChange={(e) => set("website", e.target.value)}
                          />
                        </label>
                      </div>
                      <h3 className="font-display text-2xl text-[var(--pt-red)]">1. Identificação</h3>
                      <Field label="Nome completo" error={errors.nome}>
                        <input value={form.nome} onChange={(e) => set("nome", e.target.value)} className={inputCls} placeholder="Seu nome completo" />
                      </Field>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <Field label="Data de nascimento" error={errors.nascimento}>
                          <input type="date" value={form.nascimento} onChange={(e) => set("nascimento", e.target.value)} className={inputCls} />
                        </Field>
                        <Field label="Sexo" error={errors.sexo}>
                          <select value={form.sexo} onChange={(e) => set("sexo", e.target.value as Form["sexo"])} className={inputCls}>
                            <option value="">Selecione…</option>
                            <option>Feminino</option>
                            <option>Masculino</option>
                            <option>Não-binário</option>
                            <option>Prefiro não informar</option>
                          </select>
                        </Field>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <Field label="WhatsApp" error={errors.whatsapp}>
                          <input inputMode="tel" value={form.whatsapp} onChange={(e) => set("whatsapp", maskPhone(e.target.value))} className={inputCls} placeholder="(48) 99999-9999" />
                        </Field>
                        <Field label="E-mail" error={errors.email}>
                          <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} className={inputCls} placeholder="voce@email.com" />
                        </Field>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <Field label="Instagram (opcional)">
                          <input value={form.instagram} onChange={(e) => set("instagram", e.target.value.replace(/^@/, ""))} className={inputCls} placeholder="@seuusuario" />
                        </Field>
                        <Field label="Preferência de contato" error={errors.preferenciaContato}>
                          <select value={form.preferenciaContato} onChange={(e) => set("preferenciaContato", e.target.value as Form["preferenciaContato"])} className={inputCls}>
                            <option value="">Selecione…</option>
                            <option>WhatsApp</option>
                            <option>E-mail</option>
                            <option>Instagram</option>
                            <option>Telefone</option>
                          </select>
                        </Field>
                      </div>
                    </div>
                  )}

                  {step === 1 && (
                    <div className="space-y-4">
                      <h3 className="font-display text-2xl text-[var(--pt-red)]">2. Localização & Causas</h3>
                      <div className="grid sm:grid-cols-3 gap-4">
                        <Field label="CEP" error={errors.cep}>
                          <input inputMode="numeric" value={form.cep} onChange={(e) => set("cep", maskCep(e.target.value))} className={inputCls} placeholder="00000-000" />
                        </Field>
                        <Field label="Cidade (SC)" error={errors.cidade}>
                          <select value={form.cidade} onChange={(e) => set("cidade", e.target.value)} className={inputCls}>
                            <option value="">Selecione…</option>
                            {cidades.map((c) => <option key={c} value={c}>{c}</option>)}
                          </select>
                        </Field>
                        <Field label="Estado">
                          <input value={form.estado} onChange={(e) => set("estado", e.target.value.toUpperCase().slice(0, 2))} className={inputCls} maxLength={2} />
                        </Field>
                      </div>
                      <Field label="Bairro" error={errors.bairro}>
                        <input value={form.bairro} onChange={(e) => set("bairro", e.target.value)} className={inputCls} placeholder="Seu bairro" />
                      </Field>
                      <Field label="É filiado(a) ao PT?" error={errors.filiacaoPT}>
                        <div className="flex flex-wrap gap-2">
                          {(["Sim", "Não", "Em processo"] as const).map((o) => (
                            <Chip key={o} active={form.filiacaoPT === o} onClick={() => set("filiacaoPT", o)}>{o}</Chip>
                          ))}
                        </div>
                      </Field>
                      <Field label="Causas que te mobilizam" error={errors.causas}>
                        <div className="flex flex-wrap gap-2">
                          {causas.map((i) => (
                            <Chip key={i} active={form.causas.includes(i)} onClick={() => toggle("causas", i)}>{i}</Chip>
                          ))}
                        </div>
                      </Field>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-5">
                      <h3 className="font-display text-2xl text-[var(--pt-red)]">3. Compromisso</h3>

                      <Field label="Apoio digital">
                        <div className="grid sm:grid-cols-2 gap-2">
                          {apoioDigitalOpts.map((a) => (
                            <CheckOption key={a} active={form.apoioDigital.includes(a)} onClick={() => toggle("apoioDigital", a)}>{a}</CheckOption>
                          ))}
                        </div>
                      </Field>

                      <Field label="Mobilização de rua">
                        <div className="grid sm:grid-cols-2 gap-2">
                          {mobilizacaoOpts.map((a) => (
                            <CheckOption key={a} active={form.mobilizacaoRua.includes(a)} onClick={() => toggle("mobilizacaoRua", a)}>{a}</CheckOption>
                          ))}
                        </div>
                      </Field>

                      <label className="flex items-start gap-3 p-4 rounded-xl bg-[var(--sc-yellow)]/15 border border-[var(--sc-yellow)] cursor-pointer">
                        <input
                          type="checkbox"
                          checked={form.optIn}
                          onChange={(e) => set("optIn", e.target.checked)}
                          className="mt-1 h-5 w-5 accent-[var(--pt-red)]"
                        />
                        <span className="text-sm text-foreground/80">
                          <strong>Quero receber notícias da campanha</strong> por WhatsApp,
                          e-mail e nas minhas redes. Posso cancelar quando quiser.
                        </span>
                      </label>

                      <p className="text-[11px] text-foreground/50 leading-snug">
                        Este site é protegido por reCAPTCHA e se aplicam a{" "}
                        <a href="https://policies.google.com/privacy" className="underline" target="_blank" rel="noreferrer">Política de Privacidade</a>{" "}
                        e os{" "}
                        <a href="https://policies.google.com/terms" className="underline" target="_blank" rel="noreferrer">Termos de Serviço</a>{" "}
                        do Google.
                      </p>

                      {serverError && (
                        <p className="text-sm font-semibold text-[var(--pt-red)] bg-[var(--pt-red)]/5 p-3 rounded-lg">
                          {serverError}
                        </p>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 flex items-center justify-between gap-3">
                <button
                  onClick={back}
                  disabled={step === 0 || loading}
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-foreground/70 hover:text-foreground disabled:opacity-30"
                >
                  <ChevronLeft className="h-4 w-4" /> Voltar
                </button>

                {step < 2 ? (
                  <button
                    onClick={next}
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--pt-red)] hover:bg-[var(--pt-red-dark)] text-white px-6 py-3 text-sm font-bold shadow-lg"
                  >
                    Continuar <ChevronRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    onClick={finish}
                    disabled={loading}
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--pt-red)] hover:bg-[var(--pt-red-dark)] text-white px-7 py-3 text-base font-extrabold shadow-xl disabled:opacity-70"
                  >
                    {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
                    COMEÇAR AGORA
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

const inputCls =
  "w-full rounded-xl border-2 border-foreground/10 bg-white px-4 py-3 text-sm font-medium focus:border-[var(--pt-red)] focus:outline-none transition";

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1.5">{label}</span>
      {children}
      {error && <span className="block mt-1 text-xs font-semibold text-[var(--pt-red)]">{error}</span>}
    </label>
  );
}

function Chip({ children, active, onClick }: { children: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-semibold border-2 transition ${
        active
          ? "bg-[var(--sc-green)] border-[var(--sc-green)] text-white"
          : "border-foreground/15 hover:border-[var(--sc-yellow)] hover:bg-[var(--sc-yellow)]/10"
      }`}
    >
      {children}
    </button>
  );
}

function CheckOption({ children, active, onClick }: { children: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3 p-3 rounded-xl border-2 text-left transition ${
        active ? "border-[var(--pt-red)] bg-[var(--pt-red)]/5" : "border-foreground/10 hover:border-[var(--sc-yellow)]"
      }`}
    >
      <span
        className={`h-5 w-5 rounded-md flex items-center justify-center border-2 shrink-0 ${
          active ? "bg-[var(--pt-red)] border-[var(--pt-red)] text-white" : "border-foreground/30"
        }`}
      >
        {active && <Check className="h-3 w-3" />}
      </span>
      <span className="text-sm font-semibold">{children}</span>
    </button>
  );
}
