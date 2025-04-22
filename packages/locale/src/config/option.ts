import type { LangOptions, LocaleSupportLangV2, LocaleSupportLang } from './lang';
import type { NumberLocaleOptions } from './number';
import type { DateLocaleOptions } from './date';

export interface LocalOptionType {
  current?: LocaleSupportLang | LocaleSupportLangV2;
  lang?: LangOptions;
  dateLocale?: DateLocaleOptions;
  numberLocale?: NumberLocaleOptions;
}
