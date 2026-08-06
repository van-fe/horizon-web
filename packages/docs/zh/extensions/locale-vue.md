---
sidebar: true
outline: deep
---

# Locale Vue

`@aurora/locale-vue` 是 `@aurora/locale` 的 Vue 3 适配层。它为每个 Vue app 创建独立的 locale 实例，并注册翻译、日期、数字格式化能力。

## 安装

```bash
bun add @aurora/locale-vue vue
```

## 配置

`lang.dictionaries` 是必填项。字典顶层 key 必须与 `current` 使用的 `LocaleSupportLang` 一致。

```ts
import { createApp } from 'vue';
import VueLocaleService, { LocaleSupportLang } from '@aurora/locale-vue';
import '@aurora/locale-vue/dist/index.css';
import App from './App.vue';

const app = createApp(App);

app.use(VueLocaleService, {
  current: LocaleSupportLang.ZhCN,
  lang: {
    dictionaries: {
      [LocaleSupportLang.En]: { greeting: 'Hello' },
      [LocaleSupportLang.ZhCN]: { greeting: '你好' },
    },
  },
});

app.mount('#app');
```

安装后，当前 app 会获得以下全局能力：

- `t(path, lang?)`：翻译文本。
- `td()`：返回当前完整字典。
- `d(value, type)`：格式化日期。
- `n(value, option?)`：格式化数字。
- `HLangLocale`、`HDateLocale`、`HNumberLocale`：全局格式化组件。
- `v-read-direction`：设置 `ltr` 或 `rtl` 阅读方向。

## 动态切换语言

通过当前 app 获取对应实例，再修改 `current`：

```ts
const locale = VueLocaleService.getInstance(app);

if (locale) {
  locale.current = LocaleSupportLang.En;
}
```

不同 Vue app 使用不同实例，因此微前端或同一页面上的多个 app 不会互相覆盖。

## 与 Horizon Web 一起使用

完整安装 Horizon Web 时通常不需要再次安装 Locale Vue。通过 `HorizonWebProvides` 或 Horizon Web 默认安装器传入 `locale` 配置即可，内置字典会与业务字典合并。
