import type { LangOptions, LocaleSupportLang } from './lang';
import type { NumberLocaleOptions } from './number';
import type { DateLocaleOptions } from './date';

export interface LocalOptionType {
  current?: LocaleSupportLang;
  lang?: LangOptions;
  dateLocale?: DateLocaleOptions;
  numberLocale?: NumberLocaleOptions;
}
