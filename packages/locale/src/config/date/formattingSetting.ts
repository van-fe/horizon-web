import type { DateLocaleAvailableDateType, DateLocaleAvailableFormattingType } from './enum';
import type { LocaleSupportLangV2 } from '../lang';

export type LocaleDateFormatSetting = Record<
  DateLocaleAvailableDateType,
  Partial<Record<DateLocaleAvailableFormattingType, string>>
>;
export type LocaleDateFormatSettings = Record<LocaleSupportLangV2, LocaleDateFormatSetting>;
export type PartialLocaleDateFormatSettings = Partial<LocaleDateFormatSettings>;
