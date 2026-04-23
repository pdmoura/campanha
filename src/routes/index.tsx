import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Sobre } from "@/components/landing/Sobre";
import { JuntosNaLuta } from "@/components/landing/JuntosNaLuta";
import { Beneficios } from "@/components/landing/Beneficios";
import { Stepper } from "@/components/landing/Stepper";
import { Materiais } from "@/components/landing/Materiais";
import { Footer } from "@/components/landing/Footer";
import { GoToTop } from "@/components/landing/GoToTop";
import { CookieBanner } from "@/components/landing/CookieBanner";
import ogImage from "@/assets/capa1.webp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rodolfo · A Força do Povo Catarinense — Pré-candidato Dep. Estadual PT/SC" },
      {
        name: "description",
        content:
          "Junte-se à pré-campanha de Rodolfo a Deputado Estadual pelo PT em Santa Catarina. Faça parte da rede de apoiadores e baixe materiais oficiais.",
      },
      { property: "og:title", content: "Rodolfo · A Força do Povo Catarinense" },
      {
        property: "og:description",
        content:
          "Pré-candidatura a Deputado Estadual PT/SC. Cadastre-se e ajude a construir um movimento de verdade em Santa Catarina.",
      },
      { property: "og:image", content: ogImage },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: ogImage },
    ],
  }),
  component: Index,
});

function Index() {
  const [formDone, setFormDone] = useState(false);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "var(--font-sans)" }}>
      <Header formDone={formDone} />
      <main>
        {!formDone && (
          <>
            <Hero />
            <Sobre />
            <JuntosNaLuta />
            <Beneficios />
          </>
        )}
        <Stepper onSuccess={() => setFormDone(true)} />
        {formDone && <Materiais />}
      </main>
      <Footer />
      <GoToTop />
      <CookieBanner />
    </div>
  );
}
