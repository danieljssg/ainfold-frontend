"use client";
import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { setCookie } from "cookies-next"; // CAMBIO: Usar import estándar
import { useAuth } from "@/providers/AuthProvider";
import api from "@/lib/api";

function GoogleCallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setUser, setIsAuthenticated } = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      setCookie("session_token", token, {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
        sameSite: "lax",
      });

      const syncSession = async () => {
        try {
          const { data } = await api.get("/auth/validate", {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (data.success) {
            setUser(data.user);
            setIsAuthenticated(true);
            await new Promise((resolve) => setTimeout(resolve, 50));
            window.location.href = "/dashboard";
          }
        } catch (error) {
          console.error(
            "Error en validación:",
            error.response?.data || error.message,
          );
          window.location.href = "/auth/login?error=sync_failed";
        }
      };

      syncSession();
    } else {
      console.warn("No se encontró token en los SearchParams");
    }
  }, [searchParams, setUser, setIsAuthenticated, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p className="animate-pulse">Loader...</p>
    </div>
  );
}

export default function GoogleCallbackPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <GoogleCallbackContent />
    </Suspense>
  );
}
