import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export const EmptyAnalysis = () => {
  return (
    <section className="flex flex-col gap-4 items-center justify-center border-dashed border rounded-lg min-h-64">
      <div className="flex flex-col gap-4 items-center justify-center">
        <h2 className="font-display text-2xl text-zinc-100">
          No tienes análisis aún
        </h2>
        <p className="text-zinc-400 text-sm">
          Sube un CV para comenzar a analizar perfiles
        </p>
        <Link
          href="/analysis"
          className="inline-flex items-center px-4 py-2 rounded-xl font-medium bg-primary hover:bg-purple-300 hover:text-zinc-900 transition-all cursor-pointer  duration-200 ease-in-out"
        >
          Comenzar análisis
          <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};
