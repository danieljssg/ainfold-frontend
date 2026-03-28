"use client";

import { useAnalysisJobs } from "@/features/analysis/hooks/useAnalysisJobs";
import { CardAnalysis } from "@/features/analysis/components/CardAnalysis";
import { EmptyAnalysis } from "@/features/analysis/components/EmptyAnalysis";
import { Loader2 } from "lucide-react";

export function AnalysisList() {
  const { jobs, loading, error } = useAnalysisJobs(6000);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map((analysis) => (
          <CardAnalysis key={analysis._id} analysis={analysis} />
        ))}
      </div>
      <EmptyAnalysis loading={loading} error={error} />
    </>
  );
}
