"use client";
import { useState, useRef, useEffect } from "react";
import { FaPlay, FaStop } from "react-icons/fa6";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api";

const POLL_INTERVAL = 3000;

export const ButtonTTS = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const stopPolling = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const playAudio = (fileName) => {
    // Si ya hay un audio, detenerlo
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    const audioUrl = `/api/audio/${fileName}`;

    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    audio.onplay = () => {
      setIsLoading(false);
      setIsPlaying(true);
    };

    audio.onended = () => {
      setIsPlaying(false);
      audioRef.current = null;
    };

    audio.onerror = () => {
      setIsLoading(false);
      setIsPlaying(false);
      audioRef.current = null;
      toast.error("No se pudo reproducir el audio.");
    };

    audio.play().catch(() => {
      setIsLoading(false);
      setIsPlaying(false);
      toast.error("No se pudo reproducir el audio.");
    });
  };

  const startPolling = () => {
    intervalRef.current = setInterval(async () => {
      try {
        const { data } = await api.get(`/analyzes/${id}/tts`);
        if (data?.success && data?.data?.fileName) {
          stopPolling();
          playAudio(data.data.fileName);
        }
      } catch (err) {
        if (err?.response?.status !== 404) {
          stopPolling();
          setIsLoading(false);
          toast.error("Error al obtener el audio generado.");
        }
      }
    }, POLL_INTERVAL);
  };

  const handleClick = async () => {
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
      setIsPlaying(false);
      return;
    }

    if (isLoading) return;

    setIsLoading(true);

    try {
      const { data } = await api.post(`/analyzes/${id}/tts`);
      if (data?.success && data?.data?.fileName) {
        playAudio(data.data.fileName);
        return; // Detener aquí, no empezar polling si ya tenemos el resultado
      }
    } catch (err) {
      setIsLoading(false);
      toast.error("No se pudo iniciar la generación del audio.", {
        duration: 2000,
        id: "tts-error",
      });
      return;
    }

    startPolling();
  };

  const isIdle = !isLoading && !isPlaying;

  return (
    <button
      onClick={handleClick}
      disabled={isLoading && !isPlaying}
      className={`flex items-center gap-2 text-xs font-medium px-5 py-2.5 rounded-full transition-all disabled:cursor-wait ${
        isPlaying
          ? "bg-purple-400/20 text-purple-300 border border-purple-400/50 hover:bg-red-400/10 hover:text-red-300 hover:border-red-400/40"
          : isLoading
            ? "bg-zinc-800 text-zinc-400 border border-zinc-700 cursor-wait"
            : "text-zinc-400 border border-zinc-700 hover:border-purple-400/30 hover:text-purple-400"
      }`}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
          <span className="animate-pulse">Generando Audio...</span>
        </>
      ) : isPlaying ? (
        <>
          <FaStop className="w-3 h-3" />
          <span className="animate-pulse">Reproduciendo Insight...</span>
        </>
      ) : (
        <>
          <FaPlay className="w-3 h-3" />
          Escuchar Insight
        </>
      )}
    </button>
  );
};
