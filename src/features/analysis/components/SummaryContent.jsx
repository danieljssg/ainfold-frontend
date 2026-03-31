"use client";

import { BrainCircuit } from "lucide-react";
import { FileText, Briefcase, GraduationCap, Quote } from "lucide-react";

export default function SummaryContent({ summary = {} }) {
  const { profile, experience, education, justify } = summary;

  const sections = [
    {
      title: "Perfil Profesional",
      icon: <FileText className="w-4 h-4" />,
      content: (
        <div className="flex flex-col gap-2">
          {profile}
          <div className="bg-accent/30 border border-zinc-800/50 rounded-lg p-3">
            <p className="text-zinc-300 text-xs leading-relaxed">{justify}</p>
          </div>
        </div>
      ),
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
      <div className="flex flex-col gap-4">
        {sections.map((section) => (
          <div
            key={section.title}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 hover:border-zinc-700 transition-colors"
          >
            <div className="flex items-center gap-2 mb-4 text-purple-200">
              {section.icon}
              <span className="text-xs uppercase font-bold tracking-widest pt-0.5">
                {section.title}
              </span>
            </div>
            <div className=" text-sm leading-relaxed font-light">
              {section.content || "Información no disponible"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
