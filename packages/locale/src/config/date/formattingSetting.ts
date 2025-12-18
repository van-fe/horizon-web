import type { DateLocaleAvailableDateType, DateLocaleAvailableFormattingType } from './enum';
import type { LocaleSupportLang } from '../lang';

export type LocaleDateFormatSetting = Record<
  DateLocaleAvailableDateType,
  Partial<Record<DateLocaleAvailableFormattingType, string>>
>;
export type LocaleDateFormatSettings = Record<LocaleSupportLang, LocaleDateFormatSetting>;
export type PartialLocaleDateFormatSettings = Partial<LocaleDateFormatSettings>;
