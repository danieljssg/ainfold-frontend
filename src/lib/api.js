import axios from "axios";
import { getCookie, deleteCookie } from "cookies-next";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3100/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = getCookie("session_token");
  const csrfToken = getCookie("x-csrf-token");

  if (token) config.headers.Authorization = `Bearer ${token}`;
  if (csrfToken) config.headers["x-csrf-token"] = csrfToken;

  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error.response?.status;
    const isAuthRoute =
      typeof window !== "undefined" &&
      window.location.pathname.startsWith("/auth/");

    if ((status === 401 || status === 403) && !isAuthRoute) {
      deleteCookie("session_token");
      deleteCookie("x-csrf-token");
      const reason = status === 401 ? "expired" : "invalid";
      window.location.replace(`/auth/login?session=${reason}`);
    }

    return Promise.reject(error);
  },
);

export default api;
