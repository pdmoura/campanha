import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Shield, Database, Clock, Lock, UserCheck, AlertCircle } from "lucide-react";
import logo from "@/assets/logo.webp";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade · Rodolfo PT/SC" },
      {
        name: "description",
        content:
          "Saiba como a pré-campanha de Rodolfo trata seus dados pessoais de acordo com a LGPD (Lei Geral de Proteção de Dados).",
      },
    ],
  }),
  component: Privacidade,
});

const CONTACT_EMAIL = "cristiano43soares190@gmail.com";

const removalSubject = encodeURIComponent("Solicitação de Remoção de Dados - LGPD");
const removalBody = encodeURIComponent(
  `Olá,

Solicito a exclusão dos meus dados pessoais cadastrados na plataforma da pré-campanha de Rodolfo de Ramos, conforme meu direito garantido pela Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018), especificamente o art. 18, inciso VI.

Dados para identificação:
- Nome completo: [SEU NOME]
- E-mail cadastrado: [SEU EMAIL]
- WhatsApp cadastrado: [SEU NÚMERO]

Aguardo confirmação do recebimento e da conclusão da remoção em até 15 dias.

Atenciosamente.`
);

const removalHref = `mailto:${CONTACT_EMAIL}?subject=${removalSubject}&body=${removalBody}`;

const sections = [
  {
    icon: <Database className="h-6 w-6" />,
    title: "Quais dados coletamos",
    content: [
      "Nome completo",
      "Data de nascimento",
      "Sexo / gênero",
      "Número de WhatsApp",
      "Endereço de e-mail",
      "Perfil do Instagram (opcional)",
      "CEP, cidade, bairro e estado de residência",
      "Filiação ao Partido dos Trabalhadores (PT)",
      "Causas de engajamento político",
      "Formas de apoio à pré-campanha",
      "Preferência de canal de contato",
      "Consentimento expresso (opt-in)",
    ],
  },
  {
    icon: <UserCheck className="h-6 w-6" />,
    title: "Para que usamos seus dados",
    content: [
      "Comunicar novidades, eventos e ações da pré-campanha de Rodolfo de Ramos pelo canal que você escolheu (WhatsApp, e-mail, Instagram ou telefone).",
      "Organizar e mobilizar apoiadores por região de Santa Catarina.",
      "Entender o perfil e os interesses dos apoiadores para direcionar ações políticas.",
      "Cumprir obrigações legais relacionadas à legislação eleitoral e de proteção de dados.",
    ],
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Base legal (LGPD)",
    content: [
      "Consentimento (art. 7º, I): Você marcou a opção de opt-in ao preencher o formulário, autorizando expressamente o uso de seus dados para os fins informados.",
      "Legítimo interesse (art. 7º, IX): O uso para comunicação política e mobilização comunitária está alinhado à finalidade declarada da coleta.",
      "Obrigação legal (art. 7º, II): Eventual obrigação de prestação de contas exigida pela legislação eleitoral brasileira.",
    ],
  },
  {
    icon: <Lock className="h-6 w-6" />,
    title: "Como protegemos seus dados",
    content: [
      "Os dados são armazenados em planilhas protegidas do Google Workspace, com acesso restrito à equipe da pré-campanha.",
      "A comunicação entre o seu dispositivo e o servidor é criptografada via HTTPS/TLS.",
      "Nenhum dado é compartilhado, vendido ou cedido a terceiros sem seu consentimento.",
      "A coleta é protegida pelo Google reCAPTCHA v3 para prevenir envios automatizados por robôs.",
    ],
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Por quanto tempo guardamos",
    content: [
      "Seus dados serão mantidos pelo período necessário para a finalidade da pré-campanha ou enquanto você não solicitar a remoção.",
      "Após o encerramento das atividades da pré-campanha, os dados serão anonimizados ou excluídos, salvo obrigação legal em contrário.",
    ],
  },
  {
    icon: <AlertCircle className="h-6 w-6" />,
    title: "Seus direitos como titular (art. 18 da LGPD)",
    content: [
      "Confirmar se tratamos seus dados.",
      "Acessar uma cópia dos seus dados.",
      "Corrigir dados incompletos, inexatos ou desatualizados.",
      "Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários.",
      "Solicitar a portabilidade dos seus dados.",
      "Revogar o consentimento a qualquer momento.",
      "Solicitar a exclusão completa dos seus dados — veja o link abaixo.",
    ],
  },
];

function Privacidade() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "var(--font-sans)" }}>
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-foreground/10">
        <div className="mx-auto max-w-4xl px-4 h-24 md:h-32 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition">
            <img src={logo} alt="Rodolfo PT/SC" className="h-20 md:h-28 w-auto" />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/70 hover:text-foreground transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao início
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-14 md:py-20">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--sc-green)] mb-2">
            Transparência &amp; LGPD
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-[var(--pt-red)] mb-4">
            Política de Privacidade
          </h1>
          <p className="text-foreground/60 text-base max-w-2xl leading-relaxed">
            A pré-campanha de <strong>Rodolfo de Ramos — PT/SC</strong> tem total compromisso com a
            privacidade e a segurança dos seus dados pessoais, em conformidade com a{" "}
            <strong>Lei Geral de Proteção de Dados (LGPD — Lei n.º 13.709/2018)</strong>.
          </p>
          <p className="mt-2 text-xs text-foreground/40">
            Última atualização: abril de 2026
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="rounded-2xl border border-foreground/8 bg-foreground/[0.02] p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="flex items-center justify-center h-10 w-10 rounded-xl bg-[var(--pt-red)]/10 text-[var(--pt-red)]">
                  {s.icon}
                </span>
                <h2 className="font-display text-xl text-foreground">{s.title}</h2>
              </div>
              <ul className="space-y-2">
                {s.content.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-foreground/70 leading-relaxed">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--sc-green)] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Removal CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10 rounded-2xl border-2 border-[var(--pt-red)]/30 bg-[var(--pt-red)]/5 p-6 md:p-8"
        >
          <div className="flex items-start gap-4">
            <span className="flex items-center justify-center h-10 w-10 rounded-xl bg-[var(--pt-red)] text-white shrink-0 mt-0.5">
              <Mail className="h-5 w-5" />
            </span>
            <div className="flex-1">
              <h2 className="font-display text-xl text-[var(--pt-red)] mb-1">
                Solicitar remoção dos meus dados
              </h2>
              <p className="text-sm text-foreground/70 leading-relaxed mb-5">
                Você tem o direito garantido pela LGPD de solicitar a exclusão dos seus dados a qualquer momento.
                Basta clicar no botão abaixo — abrirá seu e-mail com uma mensagem pré-preenchida, pronta para enviar.
                O prazo para atendimento é de até <strong>15 dias úteis</strong>.
              </p>
              <a
                href={removalHref}
                className="inline-flex items-center gap-2.5 rounded-full bg-[var(--pt-red)] hover:bg-[var(--pt-red-dark)] text-white px-6 py-3 text-sm font-bold shadow-lg transition"
              >
                <Mail className="h-4 w-4" />
                Solicitar remoção por e-mail
              </a>
              <p className="mt-3 text-xs text-foreground/40">
                Será enviado para:{" "}
                <span className="font-mono">{CONTACT_EMAIL}</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Controller info */}
        <div className="mt-8 rounded-xl bg-foreground/5 px-6 py-5 text-sm text-foreground/60 leading-relaxed">
          <strong className="text-foreground/80">Controlador dos dados:</strong> Rodolfo de Ramos, pré-candidato a
          Deputado Estadual pelo PT/SC. Contato:{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-[var(--pt-red)] underline underline-offset-2">
            {CONTACT_EMAIL}
          </a>
          . Em caso de dúvidas sobre o tratamento de dados, você também pode contatar a{" "}
          <a
            href="https://www.gov.br/anpd"
            target="_blank"
            rel="noreferrer"
            className="text-[var(--pt-red)] underline underline-offset-2"
          >
            Autoridade Nacional de Proteção de Dados (ANPD)
          </a>
          .
        </div>
      </main>

      {/* Footer strip */}
      <div className="border-t border-foreground/10">
        <div className="mx-auto max-w-4xl px-4 py-5 flex flex-wrap items-center justify-between gap-3 text-xs text-foreground/40">
          <span>© 2026 · Pré-campanha Rodolfo · PT Santa Catarina</span>
          <Link to="/" className="hover:text-foreground transition">
            Voltar à página inicial
          </Link>
        </div>
      </div>
    </div>
  );
}
