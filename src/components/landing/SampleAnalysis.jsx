import RadarChartWrap from "./RadarChartWrap";
import DemoAudioButton from "./DemoAudioButton";
import { BadgeCheck, Zap, Sparkles } from "lucide-react";

const SAMPLE_DATA = {
  adaptability: 85,
  technicalPrecision: 70,
  appliedCreativity: 95,
  resilience: 80,
  impactCommunication: 90,
};

export default function SampleAnalysis() {
  return (
    <section id="sample" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 space-y-16">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <p className="section-label">Potencial escalable</p>
          <h2 className="font-display text-4xl md:text-5xl text-zinc-100">
            Muestra del{" "}
            <span className="text-purple-400">Análisis Inteligente</span>
          </h2>
          <p className="text-zinc-400 text-lg">
            No es un reporte estático. Es una evaluación dinámica que une tus
            habilidades con tu propósito.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Analysis Mockup */}
          <div className="lg:col-span-7 bg-zinc-900/40 border border-zinc-800/50 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-xl shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
              <div className="h-87.5 md:h-full">
                <RadarChartWrap data={SAMPLE_DATA} />
              </div>
              <div className="space-y-8 flex flex-col justify-center">
                <div className="space-y-2">
                  <h3 className="text-2xl font-display text-zinc-100 italic">
                    &quot;Un perfil disruptivo&quot;
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Este candidato combina la precisión del código con la
                    creatividad de la repostería, logrando soluciones técnicas
                    con una estética superior.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    "88% Afinidad Funcional",
                    "Potencial de Liderazgo Alto",
                    "Comunicación de Impacto",
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 text-zinc-300 text-sm font-medium"
                    >
                      <BadgeCheck className="w-5 h-5 text-purple-400" />
                      {item}
                    </div>
                  ))}
                </div>

                <DemoAudioButton src="/audios/kokoro.mp3" />
              </div>
            </div>
          </div>

          {/* Value Points */}
          <div className="lg:col-span-5 space-y-10 pl-4">
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                <Zap className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-2xl font-display text-zinc-100">
                Inmediatez y Storytelling
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                Nuestra arquitectura basada en colas (BullMQ + Valkey) garantiza
                una respuesta inmediata mientras la IA y el motor de voz
                (Kokoro-TTS) trabajan en segundo plano para construir tu
                historia.
              </p>
            </div>

            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                <Sparkles className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-2xl font-display text-zinc-100">
                Insights accionables
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                No solo extraemos texto de un PDF. Entendemos el contexto de tus
                hobbies y cómo esa pasión te hace un mejor profesional en el día
                a día.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
