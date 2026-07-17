import { NextResponse } from "next/server";

// Very small session check: the login route sets a cookie whose value
// must equal ADMIN_SESSION_SECRET. Anyone hitting /admin or an
// /api/admin/* route without it gets bounced to the login screen.
export function middleware(request) {
  const { pathname } = request.nextUrl;

  const isAdminPage = pathname.startsWith("/admin") && pathname !== "/admin/login";
  const isAdminApi =
    pathname.startsWith("/api/admin") && pathname !== "/api/admin/login";

  if (!isAdminPage && !isAdminApi) {
    return NextResponse.next();
  }

  const session = request.cookies.get("mb_admin_session")?.value;
  const valid = session && session === process.env.ADMIN_SESSION_SECRET;

  if (!valid) {
    if (isAdminApi) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
