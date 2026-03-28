import Navigation from "@/components/layout/Navigation";
import AnalysisProgress from "@/components/AnalysisProgress";

export const metadata = {
  title: "Progreso del análisis | AI'nFold",
  description: "Visualiza el progreso de tu análisis",
};

export default function ProgressPage() {
  return (
    <>
      <Navigation />
      <div className="max-w-5xl mx-auto px-6 py-12">
        <section>
          <p className="section-label mb-6">
            Componente — Progreso del análisis
          </p>
          <AnalysisProgress />
        </section>
      </div>
    </>
  );
}
