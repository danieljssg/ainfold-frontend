"use client";
import { Suspense } from "react";
import { LoginForm } from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-linear-to-b from-primary/10 to-black py-15">
      <div className="absolute top-0 left-0 w-full h-full -z-10 bg-radial-at-tr from-primary/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-full h-full -z-10 bg-radial-at-bl from-accent/10 via-transparent to-transparent pointer-events-none" />

      <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full animate-pulse-slow" />
      <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-accent/20 blur-[120px] rounded-full animate-pulse-slow delay-700" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="relative z-10 px-4 w-full flex flex-col items-center">
        <div className="mb-8 text-center ">
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl text-foreground">
            <span className="text-primary">AI'n</span>
            Fold
          </h1>
          <p className="text-muted-foreground mt-2 text-sm/relaxed font-medium">
            AI-Powered Analysis Hub
          </p>
        </div>
        <Suspense
          fallback={
            <div className="animate-pulse text-sm text-zinc-500">
              Cargando...
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
