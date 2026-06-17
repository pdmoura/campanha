import { useCallback, useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import {
  ChevronLeft,
  ChevronRight,
  Newspaper,
  X,
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
import assembleia1 from "@/assets/assembleia1.webp";
import assembleia2 from "@/assets/assembleia2.webp";
import assembleia3 from "@/assets/assembleia3.webp";
import meta1 from "@/assets/meta1.jpeg";
import meta2 from "@/assets/meta2.jpeg";
import meta3 from "@/assets/meta3.jpeg";
import preCandidato11 from "@/assets/pre-candidato-aprovado (11).jpeg";

/* Eagerly import all 44 pre-candidato photos via glob */
const preCandidatoGlob = import.meta.glob<{ default: string }>(
  "@/assets/pre-candidato-aprovado*.jpeg",
  { eager: true },
);
const preCandidatoImages = Object.entries(preCandidatoGlob)
  .map(([path, mod]) => {
    const num = parseInt(path.match(/\((\d+)\)/)?.[1] ?? "0", 10);
    return { num, src: mod.default };
  })
  .sort((a, b) => a.num - b.num)
  .map((item) => item.src);

/* Eagerly import francisco pre-candidatura photos via glob */
import franciscoCover from "@/assets/pre-candidatura-francisco (9).jpeg";
const franciscoGlob = import.meta.glob<{ default: string }>(
  "@/assets/pre-candidatura-francisco*.jpeg",
  { eager: true },
);
const franciscoImages = Object.entries(franciscoGlob)
  .map(([path, mod]) => {
    const num = parseInt(path.match(/\((\d+)\)/)?.[1] ?? "0", 10);
    return { num, src: mod.default };
  })
  .filter((item) => item.num >= 1 && item.num <= 8)
  .sort((a, b) => a.num - b.num)
  .map((item) => item.src);

/* Eagerly import indios photos via glob + video */
import indiosCover from "@/assets/indios (4).jpeg";
import indiosVideo from "@/assets/video-indios.mp4";
const indiosGlob = import.meta.glob<{ default: string }>(
  "@/assets/indios*.jpeg",
  { eager: true },
);
const indiosImages = Object.entries(indiosGlob)
  .map(([path, mod]) => {
    const num = parseInt(path.match(/\((\d+)\)/)?.[1] ?? "0", 10);
    return { num, src: mod.default };
  })
  .filter((item) => item.num !== 4)
  .sort((a, b) => a.num - b.num)
  .map((item) => item.src);

import sindicatoAraquariImg from "@/assets/metalurgicos-rodolfo.jpeg";

/* Eagerly import trabalhador-defende photos via glob + video */
import trabalhadorDefendeCover from "@/assets/trabalhador-defende (6).jpeg";
import trabalhadorDefendeVideo from "@/assets/trabalhador-defende-video.mp4";
const trabalhadorDefendeGlob = import.meta.glob<{ default: string }>(
  "@/assets/trabalhador-defende *.jpeg",
  { eager: true },
);
const trabalhadorDefendeImages = Object.entries(trabalhadorDefendeGlob)
  .map(([path, mod]) => {
    const num = parseInt(path.match(/\((\d+)\)/)?.[1] ?? "0", 10);
    return { num, src: mod.default };
  })
  .filter((item) => item.num >= 1 && item.num <= 22)
  .sort((a, b) => a.num - b.num)
  .map((item) => item.src);

/* Eagerly import rodolfo-reuni photos via glob + videos */
import reuniCover from "@/assets/rodolfo-reuni (1).jpeg";
import reuniVideo1 from "@/assets/rodolfo-reuni-video(1).mp4";
import reuniVideo2 from "@/assets/rodolfo-reuni-video(2).mp4";
import reuniVideo3 from "@/assets/rodolfo-reuni-video(3).mp4";
const reuniGlob = import.meta.glob<{ default: string }>(
  "@/assets/rodolfo-reuni *.jpeg",
  { eager: true },
);
const reuniImages = Object.entries(reuniGlob)
  .map(([path, mod]) => {
    const num = parseInt(path.match(/\((\d+)\)/)?.[1] ?? "0", 10);
    return { num, src: mod.default };
  })
  .filter((item) => item.num >= 2 && item.num <= 6)
  .sort((a, b) => a.num - b.num)
  .map((item) => item.src);

/* ── Types ───────────────────────────────────────────────────────── */

type ModalContent =
  | { type: "image"; src: string; city: string }
  | { type: "post"; postId: "campo-cidade" | "assembleia" | "metalurgicos" | "pre-candidato" | "francisco" | "indios" | "sindicato-araquari" | "trabalhador-defende" | "reuni-barra-sul" };

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

const assembleiaCard: LutaCard = {
  city: "Joinville",
  image: assembleia1,
  eyebrow: "Trabalhadores dos Correios",
  title: "Assembleia dos Correios",
  description:
    "Rodolfo esteve presente apoiando a luta dos trabalhadores dos Correios de Joinville e região.",
};

const postImages = [img1, img2, img3, img4];
const assembleiaImages = [assembleia1, assembleia2, assembleia3];
const metalurgicosImages = [meta1, meta2, meta3];

const metalurgicosCard: LutaCard = {
  city: "Joinville",
  image: meta2,
  eyebrow: "Setor Metalúrgico",
  title: "Diálogo com trabalhadores do setor metalúrgicos",
  description:
    "Rodolfo em diálogo direto com a base metalúrgica, fortalecendo a luta dos trabalhadores.",
};

const preCandidatoCard: LutaCard = {
  city: "Santa Catarina",
  image: preCandidato11,
  eyebrow: "Pré-candidatura",
  title: "Rodolfo de Ramos é confirmado como pré-candidato",
  description:
    "Rodolfo é confirmado como pré-candidato a deputado estadual pelo PT em Santa Catarina.",
};

const franciscoCard: LutaCard = {
  city: "Santa Catarina",
  image: franciscoCover,
  eyebrow: "Pré-candidatura",
  title: "Lançamento da pré-candidatura de Francisco de Assis",
  description:
    "Lançamento da pré-candidatura a deputado federal de Francisco de Assis pelo PT.",
};

const indiosCard: LutaCard = {
  city: "Joinville",
  image: indiosCover,
  eyebrow: "Cultura indígena",
  title: "Esse é com os índios",
  description:
    "Espaço cultural Jacatirão em Joinville — celebrando a cultura e resistência dos povos originários.",
};

const sindicatoAraquariCard: LutaCard = {
  city: "Araquari",
  image: sindicatoAraquariImg,
  eyebrow: "Movimento sindical",
  title: "Rodolfo visita direção do Sindicato dos Metalúrgicos de Araquari",
  description:
    "Fortalecendo o diálogo entre entidades e a unidade do movimento sindical.",
};

const trabalhadorDefendeCard: LutaCard = {
  city: "Santa Catarina",
  image: trabalhadorDefendeCover,
  eyebrow: "Mobilização",
  title: "Rodolfo de Ramos participa de mobilização em defesa dos trabalhadores",
  description:
    "Reforçando o compromisso com a defesa dos direitos da classe trabalhadora.",
};

const reuniBarraSulCard: LutaCard = {
  city: "Barra do Sul",
  image: reuniCover,
  eyebrow: "Organização partidária",
  title: "Rodolfo fortalece organização do PT em Barra do Sul",
  description:
    "Reunião com a direção do PT de Barra do Sul para fortalecer o partido no litoral catarinense.",
};

type FeaturedCard = LutaCard & { postId: "campo-cidade" | "assembleia" | "metalurgicos" | "pre-candidato" | "francisco" | "indios" | "sindicato-araquari" | "trabalhador-defende" | "reuni-barra-sul"; label: string; subtitle: string };

const featuredCards: FeaturedCard[] = [
  {
    ...featuredCard,
    postId: "campo-cidade",
    label: "Entre o Campo e a Cidade",
    subtitle: "Clique para ver a galeria e os detalhes da feira estadual e do seminário em Joinville.",
  },
  {
    ...assembleiaCard,
    postId: "assembleia",
    label: "Assembleia dos Correios",
    subtitle: "Apoiando a luta dos trabalhadores dos Correios de Joinville e região. Clique para ver mais.",
  },
  {
    ...metalurgicosCard,
    postId: "metalurgicos",
    label: "Diálogo com trabalhadores do setor metalúrgicos",
    subtitle: "Rodolfo em diálogo direto com a base metalúrgica. Clique para ver mais.",
  },
  {
    ...preCandidatoCard,
    postId: "pre-candidato",
    label: "Rodolfo de Ramos é confirmado como pré-candidato a deputado estadual",
    subtitle: "Confirmação da pré-candidatura pelo PT em Santa Catarina. Clique para ver mais.",
  },
  {
    ...franciscoCard,
    postId: "francisco",
    label: "Lançamento da pré candidatura a deputado federal Francisco de Assis PT",
    subtitle: "Lançamento da pré-candidatura a deputado federal. Clique para ver mais.",
  },
  {
    ...indiosCard,
    postId: "indios",
    label: "Esse é com os índios",
    subtitle: "Espaço cultural Jacatirão em Joinville. Clique para ver mais.",
  },
  {
    ...sindicatoAraquariCard,
    postId: "sindicato-araquari",
    label: "Rodolfo visita direção do Sindicato dos Metalúrgicos de Araquari e fortalece diálogo entre entidades",
    subtitle: "Fortalecendo a unidade do movimento sindical. Clique para ver mais.",
  },
  {
    ...trabalhadorDefendeCard,
    postId: "trabalhador-defende",
    label: "Rodolfo de Ramos participa de mobilização em defesa dos trabalhadores",
    subtitle: "Mobilização em defesa dos direitos da classe trabalhadora. Clique para ver mais.",
  },
  {
    ...reuniBarraSulCard,
    postId: "reuni-barra-sul",
    label: "Rodolfo fortalece organização do PT em Barra do Sul",
    subtitle: "Reunião com a direção do PT no litoral catarinense. Clique para ver mais.",
  },
];

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

  /* Embla carousel for the featured cards */
  const [featuredRef, featuredApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });
  const featuredPrev = useCallback(() => featuredApi?.scrollPrev(), [featuredApi]);
  const featuredNext = useCallback(() => featuredApi?.scrollNext(), [featuredApi]);

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

  return (
    <section
      id="luta"
      className="relative isolate flex h-dvh snap-start snap-always flex-col overflow-hidden bg-white pt-28 pb-8 sm:pt-32 sm:pb-10 md:pt-36 md:pb-12"
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
        <div className="mb-6 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--sc-green)]">
            Caminhando por Santa Catarina
          </p>
          <h2 className="mt-1 font-display text-3xl leading-tight text-[var(--pt-red)] sm:text-4xl md:text-5xl">
            Juntos na Luta
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground/70 md:text-base">
            Um registro vivo das agendas, encontros e alianças que aproximam a
            campanha das pessoas que constroem Santa Catarina todos os dias.
          </p>
        </div>

        {/* ── Featured Cards Carousel ── */}
        <div className="relative flex-1 flex flex-col min-h-0">
          <div ref={featuredRef} className="overflow-hidden rounded-[1.5rem] border-4 border-[var(--sc-green)] shadow-2xl shadow-black/10 flex-1 min-h-0">
            <div className="flex">
              {featuredCards.map((fc) => (
                <button
                  key={fc.postId}
                  type="button"
                  onClick={() => setModalContent({ type: "post", postId: fc.postId })}
                  className="group relative min-w-0 shrink-0 grow-0 basis-full bg-foreground text-left focus:outline-none"
                  aria-label={`Abrir detalhes: ${fc.label}`}
                >
                  <div className="relative">
                    <img
                      src={fc.image}
                      alt={fc.label}
                      className="w-full object-contain bg-foreground transition duration-700 group-hover:scale-[1.02]"
                      style={{ maxHeight: "calc(100dvh - 22rem)" }}
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
                      <span className="inline-flex items-center gap-2 rounded-full bg-[var(--sc-yellow)] px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-[var(--pt-red-dark)]">
                        <Newspaper className="h-4 w-4" />
                        Abrir post
                      </span>
                      <h3 className="mt-4 font-display text-3xl leading-tight lg:text-4xl">
                        {fc.label}
                      </h3>
                      <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/82 md:text-base">
                        {fc.subtitle}
                      </p>
                    </div>

                    {/* Hover icon */}
                    <div className="absolute right-5 top-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/16 text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
                      <Newspaper className="h-6 w-6" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Side nav arrows */}
          <button
            type="button"
            onClick={featuredPrev}
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-[var(--sc-green)] bg-white/80 text-[var(--sc-green)] shadow-lg backdrop-blur transition hover:bg-[var(--sc-green)] hover:text-white focus:outline-none focus:ring-2 focus:ring-[var(--sc-green)] focus:ring-offset-2 sm:left-3"
            aria-label="Post anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={featuredNext}
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-[var(--sc-green)] bg-white/80 text-[var(--sc-green)] shadow-lg backdrop-blur transition hover:bg-[var(--sc-green)] hover:text-white focus:outline-none focus:ring-2 focus:ring-[var(--sc-green)] focus:ring-offset-2 sm:right-3"
            aria-label="Próximo post"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* ── Modal (portaled to body to escape isolate stacking context) ── */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {modalContent && (
              <ModalShell onClose={() => setModalContent(null)}>
                {modalContent.type === "post" && modalContent.postId === "campo-cidade" ? (
                  <PostModal onClose={() => setModalContent(null)} />
                ) : modalContent.type === "post" && modalContent.postId === "assembleia" ? (
                  <AssembleiaPostModal onClose={() => setModalContent(null)} />
                ) : modalContent.type === "post" && modalContent.postId === "metalurgicos" ? (
                  <MetalurgicosPostModal onClose={() => setModalContent(null)} />
                ) : modalContent.type === "post" && modalContent.postId === "pre-candidato" ? (
                  <PreCandidatoPostModal onClose={() => setModalContent(null)} />
                ) : modalContent.type === "post" && modalContent.postId === "francisco" ? (
                  <FranciscoPostModal onClose={() => setModalContent(null)} />
                ) : modalContent.type === "post" && modalContent.postId === "indios" ? (
                  <IndiosPostModal onClose={() => setModalContent(null)} />
                ) : modalContent.type === "post" && modalContent.postId === "sindicato-araquari" ? (
                  <SindicatoAraquariPostModal onClose={() => setModalContent(null)} />
                ) : modalContent.type === "post" && modalContent.postId === "trabalhador-defende" ? (
                  <TrabalhadorDefendePostModal onClose={() => setModalContent(null)} />
                ) : modalContent.type === "post" && modalContent.postId === "reuni-barra-sul" ? (
                  <ReuniBarraSulPostModal onClose={() => setModalContent(null)} />
                ) : modalContent.type === "image" ? (
                  <ImageModal
                    modal={modalContent}
                    onClose={() => setModalContent(null)}
                  />
                ) : null}
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
      className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-clip rounded-[1.5rem] bg-white text-foreground shadow-2xl"
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
      <div className="flex-1 overflow-y-auto p-5 pb-10 md:p-7 md:pb-12">
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

/* ── Assembleia Post Modal ───────────────────────────────────────── */

function AssembleiaPostModal({ onClose }: { onClose: () => void }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.96, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 18 }}
      transition={{ type: "spring" as const, damping: 25, stiffness: 260 }}
      className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-clip rounded-[1.5rem] bg-white text-foreground shadow-2xl"
    >
      {/* Sticky header */}
      <div className="sticky top-0 z-20 flex items-start justify-between gap-4 border-b border-foreground/10 bg-white/95 px-5 py-4 backdrop-blur md:px-7">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--sc-green)]">
            Joinville, SC
          </p>
          <h3 className="mt-1 font-display text-2xl leading-tight text-[var(--pt-red)] md:text-3xl">
            Assembleia dos Correios
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
      <div className="flex-1 overflow-y-auto p-5 pb-10 md:p-7 md:pb-12">
        {/* Image carousel */}
        <div className="relative overflow-hidden rounded-2xl bg-black">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex">
              {assembleiaImages.map((image, index) => (
                <div
                  key={image}
                  className="flex min-w-0 shrink-0 grow-0 basis-full items-center justify-center h-[60vh]"
                >
                  <img
                    src={image}
                    alt={`Assembleia dos Correios - Foto ${index + 1}`}
                    className="w-full max-h-[60vh] object-contain"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white transition hover:bg-black/75 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Imagem anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white transition hover:bg-black/75 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Proxima imagem"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Post body */}
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-foreground/78 md:text-base">
          <p>
            📢 Assembleia dos trabalhadores dos Correios de Joinville e região!
          </p>
          <p>
            Nosso pré-candidato a deputado estadual, Rodolfo de Ramos, esteve
            presente apoiando a luta dessa categoria tão importante para o povo
            brasileiro.
          </p>
          <p>
            Mais do que apoiar, aproveitou o momento para se apresentar, dialogar
            com os trabalhadores e reafirmar seu compromisso com a defesa dos
            direitos, da valorização profissional e de melhores condições de
            trabalho.
          </p>
          <p>
            ✊🏽 Seguimos juntos na construção de um projeto coletivo, que nasce
            da base e fortalece quem realmente move o Brasil: a classe
            trabalhadora!
          </p>
          <p className="font-semibold text-[var(--pt-red)]">
            #Correios #ClasseTrabalhadora #Joinville #Luta #Direitos
            #RodolfoDeRamos #DeputadoEstadual #TrabalhadoresUnidos
          </p>
        </div>
      </div>
    </motion.article>
  );
}

/* ── Metalúrgicos Post Modal ────────────────────────────────────── */

function MetalurgicosPostModal({ onClose }: { onClose: () => void }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.96, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 18 }}
      transition={{ type: "spring" as const, damping: 25, stiffness: 260 }}
      className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-clip rounded-[1.5rem] bg-white text-foreground shadow-2xl"
    >
      {/* Sticky header */}
      <div className="sticky top-0 z-20 flex items-start justify-between gap-4 border-b border-foreground/10 bg-white/95 px-5 py-4 backdrop-blur md:px-7">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--sc-green)]">
            Joinville, SC
          </p>
          <h3 className="mt-1 font-display text-2xl leading-tight text-[var(--pt-red)] md:text-3xl">
            Diálogo com trabalhadores do setor metalúrgicos
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
      <div className="flex-1 overflow-y-auto p-5 pb-10 md:p-7 md:pb-12">
        {/* Image carousel */}
        <div className="relative overflow-hidden rounded-2xl bg-black">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex">
              {metalurgicosImages.map((image, index) => (
                <div
                  key={image}
                  className="flex min-w-0 shrink-0 grow-0 basis-full items-center justify-center h-[60vh]"
                >
                  <img
                    src={image}
                    alt={`Metalúrgicos - Foto ${index + 1}`}
                    className="w-full max-h-[60vh] object-contain"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white transition hover:bg-black/75 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Imagem anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white transition hover:bg-black/75 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Proxima imagem"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Post body */}
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-foreground/78 md:text-base">
          <p>
            📢 Diálogo com trabalhadores do setor metalúrgicos!
          </p>
          <p>
            Nosso pré-candidato a deputado estadual, Rodolfo de Ramos,
            esteve em contato direto com a base metalúrgica de Joinville e
            região, ouvindo demandas, compartilhando propostas e
            fortalecendo os laços com quem constrói o dia a dia da
            indústria catarinense.
          </p>
          <p>
            O diálogo com os trabalhadores é a base da nossa luta.
            Seguimos firmes na defesa dos direitos, da valorização
            profissional e de melhores condições de trabalho para toda a
            categoria.
          </p>
          <p>
            ✊🏽 Juntos somos mais fortes!
          </p>
          <p className="font-semibold text-[var(--pt-red)]">
            #Metalúrgicos #Joinville #ClasseTrabalhadora #RodolfoDeRamos
            #DeputadoEstadual #TrabalhadoresUnidos
          </p>
        </div>
      </div>
    </motion.article>
  );
}

/* ── Pré-Candidato Post Modal ─────────────────────────────────── */

function PreCandidatoPostModal({ onClose }: { onClose: () => void }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.96, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 18 }}
      transition={{ type: "spring" as const, damping: 25, stiffness: 260 }}
      className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-clip rounded-[1.5rem] bg-white text-foreground shadow-2xl"
    >
      {/* Sticky header */}
      <div className="sticky top-0 z-20 flex items-start justify-between gap-4 border-b border-foreground/10 bg-white/95 px-5 py-4 backdrop-blur md:px-7">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--sc-green)]">
            Santa Catarina
          </p>
          <h3 className="mt-1 font-display text-xl leading-tight text-[var(--pt-red)] sm:text-2xl md:text-3xl">
            Rodolfo de Ramos é confirmado como pré-candidato a deputado estadual
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
      <div className="flex-1 overflow-y-auto p-5 pb-10 md:p-7 md:pb-12">
        {/* Image carousel */}
        <div className="relative overflow-hidden rounded-2xl bg-black">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex">
              {preCandidatoImages.map((image, index) => (
                <div
                  key={index}
                  className="flex min-w-0 shrink-0 grow-0 basis-full items-center justify-center h-[60vh]"
                >
                  <img
                    src={image}
                    alt={`Pré-candidatura confirmada - Foto ${index + 1}`}
                    className="w-full max-h-[60vh] object-contain"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white transition hover:bg-black/75 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Imagem anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white transition hover:bg-black/75 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Proxima imagem"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Post body */}
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-foreground/78 md:text-base">
          <p className="font-semibold text-foreground">
            Rodolfo de Ramos é confirmado como pré-candidato a deputado estadual
            pelo Partido dos Trabalhadores em Santa Catarina.
          </p>
          <p>
            No último dia 23 de maio aconteceu a promulgação das
            pré-candidaturas do chamado “time de Lula” em Santa Catarina. Na
            oportunidade, foram apresentados Gelson Merisio pelo Partido
            Socialista Brasileiro como pré-candidato a governador, Angela Albino
            pelo Partido Democrático Trabalhista como pré-candidata a
            vice-governadora, além de Décio Lima do PT e Afrânio Boppré do
            Partido Socialismo e Liberdade como pré-candidatos ao Senado.
          </p>
          <p className="text-xs text-foreground/50">
            Jornal A Gazeta · 2
          </p>
          <p>
            Ao todo, mais de 250 pré-candidaturas a deputado federal e deputado
            estadual foram apresentadas pelos partidos PT, PSOL, PDT, PCdoB,
            REDE e PV, que devem compor a frente política de apoio ao presidente
            Luiz Inácio Lula da Silva em Santa Catarina nas eleições de 2026.
          </p>
          <p className="font-semibold text-[var(--pt-red)]">
            #RodolfoDeRamos #DeputadoEstadual #PT #SantaCatarina
            #TimeDeLula #Eleições2026
          </p>
        </div>
      </div>
    </motion.article>
  );
}

/* ── Francisco Post Modal ─────────────────────────────────────── */

function FranciscoPostModal({ onClose }: { onClose: () => void }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.96, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 18 }}
      transition={{ type: "spring" as const, damping: 25, stiffness: 260 }}
      className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-clip rounded-[1.5rem] bg-white text-foreground shadow-2xl"
    >
      {/* Sticky header */}
      <div className="sticky top-0 z-20 flex items-start justify-between gap-4 border-b border-foreground/10 bg-white/95 px-5 py-4 backdrop-blur md:px-7">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--sc-green)]">
            Santa Catarina
          </p>
          <h3 className="mt-1 font-display text-xl leading-tight text-[var(--pt-red)] sm:text-2xl md:text-3xl">
            Lançamento da pré candidatura a deputado federal Francisco de Assis PT
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
      <div className="flex-1 overflow-y-auto p-5 pb-10 md:p-7 md:pb-12">
        {/* Image carousel */}
        <div className="relative overflow-hidden rounded-2xl bg-black">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex">
              {franciscoImages.map((image, index) => (
                <div
                  key={index}
                  className="flex min-w-0 shrink-0 grow-0 basis-full items-center justify-center h-[60vh]"
                >
                  <img
                    src={image}
                    alt={`Pré-candidatura Francisco de Assis - Foto ${index + 1}`}
                    className="w-full max-h-[60vh] object-contain"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white transition hover:bg-black/75 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Imagem anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white transition hover:bg-black/75 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Proxima imagem"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Post body */}
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-foreground/78 md:text-base">
          <p className="font-semibold text-foreground">
            Lançamento da pré candidatura a deputado federal Francisco de Assis PT
          </p>
          <p>
            Rodolfo de Ramos esteve presente no lançamento da
            pré-candidatura a deputado federal do companheiro Francisco de
            Assis pelo Partido dos Trabalhadores, reforçando a unidade e o
            compromisso com a construção de um projeto coletivo para Santa
            Catarina.
          </p>
          <p>
            Juntos, seguimos fortalecendo a frente progressista e
            trabalhando pela representação popular em todas as esferas.
          </p>
          <p>
            ✊🏽 A luta continua!
          </p>
          <p className="font-semibold text-[var(--pt-red)]">
            #FranciscoDeAssis #DeputadoFederal #PT #SantaCatarina
            #RodolfoDeRamos #Eleições2026
          </p>
        </div>
      </div>
    </motion.article>
  );
}

/* ── Índios Post Modal ────────────────────────────────────────── */

function IndiosPostModal({ onClose }: { onClose: () => void }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });

  /* Combined media: images + video at the end */
  const mediaItems: { type: "image" | "video"; src: string }[] = [
    ...indiosImages.map((src) => ({ type: "image" as const, src })),
    { type: "video", src: indiosVideo },
  ];

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.96, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 18 }}
      transition={{ type: "spring" as const, damping: 25, stiffness: 260 }}
      className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-clip rounded-[1.5rem] bg-white text-foreground shadow-2xl"
    >
      {/* Sticky header */}
      <div className="sticky top-0 z-20 flex items-start justify-between gap-4 border-b border-foreground/10 bg-white/95 px-5 py-4 backdrop-blur md:px-7">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--sc-green)]">
            Joinville, SC
          </p>
          <h3 className="mt-1 font-display text-xl leading-tight text-[var(--pt-red)] sm:text-2xl md:text-3xl">
            Esse é com os índios
          </h3>
          <p className="mt-0.5 text-xs text-foreground/50">
            Espaço cultural Jacatirão em Joinville
          </p>
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
      <div className="flex-1 overflow-y-auto p-5 pb-10 md:p-7 md:pb-12">
        {/* Media carousel (images + video) */}
        <div className="relative overflow-hidden rounded-2xl bg-black">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex">
              {mediaItems.map((item, index) => (
                <div
                  key={index}
                  className="flex min-w-0 shrink-0 grow-0 basis-full items-center justify-center h-[60vh]"
                >
                  {item.type === "image" ? (
                    <img
                      src={item.src}
                      alt={`Esse é com os índios - Foto ${index + 1}`}
                      className="w-full max-h-[60vh] object-contain"
                      draggable={false}
                    />
                  ) : (
                    <video
                      src={item.src}
                      controls
                      playsInline
                      preload="metadata"
                      className="w-full max-h-[60vh] object-contain"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white transition hover:bg-black/75 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Imagem anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white transition hover:bg-black/75 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Proxima imagem"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Post body */}
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-foreground/78 md:text-base">
          <p className="font-semibold text-foreground">
            Esse é com os índios — Espaço cultural Jacatirão em Joinville
          </p>
          <p>
            Rodolfo de Ramos marcou presença no Espaço Cultural Jacatirão,
            celebrando a cultura e a resistência dos povos originários.
            Um momento de troca, aprendizado e reafirmação do compromisso
            com a defesa dos direitos indígenas e da preservação cultural.
          </p>
          <p>
            A luta pelos povos originários é parte fundamental da
            construção de um Brasil mais justo e igualitário.
          </p>
          <p>
            ✊🏽 Juntos na defesa da diversidade e dos direitos de todos os povos!
          </p>
          <p className="font-semibold text-[var(--pt-red)]">
            #PovosOriginários #CulturaIndígena #Joinville #Jacatirão
            #RodolfoDeRamos #DeputadoEstadual
          </p>
        </div>
      </div>
    </motion.article>
  );
}

/* ── Sindicato Araquari Post Modal ──────────────────────────── */

function SindicatoAraquariPostModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.96, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 18 }}
      transition={{ type: "spring" as const, damping: 25, stiffness: 260 }}
      className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-clip rounded-[1.5rem] bg-white text-foreground shadow-2xl"
    >
      {/* Sticky header */}
      <div className="sticky top-0 z-20 flex items-start justify-between gap-4 border-b border-foreground/10 bg-white/95 px-5 py-4 backdrop-blur md:px-7">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--sc-green)]">
            Araquari, SC
          </p>
          <h3 className="mt-1 font-display text-xl leading-tight text-[var(--pt-red)] sm:text-2xl md:text-3xl">
            Rodolfo visita direção do Sindicato dos Metalúrgicos de Araquari e fortalece diálogo entre entidades
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
      <div className="flex-1 overflow-y-auto p-5 pb-10 md:p-7 md:pb-12">
        {/* Single image */}
        <div className="overflow-hidden rounded-2xl bg-black">
          <img
            src={sindicatoAraquariImg}
            alt="Rodolfo visita Sindicato dos Metalúrgicos de Araquari"
            className="w-full max-h-[60vh] object-contain"
            draggable={false}
          />
        </div>

        {/* Post body */}
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-foreground/78 md:text-base">
          <p className="font-semibold text-foreground">
            Rodolfo visita direção do Sindicato dos Metalúrgicos de Araquari e fortalece diálogo entre entidades
          </p>
          <p>
            O dirigente sindical Rodolfo realizou uma visita à direção do
            Sindicato dos Metalúrgicos de Araquari para dialogar sobre os
            desafios enfrentados pela categoria e fortalecer a unidade do
            movimento sindical.
          </p>
          <p>
            Durante o encontro, foram debatidos temas de interesse dos
            trabalhadores, como a valorização dos salários, a defesa dos
            direitos trabalhistas, a redução da jornada de trabalho sem
            redução salarial, o combate à escala 6x1 e a importância da
            organização sindical para enfrentar os desafios atuais do mundo
            do trabalho.
          </p>
          <p>
            A visita também serviu para estreitar os laços entre as
            entidades sindicais, promover a troca de experiências e
            reforçar o compromisso conjunto na defesa dos direitos dos
            metalúrgicos e da classe trabalhadora.
          </p>
          <p className="font-semibold text-[var(--pt-red)]">
            #Metalúrgicos #Araquari #MovimentoSindical #RodolfoDeRamos
            #DireitosTrabalhistas #ClasseTrabalhadora
          </p>
        </div>
      </div>
    </motion.article>
  );
}

/* ── Trabalhador Defende Post Modal ──────────────────────── */

function TrabalhadorDefendePostModal({ onClose }: { onClose: () => void }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });

  const mediaItems: { type: "image" | "video"; src: string }[] = [
    ...trabalhadorDefendeImages.map((src) => ({ type: "image" as const, src })),
    { type: "video", src: trabalhadorDefendeVideo },
  ];

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.96, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 18 }}
      transition={{ type: "spring" as const, damping: 25, stiffness: 260 }}
      className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-clip rounded-[1.5rem] bg-white text-foreground shadow-2xl"
    >
      {/* Sticky header */}
      <div className="sticky top-0 z-20 flex shrink-0 items-start justify-between gap-4 border-b border-foreground/10 bg-white/95 px-5 py-4 backdrop-blur md:px-7">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--sc-green)]">
            Santa Catarina
          </p>
          <h3 className="mt-1 font-display text-xl leading-tight text-[var(--pt-red)] sm:text-2xl md:text-3xl">
            Rodolfo de Ramos participa de mobilização em defesa dos trabalhadores
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
      <div className="flex-1 overflow-y-auto p-5 pb-10 md:p-7 md:pb-12">
        {/* Media carousel (images + video) */}
        <div className="relative overflow-hidden rounded-2xl bg-black">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex">
              {mediaItems.map((item, index) => (
                <div
                  key={index}
                  className="flex min-w-0 shrink-0 grow-0 basis-full items-center justify-center h-[60vh]"
                >
                  {item.type === "image" ? (
                    <img
                      src={item.src}
                      alt={`Mobilização em defesa dos trabalhadores - Foto ${index + 1}`}
                      className="w-full max-h-[60vh] object-contain"
                      draggable={false}
                    />
                  ) : (
                    <video
                      src={item.src}
                      controls
                      playsInline
                      preload="metadata"
                      className="w-full max-h-[60vh] object-contain"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white transition hover:bg-black/75 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Imagem anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white transition hover:bg-black/75 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Proxima imagem"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Post body */}
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-foreground/78 md:text-base">
          <p className="font-semibold text-foreground">
            Rodolfo de Ramos participa de mobilização em defesa dos trabalhadores
          </p>
          <p>
            Rodolfo de Ramos esteve presente em um ato de mobilização
            realizado por trabalhadores e entidades sindicais em Santa
            Catarina, reforçando seu compromisso com a defesa dos direitos
            da classe trabalhadora.
          </p>
          <p>
            A atividade reuniu representantes de diversas categorias, que
            manifestaram preocupação com propostas que possam resultar na
            redução de direitos e benefícios conquistados ao longo dos
            anos. Durante o encontro, os participantes destacaram a
            importância da união dos trabalhadores e da atuação dos
            sindicatos na defesa de melhores condições de trabalho.
          </p>
          <p>
            Rodolfo ressaltou que a participação dos trabalhadores nos
            espaços de debate e mobilização é fundamental para fortalecer
            as negociações e garantir avanços para as categorias
            representadas.
          </p>
          <p className="italic text-foreground/90">
            “A organização e a união dos trabalhadores são ferramentas
            essenciais para a defesa dos direitos e para a construção de
            condições de trabalho cada vez mais dignas”, destacou.
          </p>
          <p>
            A mobilização reforçou a importância do diálogo entre
            trabalhadores, sindicatos e empregadores, além de evidenciar o
            papel das entidades sindicais na representação dos interesses
            da classe trabalhadora.
          </p>
          <p>
            Com sua presença no ato, Rodolfo de Ramos reafirmou seu apoio
            às pautas dos trabalhadores e seu compromisso com a
            valorização do movimento sindical e da luta por direitos.
          </p>
          <p className="font-semibold text-[var(--pt-red)]">
            #Mobilização #Trabalhadores #MovimentoSindical #RodolfoDeRamos
            #DireitosTrabalhistas #ClasseTrabalhadora #SantaCatarina
          </p>
        </div>
      </div>
    </motion.article>
  );
}

/* ── Reuni Barra do Sul Post Modal ───────────────────────── */

function ReuniBarraSulPostModal({ onClose }: { onClose: () => void }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });

  const mediaItems: { type: "image" | "video"; src: string }[] = [
    ...reuniImages.map((src) => ({ type: "image" as const, src })),
    { type: "video", src: reuniVideo1 },
    { type: "video", src: reuniVideo2 },
    { type: "video", src: reuniVideo3 },
  ];

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.96, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 18 }}
      transition={{ type: "spring" as const, damping: 25, stiffness: 260 }}
      className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-clip rounded-[1.5rem] bg-white text-foreground shadow-2xl"
    >
      {/* Sticky header */}
      <div className="sticky top-0 z-20 flex shrink-0 items-start justify-between gap-4 border-b border-foreground/10 bg-white/95 px-5 py-4 backdrop-blur md:px-7">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--sc-green)]">
            Barra do Sul, SC
          </p>
          <h3 className="mt-1 font-display text-xl leading-tight text-[var(--pt-red)] sm:text-2xl md:text-3xl">
            Rodolfo fortalece organização do PT em Barra do Sul
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
      <div className="flex-1 overflow-y-auto p-5 pb-10 md:p-7 md:pb-12">
        {/* Media carousel (images + videos) */}
        <div className="relative overflow-hidden rounded-2xl bg-black">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex">
              {mediaItems.map((item, index) => (
                <div
                  key={index}
                  className="flex min-w-0 shrink-0 grow-0 basis-full items-center justify-center h-[60vh]"
                >
                  {item.type === "image" ? (
                    <img
                      src={item.src}
                      alt={`Reunião PT Barra do Sul - Foto ${index + 1}`}
                      className="w-full max-h-[60vh] object-contain"
                      draggable={false}
                    />
                  ) : (
                    <video
                      src={item.src}
                      controls
                      playsInline
                      preload="metadata"
                      className="w-full max-h-[60vh] object-contain"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white transition hover:bg-black/75 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Imagem anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white transition hover:bg-black/75 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Proxima imagem"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Post body */}
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-foreground/78 md:text-base">
          <p className="font-semibold text-foreground">
            Rodolfo fortalece organização do PT em Barra do Sul
          </p>
          <p>
            Hoje o pré-candidato a deputado estadual Rodolfo de Ramos
            esteve reunido com o vice-presidente Jordan e a
            secretária-geral Roberta do PT de Barra do Sul, fortalecendo a
            organização do partido e ampliando o time do presidente Lula no
            litoral catarinense.
          </p>
          <p>
            Seguimos construindo um projeto coletivo, com diálogo,
            participação popular e compromisso com a classe trabalhadora,
            para garantir mais desenvolvimento, direitos e oportunidades
            para o povo de Santa Catarina. ✊🚩
          </p>
          <p className="font-semibold text-[var(--pt-red)]">
            #RodolfoDeRamos #PT #Lula #SantaCatarina #BarraDoSul
            #ClasseTrabalhadora #LitoralCatarinense #DeputadoEstadual
            #UnidadePopular #TimeDoLula
          </p>
        </div>
      </div>
    </motion.article>
  );
}
