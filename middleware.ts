import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { privateRoute } from "./routes";
import { NextResponse } from "next/server";

// Use only one of the two middleware options below
// 1. Use middleware directly
// export const { auth: middleware } = NextAuth(authConfig)

// 2. Wrapped middleware option
const { auth } = NextAuth(authConfig);
export default auth(async function middleware(req) {
  const { nextUrl, auth } = req;
  const isLoggedIn = !!auth;
  const isPrivateRoute = privateRoute.includes(nextUrl.pathname);
  const isAuthRoute = nextUrl.pathname.startsWith("/auth");
  const isApiRoute = nextUrl.pathname.startsWith("/api");

  if (isApiRoute) {
    return;
  }

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!isLoggedIn && isPrivateRoute) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
});

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
