---
sidebar: true
outline: deep
---

# Locale React

`@aurora/locale-react` is the React binding for `@aurora/locale`, compatible with React 18 and 19. It provides a scoped Provider, reactive hooks, formatting components, and locale-derived reading direction.

## Install

```bash
bun add @aurora/locale-react react
```

## Configure the Provider

`lang.dictionaries` is required. Each `LocaleProvider` creates an independent `ReactLocaleService` by default.

```tsx
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

  return (
    <button onClick={() => locale.setCurrent(LocaleSupportLang.ZhCN)}>
      Switch to Chinese
    </button>
  );
}

export function App() {
  return (
    <LocaleProvider options={options}>
      <LangLocale value="greeting" />
      <LanguageButton />
    </LocaleProvider>
  );
}
```

`useLocale()` subscribes to the current language. Components using the hook rerender after calling `locale.setCurrent()` or assigning `locale.current`.

## Reuse a service instance

Create and pass a service explicitly when it needs to be controlled outside the Provider:

```tsx
import ReactLocaleService, { LocaleProvider } from '@aurora/locale-react';

const locale = new ReactLocaleService(options);

<LocaleProvider locale={locale}>
  <AppContent />
</LocaleProvider>;
```

## Components and hooks

- `useLocale()`: read the current `ReactLocaleService` and subscribe to language changes.
- `useLocaleDirection()`: return `ltr` or `rtl`.
- `LangLocale`: translate a dictionary path.
- `DateLocale`: format a date with `DateLocaleAvailableShownType`.
- `NumberLocale`: format a number.
- `ReadDirection`: render a `span` with the current `dir`; override it with `direction` when needed.

Formatting components accept standard `span` HTML attributes, including `className`, `aria-*`, and `data-*`.
