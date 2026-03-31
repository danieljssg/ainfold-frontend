import { NextResponse } from "next/server";
import { jwtVerify, decodeJwt } from "jose";
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

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

  if (pathname === "/auth/login" || pathname === "/") {
    const sessionToken = request.cookies.get("session_token")?.value;
    const csrfToken = request.cookies.get("x-csrf-token")?.value;

    if (sessionToken && csrfToken) {
      try {
        const payload = decodeJwt(sessionToken);
        const isValid = payload.exp && Date.now() < payload.exp * 1000;

        if (isValid) {
          if (pathname === "/auth/login") {
            const sessionError = request.nextUrl.searchParams.get("session");
            if (sessionError) return NextResponse.next();
          }

          return NextResponse.redirect(new URL("/dashboard", request.url));
        }
      } catch {}
    }
  }

  if (isPublic(pathname)) return NextResponse.next();

  const sessionToken = request.cookies.get("session_token")?.value;
  const csrfToken = request.cookies.get("x-csrf-token")?.value;

  if (!sessionToken || !csrfToken) {
    const res = NextResponse.redirect(
      new URL("/auth/login?session=required", request.url),
    );
    res.cookies.delete("session_token");
    res.cookies.delete("x-csrf-token");
    return res;
  }

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
  matcher: [
    "/((?!api|_next/static|_next/image|_next/data|favicon.ico|.*\\..*$).*)",
  ],
};
