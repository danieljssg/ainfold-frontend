import axios from "axios";
import { deleteCookie } from "cookies-next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const createServerApi = () => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3100/api",
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use(async (config) => {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session_token")?.value;
    const csrfToken = cookieStore.get("x-csrf-token")?.value;
    if (sessionToken) {
      config.headers.Authorization = `Bearer ${sessionToken}`;
    }

    if (csrfToken) {
      config.headers["x-csrf-token"] = csrfToken;
    }
    const cookieParts = [];
    if (sessionToken) cookieParts.push(`session_token=${sessionToken}`);
    if (csrfToken) cookieParts.push(`x-csrf-token=${csrfToken}`);

    if (cookieParts.length > 0) {
      config.headers.Cookie = cookieParts.join("; ");
    }

    if (config.refresh) {
      config.params = { ...config.params, refresh: "true" };
    }

    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401 || error.response?.status === 403) {
        deleteCookie("session_token");
        redirect("/auth/login?session=expired");
      }
      return Promise.reject(error);
    },
  );

  return instance;
};

const serverApi = createServerApi();

export default serverApi;
