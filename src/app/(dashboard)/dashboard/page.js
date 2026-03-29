import { AnalysisList } from "@/features/analysis/components/AnalysisList";
import Link from "next/link";
import { Rocket, LayoutDashboard } from "lucide-react";

export default function DashboardPage() {
  return (
    <section className="w-full flex flex-col gap-4">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 py-8 border-b border-zinc-900 mb-4">
        <div>
          <h1 className="font-display text-4xl text-zinc-100 flex items-center gap-2">
            Mis análisis
            <LayoutDashboard className="w-7 h-7 text-purple-400 opacity-20" />
          </h1>
          <p className="text-zinc-500 font-medium">
            Historial completo de perfiles analizados
          </p>
        </div>
        <Link
          href="/analysis/create"
          className="bg-purple-400 hover:bg-purple-300 text-purple-950 px-6 py-3 rounded-full font-bold text-sm transition-all flex items-center justify-center gap-2 group shadow-xl shadow-purple-500/10 active:scale-95 whitespace-nowrap"
        >
          <Rocket className="w-4 h-4 group-hover:block hidden md:group-hover:animate-bounce" />
          Nuevo Análisis
        </Link>
      </header>
      <AnalysisList />
    </section>
  );
}
