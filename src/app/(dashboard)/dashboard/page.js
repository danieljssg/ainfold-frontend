import { CardAnalysis } from "@/features/analysis/components/CardAnalysis";
import { EmptyAnalysis } from "@/features/analysis/components/EmptyAnalysis";
import { getJobsAnalysis } from "@/features/analysis/services/analysisServices";

export default async function DashboardPage() {
  const analyses = await getJobsAnalysis();

  return (
    <section>
      <div className="mb-8">
        <h1 className="font-display text-4xl text-zinc-100 mb-2">
          Mis análisis
        </h1>
        <p className="text-zinc-400">
          Historial completo de perfiles analizados
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {analyses.map((analysis) => (
          <CardAnalysis key={analysis._id} analysis={analysis} />
        ))}
      </div>

      {analyses.length === 0 && <EmptyAnalysis />}
    </section>
  );
}
