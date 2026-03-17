import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import type { NextRequest } from "next/server";

const handleI18nRouting = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Generate random CSP nonce
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  // Construct rigorous CSP with dynamic nonce
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https: 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: https://maps.googleapis.com https://lh3.googleusercontent.com;
    font-src 'self' data:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-src 'self' https://www.google.com/maps/;
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `;

  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, " ")
    .trim();

  // Next.js needs the nonce in the request headers to pass it to the App Router
  request.headers.set("x-nonce", nonce);
  request.headers.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue,
  );

  // 1. Run the i18n middleware with the updated request
  const response = handleI18nRouting(request);

  // 2. Apply the CSP to outgoing response headers
  response.headers.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue,
  );

  return response;
}

export const config = {
  matcher: [
    "/",
    "/(cs|en)/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
