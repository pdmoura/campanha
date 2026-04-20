# Campanha Rodolfo De Ramos

Formulário de Pré-Campanha Política, desenvolvido com tecnologias modernas de ponta para garantir velocidade, escalabilidade e segurança.

##  Tecnologias

- **Framework:** [TanStack Start](https://tanstack.com/start/latest) (React full-stack)
- **Roteamento:** [TanStack Router](https://tanstack.com/router/latest)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/) com shadcn/ui
- **Servidor & Build:** [Vite](https://vitejs.dev/) + Nitro
- **Banco de Dados / Armazenamento:** Integração com Google Sheets API
- **Segurança:** reCAPTCHA v3 e Upstash Redis para Rate Limiting
- **Deploy:** Configurado para Vercel (Edge/Serverless Functions)

##  Como rodar localmente

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:
   ```env
   # Google Sheets API (Não adicione VITE_)
   GOOGLE_SHEETS_CLIENT_EMAIL=
   GOOGLE_SHEETS_PRIVATE_KEY=
   GOOGLE_SHEETS_SPREADSHEET_ID=
   GOOGLE_SHEETS_SHEET_NAME=Leads

   # reCAPTCHA
   VITE_RECAPTCHA_SITE_KEY=sua-chave-publica
   RECAPTCHA_SECRET_KEY=sua-chave-secreta

   # Upstash Redis para Rate Limiting (Não adicione VITE_)
   UPSTASH_REDIS_REST_URL=
   UPSTASH_REDIS_REST_TOKEN=
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Acesse a aplicação no seu navegador (normalmente em `http://localhost:5173` ou conforme indicado no terminal).

##  Deploy na Vercel

Este projeto já está otimizado para deploy na **Vercel**.
1. Importe o repositório na Vercel.
2. Certifique-se de configurar as mesmas variáveis de ambiente na Vercel em **Settings > Environment Variables**.
3. O build (`npm run build`) vai usar o engine Nitro para compilar as funções backend de forma transparente.
