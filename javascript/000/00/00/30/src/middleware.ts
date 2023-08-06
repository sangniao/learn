import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const staticRoutesByLocale: Record<string, string[]> = {
  "/server-side-middleware-example": ["en", "de"],
};

const STATIC_ROUTES = Object.keys(staticRoutesByLocale);

export function middleware(request: NextRequest) {
  const pathname = request?.nextUrl?.pathname || "/";
  const locale = request?.nextUrl?.locale || "en";

  if (STATIC_ROUTES.includes(pathname)) {
    const locales = staticRoutesByLocale[pathname];
    const isLocaleSupported = locales.includes(locale) || locales.includes("*");

    if (!isLocaleSupported) {
      const localeSubDirectory = locale === "en" ? "/" : `/${locale}/`;
      const redirectPathname = localeSubDirectory + "404";

      const url = request.nextUrl.clone();
      url.pathname = redirectPathname;

      console.error(
        `Middleware Error: Locale "${locale}" is not supported for pathname "${pathname}". Rewriting to "${url}".`
      );

      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico
     * - sitemap.xml
     */
    "/((?!api|_next/static|_next/image|static|image|favicon.ico|sitemap.xml).*)",
  ],
};
