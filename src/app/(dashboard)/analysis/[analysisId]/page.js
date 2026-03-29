import AIInsight from "@/features/analysis/components/AIInsight";
import CandidateHeader from "@/features/analysis/components/CandidateHeader";
import RadarChart from "@/features/analysis/components/RadarChart";
import SkillsMatrix from "@/features/analysis/components/SkillsMatrix";
import SummaryContent from "@/features/analysis/components/SummaryContent";
import { getAnalysisById } from "@/features/analysis/services/analysisServices";
import { BackButton } from "@/components/shared/BackButton";

export default async function AnalysisPage({ params }) {
  const { analysisId } = await params;
  const analysis = await getAnalysisById(analysisId);

  return (
    <section className="w-full flex flex-col gap-4">
      <div id="analysis">
        <div className="flex items-center gap-4 mb-6">
          <BackButton />
          <p className="section-label">Resultado del análisis</p>
        </div>

        <div className="space-y-6">
          <CandidateHeader analysis={analysis} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <SkillsMatrix skills={analysis?.summary?.skills || []} />
            <RadarChart radarData={analysis?.radarStats || {}} />
          </div>
          <AIInsight
            insight={analysis?.ai_insight || ""}
            analysisId={analysisId}
          />
          <SummaryContent summary={analysis?.summary || {}} />
        </div>
      </div>
    </section>
  );
}
