'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { useAuthStore } from '@/lib/store';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const { login } = useAuthStore();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = t('auth.validation.nameRequired');
    }

    if (!formData.email) {
      newErrors.email = t('auth.validation.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('auth.validation.emailInvalid');
    }

    if (!formData.password) {
      newErrors.password = t('auth.validation.passwordRequired');
    } else if (formData.password.length < 8) {
      newErrors.password = t('auth.validation.passwordMinLength');
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t('auth.validation.confirmPasswordRequired');
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('auth.validation.passwordsNotMatch');
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = t('auth.validation.termsRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Signup successful
        login(data.user);

        // Redirect based on user role
        const redirectPath = data.redirectTo || '/';
        window.location.href = `/${locale}${redirectPath}`;
      } else {
        // Handle error
        setErrors({ general: data.error || 'Signup failed' });
      }
    } catch (error) {
      console.error('Signup error:', error);
      setErrors({ general: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className={`flex items-center justify-center mb-8 ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-tr from-purple-600 to-blue-600">
            <Package className="h-7 w-7 text-white" />
          </div>
          <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            SaaSHub
          </span>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardHeader className={`space-y-1 ${isRTL ? 'text-right' : 'text-left'}`}>
            <CardTitle className="text-2xl font-bold text-center">
              {t('auth.signup.title')}
            </CardTitle>
            <CardDescription className="text-center text-muted-foreground">
              {t('auth.signup.subtitle')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* General Error */}
              {errors.general && (
                <div className="p-3 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                  <p className={`text-sm text-red-600 dark:text-red-400 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {errors.general}
                  </p>
                </div>
              )}
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <User className="h-4 w-4" />
                  {t('auth.signup.name')}
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder={t('auth.signup.namePlaceholder')}
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`${isRTL ? 'text-right' : 'text-left'} ${errors.name ? 'border-destructive' : ''}`}
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
                {errors.name && (
                  <p className={`text-sm text-destructive ${isRTL ? 'text-right' : 'text-left'}`}>
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Mail className="h-4 w-4" />
                  {t('auth.signup.email')}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('auth.signup.emailPlaceholder')}
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`${isRTL ? 'text-right' : 'text-left'} ${errors.email ? 'border-destructive' : ''}`}
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
                {errors.email && (
                  <p className={`text-sm text-destructive ${isRTL ? 'text-right' : 'text-left'}`}>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Lock className="h-4 w-4" />
                  {t('auth.signup.password')}
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t('auth.signup.passwordPlaceholder')}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`${isRTL ? 'text-right pr-10' : 'text-left pr-10'} ${errors.password ? 'border-destructive' : ''}`}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className={`absolute top-0 h-full px-3 py-2 hover:bg-transparent ${isRTL ? 'left-0' : 'right-0'}`}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className={`text-sm text-destructive ${isRTL ? 'text-right' : 'text-left'}`}>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Lock className="h-4 w-4" />
                  {t('auth.signup.confirmPassword')}
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder={t('auth.signup.confirmPasswordPlaceholder')}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className={`${isRTL ? 'text-right pr-10' : 'text-left pr-10'} ${errors.confirmPassword ? 'border-destructive' : ''}`}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className={`absolute top-0 h-full px-3 py-2 hover:bg-transparent ${isRTL ? 'left-0' : 'right-0'}`}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {errors.confirmPassword && (
                  <p className={`text-sm text-destructive ${isRTL ? 'text-right' : 'text-left'}`}>
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Terms Agreement */}
              <div className="space-y-2">
                <div className={`flex items-start space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                  <input
                    id="agreeTerms"
                    type="checkbox"
                    checked={formData.agreeTerms}
                    onChange={(e) => handleInputChange('agreeTerms', e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary mt-1"
                  />
                  <Label htmlFor="agreeTerms" className="text-sm leading-5">
                    {t('auth.signup.agreeTerms')}
                  </Label>
                </div>
                {errors.agreeTerms && (
                  <p className={`text-sm text-destructive ${isRTL ? 'text-right' : 'text-left'}`}>
                    {errors.agreeTerms}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-2.5"
                disabled={isLoading}
              >
                {isLoading ? t('common.loading') : t('auth.signup.createAccount')}
              </Button>

              {/* Sign In Link */}
              <div className={`text-center text-sm ${isRTL ? 'space-x-reverse space-x-1' : 'space-x-1'}`}>
                <span className="text-muted-foreground">{t('auth.signup.haveAccount')}</span>
                <Link
                  href="/login"
                  className="text-primary hover:underline font-medium"
                >
                  {t('auth.signup.signIn')}
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
