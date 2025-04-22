import type { LocaleSupportLangV2 } from '../lang';

export type LocaleNumberLocaleDictionary = {
  segmentsDigits: number;
  segmentsBy: string;
  decimalSegmentsBy: string;
  currency: {
    unit: string;
    isPrefix?: boolean;
    isSuffix?: boolean;
    hasSpace: boolean;
  };
};

export type LocaleNumberLocaleDictionaries = Record<
  LocaleSupportLangV2,
  LocaleNumberLocaleDictionary
>;
