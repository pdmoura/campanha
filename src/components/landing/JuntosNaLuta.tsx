import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import capa1 from "@/assets/capa1.webp";
import capa2 from "@/assets/capa2.webp";
import capa3 from "@/assets/capa3.webp";
import capa4 from "@/assets/capa4.webp";
import capa5 from "@/assets/capa5.webp";

const slides = [
  { img: capa1, city: "Florianópolis" },
  { img: capa2, city: "Joinville" },
  { img: capa3, city: "Chapecó" },
  { img: capa4, city: "Blumenau" },
  { img: capa5, city: "Criciúma" },
];

export function JuntosNaLuta() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" }, [
    Autoplay({ delay: 4500, stopOnInteraction: false }),
  ]);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section id="luta" className="relative py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <p className="font-bold text-xs tracking-widest text-[var(--sc-green)] uppercase">
              Caminhando por Santa Catarina
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-[var(--pt-red)] mt-2">
              Juntos na Luta
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => emblaApi?.scrollPrev()}
              className="h-11 w-11 rounded-full border-2 border-[var(--pt-red)] text-[var(--pt-red)] hover:bg-[var(--pt-red)] hover:text-white transition flex items-center justify-center"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => emblaApi?.scrollNext()}
              className="h-11 w-11 rounded-full border-2 border-[var(--pt-red)] text-[var(--pt-red)] hover:bg-[var(--pt-red)] hover:text-white transition flex items-center justify-center"
              aria-label="Próximo"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border-4 border-[var(--sc-yellow)]" ref={emblaRef}>
          <div className="flex">
            {slides.map((s, i) => (
              <div key={i} className="min-w-0 shrink-0 grow-0 basis-full md:basis-2/3 lg:basis-1/2 px-1">
                <div className="relative aspect-[4/5] sm:aspect-[16/10] overflow-hidden bg-black">
                  <img src={s.img} alt={`Evento em ${s.city}`} className="h-full w-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5">
                    <div className="inline-flex items-center gap-2 text-white font-semibold">
                      <MapPin className="h-4 w-4 text-[var(--sc-yellow)]" />
                      {s.city}, SC
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Ir para slide ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                selected === i
                  ? "w-8 bg-[var(--pt-red)]"
                  : "w-2 bg-[var(--sc-green)]/40 hover:bg-[var(--sc-yellow)]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
