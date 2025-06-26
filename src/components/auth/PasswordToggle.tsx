'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordToggleProps {
  id: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  dir?: 'ltr' | 'rtl';
  isRTL?: boolean;
  hasError?: boolean;
}

export function PasswordToggle({
  id,
  placeholder,
  value,
  onChange,
  className = '',
  dir = 'ltr',
  isRTL = false,
  hasError = false,
}: PasswordToggleProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        id={id}
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${isRTL ? 'text-right pr-10' : 'text-left pr-10'} ${hasError ? 'border-destructive' : ''} ${className}`}
        dir={dir}
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
  );
}
