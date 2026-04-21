import logo from "@/assets/logo.webp";
import {
  InstagramIcon,
  FacebookIcon,
  TikTokIcon,
  WhatsAppIcon,
} from "@/components/icons/social";

export function Footer() {
  return (
    <footer className="bg-foreground text-white snap-end">
      <div className="h-2 w-full flex">
        <div className="flex-1 bg-[var(--sc-green)]" />
        <div className="flex-1 bg-[var(--sc-yellow)]" />
        <div className="flex-1 bg-[var(--pt-red)]" />
      </div>
      <div className="mx-auto max-w-7xl px-4 py-12 grid md:grid-cols-3 gap-10">
        <div>
          <img src={logo} alt="Rodolfo PT/SC" className="h-32 w-auto bg-white rounded-xl p-3" />
          <p className="mt-4 font-display text-2xl leading-tight">
            A Força do<br />Povo Catarinense
          </p>
          <p className="mt-3 text-sm text-white/60">
            Pré-candidato a Deputado Estadual · PT/SC
          </p>
        </div>

        <div>
          <h4 className="font-bold uppercase text-xs tracking-widest text-[var(--sc-yellow)]">
            Acompanhe
          </h4>
          <div className="mt-4 flex gap-3">
            <a href="https://www.instagram.com/rodolfo_de_ramos/" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:scale-110 transition"><InstagramIcon className="h-9 w-9" /></a>
            <a href="https://www.facebook.com/rodolfo.deramos.3?locale=pt_BR" target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:scale-110 transition"><FacebookIcon className="h-9 w-9" /></a>
            <a href="https://www.tiktok.com/@rodolfolulista" target="_blank" rel="noreferrer" aria-label="TikTok" className="hover:scale-110 transition"><TikTokIcon className="h-9 w-9" /></a>
            <a href="https://wa.me/" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="hover:scale-110 transition"><WhatsAppIcon className="h-9 w-9" /></a>
          </div>
        </div>

        <div>
          <h4 className="font-bold uppercase text-xs tracking-widest text-[var(--sc-yellow)]">
            Privacidade
          </h4>
          <p className="mt-4 text-xs text-white/70 leading-relaxed">
            Seus dados são tratados conforme a LGPD (Lei 13.709/18) e usados
            exclusivamente para comunicação da pré-campanha. Você pode solicitar
            remoção a qualquer momento.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-5 flex flex-wrap items-center justify-between gap-3 text-xs text-white/60">
          <span>© 2026 · Pré-campanha Rodolfo · PT Santa Catarina</span>
          <span>Material de pré-campanha — uso institucional.</span>
        </div>
      </div>
    </footer>
  );
}
