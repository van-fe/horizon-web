import type { LocaleSupportLang } from './enum';

export interface LocaleLangDictionary {
  [index: string | number]: string | string[] | LocaleLangDictionary;
}

export type LocaleLangDictionaries = Record<LocaleSupportLang, LocaleLangDictionary>;

export type PartialLocaleLangFileType = Partial<LocaleLangDictionaries>;
