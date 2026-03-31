"use client";

import { BrainCircuit } from "lucide-react";
import { ButtonTTS } from "./ButtonTTS";

export default function AIInsight({ insight, analysisId }) {
  return (
    <div className="bg-linear-to-br from-purple-400/5 to-purple-400/15 border border-purple-400/10 rounded-2xl p-6 md:p-8 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 text-purple-400/10 group-hover:text-purple-400/20 transition-colors flex items-center gap-2">
        <p className="text-2xl">AI</p>
        <BrainCircuit size={32} />
      </div>
      <div className="relative z-10">
        <p className="section-label mb-2">AI Insight</p>
        <div className="w-32 h-1 bg-linear-to-r from-purple-400  to-transparent rounded-full" />
        <p className="font-display text-lg text-zinc-100 leading-relaxed">
          {insight}
        </p>
      </div>
      <div className="pt-4 flex items-center gap-3">
        <ButtonTTS id={analysisId} />
      </div>
    </div>
  );
}
