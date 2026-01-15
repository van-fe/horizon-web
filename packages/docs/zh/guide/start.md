# 快速开始
## 安装

## 前置准备
- [Node.js](https://nodejs.org/) 16+
- [Vue](https://cn.vuejs.org/) 3.2.30+
- [Vite](https://vitejs.dev/) or [CreateVue](https://github.com/vuejs/create-vue) ([VueCli](https://cli.vuejs.org/) 已不推荐使用)

---

## 包管理器安装

可以通过以下方法安装它：

::: code-group
```sh [npm]
$ npm install @aurora/horizon-web
```
```sh [yarn]
$ yarn add @aurora/horizon-web
```
```sh [bun]
$ bun add @aurora/horizon-web
```
:::

---
## 浏览器直接引入

通过 `script` `link` 标签，可以直接使用 `Horizon Web` 组件。

- **样式文件**
```html
<link rel="stylesheet" href="//unpack.com/@aurora/horizon-web/es/styles/index.css" />
```

- **脚本文件**
::: code-group
```html [IIFE]
<!-- Import Vue 3 -->
<script src="//cdn.jsdelivr.net/npm/vue@3"></script>
<!-- Import component library -->
<script src="//unpack.com/@aurora/horizon-web/dist/horizon-web-browser.iife.js"></script>
```
```html [UMD]
<!-- Import Vue 3 -->
<script src="//cdn.jsdelivr.net/npm/vue@3"></script>
<!-- Import component library -->
<script src="//unpack.com/@aurora/horizon-web/dist/horizon-web-browser.umd.js"></script>
```
:::

::: tip :bulb: 提示
可以在最后增加 `@1.1.0` 使用固定版本号
:::

## 使用

## 通过包管理器安装

```ts
import { createApp } from 'vue';
import App from './App.vue';
import HorizonWeb from '@aurora/horizon-web';
import '@aurora/horizon-web/es/styles/index.css';
// import '@aurora/horizon-web/es/styles/index.scss'; // for scss

createApp(App)
  .use(HorizonWeb)
  .mount('#app');

```

## 浏览器直接引入

```html
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <link rel="stylesheet" href="//unpack.com/@aurora/horizon-web/es/styles/index.css" />
    <!-- Import Vue 3 -->
    <script src="//cdn.jsdelivr.net/npm/vue@3"></script>
    <!-- Import component library -->
    <script src="//unpack.com/@aurora/horizon-web/dist/horizon-web-browser.iife.js"></script>
    <title>Horizon Web demo</title>
  </head>
  <body>
      <div id="app">
        <h-button>{{ text }}</h-button>
      </div>
      <script>
        const App = {
          data() {
            return {
              text: 'Hello Horizon Web'
            }
          }
        };
    
        Vue.createApp(App)
          .use(HorizonWeb)
          .mount('#app');
      </script>
  </body>
</html>
```

## 下一步
- 如果需要按需引入，请参照 [按需引入](./on-demand-import)
- 如果需要自定义命名空间防止冲突，请参照 [命名空间](./namespace)
- 需要配置 `Horizon Web`，请参照 [HorizonWeb Usage](./config-horizon-web-usage.md)