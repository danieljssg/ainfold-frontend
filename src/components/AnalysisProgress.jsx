export default function AnalysisProgress() {
  const steps = [
    { label: 'Documento recibido', completed: true },
    { label: 'Texto extraído del PDF', completed: true },
    { label: 'Generando análisis con IA', completed: false, active: true },
    { label: 'Guardando resultados', completed: false },
  ]

  return (
    <div className="bg-gradient-to-br from-zinc-900 to-zinc-900/50 border border-zinc-800 rounded-2xl p-10 max-w-md mx-auto relative overflow-hidden">
      {/* Animated accent */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-purple-400/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="relative z-10 space-y-8">
        <div className="text-center space-y-2">
          <p className="font-display text-3xl bg-gradient-to-r from-purple-300 to-purple-400 bg-clip-text text-transparent">
            Analizando...
          </p>
          <p className="text-zinc-400 text-sm">La IA está procesando tu perfil</p>
        </div>

        {/* Steps */}
        <div className="space-y-3">
          {steps.map((step, idx) => (
            <div key={idx} className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              step.completed ? 'bg-zinc-800/30' : step.active ? 'bg-purple-400/10' : ''
            }`}>
              {step.completed ? (
                <div className="w-6 h-6 rounded-full bg-purple-400 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3.5 h-3.5 text-zinc-900" fill="none" stroke="currentColor" strokeWidth="2.5"
                    viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>
              ) : step.active ? (
                <div className="w-6 h-6 rounded-full border-2 border-purple-400 flex-shrink-0 animate-pulse"></div>
              ) : (
                <div className="w-6 h-6 rounded-full border-2 border-zinc-700 flex-shrink-0"></div>
              )}
              <span className={`text-sm font-medium ${step.active ? 'text-purple-300' : step.completed ? 'text-zinc-300' : 'text-zinc-500'}`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="space-y-3 pt-4 border-t border-zinc-800">
          <div className="flex justify-between items-center">
            <span className="text-zinc-500 text-xs font-medium uppercase tracking-wider">Progreso</span>
            <span className="text-purple-400 text-sm font-bold">60%</span>
          </div>
          <div className="h-2.5 bg-zinc-800 rounded-full overflow-hidden">
            <div className="progress-fill h-full bg-gradient-to-r from-purple-400 to-purple-300 rounded-full" style={{ width: '60%' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
