import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export const CardAnalysis = ({ analysis, isLoading = false }) => {
  const {
    analysisId,
    name,
    fullName,
    role,
    occupation,
    score,
    functionalArea,
    candidateData,
    date,
    createdAt,
    href,
    status = "completed",
    progress = { percentage: 0, step: "" },
    error = null,
    hobby = "",
  } = analysis || {};

  const isActuallyLoading =
    isLoading || (status !== "completed" && status !== "failed");

  // Skeleton state using standard Card
  if (isActuallyLoading) {
    return (
      <Card className="h-full space-y-4 p-0 overflow-hidden border-zinc-800 bg-zinc-900/50">
        <CardContent className="p-6 space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <Skeleton className="h-6 w-32 bg-zinc-800" />
              <Skeleton className="h-4 w-48 bg-zinc-800" />
            </div>
            <Skeleton className="h-8 w-12 bg-zinc-800 rounded-lg" />
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0 border-t border-zinc-800/50">
          <div className="flex items-center gap-2 mt-4">
            <Skeleton className="h-4 w-24 bg-zinc-800" />
            {status === "processing" && (
              <span className="text-[10px] text-zinc-500 animate-pulse">
                {progress.step || "Analizando..."} {progress.percentage}%
              </span>
            )}
          </div>
        </CardFooter>
      </Card>
    );
  }

  const displayName = candidateData?.fullName || fullName || name;
  const displayRole = candidateData?.occupation || occupation || role;
  const displayScore =
    candidateData?.functionalArea?.score ?? functionalArea?.score ?? score;
  const displayArea =
    candidateData?.functionalArea?.area || functionalArea?.area;
  const displayDate = date || createdAt;

  const hasData = !!candidateData;
  const isCompleted = status === "completed" || hasData;
  const isProcessing =
    !isCompleted && (status === "processing" || status === "pending");
  const isFailed =
    !isCompleted && !isProcessing && (status === "failed" || !!error);

  const targetHref = href || (isCompleted ? `/analysis/${analysisId}` : "#");

  const CardWrapper = ({ children }) => {
    const className = cn(
      "group border transition-all duration-300 relative overflow-hidden h-full flex flex-col border-zinc-800 bg-zinc-900/50 shadow-2xl",
      isCompleted
        ? "hover:border-purple-400/50 cursor-pointer"
        : "cursor-default",
    );

    const content = (
      <Card className={cn(className)} data-state={status}>
        {children}
      </Card>
    );

    if (isCompleted) {
      return (
        <Link href={targetHref} className="block h-full">
          {content}
        </Link>
      );
    }

    return content;
  };

  return (
    <CardWrapper>
      <CardContent className="p-6 flex-1">
        <div className="flex items-start justify-between mb-2">
          <div className="space-y-1.5 flex-1">
            <h3
              className={cn(
                "font-display text-2xl tracking-tight transition-colors",
                isFailed
                  ? "text-zinc-500"
                  : "text-zinc-100 group-hover:text-white",
              )}
            >
              {displayName ||
                (status === "pending" ? "Análisis en cola" : "CV escaneado")}
            </h3>
            <div className="flex flex-col gap-0.5">
              <div className="text-zinc-400 text-sm font-medium">
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
                    {progress.step || "Analizando CV..."}
                    {hobby && (
                      <span className="text-zinc-600">· hobby: {hobby}</span>
                    )}
                  </span>
                ) : isFailed ? (
                  <span className="text-red-500/80 line-clamp-1">{error}</span>
                ) : (
                  <div className="flex flex-col">
                    <span>{displayRole}</span>
                    {displayArea && (
                      <span className="text-zinc-500 text-xs font-normal">
                        {displayArea}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {isCompleted && displayScore !== undefined && (
            <div className="text-right ml-4">
              <p className="text-zinc-600 text-[10px] uppercase font-bold tracking-widest mb-0.5">
                Score
              </p>
              <div className="font-display text-4xl text-purple-400 leading-none drop-shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                {displayScore}
              </div>
            </div>
          )}

          {isProcessing && (
            <div className="flex flex-col items-end gap-2 w-1/3 pt-3">
              <div className="flex items-center gap-2 w-full">
                <Progress
                  value={progress.percentage}
                  className="h-1.5 bg-zinc-800"
                />
                <span className="text-[10px] font-mono text-zinc-500 w-8 text-right">
                  {progress.percentage}%
                </span>
              </div>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-4 flex items-center justify-between border-t border-zinc-800/80">
        <div className="flex items-center gap-3">
          <span className="text-zinc-600 text-[11px] font-medium uppercase tracking-wider">
            {(() => {
              if (!displayDate) return "Reciente";
              const d = new Date(displayDate);
              if (isNaN(d.getTime())) return displayDate;
              return d.toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "short",
              });
            })()}
          </span>

          <div className="flex items-center gap-2">
            {isCompleted && (
              <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/15 pointer-events-none rounded-full px-3 text-[10px]">
                Completado
              </Badge>
            )}
            {isProcessing && (
              <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 hover:bg-indigo-500/15 pointer-events-none rounded-full px-3 text-[10px]">
                {status === "pending" ? "En cola" : "En proceso"}
              </Badge>
            )}
            {isFailed && (
              <Badge className="bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/15 pointer-events-none rounded-full px-3 text-[10px]">
                Fallido
              </Badge>
            )}
          </div>
        </div>

        {isCompleted && (
          <ChevronRight className="w-5 h-5 text-zinc-700 group-hover:text-purple-400 transition-colors" />
        )}
      </CardFooter>
    </CardWrapper>
  );
};
