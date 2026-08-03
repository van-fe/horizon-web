import type { DateLocaleAvailableShownType } from './enum';
import type { LocaleSupportLang } from '../lang';

export type LocaleDateFormatOptions = {
  weekday?: 'long' | 'short' | 'narrow' | string;
  year?: 'numeric' | '2-digit' | string;
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow' | string;
  day?: 'numeric' | '2-digit' | string;
  hour?: 'numeric' | '2-digit' | string;
  minute?: 'numeric' | '2-digit' | string;
  second?: 'numeric' | '2-digit' | string;
  timeZoneName?: 'long' | 'short' | string;
  hour12?: 'short' | string;
};
export type LocaleDateLocaleDictionary = Record<
  DateLocaleAvailableShownType,
  LocaleDateFormatOptions
>;
export type LocaleDateLocaleDictionaries = Record<LocaleSupportLang, LocaleDateLocaleDictionary>;

export type PartialLocaleDateFormatDictionaries = Partial<LocaleDateLocaleDictionaries>;
