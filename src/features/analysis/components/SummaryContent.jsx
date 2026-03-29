"use client";

import { BrainCircuit } from "lucide-react";
import { FileText, Briefcase, GraduationCap, Quote } from "lucide-react";

export default function SummaryContent({ summary = {} }) {
  const { profile, experience, education, justify } = summary;

  const sections = [
    {
      title: "Perfil Profesional",
      icon: <FileText className="w-4 h-4" />,
      content: profile,
    },
    {
      title: "Experiencia Clave",
      icon: <Briefcase className="w-4 h-4" />,
      content: experience,
    },
    {
      title: "Formación Académica",
      icon: <GraduationCap className="w-4 h-4" />,
      content: education,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sections.map((section) => (
          <div
            key={section.title}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-colors"
          >
            <div className="flex items-center gap-2 mb-4 text-zinc-400">
              {section.icon}
              <span className="text-xs uppercase font-bold tracking-widest pt-0.5">
                {section.title}
              </span>
            </div>
            <p className="text-zinc-300 text-sm leading-relaxed">
              {section.content || "Información no disponible"}
            </p>
          </div>
        ))}
      </div>

      {justify && (
        <div className="bg-purple-400/5 border border-purple-400/10 rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 text-purple-400/10 group-hover:text-purple-400/20 transition-colors">
            <BrainCircuit size={48} />
          </div>
          <div className="relative z-10">
            <p className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-3">
              Veredicto del Analista
            </p>
            <p className="text-zinc-100 text-base italic leading-relaxed">
              "{justify}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
