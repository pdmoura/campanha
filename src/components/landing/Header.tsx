import { motion } from "framer-motion";
import logo from "@/assets/logo.webp";
import {
  InstagramIcon,
  FacebookIcon,
  TikTokIcon,
  WhatsAppIcon,
} from "@/components/icons/social";

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

export function Header() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-white/85 border-b border-[var(--sc-yellow)]/40"
    >
      <div className="mx-auto max-w-7xl px-4 h-24 md:h-32 flex items-center justify-between">
        <button
          onClick={() => scrollTo("hero")}
          className="flex items-center"
          aria-label="Início"
        >
          <img
            src={logo}
            alt="Rodolfo PT/SC — A Força do Povo"
            className="h-20 md:h-28 w-auto"
            width={320}
            height={112}
            decoding="async"
          />
        </button>

        <nav className="hidden md:flex items-center gap-9 text-base font-semibold text-foreground/80">
          <button onClick={() => scrollTo("luta")} className="hover:text-[var(--pt-red)]">Juntos na Luta</button>
          <button onClick={() => scrollTo("beneficios")} className="hover:text-[var(--pt-red)]">Por que entrar</button>
          <button onClick={() => scrollTo("materiais")} className="hover:text-[var(--pt-red)]">Materiais</button>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2">
            <a href="https://www.instagram.com/rodolfo_de_ramos/" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:scale-110 transition">
              <InstagramIcon className="h-7 w-7" />
            </a>
            <a href="https://www.facebook.com/rodolfo.deramos.3?locale=pt_BR" target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:scale-110 transition">
              <FacebookIcon className="h-7 w-7" />
            </a>
            <a href="https://www.tiktok.com/@rodolfolulista" target="_blank" rel="noreferrer" aria-label="TikTok" className="hover:scale-110 transition">
              <TikTokIcon className="h-7 w-7" />
            </a>
            <a href="https://wa.me/" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="hover:scale-110 transition">
              <WhatsAppIcon className="h-7 w-7" />
            </a>
          </div>

          <button
            onClick={() => scrollTo("formulario")}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--pt-red)] hover:bg-[var(--pt-red-dark)] text-white px-5 py-2.5 text-base font-bold shadow-lg shadow-[var(--pt-red)]/30 transition"
          >
            <span className="hidden sm:inline">Quero participar</span>
            <span className="sm:hidden">Entrar</span>
          </button>
        </div>
      </div>
    </motion.header>
  );
}
