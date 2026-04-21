import { motion } from "framer-motion";
import { Users, MessageCircle, CalendarCheck, Megaphone } from "lucide-react";

const items = [
  {
    icon: Users,
    title: "Rede de Apoiadores",
    desc: "Conecte-se com militantes e simpatizantes em toda Santa Catarina.",
    color: "var(--sc-green)",
  },
  {
    icon: MessageCircle,
    title: "Comunicação Exclusiva",
    desc: "Receba conteúdos, notícias e atualizações antes de todo mundo.",
    color: "var(--sc-yellow)",
  },
  {
    icon: CalendarCheck,
    title: "Atividades Presenciais",
    desc: "Participe de plenárias, atos e encontros na sua região.",
    color: "var(--pt-red)",
  },
  {
    icon: Megaphone,
    title: "Contribuição Ativa",
    desc: "Ajude a construir as pautas que vão pra Assembleia Legislativa.",
    color: "var(--sc-green)",
  },
];

export function Beneficios() {
  return (
    <section id="beneficios" className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-b from-white to-[var(--sc-yellow)]/10 min-h-[100dvh] flex flex-col justify-center snap-start snap-always">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="font-bold text-xs tracking-widest text-[var(--sc-green)] uppercase">
            Por que fazer parte?
          </p>
          <h2 className="mt-2 font-display text-4xl md:text-5xl text-[var(--pt-red)]">
            Movimento de Verdade
          </h2>
          <p className="mt-3 text-foreground/70">
            Quem entra na nossa rede ganha voz, ferramenta e espaço pra transformar SC.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="group relative rounded-2xl bg-white p-6 shadow-md border border-foreground/5 overflow-hidden"
              style={{
                borderTop: `4px solid ${it.color}`,
              }}
            >
              <div
                className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full opacity-15 group-hover:scale-125 transition-transform"
                style={{ background: it.color }}
              />
              <div
                className="inline-flex h-12 w-12 items-center justify-center rounded-xl mb-4"
                style={{ background: `color-mix(in oklab, ${it.color} 18%, white)`, color: it.color }}
              >
                <it.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl text-foreground">{it.title}</h3>
              <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
