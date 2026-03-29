import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const createServerApi = async () => {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session_token")?.value;
  const csrfToken = cookieStore.get("x-csrf-token")?.value;

  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3100/api",
    headers: {
      "Content-Type": "application/json",
      ...(sessionToken && { Authorization: `Bearer ${sessionToken}` }),
      ...(csrfToken && { "x-csrf-token": csrfToken }),
      // Reenviar cookies al backend para que valide la sesión
      Cookie: [
        sessionToken && `session_token=${sessionToken}`,
        csrfToken && `x-csrf-token=${csrfToken}`,
      ]
        .filter(Boolean)
        .join("; "),
    },
  });

  instance.interceptors.response.use(
    (res) => res,
    (error) => {
      const status = error.response?.status;
      if (status === 401 || status === 403) {
        // En Server Components el redirect sí funciona aquí
        redirect("/auth/login?session=expired");
      }
      return Promise.reject(error);
    },
  );

  return instance;
};
