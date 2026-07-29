# Internationalization

HorizonWeb components **default** to English. If you want to use other languages, you can refer to the following solutions.

## Global Configuration

HorizonWeb provides global configuration for internationalization.

```ts
import App from './App.vue';
import { createApp } from 'vue';
import horizon-web, { defineOption } from '@aurora/horizon-web';
import { LocaleSupportLang } from "@aurora/locale-vue";

createApp(App)
  .use(horizon-web, defineOption({
  locale: {
    current: LocaleSupportLang.ZH_CN,
  }
}));
```

---

## On-Demand Loading

If you use on-demand loading, you need to import and use `HorizonWebProvides` separately

```ts
import App from './App.vue';
import { createApp } from 'vue';
import { HorizonWebProvides, defineOption } from '@aurora/horizon-web';
import { LocaleSupportLang } from "@aurora/locale-vue";

createApp(App)
  .use(HorizonWebProvides, defineOption({
    locale: {
      current: LocaleSupportLang.ZH_CN,
    }
  }));
```

---

## Application

HorizonWeb also provides a Vue component [Application](../../demos/components/Application) for global configuration of internationalization settings
If you change `locale`, you can dynamically modify the language

:::demo components/Application/i18n.vue :::

## Dynamic Language Modification

If you need to dynamically modify the language, in addition to using `Application`, you can also use the value of `inject(localeInjectKey)`, that is, `locale` to change

:::demo ./demos/demo1.vue :::

## Add Custom Language Pack
If your business needs to use custom language packs, you can configure as follows:

```ts
import { HorizonWebProvides, defineOption } from "@aurora/horizon-web";
import { LocaleSupportLang } from "@aurora/locale-vue";
import En from "your-En-dictionary-file-path";
import ZhCN from "your-ZhCn-dictionary-file-path";

createApp(App)
  .use(HorizonWebProvides, defineOption({
    locale: {
      current: LocaleSupportLang.En,
      lang: {
        dictionaries: {
          En,
          ZhCN,
        }
      }
    }
  }));

// For IDE intelligent prompts, you need to add the following code: (only supports ts)

declare module '@aurora/locale' {
  type LocaleReturnLangDictionaryDataType = {
    [K in keyof typeof En]: typeof En[K];
  };

  // eslint-disable-next-line
  interface LocaleReturnLangDictionaryData extends LocaleReturnLangDictionaryDataType {
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    td(): typeof En;
  }
}
```

## Developer Usage

After the new revision, it is more convenient to use, suitable not only for component developers, but also for developers who need to add their own dictionaries

```ts
import { defineComponent } from 'vue';
import { localeInjectKey, defaultLocale } from '~/provides/localable'; // for horizon-web developer
// import { localeInjectKey } from '@aurora/horizon-web'; // for third-part developer
import { inject } from '@vue/runtime-core';

export default defineComponent({
  setup() {
    const locale = inject(localeInjectKey, defaultLocale);

    return () => (
      { locale?.value.langService.td()['horizon-web'].colorPicker.clear }
    )
  }
})
```
