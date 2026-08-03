import NumberService from './service/number/NumberService';
import ReadDirectionService from './service/readDirection';
import LangService from './service/lang/LangService';
import type { LocalOptionType } from './config';
import { LocaleSupportLang } from './config/lang/enum';
import DateService from './service/date/DateService';

export class LocaleService {
  public options: LocalOptionType;

  public langService: LangService;

  public dateService: DateService;

  public numberService: NumberService;

  public readDirectionService: ReadDirectionService;

  public static instance: LocaleService;

  public get current(): LocaleSupportLang {
    return this.options.current!;
  }

  public set current(current: LocaleSupportLang) {
    this.options.current = current;
  }

  constructor(localeOptions: LocalOptionType) {
    this.options = this.setOption(localeOptions);

    // new services
    this.langService = new LangService(this.options);
    this.dateService = new DateService(this.options);
    this.numberService = new NumberService(this.options);
    this.readDirectionService = new ReadDirectionService(this.options);
  }

  public setOption(localeOptions: LocalOptionType) {
    return {
      current: LocaleSupportLang.En,
      ...localeOptions,
    };
  }
}
