import { BackButton } from "@/components/shared/BackButton";
import AnalysisCreateForm from "@/features/analysis/components/AnalysisCreateForm";

export const metadata = {
  title: "Subir CV | AI'nFold",
  description: "Sube tu CV para análisis inteligente",
};

export default function UploadPage() {
  return (
    <section className="w-full flex flex-col gap-4 pb-20">
      <div id="analysis">
        <div className="flex items-center gap-4 mb-8">
          <BackButton href="/dashboard" />
          <div>
            <p className="section-label">Generar nuevo análisis</p>
            <h2 className="text-zinc-500 text-xs font-medium uppercase tracking-tight mt-1">
              Completa los datos para iniciar la magia de la IA
            </h2>
          </div>
        </div>

        <AnalysisCreateForm />
      </div>
    </section>
  );
}
