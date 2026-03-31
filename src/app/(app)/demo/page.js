import CandidateHeader from "@/features/analysis/components/CandidateHeader";
import RadarChart from "@/features/analysis/components/RadarChart";
import SkillsMatrix from "@/features/analysis/components/SkillsMatrix";
import SummaryContent from "@/features/analysis/components/SummaryContent";
import AIInsightDemo from "@/features/analysis/components/AIInsightDemo";
import { BackButton } from "@/components/shared/BackButton";
import { profileDemo } from "@/lib/profileDemo";

export const metadata = {
  title: "Demo de Análisis | AI'nFold",
  description: "Explora un análisis generado por IA con AI'nFold",
};

export default function DemoPage() {
  const analysis = profileDemo;

  return (
    <div className="flex flex-col min-h-screen">
      <main className="pt-10 container mx-auto max-w-5xl flex-1 flex flex-col gap-4 px-4 w-full">
        <section className="w-full flex flex-col gap-4 max-w-5xl mx-auto py-12 px-6">
          <div className="flex items-center gap-4 mb-6 timeline-view animate-slide-in-left animate-range-[entry_5%_contain_20%]">
            <p className="section-label">Demostración del Análisis IA</p>
          </div>

          <div className="space-y-6">
            <CandidateHeader analysis={analysis} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 timeline-view animate-slide-in-left animate-range-[entry_5%_contain_20%]">
              <SkillsMatrix skills={analysis?.summary?.skills || []} />
              <RadarChart radarData={analysis?.radarStats || {}} />
            </div>
            <div className="timeline-view animate-slide-in-right animate-range-[entry_5%_contain_20%]">
              <AIInsightDemo insight={analysis?.ai_insight || ""} />
            </div>
            <div className="timeline-view animate-slide-in-left animate-range-[entry_10%_contain_30%]">
              <SummaryContent summary={analysis?.summary || {}} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
