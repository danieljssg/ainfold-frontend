"use client";

import { RefreshCcw } from "lucide-react";
import { BrainCircuit } from "lucide-react";
import { FaPlay } from "react-icons/fa6";
import { useState } from "react";

export default function AIInsight({ insight }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="bg-linear-to-br from-zinc-900 to-zinc-900/50 border border-primary/30 rounded-2xl p-8 relative overflow-hidden">
      <div className="space-y-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="section-label mb-2">AI Insight</p>
            <div className="w-32 h-1 bg-linear-to-r from-purple-400  to-transparent rounded-full" />
          </div>
          <div className="text-purple-400 text-xs font-semibold uppercase tracking-wider flex items-center gap-1">
            <BrainCircuit className="w-3.5 h-3.5" />
            AI
          </div>
        </div>

        <p className="font-display text-lg text-zinc-100 leading-relaxed">
          {insight}
        </p>

        <div className="pt-4 flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-2 text-xs font-medium px-5 py-2.5 rounded-full transition-all ${
              isPlaying
                ? "bg-purple-400/20 text-purple-300 border border-purple-400/50"
                : "text-zinc-400 border border-zinc-700 hover:border-purple-400/30 hover:text-purple-400"
            }`}
          >
            <FaPlay />

            {isPlaying ? "Reproduciendo..." : "Escuchar veredicto"}
          </button>
          <button className="flex items-center gap-2 text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
            <RefreshCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
