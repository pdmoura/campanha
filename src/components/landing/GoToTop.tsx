import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function GoToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-20 md:bottom-24 right-4 z-50 p-3 rounded-full bg-[var(--pt-red)] text-white shadow-xl hover:bg-[var(--pt-red-dark)] hover:-translate-y-1 transition-all cursor-pointer"
      aria-label="Voltar ao topo"
    >
      <ArrowUp className="h-6 w-6" />
    </button>
  );
}
