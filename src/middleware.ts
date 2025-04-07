import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { NextURL } from "next/dist/server/web/next-url";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

const publicRoutes = [
  { path: "/sign-in", redirect: true },
  { path: "/blog", redirect: false },
] as const;

const NO_AUTH_URL_REDIRECT = "/sign-in";
const AUTH_URL_REDIRECT = "/dashboard";

export const middleware = async (request: NextRequest) => {
  const cookieStore = await cookies();
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find((route) => route.path === path);
  const accessToken = request.cookies.get("accessToken");

  if (!accessToken && publicRoute) {
    return NextResponse.next();
  }

  if (!accessToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = NO_AUTH_URL_REDIRECT;
    return NextResponse.redirect(redirectUrl);
  }

  if (accessToken && publicRoute?.redirect) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = AUTH_URL_REDIRECT;
    return NextResponse.redirect(redirectUrl);
  }

  if (accessToken && !publicRoute) {
    // checar se o token expirou
    // limpar o cookie se o token expirou
    // redirecionar para login se remover o token
    const redirectUrl = request.nextUrl.clone();
    validateAccessToken(cookieStore, redirectUrl, accessToken.value);
  }

  return NextResponse.next();
};

const validateAccessToken = (
  cookieStore: ReadonlyRequestCookies,
  redirectUrl: NextURL,
  token: string
) => {
  const decoded = jwtDecode(token);
  const now = Math.floor(Date.now() / 1000);
  const exp = decoded.exp ?? 0;
  if (exp < now) {
    cookieStore.delete("accessToken");
    redirectUrl.pathname = NO_AUTH_URL_REDIRECT;
  }
};

export const config: MiddlewareConfig = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
