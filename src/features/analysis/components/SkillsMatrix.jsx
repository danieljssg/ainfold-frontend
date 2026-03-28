export default function SkillsMatrix({ skills }) {
  const technicalSkills = skills?.technical || [];
  const softSkills = skills?.soft || [];

  return (
    <div className="reveal reveal-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-5">
      <p className="section-label">Matriz de habilidades</p>

      <div>
        <p className="text-zinc-500 text-xs mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 inline-block"></span>
          Técnicas
        </p>
        <div className="flex flex-wrap gap-2">
          {technicalSkills?.map((skill) => (
            <span
              key={skill}
              className="text-xs bg-zinc-800 border border-zinc-700 text-zinc-300 px-3 py-1.5 rounded-lg"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div>
        <p className="text-zinc-500 text-xs mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 inline-block"></span>
          Blandas
        </p>
        <div className="flex flex-wrap gap-2">
          {softSkills?.map((skill) => (
            <span
              key={skill}
              className="text-xs bg-zinc-800/50 border border-zinc-800 text-zinc-400 px-3 py-1.5 rounded-lg"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="border-t border-zinc-800 pt-4 space-y-3">
        <div className="bg-zinc-800/30 border border-zinc-800/50 rounded-lg p-3">
          <p className="text-purple-400 text-xs font-semibold mb-1">
            💡 El hobby como brújula
          </p>
          <p className="text-zinc-500 text-xs leading-relaxed">
            Su pasión por la fotografía callejera no es una anécdota. Revela una
            mentalidad que busca patrones en el caos, que disfruta resolver
            problemas visuales y que tiene ojo para detalles. Estas capacidades
            se reflejan en su código.
          </p>
        </div>
      </div>
    </div>
  );
}
