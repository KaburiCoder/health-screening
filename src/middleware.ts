import { NextRequest, NextResponse } from "next/server";
import { paths } from "./paths";
import { withAuth, withoutAuth } from "./middlewares/auth";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (notAuthPaths(pathname)) {
    return withoutAuth(request);
  }

  if (allowPaths(pathname)) {
    return NextResponse.next();
  }

  return withAuth(request, adminPaths(pathname));
}

function notAuthPaths(pathname: string) {
  return (
    pathname.startsWith(paths.login) ||
    pathname.startsWith(paths.signup) ||
    pathname.startsWith(paths.findPw)
  );
}

function allowPaths(pathname: string) {
  return pathname.startsWith("/images") ||
    pathname.endsWith("/changepw") ||
    pathname.startsWith("/test");
}

function adminPaths(pathname: string) {
  return pathname.startsWith("/admin")
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
