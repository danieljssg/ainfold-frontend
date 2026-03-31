export default function CandidateHeader({ analysis }) {
  const { fullName, occupation, email, phone } = analysis.candidateData;
  const { area, score } = analysis.functionalArea;

  const scoreDisplay = {
    integerPart: Math.floor(score) || 0,
    decimalPart: (score % 1).toFixed(1).substring(1) || 0,
  };

  return (
    <div className="reveal reveal-1 bg-zinc-900 border border-zinc-800 rounded-2xl p-8 relative overflow-hidden">
      {/* linear accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-bl from-purple-400/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col md:flex-row items-start justify-between flex-wrap gap-6 relative z-10 w-full">
        <div className="flex-1 w-full">
          <p className="section-label mb-2">Candidato analizado</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-zinc-100 leading-tight wrap-break-word">
            {fullName}
          </h1>
          <p className="text-zinc-400 text-base md:text-lg mt-2 md:mt-3">
            {occupation}
          </p>

          <div className="flex items-center gap-2 mt-4 md:mt-6 flex-wrap">
            <span className="text-[10px] md:text-xs bg-purple-400/10 text-purple-400 border border-purple-400/30 px-3 md:px-4 py-1 md:py-1.5 rounded-full font-medium">
              {area}
            </span>
            <span className="text-[10px] md:text-xs text-zinc-500 break-all">
              {email}
            </span>
            <span className="text-zinc-600 hidden sm:inline">·</span>
            <span className="text-[10px] md:text-xs text-zinc-500">
              {phone}
            </span>
          </div>
        </div>

        <div className="w-full md:w-auto text-left md:text-right space-y-1 mt-4 md:mt-0 pt-4 md:pt-0 border-t border-zinc-800 md:border-t-0">
          <p className="text-zinc-600 text-xs font-medium uppercase tracking-wide">
            Afinidad funcional
          </p>
          <div className="space-y-1 md:space-y-2">
            <p className="font-display text-5xl md:text-6xl text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-purple-300">
              {scoreDisplay.integerPart}
              <span className="text-xl md:text-2xl">
                .{scoreDisplay.decimalPart}
              </span>
            </p>
            <div className="h-1 w-24 bg-linear-to-r from-purple-400 to-purple-300 rounded-full md:ml-auto"></div>
            <p className="text-zinc-600 text-xs">de 100</p>
          </div>
        </div>
      </div>
    </div>
  );
}
