"use client";

import { useAuth } from "@/providers/AuthProvider";
import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import api from "@/lib/api";
import { setCookie } from "cookies-next";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

export function LoginForm() {
  const router = useRouter();
  const { setUser, setIsAuthenticated } = useAuth();
  const searchParams = useSearchParams();
  const toastShown = useRef(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getCsrf = async () => {
      try {
        await api.get("/csrf-token");
      } catch (err) {
        console.error("No se pudo obtener el CSRF token");
      }
    };
    getCsrf();


    const sessionStatus = searchParams.get("session");
    if (sessionStatus === "expired" && !toastShown.current) {
      toast.error("Tu sesión ha expirado", {
        description: "Por favor, ingresa de nuevo para continuar.",
      });
      toastShown.current = true;
    }
  }, [searchParams]);

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  const handleDemoUser = () => {
    setFormData({
      email: process.env.NEXT_PUBLIC_USERNAME || "",
      password: process.env.NEXT_PUBLIC_USER_PASSWORD || "",
    });
    toast.info("Credenciales de demo cargadas");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const { data } = await api.post("/auth/signin", formData);

      if (data.success) {
        setCookie("session_token", data.token, {
          maxAge: 60 * 60 * 24,
          path: "/",
          sameSite: "lax",
          domain: process.env.NODE_ENV === "production" ? ".spotzlabs.site" : undefined,
        });
        setUser(data.user);
        await new Promise((resolve) => setTimeout(resolve, 50));
        setIsAuthenticated(true);
        router.push("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <Card className="border-none shadow-2xl relative overflow-hidden">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-2xl font-bold tracking-tight text-center">
            Bienvenido de nuevo
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Ingresa tus credenciales para acceder a tu cuenta
            <div className="text-center">
              <button
                type="button"
                onClick={handleDemoUser}
                className="text-base text-purple-400/80 hover:text-primary transition-colors"
              >
                Haz click para usar usuario de demo
              </button>
            </div>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <FieldGroup className="space-y-2">
              {error && (
                <div className="bg-destructive/10 text-destructive p-3 rounded-lg text-xs font-medium border border-destructive/20 text-center animate-in slide-in-from-top duration-300">
                  {error}
                </div>
              )}

              <Field>
                <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="nombre@ejemplo.com"
                  required
                  value={formData.email}
                  disabled={isLoading}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </Field>

              <Field>
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                  <a
                    href="#"
                    className="text-xs text-violet-400 hover:underline transition-all"
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={formData.password}
                  disabled={isLoading}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </Field>

              <div className="flex flex-col gap-2 mt-2">
                <Button
                  type="submit"
                  className="w-full font-semibold h-11 hover:scale-[1.02] active:scale-[0.98] transition-all bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Iniciando sesión...
                    </span>
                  ) : (
                    "Iniciar sesión"
                  )}
                </Button>

                <hr className="h-px my-1" />

                <Button
                  variant="outline"
                  type="button"
                  className="w-full h-11 hover:bg-muted/50 hover:scale-[1.02] active:scale-[0.98] transition-all border-muted-foreground/20"
                  size="lg"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                >
                  <FcGoogle className="mr-2 h-5 w-5" />
                  Continuar con Google
                </Button>
              </div>

              <div className="text-center text-xs pt-2">
                <span className="text-muted-foreground">
                  ¿No tienes una cuenta?{" "}
                </span>
                <a
                  href="#"
                  className="text-violet-400 font-semibold hover:underline transition-all underline-offset-4"
                >
                  Regístrate ahora
                </a>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
