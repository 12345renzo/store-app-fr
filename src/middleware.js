import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = req.cookies.get("auth_token")?.value;
  const rol = req.cookies.get("user_rol")?.value;
  const { pathname } = req.nextUrl;

  // Redirigir si ya está autenticado
  if (token && pathname.startsWith("/store/auth")) {
    return NextResponse.redirect(new URL("/store/home", req.url));
  }

  // Proteger rutas privadas
  if (
    !token &&
    (pathname.startsWith("/store/dashboard") ||
      pathname.startsWith("/store/home/producto/pedido"))
  ) {
    return NextResponse.redirect(new URL("/store/home", req.url));
  }

  // Validar roles
  if (token) {
    if (pathname.startsWith("/store/dashboard") && rol !== "Admin") {
      return NextResponse.redirect(new URL("/store/home", req.url));
    }

    if (
      pathname.startsWith("/store/home/producto/pedido") &&
      rol !== "Usuario" &&
      rol !== "Admin"
    ) {
      return NextResponse.redirect(new URL("/store/home", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/store/dashboard/:path*",
    "/store/home/producto/pedido/:path*",
    "/store/auth/:path*",
    "/store/home",
  ],
};
