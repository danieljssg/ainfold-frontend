export default function SkillsMatrix({ skills }) {
  const technicalSkills = skills?.technical || [];
  const softSkills = skills?.soft || [];

  return (
    <div className="p-4 md:p-6 flex flex-col gap-4">
      <p className="section-label">Matriz de habilidades</p>

      <div>
        <p className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
          Técnicas
        </p>
        <div className="flex flex-wrap gap-2">
          {technicalSkills?.map((skill) => (
            <span
              key={skill}
              className="text-[11px] md:text-xs bg-zinc-800 border border-zinc-700 text-zinc-300 px-2.5 md:px-3 py-1 md:py-1.5 rounded-lg wrap-break-word max-w-full text-center"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div>
        <p className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-purple-400 inline-block"></span>
          Blandas
        </p>
        <div className="flex flex-wrap gap-2">
          {softSkills?.map((skill) => (
            <span
              key={skill}
              className="text-[11px] md:text-xs bg-zinc-800/50 border border-zinc-800 text-zinc-400 px-2.5 md:px-3 py-1 md:py-1.5 rounded-lg wrap-break-word max-w-full text-center"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
