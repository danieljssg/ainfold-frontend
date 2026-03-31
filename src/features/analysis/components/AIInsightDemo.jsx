"use client";

import { BrainCircuit } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { ButtonAudioDemo } from "./ButtonAudioDemo";

export default function AIInsightDemo({ insight }) {
  const [activeSrc, setActiveSrc] = useState(null);
  const audioRef = useRef(null);

  // Limpiar audio al desmontar
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleToggle = (src) => {
    // Si el mismo audio está sonando, lo pausamos
    if (activeSrc === src) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setActiveSrc(null);
      return;
    }

    // Si había otro sonando, lo detenemos
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    // Iniciamos el nuevo
    const audio = new Audio(src);
    audioRef.current = audio;
    setActiveSrc(src);

    audio.play().catch(() => setActiveSrc(null));
    audio.onended = () => setActiveSrc(null);
    audio.onerror = () => setActiveSrc(null);
  };

  const audios = [
    { src: "/audios/kokoro.mp3", label: "Kokoro TTS" },
    { src: "/audios/elevenlabs.mp3", label: "ElevenLabs TTS" },
    { src: "/audios/gemini.mp3", label: "Gemini TTS" },
  ];

  return (
    <div className="animate-fade-in duration-500 bg-linear-to-br from-purple-400/5 to-purple-400/15 border border-purple-400/10 rounded-2xl p-6 md:p-8 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 text-purple-400/10 group-hover:text-purple-400/20 transition-colors flex items-center gap-2">
        <p className="text-xl">Powered by AI</p>
        <BrainCircuit size={32} />
      </div>
      <div className="relative z-10">
        <p className="section-label mb-2">AI Insight</p>
        <div className="w-32 h-1 bg-linear-to-r from-purple-400  to-transparent rounded-full" />
        <p className="font-display text-lg text-zinc-100 leading-relaxed mb-6">
          {insight}
        </p>
      </div>

      <div className="relative z-10 pt-4 border-t border-purple-400/10">
        <p className="text-xs text-zinc-400 mb-4 font-medium uppercase tracking-wider">
          💡 Demo Text-to-Speech (Elige un modelo para escuchar)
        </p>
        <div className="flex items-center gap-3 flex-wrap">
          {audios.map((audio) => (
            <ButtonAudioDemo
              key={audio.src}
              src={audio.src}
              label={audio.label}
              isPlaying={activeSrc === audio.src}
              onToggle={() => handleToggle(audio.src)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
