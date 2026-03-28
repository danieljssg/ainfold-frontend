export default function CandidateHeader({ analysis }) {
  return (
    <div className="reveal reveal-1 bg-zinc-900 border border-zinc-800 rounded-2xl p-8 relative overflow-hidden">
      {/* linear accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-bl from-purple-400/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex items-start justify-between flex-wrap gap-6 relative z-10">
        <div className="flex-1">
          <p className="section-label mb-2">Candidato analizado</p>
          <h1 className="font-display text-5xl md:text-6xl text-zinc-100 leading-tight">
            {analysis.candidateData.fullName}
          </h1>
          <p className="text-zinc-400 text-lg mt-3">
            {analysis.candidateData.occupation}
          </p>

          <div className="flex items-center gap-2 mt-6 flex-wrap">
            <span className="text-xs bg-purple-400/10 text-purple-400 border border-purple-400/30 px-4 py-1.5 rounded-full font-medium">
              {analysis.functionalArea.area}
            </span>
            <span className="text-xs text-zinc-500">
              {analysis.candidateData.email}
            </span>
            <span className="text-zinc-600">·</span>
            <span className="text-xs text-zinc-500">
              {analysis.candidateData.phone}
            </span>
          </div>
        </div>

        <div className="text-right space-y-1">
          <p className="text-zinc-600 text-xs font-medium uppercase tracking-wide">
            Afinidad funcional
          </p>
          <div className="space-y-2">
            <p className="font-display text-6xl text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-purple-300">
              {analysis.functionalArea.score}
              <span className="text-2xl">.4</span>
            </p>
            <div className="h-1 w-24 bg-linear-to-r from-purple-400 to-purple-300 rounded-full ml-auto"></div>
            <p className="text-zinc-600 text-xs">de 100</p>
          </div>
        </div>
      </div>
    </div>
  );
}
