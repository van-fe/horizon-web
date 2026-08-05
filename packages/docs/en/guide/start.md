# Quick Start

## Prerequisites
- [Node.js](https://nodejs.org/) 20+
- [Vue](https://vuejs.org/) 3.2.30+
- [Vite](https://vitejs.dev/) or [CreateVue](https://github.com/vuejs/create-vue) ([VueCli](https://cli.vuejs.org/) is no longer recommended)

---

## Package Manager Installation

You can install it using the following methods:

::: code-group
```sh [bun]
$ bun add @aurora/horizon-web
```
```sh [yarn]
$ yarn add @aurora/horizon-web
```
```sh [npm]
$ npm install @aurora/horizon-web
```
:::

---
## Browser Direct Import

You can use `Horizon Web` components directly through `script` and `link` tags.

- **Style File**
```html
<link rel="stylesheet" href="//unpkg.com/@aurora/horizon-web/es/styles/index.css" />
```

- **Script File**
::: code-group
```html [IIFE]
<!-- Import Vue 3 -->
<script src="//cdn.jsdelivr.net/npm/vue@3"></script>
<!-- Import component library -->
<script src="//unpkg.com/@aurora/horizon-web/dist/horizon-web-browser.iife.js"></script>
```
```html [UMD]
<!-- Import Vue 3 -->
<script src="//cdn.jsdelivr.net/npm/vue@3"></script>
<!-- Import component library -->
<script src="//unpkg.com/@aurora/horizon-web/dist/horizon-web-browser.umd.js"></script>
```
:::

::: tip :bulb: Tip
You can add `@1.1.0` at the end to use a fixed version number
:::

## Usage

## Installation via Package Manager

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

## Browser Direct Import

```html
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <link rel="stylesheet" href="//unpkg.com/@aurora/horizon-web/es/styles/index.css" />
    <!-- Import Vue 3 -->
    <script src="//cdn.jsdelivr.net/npm/vue@3"></script>
    <!-- Import component library -->
    <script src="//unpkg.com/@aurora/horizon-web/dist/horizon-web-browser.iife.js"></script>
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

## Next Steps
- If you need on-demand import, please refer to [On-Demand Import](./on-demand-import)
- If you need to customize namespace to prevent conflicts, please refer to [Namespace](./namespace)
- To configure `Horizon Web`, please refer to [HorizonWeb Usage](./config-horizon-web.md)
