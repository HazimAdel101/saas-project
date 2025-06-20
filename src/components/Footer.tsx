'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Package, Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations();
  const isRTL = locale === 'ar';

  const footerLinks = {
    quickLinks: [
      { name: t('navigation.home'), href: '/' as const },
      { name: t('navigation.products'), href: '/services' as const },
      { name: t('navigation.pricing'), href: '/pricing' as const },
      { name: t('navigation.about'), href: '/about' as const },
    ],
    support: [
      { name: isRTL ? 'مركز المساعدة' : 'Help Center', href: '/help' },
      { name: isRTL ? 'التوثيق' : 'Documentation', href: '/docs' },
      { name: t('navigation.contact'), href: '/contact' as const },
      { name: isRTL ? 'الحالة' : 'Status', href: '/status' },
    ],
    legal: [
      { name: t('footer.privacyPolicy'), href: '/privacy' },
      { name: t('footer.termsOfService'), href: '/terms' },
      { name: isRTL ? 'سياسة ملفات تعريف الارتباط' : 'Cookie Policy', href: '/cookies' },
      { name: 'GDPR', href: '/gdpr' },
    ],
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className={`lg:col-span-2 space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}>
            <Link href="/" className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2 justify-end' : 'space-x-2 justify-start'} md:justify-start`}>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-tr from-purple-600 to-blue-600">
                <Package className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                SaaSHub
              </span>
            </Link>
            
            <p className={`text-gray-300 max-w-md leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
              {t('footer.description')}
            </p>
            
            {/* Social Links */}
            <div className={`flex ${isRTL ? 'space-x-reverse space-x-4 justify-end' : 'space-x-4 justify-start'} md:justify-start`}>
              <Link
                href="#"
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <h3 className="text-lg font-semibold mb-4">{t('footer.support')}</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <h3 className="text-lg font-semibold mb-4">{t('footer.legal')}</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className={`flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 ${isRTL ? 'md:flex-row-reverse text-right' : 'text-left'} md:text-center`}>
            <p className="text-gray-400 text-sm">
              &copy; 2024 SaaSHub. {t('footer.allRightsReserved')}.
            </p>
            <div className={`flex items-center text-sm text-gray-400 ${isRTL ? 'space-x-reverse space-x-6' : 'space-x-6'}`}>
              <span>{isRTL ? 'صُنع بـ ❤️ للمطورين' : 'Made with ❤️ for developers'}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}