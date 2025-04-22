import type { LocalOptionType, LocaleSupportLang } from '../config';
import { LocaleSupportLangV2 } from '../config';

export class BaseService {
  private currOptions!: LocalOptionType;

  public get current(): LocaleSupportLangV2 | LocaleSupportLang {
    return this.options.current!;
  }

  public set current(lang: LocaleSupportLangV2 | LocaleSupportLang) {
    this.options.current = lang;
  }

  public set options(options: LocalOptionType) {
    this.currOptions = options;
  }

  public get options(): LocalOptionType {
    return this.currOptions;
  }

  constructor(options: LocalOptionType) {
    this.options = options;
    this.current = options.current || LocaleSupportLangV2.En;
  }
}
