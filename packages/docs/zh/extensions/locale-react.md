---
sidebar: true
outline: deep
---

# Locale React

`@aurora/locale-react` 是 `@aurora/locale` 的 React 适配层，支持 React 18 和 19。它提供作用域 Provider、响应式 Hook、格式化组件以及从 locale 推导阅读方向的能力。

## 安装

```bash
bun add @aurora/locale-react react
```

## 配置 Provider

`lang.dictionaries` 是必填项。每个 `LocaleProvider` 默认创建独立的 `ReactLocaleService`。

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
      切换到中文
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

`useLocale()` 会订阅当前语言变化。调用 `locale.setCurrent()` 或设置 `locale.current` 后，使用该 Hook 的组件会重新渲染。

## 复用服务实例

需要在 Provider 外部控制实例时，可以显式创建并通过 `locale` 传入：

```tsx
import ReactLocaleService, { LocaleProvider } from '@aurora/locale-react';

const locale = new ReactLocaleService(options);

<LocaleProvider locale={locale}>
  <AppContent />
</LocaleProvider>;
```

## 组件与 Hook

- `useLocale()`：读取当前 `ReactLocaleService` 并订阅语言变化。
- `useLocaleDirection()`：返回 `ltr` 或 `rtl`。
- `LangLocale`：翻译字典路径。
- `DateLocale`：按 `DateLocaleAvailableShownType` 格式化日期。
- `NumberLocale`：格式化数字。
- `ReadDirection`：渲染带当前 `dir` 属性的 `span`，也可通过 `direction` 覆盖。

格式化组件接受标准 `span` HTML 属性，可以传入 `className`、`aria-*` 和 `data-*`。
