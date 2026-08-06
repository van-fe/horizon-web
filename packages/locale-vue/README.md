# @aurora/locale-vue

## What is it

It is a library for `horizon-web ui` to provide multiple locale methods.

It is based on `@aurora/locale` and `vue@3+`.

## How to Install

```bash
bun add @aurora/locale-vue vue
```

## How to use

```typescript
import { createApp } from 'vue';
import VueLocaleService, { LocaleSupportLang } from '@aurora/locale-vue';
import '@aurora/locale-vue/dist/index.css';
import App from './App.vue';

const app = createApp(App);

app.use(VueLocaleService, {
  current: LocaleSupportLang.En,
  lang: {
    dictionaries: {
      [LocaleSupportLang.En]: {
        greeting: 'Hello',
      },
    },
  },
});

app.mount('#app');
```

The `lang.dictionaries` option is required. After installation, the current app exposes the
`t`, `td`, `d`, and `n` methods and registers the `HLangLocale`, `HDateLocale`, and
`HNumberLocale` components and the `v-read-direction` directive.
