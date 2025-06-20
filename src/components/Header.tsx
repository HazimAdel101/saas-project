'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useTheme } from 'next-themes';
import {
  Menu,
  ShoppingCart,
  Moon,
  Sun,
  Globe,
  LogOut,
  Settings,
  Package
} from 'lucide-react';
import { useCartStore, useAuthStore, useLanguageStore } from '@/lib/store';
import { translations } from '@/lib/translations';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { getItemCount } = useCartStore();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { language, setLanguage } = useLanguageStore();
  const pathname = usePathname();
  const itemCount = getItemCount();
  const t = translations[language];
  const isRTL = language === 'ar';

  const navigation = [
    { name: t.home, href: '/' },
    { name: t.products, href: '/services' },
    { name: t.pricing, href: '/pricing' },
    { name: t.about, href: '/about' },
    { name: t.contact, href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full navbar-glass border-b border-border/20">
      <div className="container mx-auto px-4 lg:px-6">
        <div className={`flex h-18 items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Logo - Always positioned correctly for RTL/LTR */}
          <div className={`flex items-center ${isRTL ? 'order-3' : 'order-1'}`}>
            <Link
              href="/"
              className="flex items-center space-x-rtl logo-hover group"
            >
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 via-blue-600 to-indigo-600 shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-purple-600 via-blue-600 to-indigo-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
              </div>
              <div className={`${isRTL ? 'mr-3' : 'ml-3'}`}>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  SaaSHub
                </span>
                <div className="text-xs text-muted-foreground font-medium tracking-wide">
                  {isRTL ? 'منصة البرمجيات' : 'Software Platform'}
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - Properly centered for both LTR and RTL */}
          <nav className={`hidden lg:flex items-center justify-center flex-1 order-2`}>
            <div className={`flex items-center space-x-1 ${isRTL ? '' : ''}`}>
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`nav-item px-4 py-2 rounded-lg transition-all duration-200 relative ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-semibold'
                        : 'hover:bg-accent/50'
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></div>
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Actions - Always on the right side */}
          <div className={`flex items-center space-x-2 ${isRTL ? 'order-1 space-x-reverse' : 'order-3'}`}>
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="btn-professional h-10 w-10 rounded-full hover:bg-accent/80 transition-all duration-200"
                >
                  <Globe className="h-4 w-4" />
                  <span className="sr-only">Change language</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align={isRTL ? 'start' : 'end'}
                className="dropdown-professional min-w-[140px]"
              >
                <DropdownMenuItem
                  onClick={() => setLanguage('en')}
                  className={`${isRTL ? 'text-right flex-row-reverse' : 'text-left'} cursor-pointer hover:bg-accent/50 transition-colors`}
                >
                  <span className="text-sm font-medium">English</span>
                  {language === 'en' && <div className="w-2 h-2 bg-green-500 rounded-full ml-2"></div>}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setLanguage('ar')}
                  className={`${isRTL ? 'text-right flex-row-reverse' : 'text-left'} cursor-pointer hover:bg-accent/50 transition-colors`}
                >
                  <span className="text-sm font-medium">العربية</span>
                  {language === 'ar' && <div className="w-2 h-2 bg-green-500 rounded-full ml-2"></div>}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="btn-professional h-10 w-10 rounded-full hover:bg-accent/80 transition-all duration-200"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Cart */}
            <Link href="/cart" className="relative group">
              <Button
                variant="ghost"
                size="sm"
                className="btn-professional h-10 w-10 rounded-full hover:bg-accent/80 transition-all duration-200 relative"
              >
                <ShoppingCart className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                {itemCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="badge-rtl h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center animate-pulse"
                  >
                    <span className="ltr-numbers font-semibold">{itemCount}</span>
                  </Badge>
                )}
                <span className="sr-only">{t.cart} ({itemCount})</span>
              </Button>
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-accent/80 transition-all duration-200">
                    <Avatar className="h-8 w-8 ring-2 ring-transparent hover:ring-primary/20 transition-all duration-200">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white font-semibold">
                        {user?.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="dropdown-professional w-56"
                  align={isRTL ? 'start' : 'end'}
                  forceMount
                >
                  <div className={`px-3 py-2 border-b border-border/50 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/dashboard"
                      className={`flex items-center py-2 hover:bg-accent/50 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
                    >
                      <Settings className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                      <span className={isRTL ? 'text-right' : 'text-left'}>{t.dashboard}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={logout}
                    className={`flex items-center py-2 hover:bg-accent/50 transition-colors text-destructive ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    <LogOut className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    <span className={isRTL ? 'text-right' : 'text-left'}>{t.logout || 'Logout'}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className={`hidden lg:flex items-center space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="btn-professional hover:bg-accent/80 transition-all duration-200"
                >
                  <Link href="/login">{t.login}</Link>
                </Button>
                <Button
                  size="sm"
                  asChild
                  className="btn-professional bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Link href="/signup">{t.signup}</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden h-10 w-10 rounded-full hover:bg-accent/80 transition-all duration-200"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side={isRTL ? 'left' : 'right'}
                className="mobile-menu w-80 border-l-0 border-r border-border/20"
              >
                <div className={`flex flex-col space-y-6 py-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {/* Mobile Logo */}
                  <div className={`flex items-center pb-4 border-b border-border/20 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-purple-600 to-blue-600">
                      <Package className="h-5 w-5 text-white" />
                    </div>
                    <span className={`text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent ${isRTL ? 'mr-2' : 'ml-2'}`}>
                      SaaSHub
                    </span>
                  </div>

                  {/* Mobile Navigation */}
                  <div className="flex flex-col space-y-2">
                    {navigation.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`nav-item text-base font-medium py-3 px-4 rounded-lg transition-all duration-200 relative ${
                            isActive
                              ? 'bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-semibold bg-accent/20'
                              : 'hover:bg-accent/50'
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          {item.name}
                          {isActive && (
                            <div className={`absolute top-1/2 transform -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-purple-600 to-blue-600 rounded-full ${
                              isRTL ? 'right-0' : 'left-0'
                            }`}></div>
                          )}
                        </Link>
                      );
                    })}
                  </div>

                  {/* Mobile Auth Buttons */}
                  {!isAuthenticated && (
                    <div className="flex flex-col space-y-3 pt-4 border-t border-border/20">
                      <Button
                        variant="ghost"
                        asChild
                        onClick={() => setIsOpen(false)}
                        className="justify-start h-12 text-base"
                      >
                        <Link href="/login">{t.login}</Link>
                      </Button>
                      <Button
                        asChild
                        onClick={() => setIsOpen(false)}
                        className="justify-start h-12 text-base bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      >
                        <Link href="/signup">{t.signup}</Link>
                      </Button>
                    </div>
                  )}

                  {/* Mobile User Menu */}
                  {isAuthenticated && (
                    <div className="pt-4 border-t border-border/20">
                      <div className={`flex items-center space-x-3 p-3 rounded-lg bg-accent/30 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user?.avatar} alt={user?.name} />
                          <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                            {user?.name?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className={isRTL ? 'text-right' : 'text-left'}>
                          <p className="text-sm font-medium">{user?.name}</p>
                          <p className="text-xs text-muted-foreground">{user?.email}</p>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2 mt-4">
                        <Button
                          variant="ghost"
                          asChild
                          onClick={() => setIsOpen(false)}
                          className="justify-start h-12 text-base"
                        >
                          <Link href="/dashboard" className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <Settings className={`h-4 w-4 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                            {t.dashboard}
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            logout();
                            setIsOpen(false);
                          }}
                          className="justify-start h-12 text-base text-destructive hover:text-destructive"
                        >
                          <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <LogOut className={`h-4 w-4 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                            {t.logout || 'Logout'}
                          </div>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}