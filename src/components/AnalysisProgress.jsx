import { useState, useEffect } from "react";

export default function AnalysisProgress({ job }) {
  const targetStatus = job?.status || "pending";
  const targetProgress = typeof job?.progress === "object" 
    ? job?.progress?.percentage 
    : (job?.progress || 0);

  const [visualProgress, setVisualProgress] = useState(0);

  // Catch up logic
  useEffect(() => {
    if (visualProgress < targetProgress) {
      const timer = setTimeout(() => {
        setVisualProgress(prev => Math.min(prev + 25, targetProgress));
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [visualProgress, targetProgress]);

  // UI State based on what the user is currently seeing (visualProgress)
  const isCompletedVisually = visualProgress === 100 && targetStatus === "completed";
  const displayStatus = isCompletedVisually ? "completed" : (visualProgress > 0 ? "processing" : "pending");

  const steps = [
    {
      label: "Documento recibido",
      completed: visualProgress >= 25 || displayStatus === "completed",
      active: visualProgress < 25 && displayStatus !== "completed",
    },
    {
      label: "Texto extraído del PDF",
      completed: visualProgress >= 50 || displayStatus === "completed",
      active: visualProgress >= 25 && visualProgress < 50 && displayStatus !== "completed",
    },
    {
      label: "Generando análisis con IA",
      completed: visualProgress >= 75 || displayStatus === "completed",
      active: visualProgress >= 50 && visualProgress < 75 && displayStatus !== "completed",
    },
    {
      label: "Guardando resultados",
      completed: displayStatus === "completed",
      active: visualProgress >= 75 && visualProgress < 100 && displayStatus !== "completed",
    },
  ];

  return (
    <div className="p-2 relative overflow-hidden">
      <div className="relative z-10 space-y-8">
        <div className="text-center space-y-2">
          <p className="font-display text-3xl bg-linear-to-r from-purple-300 to-purple-400 bg-clip-text text-transparent">
            {displayStatus === "completed" ? "¡Análisis listo!" : "Analizando..."}
          </p>
          <p className="text-zinc-400 text-sm">
            {displayStatus === "completed"
              ? "Hemos terminado de procesar tu CV"
              : "La IA está procesando tu perfil profesional"}
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-3">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                step.completed ? "bg-emerald-500/10" : step.active ? "bg-purple-400/10" : ""
              }`}
            >
              {step.completed ? (
                <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">
                  <svg
                    className="w-3.5 h-3.5 text-zinc-900"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>
              ) : step.active ? (
                <div className="w-6 h-6 rounded-full border-2 border-purple-400 shrink-0 animate-pulse flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-ping"></div>
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full border-2 border-zinc-700 shrink-0"></div>
              )}
              <span
                className={`text-sm font-medium ${
                  step.active ? "text-purple-300" : step.completed ? "text-emerald-400" : "text-zinc-500"
                }`}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="space-y-3 pt-4 border-t border-zinc-800">
          <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider">
            <span className="text-zinc-500">Progreso</span>
            <span className="text-purple-400">{visualProgress}%</span>
          </div>
          <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-purple-500 via-purple-400 to-purple-300 rounded-full transition-all duration-500"
              style={{ width: `${visualProgress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
