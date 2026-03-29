"use client";
import { useProtected } from "@/hooks/useProtected";

export default function DashboardLayout({ children }) {
  const { loading, isAuthenticated } = useProtected();

  if (loading || !isAuthenticated) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-zinc-50 dark:bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-zinc-500 dark:text-zinc-400 animate-pulse">
            Validando acceso...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-20 container mx-auto max-w-5xl flex flex-col gap-4 px-4 w-full">
      {children}
    </main>
  );
}
