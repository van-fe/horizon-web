import type { LocalOptionType, LangService, NumberService, DateService } from '@nio-fe/locale';
import { LocaleService, LocaleSupportLangV2 } from '@nio-fe/locale';
import type { App } from 'vue';
import { reactive } from 'vue';
import LangLocale from './components/LangLocale';
import DateLocale from './components/DateLocale';
import NumberLocale from './components/NumberLocale';
import directives from './directives';

export default class VueLocaleService extends LocaleService {
  public static currInstance: VueLocaleService;

  constructor(props: LocalOptionType) {
    super(props);
    this.langService = reactive(this.langService) as LangService;
    this.numberService = reactive(this.numberService) as NumberService;
    this.dateService = reactive(this.dateService) as DateService;
  }

  public setOption(localeOptions: LocalOptionType) {
    return reactive({
      current: LocaleSupportLangV2.En,
      ...localeOptions,
    });
  }

  public mixin(app: App): void {
    app.config.globalProperties.t = this.langService.t;
    app.config.globalProperties.td = this.langService.td;
    app.config.globalProperties.d = this.dateService.d;
    app.config.globalProperties.n = this.numberService.n;
  }

  public defineComponents(app: App): void {
    app.component(LangLocale.name!, LangLocale);
    app.component(DateLocale.name!, DateLocale);
    app.component(NumberLocale.name!, NumberLocale);
  }

  public defineDirectives(app: App): void {
    Object.entries(directives).forEach(([key, value]) => {
      app.directive(key, value);
    });
  }

  static install(app: App, options: LocalOptionType): void {
    if (!VueLocaleService.currInstance) {
      VueLocaleService.currInstance = new VueLocaleService(options);
      VueLocaleService.currInstance.mixin(app);
      VueLocaleService.currInstance.defineComponents(app);
      VueLocaleService.currInstance.defineDirectives(app);
    }
  }
}
