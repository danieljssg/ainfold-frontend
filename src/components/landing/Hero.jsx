import Link from "next/link";
import { Rocket, PlayCircle } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-125 bg-purple-500/10 blur-[120px] rounded-full -z-10" />

      <div className="container mx-auto px-6 text-center space-y-10">
        <div className="space-y-6 max-w-4xl mx-auto">
          <h1 className="animate-fade-in-down duration-700 font-display text-5xl md:text-7xl lg:text-8xl text-zinc-100 leading-[1.1] tracking-tight">
            Arte, Código y <span className="text-purple-400">Latencia</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Transformando datos fríos en narrativa sonora. Analiza perfiles
            profesionales con IA y descubre el valor de las habilidades
            transferibles.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/analysis/create"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-purple-400 text-purple-950 font-bold hover:bg-purple-300 transition-all active:scale-[0.98] shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2"
          >
            <Rocket className="w-5 h-5" />
            Iniciar Análisis
          </Link>
          <a
            href="#sample"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl border border-zinc-800 text-zinc-300 font-medium hover:bg-zinc-900 transition-all flex items-center justify-center gap-2"
          >
            <PlayCircle className="w-5 h-5" />
            Ver Ejemplo
          </a>
        </div>

        {/* Floating Badges */}
        <div
          className="flex flex-wrap justify-center gap-3 pt-12 animate-fade-in"
          style={{ animationDelay: "300ms" }}
        >
          {["Next.js", "Tailwind v4", "Kokoro-TTS", "CubePath"].map((tag) => (
            <span
              key={tag}
              className="px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 text-zinc-500 text-xs font-bold tracking-widest uppercase"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
