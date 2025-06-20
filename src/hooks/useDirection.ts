import { useLocale } from 'next-intl';

export function useDirection() {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  
  return {
    isRTL,
    direction: isRTL ? 'rtl' : 'ltr',
    textAlign: isRTL ? 'text-right' : 'text-left',
    flexDirection: isRTL ? 'flex-row-reverse' : '',
    marginStart: isRTL ? 'mr-' : 'ml-',
    marginEnd: isRTL ? 'ml-' : 'mr-',
    paddingStart: isRTL ? 'pr-' : 'pl-',
    paddingEnd: isRTL ? 'pl-' : 'pr-',
    borderStart: isRTL ? 'border-r-' : 'border-l-',
    borderEnd: isRTL ? 'border-l-' : 'border-r-',
    roundedStart: isRTL ? 'rounded-r-' : 'rounded-l-',
    roundedEnd: isRTL ? 'rounded-l-' : 'rounded-r-',
    // Helper function for conditional classes
    rtl: (rtlClass: string, ltrClass: string = '') => isRTL ? rtlClass : ltrClass,
    // Helper for icon rotation in RTL
    iconRotation: isRTL ? 'rotate-180' : ''
  };
}
