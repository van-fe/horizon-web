import type {
  DateService,
  LangOptions,
  LangService,
  LocalOptionType,
  NumberService,
} from '@aurora/locale';
import { LocaleService, LocaleSupportLang } from '@aurora/locale';
import type { App } from 'vue';
import { reactive } from 'vue';
import LangLocale from './components/LangLocale';
import DateLocale from './components/DateLocale';
import NumberLocale from './components/NumberLocale';
import directives from './directives';

export type VueLocaleOptions = LocalOptionType & {
  lang: LangOptions;
};

export default class VueLocaleService extends LocaleService {
  public static currInstance: VueLocaleService;

  private static readonly instances = new WeakMap<App, VueLocaleService>();

  constructor(props: VueLocaleOptions) {
    super(props);
    this.langService = reactive(this.langService) as LangService;
    this.numberService = reactive(this.numberService) as NumberService;
    this.dateService = reactive(this.dateService) as DateService;
  }

  public setOption(localeOptions: LocalOptionType) {
    return reactive({
      current: LocaleSupportLang.En,
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

  public static getInstance(app: App): VueLocaleService | undefined {
    return VueLocaleService.instances.get(app);
  }

  static install(app: App, options: VueLocaleOptions): void {
    const instance = new VueLocaleService(options);

    instance.mixin(app);
    instance.defineComponents(app);
    instance.defineDirectives(app);

    VueLocaleService.instances.set(app, instance);
    VueLocaleService.currInstance = instance;
  }
}
