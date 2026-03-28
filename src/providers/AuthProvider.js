"use client";
import { deleteCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/api";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout error", error);
    } finally {
      deleteCookie("session_token");
      deleteCookie("x-csrf-token");
      setUser(null);
      setIsAuthenticated(false);
      router.push("/auth/login");
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      const isAuthRoute =
        pathname === "/auth/login" ||
        pathname.startsWith("/auth/google/callback");

      if (isAuthRoute) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await api.get("/auth/validate");
        if (data.success) {
          setUser(data.user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          setIsAuthenticated(false);
          setUser(null);
          const isAuthRoute =
            pathname === "/auth/login" ||
            pathname.startsWith("/auth/google/callback");
          if (!isAuthRoute) {
            router.push("/auth/login?session=expired");
          }
        }
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
