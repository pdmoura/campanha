import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { InstagramIcon, FacebookIcon, WhatsAppIcon } from "@/components/icons/social";
import capa1 from "@/assets/capa1.webp";

export function Materiais() {
  return (
    <section id="materiais" className="pt-32 pb-16 md:pt-40 md:pb-20 bg-white min-h-[100dvh] flex flex-col justify-center snap-start snap-always">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="font-bold text-xs tracking-widest text-[var(--sc-green)] uppercase">
            Espalhe a campanha
          </p>
          <h2 className="mt-2 font-display text-4xl md:text-5xl text-[var(--pt-red)]">
            Baixe os Materiais
          </h2>
          <p className="mt-3 text-foreground/70">
            Tudo o que você precisa para apoiar a campanha nas suas redes e na rua.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl w-full mx-auto rounded-3xl overflow-hidden bg-white border-2 shadow-2xl flex flex-col md:flex-row"
          style={{ borderColor: "var(--pt-red)" }}
        >
          <div className="md:w-3/5 bg-foreground/5 flex items-center justify-center p-6 md:p-10">
            <img 
              src={capa1} 
              alt="Pack de Artes" 
              loading="lazy" 
              decoding="async" 
              className="w-full h-auto rounded-xl shadow-md" 
            />
          </div>
          
          <div className="md:w-2/5 p-8 md:p-12 flex flex-col justify-center">
            <h3 className="font-display text-3xl md:text-4xl text-foreground mb-4">Pack Digital</h3>
            <p className="text-lg text-foreground/80 mb-6 leading-relaxed">
              Pack com logo e artes prontas para compartilhar no Instagram, Facebook e WhatsApp.
            </p>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-full bg-foreground/5 text-foreground hover:bg-[var(--pt-red)] hover:text-white transition cursor-default">
                <InstagramIcon className="h-6 w-6" />
              </div>
              <div className="p-3 rounded-full bg-foreground/5 text-foreground hover:bg-[var(--pt-red)] hover:text-white transition cursor-default">
                <FacebookIcon className="h-6 w-6" />
              </div>
              <div className="p-3 rounded-full bg-foreground/5 text-foreground hover:bg-[var(--pt-red)] hover:text-white transition cursor-default">
                <WhatsAppIcon className="h-6 w-6" />
              </div>
            </div>
            
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--pt-red)] hover:bg-[var(--pt-red-dark)] text-white py-4 px-8 text-base font-bold shadow-xl transition w-full mt-auto md:mt-0"
            >
              <Download className="h-5 w-5" />
              Baixar agora
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
