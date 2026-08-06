# @aurora/locale-react

React bindings for `@aurora/locale`, including a scoped Provider, reactive hooks, formatting components, and reading-direction support.

## Install

```bash
bun add @aurora/locale-react react
```

## Use

```ts
import { createElement } from 'react';
import {
  LangLocale,
  LocaleProvider,
  LocaleSupportLang,
  useLocale,
} from '@aurora/locale-react';
import '@aurora/locale-react/style.css';

const options = {
  current: LocaleSupportLang.En,
  lang: {
    dictionaries: {
      [LocaleSupportLang.En]: { greeting: 'Hello' },
      [LocaleSupportLang.ZhCN]: { greeting: '你好' },
    },
  },
};

function LanguageButton() {
  const locale = useLocale();
  return createElement(
    'button',
    { onClick: () => locale.setCurrent(LocaleSupportLang.ZhCN) },
    '中文',
  );
}

function App() {
  return createElement(
    LocaleProvider,
    { options },
    createElement(LangLocale, { value: 'greeting' }),
    createElement(LanguageButton),
  );
}
```

`lang.dictionaries` is required. Each `LocaleProvider` owns an independent service unless a `ReactLocaleService` instance is passed through the `locale` prop.
