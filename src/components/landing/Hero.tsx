import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import rodolfo from "@/assets/rodolfo1.webp";

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

export function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24 min-h-[100dvh] flex flex-col justify-center snap-start snap-always"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Decorative shapes */}
      <motion.div
        aria-hidden
        className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-[var(--sc-yellow)]/30 blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-24 right-0 h-96 w-96 rounded-full bg-[var(--sc-green)]/30 blur-3xl"
        animate={{ x: [0, -40, 0], y: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full opacity-[0.07] mix-blend-overlay"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <div className="relative mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-10 items-center">
        <div className="text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-xs font-bold uppercase tracking-widest border border-white/20"
          >
            <span className="h-2 w-2 rounded-full bg-[var(--sc-yellow)]" />
            Pré-candidato · Deputado Estadual · PT/SC
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-5 font-display text-5xl sm:text-6xl md:text-7xl leading-[0.95] tracking-tight"
          >
            A VOZ DO
            <span className="block text-[var(--sc-yellow)] drop-shadow-[0_4px_0_rgba(0,0,0,0.15)]">
              POVO CATARINENSE
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-5 max-w-xl text-base sm:text-lg text-white/90"
          >
            Construindo uma rede de apoiadores em cada canto de Santa Catarina —
            do Litoral ao Oeste, do Vale ao Planalto. Sua voz faz a diferença.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <button
              onClick={() => scrollTo("formulario")}
              className="inline-flex items-center gap-2 rounded-full bg-white text-[var(--pt-red)] px-6 py-3 text-base font-extrabold shadow-2xl hover:scale-[1.02] transition"
            >
              QUERO FAZER PARTE
            </button>
            <button
              onClick={() => scrollTo("luta")}
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/70 text-white px-6 py-3 text-base font-bold hover:bg-white/10 transition"
            >
              Conheça a Luta
              <ArrowDown className="h-4 w-4" />
            </button>
          </motion.div>

          <div className="mt-8 flex items-center gap-4 text-xs text-white/80">
            <span className="h-1 w-12 rounded bg-[var(--sc-green)]" />
            <span className="h-1 w-12 rounded bg-[var(--sc-yellow)]" />
            <span className="h-1 w-12 rounded bg-white" />
            <span className="font-semibold tracking-widest">SANTA CATARINA</span>
          </div>
        </div>

        {/* Candidate image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto"
        >
          <div className="absolute inset-0 -m-6 rounded-[3rem] bg-gradient-to-br from-[var(--sc-yellow)] via-white/30 to-[var(--sc-green)] blur-2xl opacity-60" />
          <div
            className="relative rounded-[2.5rem] overflow-hidden border-4 border-white/80"
            style={{
              background:
                "conic-gradient(from 180deg at 50% 50%, var(--sc-yellow), var(--pt-red), var(--sc-green), var(--sc-yellow))",
              boxShadow: "var(--shadow-glow)",
            }}
          >
            <div className="bg-gradient-to-b from-[var(--pt-red)] to-[var(--pt-red-dark)] aspect-[4/5] w-[280px] sm:w-[340px] md:w-[380px] flex items-end justify-center relative overflow-hidden">
              {/* Decorative dots */}
              <svg className="absolute inset-0 w-full h-full opacity-20" aria-hidden>
                <defs>
                  <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1.5" fill="white" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dots)" />
              </svg>
              <motion.img
                src={rodolfo}
                alt="Rodolfo, pré-candidato a Deputado Estadual"
                className="relative h-full w-full object-cover object-top"
                width={760}
                height={950}
                fetchPriority="high"
                decoding="async"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="absolute -bottom-4 -left-4 rotate-[-6deg] bg-[var(--sc-yellow)] text-[var(--pt-red-dark)] px-4 py-2 rounded-xl font-display text-lg shadow-xl border-2 border-white"
          >
            #13 PT/SC
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
