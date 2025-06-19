'use client';

import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguageStore } from '@/lib/store';
import { useEffect } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { language } = useLanguageStore();
  const isRTL = language === 'ar';

  useEffect(() => {
    // Set document direction and lang based on language
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    
    // Add RTL class to body for additional styling
    if (isRTL) {
      document.body.classList.add('rtl');
      document.body.classList.remove('ltr');
    } else {
      document.body.classList.add('ltr');
      document.body.classList.remove('rtl');
    }
  }, [language, isRTL]);

  return (
    <html lang={language} dir={isRTL ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans+Arabic:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body 
        className={`${isRTL ? 'font-arabic rtl' : 'font-inter ltr'}`}
        style={{ 
          fontFamily: isRTL 
            ? '"Noto Sans Arabic", system-ui, -apple-system, sans-serif' 
            : '"Inter", system-ui, -apple-system, sans-serif'
        }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster position={isRTL ? 'top-left' : 'top-right'} />
        </ThemeProvider>
      </body>
    </html>
  );
}