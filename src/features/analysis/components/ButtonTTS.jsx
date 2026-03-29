"use client";
import { useState } from "react";
import { FaPlay } from "react-icons/fa6";

export const ButtonTTS = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <button
      onClick={() => setIsPlaying(!isPlaying)}
      className={`flex items-center gap-2 text-xs font-medium px-5 py-2.5 rounded-full transition-all ${
        isPlaying
          ? "bg-purple-400/20 text-purple-300 border border-purple-400/50"
          : "text-zinc-400 border border-zinc-700 hover:border-purple-400/30 hover:text-purple-400"
      }`}
    >
      <FaPlay />
      Escuchar Insight (Convertir texto a voz)
    </button>
  );
};
