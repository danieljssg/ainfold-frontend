"use client";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="min-h-screen  flex flex-col w-full mx-auto gap-4">
        <div className="max-w-5xl mx-auto px-6 py-24 space-y-16">
          {/* Hero Section */}
          <section className="space-y-10">
            <div className="space-y-6">
              <h1 className="font-display text-6xl md:text-7xl lg:text-8xl text-zinc-100 text-balance leading-tight">
                Análisis inteligente de perfiles
              </h1>
              <p className="text-lg md:text-xl text-zinc-400 text-balance max-w-3xl leading-relaxed">
                Descubre habilidades ocultas, patrones únicos y potencial real.
                Nuestra IA analiza cada dimensión de tu perfil profesional.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="inline-flex items-center px-8 py-3 rounded-xl font-medium bg-primary hover:bg-purple-300 hover:text-zinc-900 transition-all cursor-pointer  duration-200 ease-in-out">
                Nuevo análisis →
              </div>
              <div className="inline-flex items-center px-8 py-3 rounded-xl font-medium border border-zinc-700 text-zinc-300 hover:text-zinc-100 hover:border-zinc-600 transition-colors">
                Ver ejemplo
              </div>
            </div>
          </section>

          {/* Showcase Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Upload Card */}
            <div className="group bg-zinc-900 border border-zinc-800 rounded-2xl p-8 hover:border-purple-400/50 transition-colors cursor-pointer h-full">
              <div className="mb-4">
                <svg
                  className="w-8 h-8 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.338-2.32 5.75 5.75 0 0 1 1.222 11.095"
                  />
                </svg>
              </div>
              <h3 className="font-display text-2xl text-zinc-100 mb-2">
                Subir CV
              </h3>
              <p className="text-zinc-400 text-sm">
                Carga tu perfil y déjanos analizar tu potencial con IA avanzada
              </p>
            </div>

            {/* Analysis Card */}
            <div className="group bg-zinc-900 border border-zinc-800 rounded-2xl p-8 hover:border-purple-400/50 transition-colors cursor-pointer h-full">
              <div className="mb-4">
                <svg
                  className="w-8 h-8 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 19v-6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2zm0 0V9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v10m-6 0a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2m0 0V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2z"
                  />
                </svg>
              </div>
              <h3 className="font-display text-2xl text-zinc-100 mb-2">
                Ver Análisis
              </h3>
              <p className="text-zinc-400 text-sm">
                Explora un análisis completo con radar de competencias y
                veredicto del director
              </p>
            </div>

            {/* Progress Card */}
            <div className="group bg-zinc-900 border border-zinc-800 rounded-2xl p-8 hover:border-purple-400/50 transition-colors cursor-pointer h-full">
              <div className="mb-4">
                <svg
                  className="w-8 h-8 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
                  />
                </svg>
              </div>
              <h3 className="font-display text-2xl text-zinc-100 mb-2">
                Progreso
              </h3>
              <p className="text-zinc-400 text-sm">
                Visualiza el progreso en tiempo real de tu análisis
              </p>
            </div>
          </section>

          {/* Features */}
          <section className="space-y-8 py-12">
            <h2 className="font-display text-4xl text-zinc-100">
              Características
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Radar inteligente",
                  desc: "Análisis multidimensional de competencias",
                },
                {
                  title: "Veredicto IA",
                  desc: "Insights únicos generados por inteligencia artificial",
                },
                {
                  title: "Matriz de habilidades",
                  desc: "Desgloses técnicas y blandas detalladas",
                },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl p-6"
                >
                  <h4 className="font-display text-lg text-zinc-100 mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-zinc-400 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
