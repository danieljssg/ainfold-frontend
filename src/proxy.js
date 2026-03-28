import { NextResponse } from "next/server";

// Rutas que no requieren autenticación
const PUBLIC_ROUTES = ["/", "/auth/login", "/auth/google", "/unauthorized"];

export function proxy(request) {
  const { pathname } = request.nextUrl;

  const sessionToken = request.cookies.get("session_token")?.value;
  const csrfToken = request.cookies.get("x-csrf-token")?.value;

  // 1. Identificar si la ruta es pública
  const isPublicRoute = PUBLIC_ROUTES.some((route) => {
    if (route === "/") return pathname === "/";
    return pathname.startsWith(route);
  });

  // 2. Lógica para usuarios autenticados
  if (sessionToken) {
    try {
      // Decodificar payload (sin verificar firma, eso lo hace el backend o el edge si tuviéramos la clave)
      const payloadBase64 = sessionToken.split(".")[1];
      const payload = JSON.parse(atob(payloadBase64));

      // Verificar expiración
      const isExpired = payload.exp && Date.now() >= payload.exp * 1000;

      if (isExpired) {
        const response = NextResponse.redirect(
          new URL("/auth/login?session=expired", request.url),
        );
        response.cookies.delete("session_token");
        response.cookies.delete("x-csrf-token");
        return response;
      }

      // Si intenta ir a login estando logueado, al dashboard
      if (pathname.startsWith("/auth/login")) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }

      // Inyectar info en headers para Server Components
      const response = NextResponse.next();
      response.headers.set("x-user-id", payload.id || "");
      response.headers.set("x-user-email", payload.email || "");
      return response;
    } catch (error) {
      // Token malformado
      const response = NextResponse.redirect(
        new URL("/auth/login?session=invalid", request.url),
      );
      response.cookies.delete("session_token");
      return response;
    }
  }

  // 3. Lógica para usuarios NO autenticados
  if (!isPublicRoute) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("session", "required");
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Ejecutar en todas las rutas excepto:
     * - api (API routes internas de Next.js)
     * - _next/static (archivos estáticos)
     * - _next/image (optimización de imágenes)
     * - favicon.ico, sitemap.xml, robots.txt (archivos de metadata)
     * - Archivos con extensión (e.g. .svg, .png, .jpg, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*$).*)",
  ],
};
