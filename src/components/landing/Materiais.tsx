import { motion } from "framer-motion";
import { Camera, Palette, Download } from "lucide-react";
import { InstagramIcon, FacebookIcon, WhatsAppIcon } from "@/components/icons/social";
import rodolfo1 from "@/assets/rodolfo1.webp";
import rodolfo2 from "@/assets/rodolfo2.webp";
import rodolfo3 from "@/assets/rodolfo3.webp";
import logo from "@/assets/logo.webp";
import capa1 from "@/assets/capa1.webp";
import capa2 from "@/assets/capa2.webp";
import capa3 from "@/assets/capa3.webp";
import capa4 from "@/assets/capa4.webp";
import capa5 from "@/assets/capa5.webp";

async function downloadZip(name: string, files: { url: string; filename: string }[]) {
  const JSZip = (await import("jszip")).default;
  const zip = new JSZip();
  await Promise.all(
    files.map(async (f) => {
      const r = await fetch(f.url);
      const b = await r.blob();
      zip.file(f.filename, b);
    }),
  );
  const blob = await zip.generateAsync({ type: "blob" });
  const a = document.createElement("a");
  const url = URL.createObjectURL(blob);
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

export function Materiais() {
  const cards = [
    {
      title: "Pack de Fotos",
      desc: "3 fotos oficiais do candidato em alta resolução para usar nas suas redes.",
      icon: <Camera className="h-6 w-6" />,
      preview: rodolfo2,
      accent: "var(--sc-green)",
      onDownload: () =>
        downloadZip("rodolfo-fotos.zip", [
          { url: rodolfo1, filename: "rodolfo-1.png" },
          { url: rodolfo2, filename: "rodolfo-2.png" },
          { url: rodolfo3, filename: "rodolfo-3.png" },
        ]),
      socials: null,
    },
    {
      title: "Logos",
      desc: "Logo oficial da pré-candidatura em PNG, pronta para usar.",
      icon: <Palette className="h-6 w-6" />,
      preview: logo,
      accent: "var(--sc-yellow)",
      onDownload: () =>
        downloadZip("rodolfo-logos.zip", [{ url: logo, filename: "rodolfo-logo.png" }]),
      socials: null,
    },
    {
      title: "Cards para Redes Sociais",
      desc: "Pack com 5 artes prontas para Instagram, Facebook e WhatsApp.",
      icon: <Download className="h-6 w-6" />,
      preview: capa1,
      accent: "var(--pt-red)",
      onDownload: () =>
        downloadZip("rodolfo-cards.zip", [
          { url: capa1, filename: "card-1.jpeg" },
          { url: capa2, filename: "card-2.jpeg" },
          { url: capa3, filename: "card-3.jpeg" },
          { url: capa4, filename: "card-4.jpeg" },
          { url: capa5, filename: "card-5.jpeg" },
        ]),
      socials: (
        <div className="flex items-center gap-2">
          <InstagramIcon className="h-6 w-6" />
          <FacebookIcon className="h-6 w-6" />
          <WhatsAppIcon className="h-6 w-6" />
        </div>
      ),
    },
  ];

  return (
    <section id="materiais" className="py-20 bg-white">
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

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-3xl overflow-hidden bg-white border-2 shadow-lg flex flex-col"
              style={{ borderColor: c.accent }}
            >
              <div
                className="aspect-video relative overflow-hidden"
                style={{ background: `color-mix(in oklab, ${c.accent} 12%, white)` }}
              >
                <img src={c.preview} alt={c.title} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
                <div
                  className="absolute top-3 left-3 inline-flex items-center justify-center h-10 w-10 rounded-xl text-white shadow-lg"
                  style={{ background: c.accent }}
                >
                  {c.icon}
                </div>
              </div>
              <div className="p-6 flex flex-col gap-4 flex-1">
                <div>
                  <h3 className="font-display text-xl text-foreground">{c.title}</h3>
                  <p className="mt-1 text-sm text-foreground/70">{c.desc}</p>
                </div>
                {c.socials && <div className="mt-auto">{c.socials}</div>}
                <button
                  onClick={c.onDownload}
                  className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-[var(--pt-red)] hover:bg-[var(--pt-red-dark)] text-white py-3 text-sm font-bold transition"
                >
                  <Download className="h-4 w-4" />
                  Baixar agora
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
