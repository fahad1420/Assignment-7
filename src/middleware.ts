import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected =
    pathname.startsWith("/product/") ||
    pathname === "/profile" ||
    pathname === "/profile/update";

  if (isProtected) {
    const sessionCookie =
      request.cookies.get("better-auth.session_token") ||
      request.cookies.get("__Secure-better-auth.session_token");

    if (!sessionCookie || !sessionCookie.value) {
      const signInUrl = new URL("/signin", request.url);
      signInUrl.searchParams.set("reason", "protected");
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/product/:path*", "/profile", "/profile/update"],
};

