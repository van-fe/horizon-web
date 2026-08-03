import type { LocalOptionType } from '../config';
import { LocaleSupportLang } from '../config';

export class BaseService {
  private currOptions!: LocalOptionType;

  public get current(): LocaleSupportLang {
    return this.options.current!;
  }

  public set current(lang: LocaleSupportLang) {
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
    this.current = options.current || LocaleSupportLang.En;
  }
}
