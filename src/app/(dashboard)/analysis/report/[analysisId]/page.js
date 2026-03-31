import Image from "next/image";
import PrintReportButton from "../../../../../features/analysis/components/PrintReportButton";
import { getAnalysisById } from "@/features/analysis/services/analysisServices";

const formatScore = (score) => {
  const rounded = Number(score) || 0;
  return `${rounded.toFixed(1)}`;
};

const buildReportData = (analysis) => {
  const nombre =
    analysis?.nombre ||
    analysis?.candidateData?.fullName ||
    analysis?.fullName ||
    "Nombre no disponible";

  const score =
    analysis?.score || analysis?.functionalArea?.score || analysis?.scoreDePotencial || 0;

  const analisisNarrativo =
    analysis?.analisisNarrativo ||
    analysis?.ai_insight ||
    analysis?.summary?.profile ||
    "No hay análisis disponible.";

  const competencias =
    analysis?.competencias ||
    analysis?.summary?.skills?.map((skill) => ({
      nombre: skill?.name || skill?.label || "Competencia",
      valor: skill?.value || skill?.score || skill?.level || 0,
    })) || [];

  return { nombre, score, analisisNarrativo, competencias };
};

export default async function ReportPage({ params }) {
  const { analysisId } = await params;
  const analysis = await getAnalysisById(analysisId);
  const report = buildReportData(analysis);
  const reportDate = new Date().toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="min-h-screen bg-white px-6 py-8 text-slate-900 font-serif print:bg-white print:text-black">
      <PrintReportButton />

      <div className="mx-auto max-w-6xl space-y-10">
        <header className="flex flex-col gap-4 print:flex-row print:items-center print:justify-between">
          <div>
            <p className="text-sm uppercase tracking-widest text-slate-600 print:text-black">
              AI&apos;nFold
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
              AI&apos;nFold Reporte Técnico
            </h1>
          </div>

          <div className="rounded-2xl border border-slate-300 bg-slate-50 px-5 py-4 text-sm text-slate-700 print:border-black print:bg-white print:text-black">
            <p className="uppercase tracking-widest text-xs text-slate-500 print:text-black">
              Fecha del reporte
            </p>
            <p className="mt-2 font-medium text-slate-900 print:text-black">{reportDate}</p>
          </div>
        </header>

        <section className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 print:border-black print:bg-white print:shadow-none">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="space-y-4">
              <p className="uppercase tracking-widest text-xs text-slate-500 print:text-black">
                Nombre del candidato
              </p>
              <h2 className="text-4xl font-bold text-slate-900 leading-tight print:text-black">
                {report.nombre}
              </h2>
            </div>

            <div className="rounded-3xl border-l-4 border-black bg-white px-6 py-4 shadow-sm print:border-black print:bg-white print:shadow-none">
              <p className="text-xs uppercase tracking-widest text-slate-500 print:text-black">
                Score de potencial
              </p>
              <p className="mt-3 text-5xl font-semibold text-slate-900 print:text-black">
                {formatScore(report.score)}
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-6 break-inside-avoid print:break-inside-avoid">
          <div className="flex items-center gap-3">
            <span className="h-px flex-1 bg-slate-300 print:bg-slate-800" />
            <p className="text-xs uppercase tracking-widest text-slate-500 print:text-black">
              Análisis de Storytelling
            </p>
            <span className="h-px flex-1 bg-slate-300 print:bg-slate-800" />
          </div>

          <article className="prose prose-slate max-w-none columns-1 gap-8 text-justify text-base leading-8 print:prose-a:text-black print:text-black">
            <div className="rounded-xl border-l-4 border-black bg-slate-50 p-6 text-slate-900 print:bg-white print:text-black">
              <p className="text-sm uppercase tracking-widest text-slate-500 print:text-black">
                Resumen clave
              </p>
              <p className="mt-4 whitespace-pre-line leading-8">
                {report.analisisNarrativo}
              </p>
            </div>
          </article>
        </section>

        <section className="space-y-4 break-inside-avoid print:break-inside-avoid">
          <div className="flex items-center gap-3">
            <p className="text-xs uppercase tracking-widest text-slate-500 print:text-black">
              Competencias
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {report.competencias.length > 0 ? (
              report.competencias.map((competencia, index) => (
                <div
                  key={`${competencia.nombre}-${index}`}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-5 print:border-black print:bg-white print:text-black"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-semibold uppercase tracking-widest text-slate-800 print:text-black">
                      {competencia.nombre}
                    </span>
                    <span className="text-base font-semibold text-slate-900 print:text-black">
                      {competencia.valor}
                    </span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-slate-200">
                    <div
                      className="h-2 rounded-full bg-slate-900"
                      style={{ width: `${Math.min(Math.max(Number(competencia.valor) || 0, 0), 100)}%` }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-slate-700 print:border-black print:bg-white print:text-black">
                No hay competencias disponibles para este reporte.
              </div>
            )}
          </div>
        </section>

        <footer className="mt-12 border-t border-slate-200 pt-6 text-sm text-slate-500 print:border-black print:text-black">
          <div className="flex flex-col items-center gap-3">
            <Image
              src="/ainfold_icon_black.svg"
              width={48}
              height={48}
              alt="AI'nFold logo"
              className="w-12 h-12"
            />
            <p className="text-xs uppercase tracking-widest text-slate-500 print:text-black">
              Generado por AI&apos;nFold
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
