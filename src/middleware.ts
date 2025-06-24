import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { getTokenFromRequest, verifyToken } from './lib/auth';

// Create the internationalization middleware
const intlMiddleware = createIntlMiddleware(routing);

// Protected routes that require authentication
const protectedRoutes = ['/dashboard'];

// Public routes that should redirect to dashboard if authenticated
const authRoutes = ['/login', '/signup'];

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get the locale from the pathname or default
  const locale = pathname.split('/')[1] || routing.defaultLocale;

  // Check if the route (without locale) is protected
  const routeWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
  const isProtectedRoute = protectedRoutes.some(route =>
    routeWithoutLocale.startsWith(route)
  );
  const isAuthRoute = authRoutes.some(route =>
    routeWithoutLocale.startsWith(route)
  );

  // Get authentication token
  const token = getTokenFromRequest(request);
  const isAuthenticated = token ? verifyToken(token) !== null : false;

  // Handle protected routes
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL(`/${locale}/login`, request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Handle auth routes (redirect to dashboard if already authenticated)
  if (isAuthRoute && isAuthenticated) {
    const dashboardUrl = new URL(`/${locale}/dashboard`, request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // Apply internationalization middleware
  return intlMiddleware(request);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(ar|en)/:path*']
};
