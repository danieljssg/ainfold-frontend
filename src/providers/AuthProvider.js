"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import api from "@/lib/api";

const AuthContext = createContext({});

const AUTH_ROUTES = ["/auth/login", "/auth/register", "/auth/google"];
const isAuthRoute = (path) => AUTH_ROUTES.some((r) => path.startsWith(r));

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const clearSession = () => {
    deleteCookie("session_token");
    deleteCookie("x-csrf-token");
    setUser(null);
    setIsAuthenticated(false);
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      clearSession();
      router.push("/auth/login");
    }
  };

  useEffect(() => {
    // No validar sesión en rutas de auth — evita loop
    if (isAuthRoute(pathname)) {
      setLoading(false);
      return;
    }

    const checkSession = async () => {
      try {
        // Obtener CSRF primero si no existe cookie
        const { data: csrf } = await api.get("/csrf-token");
        if (csrf?.csrfToken) {
          // La cookie la setea el backend automáticamente con Set-Cookie
          // Si no, guardarla manualmente no es necesario con withCredentials
        }

        const { data } = await api.get("/auth/validate");
        if (data.success) {
          setUser(data.user);
          setIsAuthenticated(true);
        }
      } catch {
        clearSession();
        // El interceptor de api.js ya redirige en 401/403
        // No redirigir aquí para evitar doble redirect
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        setUser,
        setIsAuthenticated,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
