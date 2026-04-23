import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ShieldCheck, X } from "lucide-react";

const STORAGE_KEY = "rodolfo_cookie_consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      // small delay so it doesn't flash immediately on load
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  };

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "dismissed");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-[900]"
        >
          <div className="bg-foreground text-white rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
            {/* Color bar */}
            <div className="h-1 w-full flex">
              <div className="flex-1 bg-[var(--sc-green)]" />
              <div className="flex-1 bg-[var(--sc-yellow)]" />
              <div className="flex-1 bg-[var(--pt-red)]" />
            </div>

            <div className="p-5">
              <div className="flex items-start gap-3">
                <span className="flex items-center justify-center h-9 w-9 rounded-xl bg-[var(--sc-yellow)] text-foreground shrink-0">
                  <ShieldCheck className="h-5 w-5" />
                </span>

                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-white leading-snug mb-1">
                    Privacidade &amp; Dados
                  </p>
                  <p className="text-xs text-white/70 leading-relaxed">
                    Ao preencher o formulário, você consente com o tratamento dos
                    seus dados pessoais pela pré-campanha de Rodolfo de Ramos,
                    conforme a{" "}
                    <strong className="text-white/90">LGPD (Lei 13.709/18)</strong>.
                    Seus dados são usados exclusivamente para comunicação da
                    pré-campanha e nunca compartilhados com terceiros.
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <button
                      onClick={accept}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[var(--pt-red)] hover:bg-[var(--pt-red-dark)] text-white text-xs font-bold px-4 py-2 transition shadow"
                    >
                      <ShieldCheck className="h-3.5 w-3.5" />
                      Entendi e aceito
                    </button>
                    <Link
                      to="/privacidade"
                      className="text-xs text-white/60 hover:text-white transition underline underline-offset-2"
                      onClick={dismiss}
                    >
                      Política de Privacidade
                    </Link>
                  </div>
                </div>

                <button
                  onClick={dismiss}
                  aria-label="Fechar aviso"
                  className="text-white/40 hover:text-white transition shrink-0 mt-0.5"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
