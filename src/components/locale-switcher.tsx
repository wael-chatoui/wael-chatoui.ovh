'use client';

import { useTransition } from 'react';
import { useLocale } from 'next-intl';
import { setUserLocale } from '@/i18n/locale';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  const toggle = () => {
    const next = locale === 'fr' ? 'en' : 'fr';
    startTransition(async () => {
      await setUserLocale(next);
    });
  };

  return (
    <button
      onClick={toggle}
      disabled={isPending}
      className={`text-xs font-body tracking-widest uppercase px-3 py-1.5 border border-border rounded-full text-text-muted hover:text-text hover:border-text-subtle transition-all duration-300 ${
        isPending ? 'opacity-50' : ''
      }`}
    >
      {locale === 'fr' ? 'EN' : 'FR'}
    </button>
  );
}
