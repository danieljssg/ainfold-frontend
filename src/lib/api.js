import axios from "axios";
import { getCookie, deleteCookie } from "cookies-next";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  xsrfCookieName: "x-csrf-token",
  xsrfHeaderName: "x-csrf-token",
});

/**
 * INTERCEPTOR DE PETICIONES (Request)
 */
api.interceptors.request.use(
  (config) => {
    // 1. Obtener el JWT de las cookies
    const token = getCookie("session_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 2. Leer el CSRF token en cada petición (por si xsrf automático de Axios falla)
    const csrfToken = getCookie("x-csrf-token");
    if (csrfToken) {
      config.headers["x-csrf-token"] = csrfToken;
    }

    // 3. Manejo de refresh=true si viene en la config
    if (config.refresh) {
      config.params = { ...config.params, refresh: "true" };
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  },
);

/**
 * INTERCEPTOR DE RESPUESTAS (Response)
 */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isAuthPage =
      typeof window !== "undefined" &&
      (window.location.pathname.includes("/auth/login") ||
        window.location.pathname.includes("/auth/google/callback"));

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthPage
    ) {
      originalRequest._retry = true;

      deleteCookie("session_token");

      if (typeof window !== "undefined") {
        window.location.replace("/auth/login?session=expired");
      }
    }

    if (error.response?.status === 403 && !isAuthPage) {
      console.error("Error de seguridad (CSRF) o permisos insuficientes.");
    }

    return Promise.reject(error);
  },
);

export default api;
