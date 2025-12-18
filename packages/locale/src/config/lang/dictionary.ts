import type { LocaleSupportLangV2 } from './enum';

export interface LocaleLangDictionary {
  [index: string | number]: string | string[] | LocaleLangDictionary;
}

export type LocaleLangDictionaries = Record<LocaleSupportLangV2, LocaleLangDictionary>;

export type PartialLocaleLangFileType = Partial<LocaleLangDictionaries>;
