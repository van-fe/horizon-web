import type { PartialLocaleDateSpecialSettings } from './specialSetting';
import type { PartialLocaleDateFormatSettings } from './formattingSetting';
import type { PartialLocaleDateFormatDictionaries } from './dictionary';
import type { DateLocaleAvailableShownType } from './enum';

export type DateLocaleOptions = {
  dictionaries?: PartialLocaleDateFormatDictionaries;
  d?: LocaleDateLocaleMethod;
  dateFormattingSetting?: PartialLocaleDateFormatSettings;
  dateSpecialConfig?: PartialLocaleDateSpecialSettings;
};

export type LocaleDateLocaleMethod = (
  date: Date | number | string,
  dateType: DateLocaleAvailableShownType,
) => string;
