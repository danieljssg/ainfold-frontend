"use client";
import { FaPlay, FaStop } from "react-icons/fa6";

export const ButtonAudioDemo = ({ label, isPlaying, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-2 text-[10px] md:text-xs font-medium px-4 py-2 rounded-full transition-all ${
        isPlaying
          ? "bg-purple-400/20 text-purple-300 border border-purple-400/50 hover:bg-red-400/10 hover:text-red-300 hover:border-red-400/40"
          : "text-zinc-400 border border-zinc-700 hover:border-purple-400/30 hover:text-purple-400 bg-zinc-800/50"
      }`}
    >
      {isPlaying ? (
        <>
          <FaStop className="w-3 h-3" />
          <span className="animate-pulse">Reproduciendo {label}...</span>
        </>
      ) : (
        <>
          <FaPlay className="w-3 h-3" />
          {label}
        </>
      )}
    </button>
  );
};
