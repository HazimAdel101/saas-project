'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { User, Shield, X } from 'lucide-react';
import { useAuthStore } from '@/lib/store';
import { useDirection } from '@/hooks/useDirection';

export function NotificationBanner() {
  const searchParams = useSearchParams();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { rtl, isRTL } = useDirection();
  const [showLoggedInMessage, setShowLoggedInMessage] = useState(false);
  const [showAccessDenied, setShowAccessDenied] = useState(false);

  useEffect(() => {
    // Check if user was redirected here after login
    if (searchParams.get('loggedIn') === 'true') {
      setShowLoggedInMessage(true);
    }

    // Check if user was denied access to admin area
    if (searchParams.get('accessDenied') === 'true') {
      setShowAccessDenied(true);
    }
  }, [searchParams]);

  if (!showLoggedInMessage && !showAccessDenied) {
    return null;
  }

  return (
    <>
      {/* Logged In User Notification */}
      {showLoggedInMessage && isAuthenticated && user && (
        <div className="bg-green-50 dark:bg-green-900/20 border-b border-green-200 dark:border-green-800">
          <div className="container mx-auto px-4 py-3">
            <div className={`flex items-center justify-between ${rtl('flex-row-reverse', '')}`}>
              <div className={`flex items-center gap-3 ${rtl('flex-row-reverse', '')}`}>
                <User className="h-5 w-5 text-green-600 dark:text-green-400" />
                <div className={rtl('text-right', 'text-left')}>
                  <p className="text-sm font-medium text-green-800 dark:text-green-200">
                    {isRTL ? `مرحباً، ${user.name}!` : `Welcome back, ${user.name}!`}
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400">
                    {isRTL ? 'لديك حساب نشط بالفعل. يمكنك تصفح خدماتنا المتميزة.' : 'You already have an active account. Browse our premium services.'}
                  </p>
                </div>
              </div>
              <div className={`flex items-center gap-2 ${rtl('flex-row-reverse', '')}`}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="text-green-700 border-green-300 hover:bg-green-100 dark:text-green-300 dark:border-green-600 dark:hover:bg-green-800"
                >
                  {isRTL ? 'تسجيل الخروج' : 'Logout'}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowLoggedInMessage(false)}
                  className="text-green-600 hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-800"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Access Denied Notification */}
      {showAccessDenied && (
        <div className="bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800">
          <div className="container mx-auto px-4 py-3">
            <div className={`flex items-center justify-between ${rtl('flex-row-reverse', '')}`}>
              <div className={`flex items-center gap-3 ${rtl('flex-row-reverse', '')}`}>
                <Shield className="h-5 w-5 text-red-600 dark:text-red-400" />
                <p className="text-sm font-medium text-red-800 dark:text-red-200">
                  {isRTL ? 'ليس لديك صلاحية للوصول إلى لوحة الإدارة.' : 'You do not have permission to access the admin dashboard.'}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAccessDenied(false)}
                className="text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-800"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
