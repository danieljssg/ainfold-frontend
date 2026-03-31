"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { deleteCookie, getCookie } from "cookies-next";
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

  const sessionChecked = useRef(false);

const clearSession = () => {
  const domain = process.env.NODE_ENV === 'production' ? '.spotzlabs.site' : undefined;
  deleteCookie("session_token", { path: "/", domain });
  deleteCookie("x-csrf-token", { path: "/", domain });
  setUser(null);
  setIsAuthenticated(false);
};

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      clearSession();
      window.location.href = "/auth/login";
    }
  };

  useEffect(() => {
    if (isAuthRoute(pathname)) {
      setLoading(false);
      return;
    }

    if (sessionChecked.current) return;
    sessionChecked.current = true;

    const hasToken = getCookie("session_token");
    if (!hasToken) {
      setLoading(false);
      return;
    }

    const checkSession = async () => {
      try {
        const { data } = await api.get("/auth/validate");
        if (data.success) {
          setUser(data.user);
          await new Promise((resolve) => setTimeout(resolve, 50));
          setIsAuthenticated(true);
        } else {
          clearSession();
        }
      } catch {
        clearSession();
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [pathname]);

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
