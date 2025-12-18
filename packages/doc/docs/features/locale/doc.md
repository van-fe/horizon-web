# 国际化

Lego 组件 **默认** 使用英语，如果你希望使用其他语言，你可以参考下面的方案。

## 全局配置

Lego 提供了全局配置国际化的配置。

```ts
import App from './App.vue';
import { createApp } from 'vue';
import lego, { defineOption } from '@nio-fe/lego';
import { LocaleSupportLang } from "@nio-fe/locale-vue";

createApp(App)
  .use(lego, defineOption({
  locale: {
    current: LocaleSupportLang.ZH_CN,
  }
}));
```

---

## 按需加载

如果使用了按需加载，则需要单独引用并使用 `LegoProvides`

```ts
import App from './App.vue';
import { createApp } from 'vue';
import { LegoProvides, defineOption } from '@nio-fe/lego';
import { LocaleSupportLang } from "@nio-fe/locale-vue";

createApp(App)
  .use(LegoProvides, defineOption({
    locale: {
      current: LocaleSupportLang.ZH_CN,
    }
  }));
```

---

## Application

Lego 还提供了一个 Vue 组件 [Application](/lego/components/Application) 用于全局配置国际化的设置
如果更改 `locale`，可以动态修改语言

:::demo ../../components/Application/demos/i18n.vue:::

## 动态修改语言

如果需要动态修改语言，除了使用 `Application`，也可以使用 `inject(localeInjectKey)` 的值，即 `locale` 来更改

:::demo demos/demo1.vue:::

## 增加自定义语言包
如果业务中有需要使用自定义的语言包，可以配置如下：

```ts
import { LegoProvides, defineOption } from "@nio-fe/lego";
import { LocaleSupportLang } from "@nio-fe/locale-vue";
import En from "your-En-dictionary-file-path";
import ZhCN from "your-ZhCn-dictionary-file-path";

createApp(App)
  .use(LegoProvides, defineOption({
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

// 需要IDE智能提示，则需要增加下面的代码：(只支持ts）

declare module '@nio-fe/locale' {
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

## 开发者使用方式

新改版后，使用起来更加方便，不仅适合组件开发者，也适合需要增加自己的词典的开发者

```ts
import { defineComponent } from 'vue';
import { localeInjectKey, defaultLocale } from '~/provides/localable'; // for lego developer
// import { localeInjectKey } from '@nio-fe/lego'; // for third-part developer
import { inject } from '@vue/runtime-core';

export default defineComponent({
  setup() {
    const locale = inject(localeInjectKey, defaultLocale);

    return () => (
      { locale?.value.langService.td().lego.colorPicker.clear }
    )
  }
})
```
