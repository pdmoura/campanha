
# Landing Page Pré-Campanha — Rodolfo (Dep. Estadual PT/SC)

## Stack adaptada
- **Framework**: TanStack Start (não Next.js — o template é este) + React + Tailwind v4 + Framer Motion
- **Backend**: Server Functions do TanStack Start (equivalente a Server Actions)
- **Planilha**: Google Sheets API via Service Account
- **Rate limit**: Upstash Redis (`@upstash/ratelimit` + `@upstash/redis`)
- **Ícones**: `lucide-react` para UI; SVGs oficiais inline para WhatsApp, Instagram, Telegram, Facebook, YouTube

## Identidade visual
- Vermelho PT `#CC0000` (CTAs e títulos), Branco (base)
- Verde SC `#009b3a` e Amarelo SC `#fedd00` em bordas, divisores, ícones e gradientes do Hero
- Tipografia bold, mobile-first, micro-animações Framer Motion

## Estrutura da página (rota única `/`)

**1. Header fixo** — logo "Rodolfo · A voz do nosso povo" + nav suave + CTA WhatsApp.

**2. Hero**
- Fundo gradiente vermelho com formas geométricas amarelas/vermelhas animadas (estilo das capas) + bandeira de SC translúcida
- Foto do candidato (rodolfo1.png) com entrada animada e sombra colorida
- Slogan: **"A Força do Povo Catarinense"**
- Subtítulo: "Pré-candidato a Deputado Estadual — PT/SC"
- CTA primário "QUERO FAZER PARTE" (WhatsApp SVG) → scroll suave ao formulário
- CTA secundário "Conheça a Luta" → scroll ao carrossel

**3. Carrossel "Juntos na Luta"**
- Slider responsivo (Embla) com as capas enviadas (capa1–5) representando eventos em Florianópolis, Joinville, Chapecó, Blumenau, Criciúma
- Autoplay, dots verde/amarelo, navegação acessível

**4. Benefícios — "Por que fazer parte?"**
- Grid 4 cards com bordas verde/amarelo e ícones Lucide:
  - 🤝 Rede de Apoiadores
  - 💬 Comunicação Exclusiva (grupo VIP)
  - 📅 Atividades Presenciais
  - ✊ Contribuição Ativa nas Pautas

**5. Stepper de Engajamento (3 passos)**
- Indicador visual de progresso (barras verde→amarelo→vermelho)
- **Passo 1 — Identificação**: Nome, E-mail, WhatsApp (máscara BR)
- **Passo 2 — Mapeamento**: Cidade SC (select com principais municípios + outras), Áreas de interesse (multi-select: Educação, Saúde, Trabalho, Moradia, Meio Ambiente, Direitos)
- **Passo 3 — Compromisso**: Como deseja ajudar (checkbox: divulgar, organizar evento, panfletagem, apoio digital, contribuir financeiramente)
- Botão final **"COMEÇAR AGORA"** → server function → Google Sheets
- Validação Zod por passo, feedback de sucesso animado, tratamento de rate-limit

**6. Download de Materiais**
- 3 cards com bordas decorativas SC:
  - 📷 **Pack de Fotos** (ZIP com rodolfo1/2/3.png) — ícone genérico
  - 🎨 **Logos** (logo.png em PNG) — ícone genérico
  - 📱 **Cards para Redes Sociais** (capa1–5.jpeg) — SVG oficial Instagram + WhatsApp + Facebook indicando uso
- Cada card: preview, descrição, botão "Baixar"

**7. Footer**
- Logo + slogan "A Força do Povo Catarinense"
- Redes sociais com SVGs oficiais (Instagram, WhatsApp, Facebook, Telegram, YouTube)
- Disclaimer LGPD curto sobre uso dos dados
- © 2026 — texto eleitoral fictício

## Backend & Segurança

**Server Function `submitLead`** (`src/server/leads.functions.ts`)
1. Valida payload com Zod (anti-injection, limites de tamanho)
2. Aplica rate limit Upstash: 3 envios / 10 min por IP
3. Autentica na Google Sheets API (Service Account JWT) e faz `append` na aba `Leads`
4. Retorna `{ success, error }` tipado

**Secrets necessários** (vou solicitar após aprovação do plano):
- `GOOGLE_SHEETS_ID` — ID da planilha
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

Vou orientar passo a passo: criar Service Account no Google Cloud, compartilhar a planilha com o e-mail do Service Account, e criar a base Upstash Redis (free tier).

## Assets
Copio para `src/assets/` na implementação: logo.png, rodolfo1.png, rodolfo2.png, rodolfo3.png, capa1–5.jpeg.

## SEO
`head()` da rota com title, description, og:title/description/image (usando capa1.jpeg) e twitter card.

## Entrega
Após aprovar, eu: (1) implemento UI completa com animações, (2) crio a server function + integrações, (3) peço os 5 secrets, (4) testo o fluxo end-to-end.
