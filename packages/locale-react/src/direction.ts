import { LocaleSupportLang } from '@aurora/locale';
import { useLocale } from './context';

export type LocaleDirection = 'ltr' | 'rtl';

export function getLocaleDirection(locale: LocaleSupportLang): LocaleDirection {
  return locale === LocaleSupportLang.AE ? 'rtl' : 'ltr';
}

export function useLocaleDirection(): LocaleDirection {
  return getLocaleDirection(useLocale().current);
}
