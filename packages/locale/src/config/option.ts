import type { LangOptions, LocaleSupportLang, LocaleSupportLang } from './lang';
import type { NumberLocaleOptions } from './number';
import type { DateLocaleOptions } from './date';

export interface LocalOptionType {
  current?: LocaleSupportLang | LocaleSupportLang;
  lang?: LangOptions;
  dateLocale?: DateLocaleOptions;
  numberLocale?: NumberLocaleOptions;
}
