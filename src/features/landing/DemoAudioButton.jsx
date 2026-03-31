"use client";

import { useState, useRef } from "react";
import { Play, Pause, Volume2 } from "lucide-react";

export default function DemoAudioButton({ src }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex flex-col gap-2">
      <audio
        ref={audioRef}
        src={src}
        onEnded={() => setIsPlaying(false)}
        className="hidden"
      />
      <button
        onClick={togglePlay}
        className={`flex items-center gap-3 px-6 py-3 rounded-2xl transition-all font-bold ${
          isPlaying
            ? "bg-purple-400 text-purple-950"
            : "bg-zinc-900 border border-zinc-800 text-purple-400 hover:border-purple-400"
        }`}
      >
        {isPlaying ? (
          <>
            <Pause className="w-5 h-5 fill-current" />
            Pausar Demo
          </>
        ) : (
          <>
            <Play className="w-5 h-5 fill-current" />
            Escuchar Ejemplo (IA Voice)
          </>
        )}
      </button>
      <div className="flex items-center gap-2 text-[10px] text-zinc-500 uppercase tracking-widest px-1">
        <Volume2 className="w-3 h-3" />
        Narrado con Kokoro-TTS (Self-hosted)
      </div>
    </div>
  );
}
