import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'ar'],

  // Used when no locale matches
  defaultLocale: 'en',

  // The `pathnames` object holds pairs of internal and
  // external paths. Based on the locale, the external
  // paths are rewritten to the shared, internal ones.
  pathnames: {
    // If all locales use the same pathname, a single
    // string or only the internal pathname can be provided.
    '/': '/',
    '/services': {
      en: '/services',
      ar: '/services'
    },
    '/pricing': {
      en: '/pricing',
      ar: '/pricing'
    },
    '/about': {
      en: '/about',
      ar: '/about'
    },
    '/contact': {
      en: '/contact',
      ar: '/contact'
    },
    '/cart': {
      en: '/cart',
      ar: '/cart'
    },
    '/login': {
      en: '/login',
      ar: '/login'
    },
    '/signup': {
      en: '/signup',
      ar: '/signup'
    },
    '/dashboard': {
      en: '/dashboard',
      ar: '/dashboard'
    }
  }
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
