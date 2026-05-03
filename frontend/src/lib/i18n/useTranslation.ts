'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { translations, TranslationKey, Locale } from './translations';

export function useTranslation() {
  // Casting to any to solve the 'unknown' state issue temporarily while maintaining reactivity
  const language = useSelector((state: RootState) => (state as any).ui.language) as Locale;
  
  const t = (key: TranslationKey): string => {
    const localeTranslations = translations[language] || translations.en;
    return (localeTranslations as any)[key] || key;
  };

  return { t, language };
}
