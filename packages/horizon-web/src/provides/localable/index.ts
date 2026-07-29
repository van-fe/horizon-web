import { computed, ref } from 'vue';
import type { App, ComputedRef, InjectionKey, Plugin } from 'vue';
import type { HorizonWebOption } from '~/makeInstaller';
import type { EnGB } from '~/locales/en-GB';
import type { LocalOptionType } from '@aurora/locale-vue';
import { LocaleSupportLang, VueLocaleService } from '@aurora/locale-vue';
import { dictionaries } from '~/locales';
import deepMerge from 'deepmerge';
import syncDayjsLocale from './dayjsLocale';

export const localeInjectKey = Symbol.for('[horizon-web]: locale') as InjectionKey<
  ComputedRef<VueLocaleService>
>;

const LOCALE_PROVIDED_KEY = Symbol.for('LOCALE_PROVIDED_KEY');

export const defaultLocale = ref<VueLocaleService | null>(null);

export default function localableProvide(app: App, options?: HorizonWebOption): App {
  if (app[LOCALE_PROVIDED_KEY]) return app;

  app[LOCALE_PROVIDED_KEY] = true;

  const defaultLocaleOption: LocalOptionType = {
    current: LocaleSupportLang.En,
    lang: {
      dictionaries,
    },
  };

  const localeOption = deepMerge(defaultLocaleOption, options?.locale ?? {});

  app.use(VueLocaleService as unknown as Plugin, localeOption);

  defaultLocale.value = VueLocaleService.currInstance;

  const locale = computed(() => VueLocaleService.currInstance as VueLocaleService);

  app.provide(localeInjectKey, locale);
  // The locale package registers its Arabic dayjs locale as a bootstrap
  // default. Keep dayjs in sync with the reactive Horizon Web locale so date
  // components do not inherit that default on English/Chinese pages.
  syncDayjsLocale(locale);

  return app;
}

declare module '@aurora/locale' {
  type LocaleReturnLangDictionaryDataType = {
    [K in keyof typeof EnGB]: (typeof EnGB)[K];
  };

  // eslint-disable-next-line
  interface LocaleReturnLangDictionaryData extends LocaleReturnLangDictionaryDataType {}
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    td(): typeof EnGB;
  }
  interface App {
    [LOCALE_PROVIDED_KEY]: boolean;
  }
}
