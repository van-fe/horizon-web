## 使用前的说明

`Horizon Web` 组件库使用了 `@aurora/icon` 图标库，如需使用图标请先安装 `@aurora/icon`。

::: code-group
```sh [npm]
$ npm install @aurora/icon
```
```sh [yarn]
$ yarn add @aurora/icon
```
```sh [pnpm]
$ pnpm add @aurora/icon
```
```sh [bun]
$ bun add @aurora/icon
```
:::

然后引入并使用 `@aurora/icon` 组件库。

```ts{3,7}
import { createApp } from 'vue';
import App from './App.vue';
import { AIcon } from '@aurora/icon';

// ...
const app = createApp(App)
           .use(AIcon);

// ...
```

## 图标展示
