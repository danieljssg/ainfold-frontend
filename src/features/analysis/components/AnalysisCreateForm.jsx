"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { toast } from "sonner";
import { BackButton } from "@/components/shared/BackButton";
import FormFields from "@/components/FormFields";
import FileDropzone from "@/components/FileDropzone";
import AnalysisProgress from "@/components/AnalysisProgress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Rocket, Loader2 } from "lucide-react";

export default function AnalysisCreateForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [hobby, setHobby] = useState("");
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estado del Job (polling)
  const [job, setJob] = useState(null);
  const [showProgress, setShowProgress] = useState(false);
  const pollIntervalRef = useRef(null);

  const startPolling = (jobId) => {
    if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);

    pollIntervalRef.current = setInterval(async () => {
      try {
        const { data } = await api.get(`/jobs/${jobId}/status`);
        setJob(data);

        if (data.status === "completed") {
          clearInterval(pollIntervalRef.current);
          toast.success("¡Análisis completado con éxito!");
          setTimeout(() => {
            router.push(`/analysis/${data.analysisId}`);
          }, 1500);
        } else if (data.status === "failed") {
          clearInterval(pollIntervalRef.current);
          setIsSubmitting(false);
          setShowProgress(false);
          toast.error("Hubo un error al procesar el análisis.");
        }
      } catch (error) {
        console.error("Error polling job status:", error);
      }
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Por favor, selecciona un archivo CV (PDF).");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("cv", file);
    formData.append("candidateName", name);
    formData.append("hobby", hobby);

    try {
      const { data } = await api.post("/analyzes", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.jobId) {
        setJob({ status: "pending", progress: 0 });
        setShowProgress(true);
        startPolling(data.jobId);
      }
    } catch (error) {
      setIsSubmitting(false);
      toast.error(
        error.response?.data?.message || "Error al iniciar el análisis."
      );
    }
  };

  const handleDismissProgress = () => {
    setShowProgress(false);
    toast("Tranquilo, tu análisis se está procesando en segundo plano", {
      description: "Te avisaremos cuando esté listo.",
      icon: <Rocket className="w-4 h-4 text-purple-400" />,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl space-y-6">
            <h3 className="text-zinc-200 font-display text-xl">
              Información del Candidato
            </h3>
            <FormFields
              name={name}
              setName={setName}
              hobby={hobby}
              setHobby={setHobby}
              isSubmitting={isSubmitting}
            />
          </div>

          <div className="space-y-6">
            <h3 className="text-zinc-200 font-display text-xl px-2">
              Documento CV (PDF)
            </h3>
            <FileDropzone onFileSelect={setFile} isSubmitting={isSubmitting} />

            <button
              type="submit"
              disabled={isSubmitting || !file || !name || !hobby}
              className="w-full relative overflow-hidden group bg-purple-400 hover:bg-purple-300 text-purple-950 font-bold rounded-2xl py-4 transition-all active:scale-[0.98] disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed shadow-xl shadow-purple-500/10"
            >
              <div className="relative z-10 flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Iniciando proceso...
                  </>
                ) : (
                  <>
                    <Rocket className="w-5 h-5 group-hover:animate-bounce" />
                    Desplegar análisis inteligente
                  </>
                )}
              </div>
            </button>
          </div>
        </div>
      </form>

      {/* Progress Dialog */}
      <Dialog open={showProgress} onOpenChange={() => {}}>
        <DialogContent className="bg-zinc-950 border-zinc-800 sm:max-w-md p-0 overflow-hidden rounded-3xl">
          <DialogHeader className="p-6 pb-0 sr-only">
            <DialogTitle>Procesando Análisis</DialogTitle>
          </DialogHeader>

          <div className="p-8">
            <AnalysisProgress job={job} />

            <div className="mt-8 flex flex-col gap-3">
              <button
                onClick={handleDismissProgress}
                className="w-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 text-xs font-bold py-3 rounded-xl transition-all"
              >
                Continuar esperando en segundo plano
              </button>
              <p className="text-[10px] text-zinc-600 text-center">
                El proceso suele tardar entre 30 y 60 segundos
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
