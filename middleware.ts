import { createNextIntlMiddleware } from 'next-intl/server';
import { NextRequest } from 'next/server';

const locales = ['en', 'de'];
const defaultLocale = 'en';

// This middleware intercepts requests and redirects them to the appropriate locale
export default createNextIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed'
});

export const config = {
  // Match all paths except for:
  // - API routes
  // - Static files
  // - _next paths
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
