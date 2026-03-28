"use client";

import {
  Radar,
  RadarChart as RechartsRadar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

const TRANSLATIONS = {
  adaptability: "Adaptabilidad",
  technicalPrecision: "Precisión",
  appliedCreativity: "Creatividad",
  resilience: "Resiliencia",
  impactCommunication: "Comunicación",
  leadership: "Liderazgo",
};

export default function RadarChart({ radarData = {} }) {
  // Transform object data to Recharts array format
  const chartData = Object.entries(radarData).map(([key, value]) => ({
    subject: TRANSLATIONS[key] || key,
    value: value,
    fullMark: 100,
  }));

  const dimensionsCount = chartData.length;

  return (
    <div className="reveal reveal-3 bg-zinc-900 border border-zinc-800 rounded-2xl p-8 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="section-label mb-1">Radar de competencias</p>
          <div className="w-12 h-1 bg-purple-400/30 rounded-full" />
        </div>
        <div className="text-[10px] uppercase font-bold tracking-wider bg-purple-400/10 text-purple-400 border border-purple-400/20 px-3 py-1 rounded-full">
          {dimensionsCount} dimensiones
        </div>
      </div>

      <div className="flex-1 min-h-75 w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsRadar cx="50%" cy="50%" outerRadius="50%" data={chartData}>
            <PolarGrid stroke="#27272a" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: "#a1a1aa", fontSize: 12, fontWeight: 500 }}
            />
            <Radar
              name="Candidato"
              dataKey="value"
              stroke="#a855f7"
              fill="#a855f7"
              fillOpacity={0.15}
              dot={{ r: 4, fill: "#a855f7", fillOpacity: 1 }}
            />
          </RechartsRadar>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 mt-4 pt-4 border-t border-zinc-800/50">
        {chartData.map((item) => (
          <div key={item.subject} className="flex flex-col">
            <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-tighter">
              {item.subject}
            </span>
            <span className="text-zinc-100 font-display text-lg leading-tight">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
