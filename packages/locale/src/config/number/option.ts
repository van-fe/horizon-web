import type { LocaleNumberLocaleDictionaries } from './dictionary';

export type LocaleNumberLocaleMethod = (
  number: number,
  options?: LocaleNumberFormatterOptions,
) => string;

export type LocaleNumberFormatterOptions = {
  currency?: boolean;
  minimumIntegerDigits?: number;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  minimumSignificantDigits?: number;
  maximumSignificantDigits?: number;
};

export type NumberLocaleOptions = {
  dictionaries?: LocaleNumberLocaleDictionaries;
  n?: LocaleNumberLocaleMethod;
};
