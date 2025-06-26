'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock } from 'lucide-react';
import { useAuthStore } from '@/lib/store';
import { PasswordToggle } from '.';

export function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const { login } = useAuthStore();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          rememberMe: formData.rememberMe,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful
        login(data.user);

        // Redirect based on user role
        const redirectPath = data.redirectTo || '/dashboard';
        window.location.href = `/${locale}${redirectPath}`;
      } else {
        // Handle error
        setErrors({ general: data.error || 'Login failed' });
      }
    } catch (error) {
      console.error('Login error:', error);
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
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* General Error */}
      {errors.general && (
        <div className="p-3 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <p className={`text-sm text-red-600 dark:text-red-400 ${isRTL ? 'text-right' : 'text-left'}`}>
            {errors.general}
          </p>
        </div>
      )}
      
      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email" className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Mail className="h-4 w-4" />
          {t('auth.login.email')}
        </Label>
        <Input
          id="email"
          type="email"
          placeholder={t('auth.login.emailPlaceholder')}
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
          {t('auth.login.password')}
        </Label>
        <PasswordToggle
          id="password"
          placeholder={t('auth.login.passwordPlaceholder')}
          value={formData.password}
          onChange={(value) => handleInputChange('password', value)}
          dir={isRTL ? 'rtl' : 'ltr'}
          isRTL={isRTL}
          hasError={!!errors.password}
        />
        {errors.password && (
          <p className={`text-sm text-destructive ${isRTL ? 'text-right' : 'text-left'}`}>
            {errors.password}
          </p>
        )}
      </div>

      {/* Remember Me & Forgot Password */}
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
          <input
            id="remember"
            type="checkbox"
            checked={formData.rememberMe}
            onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <Label htmlFor="remember" className="text-sm">
            {t('auth.login.rememberMe')}
          </Label>
        </div>
        <a
          href="#"
          className="text-sm text-primary hover:underline"
        >
          {t('auth.login.forgotPassword')}
        </a>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-2.5"
        disabled={isLoading}
      >
        {isLoading ? t('common.loading') : t('auth.login.signIn')}
      </Button>

      {/* Sign Up Link */}
      <div className={`text-center text-sm ${isRTL ? 'space-x-reverse space-x-1' : 'space-x-1'}`}>
        <span className="text-muted-foreground">{t('auth.login.noAccount')}</span>
        <Link
          href="/signup"
          className="text-primary hover:underline font-medium"
        >
          {t('auth.login.signUp')}
        </Link>
      </div>
    </form>
  );
}
