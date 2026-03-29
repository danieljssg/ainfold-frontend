import Hero from "@/components/landing/Hero";
import TheHook from "@/components/landing/TheHook";
import SampleAnalysis from "@/components/landing/SampleAnalysis";
import TechStack from "@/components/landing/TechStack";

export const metadata = {
  title: "AI'nFold — Arte, Código y Latencia",
  description:
    "Análisis inteligente de perfiles y habilidades transferibles mediante IA y storytelling sonoro.",
};

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden selection:bg-purple-500/30 selection:text-purple-200">
      <Hero />
      <TheHook />
      <SampleAnalysis />
      <TechStack />

      <section className="py-32 relative text-center">
        <div className="absolute inset-0 bg-purple-500/5 blur-[120px] rounded-full" />
        <div className="container mx-auto px-6 space-y-8 relative">
          <h2 className="font-display text-4xl md:text-6xl text-zinc-100 italic">
            ¿Listo para descubrir tu{" "}
            <span className="text-purple-400 font-serif">propósito</span>{" "}
            técnico?
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto">
            Únete a la nueva era del análisis de talento donde los detalles
            humanos marcan la diferencia.
          </p>
          <div className="pt-8">
            <a
              href="/analysis/create"
              className="inline-flex items-center px-10 py-5 rounded-4xl bg-zinc-100 text-black font-bold hover:bg-purple-400 hover:text-purple-950 transition-all active:scale-[0.98] shadow-2xl"
            >
              Iniciar análisis
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
