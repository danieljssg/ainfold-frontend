import { NextResponse } from "next/server";

const PUBLIC_ROUTES = [
  "/",
  "/demo",
  "/auth/login",
  "/auth/register",
  "/auth/google",
  "/auth/google/callback",
  "/unauthorized",
];

const isPublic = (pathname) =>
  PUBLIC_ROUTES.some((r) =>
    r === "/" ? pathname === "/" : pathname.startsWith(r),
  );

export function proxy(request) {
  const { pathname } = request.nextUrl;

  if (pathname === "/auth/login") {
    const sessionToken = request.cookies.get("session_token")?.value;
    const csrfToken = request.cookies.get("x-csrf-token")?.value;

    if (sessionToken && csrfToken) {
      try {
        const payload = JSON.parse(atob(sessionToken.split(".")[1]));
        if (payload.exp && Date.now() < payload.exp * 1000) {
          return NextResponse.redirect(new URL("/dashboard", request.url));
        }
      } catch (e) {
        // Ignorar error y dejar que cargue el login si el token es inválido
      }
    }
  }

  if (isPublic(pathname)) return NextResponse.next();

  const sessionToken = request.cookies.get("session_token")?.value;
  const csrfToken = request.cookies.get("x-csrf-token")?.value;

  // Si falta cualquiera de los dos — redirigir y borrar ambas cookies
  if (!sessionToken || !csrfToken) {
    const res = NextResponse.redirect(
      new URL("/auth/login?session=required", request.url),
    );
    res.cookies.delete("session_token");
    res.cookies.delete("x-csrf-token");
    return res;
  }

  // Verificar expiración del JWT sin librería (edge runtime)
  try {
    const payload = JSON.parse(atob(sessionToken.split(".")[1]));
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      const res = NextResponse.redirect(
        new URL("/auth/login?session=expired", request.url),
      );
      res.cookies.delete("session_token");
      res.cookies.delete("x-csrf-token");
      return res;
    }
    // Inyectar headers útiles para Server Components
    const res = NextResponse.next();
    res.headers.set("x-user-id", payload.id ?? "");
    res.headers.set("x-user-email", payload.email ?? "");
    return res;
  } catch {
    // Token malformado
    const res = NextResponse.redirect(
      new URL("/auth/login?session=invalid", request.url),
    );
    res.cookies.delete("session_token");
    res.cookies.delete("x-csrf-token");
    return res;
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*$).*)"],
};
