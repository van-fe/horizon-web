import type { LocaleSupportLangV2 } from '../lang';

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

export type LocaleDateSpecialSettings = Record<LocaleSupportLangV2, LocaleDateSpecialSetting>;
export type PartialLocaleDateSpecialSettings = Partial<LocaleDateSpecialSettings>;
