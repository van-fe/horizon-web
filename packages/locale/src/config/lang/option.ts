import type { PartialLocaleLangFileType, LocaleSupportLang } from '../lang';

export type LocaleLangMethod = (path: string, lang?: LocaleSupportLang) => string;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LocaleReturnLangDictionaryData {}

export type LocaleReturnLangDictionary = () => LocaleReturnLangDictionaryData;

export type LangOptions = {
  dictionaries: PartialLocaleLangFileType;
  t?: LocaleLangMethod;
};
