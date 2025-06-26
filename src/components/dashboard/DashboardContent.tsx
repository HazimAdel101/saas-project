'use client';

import { useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/lib/store';
import { User, Package, Settings, LogOut } from 'lucide-react';

export function DashboardContent() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const isRTL = locale === 'ar';
  const { user, isAuthenticated, isLoading, logout, checkAuth } = useAuthStore();

  useEffect(() => {
    // Check authentication on component mount
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (isLoading || !isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className={`max-w-4xl mx-auto space-y-8 ${isRTL ? 'text-right' : 'text-left'}`}>
        {/* Header */}
        <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div>
            <h1 className="text-3xl font-bold">
              {isRTL ? `مرحباً، ${user.name}` : `Welcome, ${user.name}`}
            </h1>
            <p className="text-muted-foreground mt-1">
              {t('navigation.dashboard')}
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <LogOut className="h-4 w-4" />
            {t('navigation.logout')}
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className={`flex flex-row items-center justify-between space-y-0 pb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <CardTitle className="text-sm font-medium">
                {isRTL ? 'الاشتراكات النشطة' : 'Active Subscriptions'}
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user.subscriptions?.length || 0}</div>
              <p className="text-xs text-muted-foreground">
                {isRTL ? 'من إجمالي الخدمات' : 'total services'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className={`flex flex-row items-center justify-between space-y-0 pb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <CardTitle className="text-sm font-medium">
                {isRTL ? 'تاريخ الانضمام' : 'Member Since'}
              </CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Date(user.createdAt).toLocaleDateString(locale)}
              </div>
              <p className="text-xs text-muted-foreground">
                {isRTL ? 'عضو مميز' : 'Premium member'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className={`flex flex-row items-center justify-between space-y-0 pb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <CardTitle className="text-sm font-medium">
                {isRTL ? 'الحالة' : 'Status'}
              </CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                  {isRTL ? 'نشط' : 'Active'}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {isRTL ? 'حساب مفعل' : 'Account verified'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Account Information */}
        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <User className="h-5 w-5" />
              {isRTL ? 'معلومات الحساب' : 'Account Information'}
            </CardTitle>
            <CardDescription>
              {isRTL ? 'تفاصيل حسابك الشخصي' : 'Your personal account details'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${isRTL ? 'text-right' : 'text-left'}`}>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  {isRTL ? 'الاسم' : 'Name'}
                </label>
                <p className="text-sm">{user.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  {isRTL ? 'البريد الإلكتروني' : 'Email'}
                </label>
                <p className="text-sm">{user.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  {isRTL ? 'تاريخ الانضمام' : 'Joined'}
                </label>
                <p className="text-sm">
                  {new Date(user.createdAt).toLocaleDateString(locale, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  {isRTL ? 'المعرف' : 'User ID'}
                </label>
                <p className="text-sm font-mono">{user.id}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>
              {isRTL ? 'إجراءات سريعة' : 'Quick Actions'}
            </CardTitle>
            <CardDescription>
              {isRTL ? 'الإجراءات الأكثر استخداماً' : 'Most commonly used actions'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${isRTL ? 'text-right' : 'text-left'}`}>
              <Button variant="outline" className="h-auto p-4 justify-start">
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Package className="h-5 w-5" />
                  <div>
                    <div className="font-medium">
                      {isRTL ? 'تصفح الخدمات' : 'Browse Services'}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {isRTL ? 'اكتشف خدمات جديدة' : 'Discover new services'}
                    </div>
                  </div>
                </div>
              </Button>

              <Button variant="outline" className="h-auto p-4 justify-start">
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Settings className="h-5 w-5" />
                  <div>
                    <div className="font-medium">
                      {isRTL ? 'إعدادات الحساب' : 'Account Settings'}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {isRTL ? 'إدارة حسابك' : 'Manage your account'}
                    </div>
                  </div>
                </div>
              </Button>

              <Button variant="outline" className="h-auto p-4 justify-start">
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <User className="h-5 w-5" />
                  <div>
                    <div className="font-medium">
                      {isRTL ? 'الملف الشخصي' : 'Profile'}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {isRTL ? 'تحديث معلوماتك' : 'Update your info'}
                    </div>
                  </div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
