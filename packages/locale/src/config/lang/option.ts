import type { PartialLocaleLangFileType, LocaleSupportLangV2 } from '../lang';

export type LocaleLangMethod = (path: string, lang?: LocaleSupportLangV2) => string;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LocaleReturnLangDictionaryData {}

export type LocaleReturnLangDictionary = () => LocaleReturnLangDictionaryData;

export type LangOptions = {
  dictionaries: PartialLocaleLangFileType;
  t?: LocaleLangMethod;
};
