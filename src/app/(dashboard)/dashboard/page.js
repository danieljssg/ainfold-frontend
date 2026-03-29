import { AnalysisList } from "@/features/analysis/components/AnalysisList";

export default function DashboardPage() {
  return (
    <section className="w-full flex flex-col gap-4">
      <header>
        <h1 className="font-display text-4xl text-zinc-100 mb-2">
          Mis análisis
        </h1>
        <p className="text-zinc-400">
          Historial completo de perfiles analizados
        </p>
      </header>
      <AnalysisList />
    </section>
  );
}
