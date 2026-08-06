---
sidebar: true
outline: deep
---

# Locale Vue

`@aurora/locale-vue` is the Vue 3 binding for `@aurora/locale`. It creates an independent locale instance for each Vue app and registers translation, date, and number formatting capabilities.

## Install

```bash
bun add @aurora/locale-vue vue
```

## Configure

`lang.dictionaries` is required. Its top-level keys must match the `LocaleSupportLang` value used by `current`.

```ts
import { createApp } from 'vue';
import VueLocaleService, { LocaleSupportLang } from '@aurora/locale-vue';
import '@aurora/locale-vue/dist/index.css';
import App from './App.vue';

const app = createApp(App);

app.use(VueLocaleService, {
  current: LocaleSupportLang.En,
  lang: {
    dictionaries: {
      [LocaleSupportLang.En]: { greeting: 'Hello' },
      [LocaleSupportLang.ZhCN]: { greeting: '你好' },
    },
  },
});

app.mount('#app');
```

Installation adds these capabilities to the current app:

- `t(path, lang?)`: translate a value.
- `td()`: return the complete current dictionary.
- `d(value, type)`: format a date.
- `n(value, option?)`: format a number.
- `HLangLocale`, `HDateLocale`, and `HNumberLocale`: global formatting components.
- `v-read-direction`: apply an `ltr` or `rtl` reading direction.

## Change the language

Resolve the service associated with the current app, then update `current`:

```ts
const locale = VueLocaleService.getInstance(app);

if (locale) {
  locale.current = LocaleSupportLang.ZhCN;
}
```

Each Vue app receives a separate instance, so micro-frontends and multiple apps on one page do not overwrite one another.

## Use with Horizon Web

You normally do not need to install Locale Vue separately when installing all of Horizon Web. Pass the `locale` option through `HorizonWebProvides` or the default Horizon Web installer; built-in dictionaries are merged with application dictionaries.
