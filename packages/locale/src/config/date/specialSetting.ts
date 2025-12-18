import type { LocaleSupportLang } from '../lang';

export type LocaleDateSpecialSetting = {
  date: string;
  dateSplit: string;
  dateSuffix: string;
  dateSuffixSplit: string;
  time: string;
  timeSplit: string;
  timeSuffix: string;
  timeSuffixSplit: string;
};

export type LocaleDateSpecialSettings = Record<LocaleSupportLang, LocaleDateSpecialSetting>;
export type PartialLocaleDateSpecialSettings = Partial<LocaleDateSpecialSettings>;
