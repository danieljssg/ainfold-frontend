import axios from "axios";
import { cookies } from "next/headers";

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

  return instance;
};

const serverApi = createServerApi();

export default serverApi;
