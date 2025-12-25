# 快速开始
## 安装

### 前置准备
- [Node.js](https://nodejs.org/) 16+
- [Vue](https://cn.vuejs.org/) 3.2.30+
- [Vite](https://vitejs.dev/) or [CreateVue](https://github.com/vuejs/create-vue) ([VueCli](https://cli.vuejs.org/) 已不推荐使用)

---

### 包管理器安装

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

::: tip :bulb: 提示
遇到安装失败？可以看这里 [FAQ 源设置问题](./FAQ#registry)
:::

---
### 浏览器直接引入

通过 `script` `link` 标签，可以直接使用 `HORIZONWEB` 组件。

- **样式文件**
```html
<link rel="stylesheet" href="https://static.nio.com/fx-static/horizon-web/latest/dist/horizon-web-style@latest.css" />
```

- **脚本文件**
::: code-group
```html [IIFE]
<!-- Import Vue 3 -->
<script src="//cdn.jsdelivr.net/npm/vue@3"></script>
<!-- Import component library -->
<script src="https://static.nio.com/fx-static/horizon-web/latest/dist/horizon-web-browser@latest.js"></script>
```
```html [UMD]
<!-- Import Vue 3 -->
<script src="//cdn.jsdelivr.net/npm/vue@3"></script>
<!-- Import component library -->
<script src="https://static.nio.com/fx-static/horizon-web/latest/dist/horizon-web@latest.umd.js"></script>
```
:::

::: tip :bulb: 提示
其中 `latest` 可以替换为版本号 (`2.9.0、2.8.2`) 或标签 (`beta、v2-8`)
:::

## 使用

### 通过包管理器安装

```ts
import { createApp } from 'vue';
import App from './App.vue';
import HorizonWeb from '@aurora/horizon-web';
import '@aurora/horizon-web/es/index.css';

createApp(App)
  .use(HorizonWeb)
  .mount('#app');

```

### 浏览器直接引入

```html
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <link rel="stylesheet" href="https://static.nio.com/fx-static/horizon-web/latest/dist/horizon-web-style@latest.css" />
    <!-- Import Vue 3 -->
    <script src="//cdn.jsdelivr.net/npm/vue@3"></script>
    <!-- Import component library -->
    <script src="https://static.nio.com/fx-static/horizon-web/latest/dist/horizon-web-browser@latest.js"></script>
    <title>HORIZONWEB demo</title>
  </head>
  <body>
      <div id="app">
        <n-button>{{ text }}</n-button>
      </div>
      <script>
        const App = {
          data() {
            return {
              text: 'Hello HORIZONWEB'
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
- 需要配置 `HORIZONWEB`，请参照 [HorizonWeb Usage](./config-horizon-web-usage.md)