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
    <section className="max-w-5xl mx-auto px-6 py-12 space-y-6">
      <div id="analysis">
        <div className="flex items-center gap-4 mb-6">
          <BackButton />
          <p className="section-label">Resultado del análisis</p>
        </div>

        <div className="space-y-6">
          <CandidateHeader analysis={analysis} />
          <AIInsight insight={analysis?.ai_insight || ""} />
          <SummaryContent summary={analysis?.summary || {}} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RadarChart radarData={analysis?.radarStats || {}} />
            <SkillsMatrix skills={analysis?.summary?.skills || []} />
          </div>
        </div>
      </div>
    </section>
  );
}
