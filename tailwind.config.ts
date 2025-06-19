import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        'arabic': ['Noto Sans Arabic', 'system-ui', '-apple-system', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      // RTL-specific utilities
      spacing: {
        'rtl-1': '0.25rem',
        'rtl-2': '0.5rem',
        'rtl-3': '0.75rem',
        'rtl-4': '1rem',
        'rtl-6': '1.5rem',
        'rtl-8': '2rem',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    // RTL plugin
    function({ addUtilities, theme, e }: any) {
      const rtlUtilities = {
        '.rtl-space-x-1 > :not([hidden]) ~ :not([hidden])': {
          '--tw-space-x-reverse': '1',
          'margin-right': 'calc(0.25rem * var(--tw-space-x-reverse))',
          'margin-left': 'calc(0.25rem * calc(1 - var(--tw-space-x-reverse)))',
        },
        '.rtl-space-x-2 > :not([hidden]) ~ :not([hidden])': {
          '--tw-space-x-reverse': '1',
          'margin-right': 'calc(0.5rem * var(--tw-space-x-reverse))',
          'margin-left': 'calc(0.5rem * calc(1 - var(--tw-space-x-reverse)))',
        },
        '.rtl-space-x-3 > :not([hidden]) ~ :not([hidden])': {
          '--tw-space-x-reverse': '1',
          'margin-right': 'calc(0.75rem * var(--tw-space-x-reverse))',
          'margin-left': 'calc(0.75rem * calc(1 - var(--tw-space-x-reverse)))',
        },
        '.rtl-space-x-4 > :not([hidden]) ~ :not([hidden])': {
          '--tw-space-x-reverse': '1',
          'margin-right': 'calc(1rem * var(--tw-space-x-reverse))',
          'margin-left': 'calc(1rem * calc(1 - var(--tw-space-x-reverse)))',
        },
        '.rtl-space-x-6 > :not([hidden]) ~ :not([hidden])': {
          '--tw-space-x-reverse': '1',
          'margin-right': 'calc(1.5rem * var(--tw-space-x-reverse))',
          'margin-left': 'calc(1.5rem * calc(1 - var(--tw-space-x-reverse)))',
        },
        '.rtl-space-x-8 > :not([hidden]) ~ :not([hidden])': {
          '--tw-space-x-reverse': '1',
          'margin-right': 'calc(2rem * var(--tw-space-x-reverse))',
          'margin-left': 'calc(2rem * calc(1 - var(--tw-space-x-reverse)))',
        },
        '.ltr-numbers': {
          'direction': 'ltr',
          'unicode-bidi': 'embed',
          'display': 'inline-block',
        },
        '.rtl-flip': {
          'transform': 'scaleX(-1)',
        },
        '.rtl-text-right': {
          'text-align': 'right',
        },
        '.rtl-text-left': {
          'text-align': 'left',
        },
        '.ltr-text-right': {
          'text-align': 'right',
        },
        '.ltr-text-left': {
          'text-align': 'left',
        },
      };

      addUtilities(rtlUtilities);
    },
  ],
};
export default config;