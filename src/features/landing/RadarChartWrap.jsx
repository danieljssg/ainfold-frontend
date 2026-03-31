"use client";

import RadarChart from "@/features/analysis/components/RadarChart";

export default function RadarChartWrap({ data }) {
  return (
    <div className="w-full h-full min-h-100">
      <RadarChart radarData={data} />
    </div>
  );
}
