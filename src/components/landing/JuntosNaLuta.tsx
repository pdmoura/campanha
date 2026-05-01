import { useCallback, useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Newspaper,
  X,
  ZoomIn,
} from "lucide-react";

import img1 from "@/assets/1.webp";
import img2 from "@/assets/2.webp";
import img3 from "@/assets/3.webp";
import img4 from "@/assets/4.webp";
import campoCidade from "@/assets/campo-cidade.webp";
import capa2 from "@/assets/capa2.webp";
import capa3 from "@/assets/capa3.webp";
import capa4 from "@/assets/capa4.webp";
import capa5 from "@/assets/capa5.webp";

/* ── Types ───────────────────────────────────────────────────────── */

type ModalContent =
  | { type: "image"; src: string; city: string }
  | { type: "post" };

type LutaCard = {
  city: string;
  image: string;
  eyebrow: string;
  title: string;
  description: string;
};

/* ── Data ────────────────────────────────────────────────────────── */

const cards: LutaCard[] = [
  {
    city: "Santa Catarina",
    image: capa2,
    eyebrow: "Mobilização popular",
    title: "A voz do nosso povo",
    description:
      "Uma campanha construída com trabalho, resultado e presença popular.",
  },
  {
    city: "Chapecó",
    image: capa3,
    eyebrow: "Oeste catarinense",
    title: "Diálogo com trabalhadores",
    description:
      "Uma luta conectada ao trabalho, à produção e à dignidade.",
  },
  {
    city: "Blumenau",
    image: capa4,
    eyebrow: "Vale do Itajaí",
    title: "Organização de base",
    description:
      "Apoio popular construido com conversa, escuta e compromisso.",
  },
  {
    city: "Criciúma",
    image: capa5,
    eyebrow: "Sul catarinense",
    title: "Santa Catarina em movimento",
    description:
      "Uma rede de apoiadores presente em todas as regioes do estado.",
  },
];

const featuredCard: LutaCard = {
  city: "Joinville",
  image: campoCidade,
  eyebrow: "Campo e cidade",
  title: "Feira da Reforma Agrária",
  description:
    "Card especial com detalhes da agenda construída junto aos trabalhadores rurais.",
};

const postImages = [img1, img2, img3, img4];

/* ── Stagger animation variants ──────────────────────────────────── */

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, damping: 22, stiffness: 200 },
  },
};

/* ── Main Component ──────────────────────────────────────────────── */

export function JuntosNaLuta() {
  const [modalContent, setModalContent] = useState<ModalContent | null>(null);

  /* Embla carousel for the cards */
  const [carouselRef, carouselApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });
  const scrollPrev = useCallback(() => carouselApi?.scrollPrev(), [carouselApi]);
  const scrollNext = useCallback(() => carouselApi?.scrollNext(), [carouselApi]);

  /* Lock body scroll when modal is open */
  useEffect(() => {
    if (!modalContent) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalContent(null);
    };

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [modalContent]);

  const openImage = (card: LutaCard) => {
    setModalContent({ type: "image", src: card.image, city: card.city });
  };

  return (
    <section
      id="luta"
      className="relative isolate flex min-h-dvh snap-start snap-always flex-col justify-center overflow-hidden bg-white pt-32 pb-24 md:pt-40 md:pb-32"
    >
      {/* Top accent bar */}
      <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-[var(--sc-green)] via-[var(--sc-yellow)] to-[var(--pt-red)]" />

      {/* Background grid */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="mx-auto w-full max-w-7xl px-4">
        {/* ── Header ── */}
        <div className="mb-12 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--sc-green)]">
            Caminhando por Santa Catarina
          </p>
          <h2 className="mt-2 font-display text-4xl leading-tight text-[var(--pt-red)] md:text-5xl">
            Juntos na Luta
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/70 md:text-lg">
            Um registro vivo das agendas, encontros e alianças que aproximam a
            campanha das pessoas que constroem Santa Catarina todos os dias.
          </p>
        </div>

        {/* ── Featured Card ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.button
            type="button"
            variants={cardVariants}
            onClick={() => setModalContent({ type: "post" })}
            className="group relative w-full overflow-hidden rounded-[1.5rem] border-4 border-[var(--sc-green)] bg-foreground text-left shadow-2xl shadow-black/10 transition hover:-translate-y-1 hover:shadow-[0_24px_70px_-28px_rgba(0,0,0,0.55)] focus:outline-none focus:ring-2 focus:ring-[var(--sc-green)] focus:ring-offset-4"
            aria-label="Abrir detalhes da agenda Campo e cidade"
          >
            <div className="relative">
              <img
                src={featuredCard.image}
                alt="Agenda entre o campo e a cidade em Joinville"
                className="w-full max-h-[60vh] object-contain bg-foreground transition duration-700 group-hover:scale-[1.02]"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
                <span className="inline-flex items-center gap-2 rounded-full bg-[var(--sc-yellow)] px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-[var(--pt-red-dark)]">
                  <Newspaper className="h-4 w-4" />
                  Abrir post
                </span>
                <h3 className="mt-4 font-display text-3xl leading-tight lg:text-4xl">
                  Entre o Campo e a Cidade
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/82 md:text-base">
                  Clique para ver a galeria e os detalhes da feira estadual e do
                  seminário em Joinville.
                </p>
              </div>

              {/* Hover icon */}
              <div className="absolute right-5 top-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/16 text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
                <Newspaper className="h-6 w-6" />
              </div>
            </div>
          </motion.button>
        </motion.div>

        {/* ── Cards Carousel ── */}
        <div className="relative mt-8">
          {/* Nav arrows */}
          <div className="mb-4 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={scrollPrev}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-[var(--pt-red)] text-[var(--pt-red)] transition hover:bg-[var(--pt-red)] hover:text-white focus:outline-none focus:ring-2 focus:ring-[var(--pt-red)] focus:ring-offset-2"
              aria-label="Slide anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-[var(--pt-red)] text-[var(--pt-red)] transition hover:bg-[var(--pt-red)] hover:text-white focus:outline-none focus:ring-2 focus:ring-[var(--pt-red)] focus:ring-offset-2"
              aria-label="Próximo slide"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Embla viewport */}
          <div ref={carouselRef} className="overflow-hidden">
            <motion.div
              className="flex gap-5"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {cards.map((card) => (
                <motion.button
                  key={card.city}
                  type="button"
                  variants={cardVariants}
                  onClick={() => openImage(card)}
                  className="group relative min-w-0 shrink-0 grow-0 basis-[75%] overflow-hidden rounded-[1.5rem] border-4 border-[var(--sc-yellow)] bg-foreground text-left shadow-xl shadow-black/8 transition hover:-translate-y-1 hover:shadow-[0_20px_60px_-24px_rgba(0,0,0,0.5)] focus:outline-none focus:ring-2 focus:ring-[var(--sc-yellow)] focus:ring-offset-4 sm:basis-[50%] lg:basis-[30%]"
                  aria-label={`Ampliar imagem de ${card.city}`}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={card.image}
                      alt={`${card.title} em ${card.city}`}
                      className="aspect-square w-full object-contain bg-foreground transition duration-700 group-hover:scale-[1.02]"
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/14 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white backdrop-blur">
                        <MapPin className="h-3.5 w-3.5 text-[var(--sc-yellow)]" />
                        {card.city}, SC
                      </span>
                      <h3 className="mt-3 font-display text-xl leading-tight text-white sm:text-2xl">
                        {card.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/75">
                        {card.description}
                      </p>
                    </div>

                    {/* Hover icon */}
                    <div className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/16 text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
                      <ZoomIn className="h-5 w-5" />
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Modal (portaled to body to escape isolate stacking context) ── */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {modalContent && (
              <ModalShell onClose={() => setModalContent(null)}>
                {modalContent.type === "post" ? (
                  <PostModal onClose={() => setModalContent(null)} />
                ) : (
                  <ImageModal
                    modal={modalContent}
                    onClose={() => setModalContent(null)}
                  />
                )}
              </ModalShell>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </section>
  );
}

/* ── Modal Shell (Backdrop) ──────────────────────────────────────── */

function ModalShell({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm md:p-8"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </motion.div>
  );
}

/* ── Image Modal ─────────────────────────────────────────────────── */

function ImageModal({
  modal,
  onClose,
}: {
  modal: Extract<ModalContent, { type: "image" }>;
  onClose: () => void;
}) {
  return (
    <>
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white/80 transition hover:bg-white/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-white md:right-8 md:top-8"
        aria-label="Fechar imagem ampliada"
      >
        <X className="h-7 w-7" />
      </button>

      <motion.img
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 280 }}
        src={modal.src}
        alt={`Imagem ampliada de ${modal.city}`}
        className="max-h-[88vh] max-w-full rounded-2xl object-contain shadow-2xl"
      />
    </>
  );
}

/* ── Post Modal ──────────────────────────────────────────────────── */

function PostModal({ onClose }: { onClose: () => void }) {
  const [postEmblaRef, postEmblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.96, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 18 }}
      transition={{ type: "spring", damping: 25, stiffness: 260 }}
      className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-[1.5rem] bg-white text-foreground shadow-2xl"
    >
      {/* Sticky header */}
      <div className="sticky top-0 z-20 flex items-start justify-between gap-4 border-b border-foreground/10 bg-white/95 px-5 py-4 backdrop-blur md:px-7">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--sc-green)]">
            Joinville, SC
          </p>
          <h3 className="mt-1 font-display text-2xl leading-tight text-[var(--pt-red)] md:text-3xl">
            Entre o Campo e a Cidade
          </h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-foreground/5 text-foreground/70 transition hover:bg-foreground/10 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--pt-red)]"
          aria-label="Fechar post"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Scrollable body */}
      <div className="max-h-[calc(90vh-88px)] overflow-y-auto p-5 md:p-7">
        {/* Image carousel */}
        <div className="relative overflow-hidden rounded-2xl bg-black">
          <div ref={postEmblaRef} className="overflow-hidden">
            <div className="flex">
              {postImages.map((image, index) => (
                <div
                  key={image}
                  className="min-w-0 shrink-0 grow-0 basis-full"
                >
                  <img
                    src={image}
                    alt={`Registro da reunião sobre campo e cidade ${index + 1}`}
                    className="aspect-video w-full object-cover"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => postEmblaApi?.scrollPrev()}
            className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white transition hover:bg-black/75 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Imagem anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => postEmblaApi?.scrollNext()}
            className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white transition hover:bg-black/75 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Proxima imagem"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Post body */}
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-foreground/78 md:text-base">
          <p>
            Hoje (30/04/2026), o presidente do STIMEJ, Rodolfo de Ramos,
            recebeu a visita dos companheiros Sebastião Suelo Vilanova e Leandro
            Klemann, coordenadores da CCA/SC, Cooperativa Central de Reforma
            Agrária de SC.
          </p>
          <p>
            A reunião teve como objetivo a organização de uma importante Feira
            Estadual da Reforma Agrária e de um seminário previsto para acontecer
            no mês de junho, na Sede Recreativa dos Trabalhadores Metalúrgicos
            de Joinville.
          </p>
          <p>
            O seminário será um espaço fundamental para fortalecer os
            trabalhadores e trabalhadoras do campo, auxiliando no planejamento
            das atividades, na melhoria da produção e na organização das
            propriedades rurais.
          </p>
          <p>
            A Feira Estadual da Reforma Agrária terá 20 bancas de produtos
            orgânicos e industrializados pelas cooperativas.
          </p>
          <p>
            O Sindicato dos Trabalhadores Metalúrgicos de Joinville, junto com
            outras entidades, estará apoiando essa iniciativa e mobilizando a
            comunidade joinvilense para prestigiar esse grande momento.
          </p>
          <p>Fiquem atentos, em breve mais novidades.</p>
          <p className="font-semibold text-[var(--pt-red)]">
            #Cooperativismo #AgriculturaFamiliar #Joinville #Trabalhadores
            #Seminário #EconomiaSolidária
          </p>
        </div>
      </div>
    </motion.article>
  );
}
