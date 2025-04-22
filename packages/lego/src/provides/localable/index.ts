import { computed, reactive, ref } from 'vue';
import type { App, ComputedRef, InjectionKey, Plugin } from 'vue';
import type { LegoOption } from '~/makeInstaller';
import type { EnGB } from '~/locales/en-GB';
import type { LocalOptionType } from '@nio-fe/locale-vue';
import { LocaleSupportLangV2, VueLocaleService } from '@nio-fe/locale-vue';
import { dictionaries } from '~/locales';
import deepMerge from 'deepmerge';

export const localeInjectKey = Symbol.for('[lego]: locale') as InjectionKey<
  ComputedRef<VueLocaleService>
>;

const LOCALE_PROVIDED_KEY = Symbol.for('LOCALE_PROVIDED_KEY');

export const defaultLocale = ref<VueLocaleService | null>(null);

export default function localableProvide(app: App, options?: LegoOption): App {
  if (app[LOCALE_PROVIDED_KEY]) return app;

  app[LOCALE_PROVIDED_KEY] = true;

  const defaultLocaleOption: LocalOptionType = {
    current: LocaleSupportLangV2.En,
    lang: {
      dictionaries,
    },
  };

  const localeOption = deepMerge(defaultLocaleOption, options?.locale ?? {});

  app.use(VueLocaleService as unknown as Plugin, localeOption);

  defaultLocale.value = VueLocaleService.currInstance;

  const locale = computed(() => reactive(VueLocaleService.currInstance));

  app.provide(localeInjectKey, locale);

  return app;
}

declare module '@nio-fe/locale' {
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
