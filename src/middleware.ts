import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { getTokenFromRequest, verifyToken } from './lib/auth';

// Create the internationalization middleware
const intlMiddleware = createIntlMiddleware(routing);

// Admin-only routes
const adminRoutes = ['/dashboard'];

// Public routes that should redirect if authenticated
const authRoutes = ['/login', '/signup'];

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get the locale from the pathname or default
  const locale = pathname.split('/')[1] || routing.defaultLocale;

  // Check if the route (without locale) is admin-only or auth route
  const routeWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
  const isAdminRoute = adminRoutes.some((route: string) =>
    routeWithoutLocale.startsWith(route)
  );
  const isAuthRoute = authRoutes.some((route: string) =>
    routeWithoutLocale.startsWith(route)
  );

  // Get authentication token and user info
  const token = getTokenFromRequest(request);
  const payload = token ? verifyToken(token) : null;
  const isAuthenticated = payload !== null;

  // Handle admin routes - require authentication
  if (isAdminRoute && !isAuthenticated) {
    const loginUrl = new URL(`/${locale}/login`, request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Handle auth routes - redirect if already authenticated
  if (isAuthRoute && isAuthenticated) {
    // Simple redirect to home - role checking will be done in the API
    const homeUrl = new URL(`/${locale}`, request.url);
    homeUrl.searchParams.set('loggedIn', 'true');
    return NextResponse.redirect(homeUrl);
  }

  // Apply internationalization middleware
  return intlMiddleware(request);
}

export const config = {
  // Match only internationalized pathnames, exclude API routes
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
