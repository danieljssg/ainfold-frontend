"use client";

export default function PrintReportButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="print:hidden fixed bottom-6 right-6 z-50 inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-2xl shadow-slate-900/30 transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/50"
    >
      Imprimir Reporte
    </button>
  );
}
