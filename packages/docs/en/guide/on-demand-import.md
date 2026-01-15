# On-Demand Import
If you have requirements for the size of the built product, please use the on-demand import method to use `Horizon Web`.

## Installation
You need to install some packages to enable on-demand import:

::: code-group
```sh [npm]
$ npm install unplugin-vue-components @aurora/horizon-web-unplugin-resolver -D
```
```sh [yarn]
$ yarn add unplugin-vue-components @aurora/horizon-web-unplugin-resolver -D
```
```sh [bun]
$ bun add unplugin-vue-components @aurora/horizon-web-unplugin-resolver -D
```
:::

## Configuration

## `main.ts` Entry File

```ts {3,4,7}
import { createApp } from 'vue';
import App from './App.vue';
import { HorizonWebProvides } from '@aurora/horizon-web';
import '@aurora/horizon-web/es/styles/base.css';

createApp(App)
  .use(HorizonWebProvides)
  .mount('#app');
```

## Builder Configuration
::: code-group
```ts [Vite]
import { defineConfig } from 'vite';
import Components from 'unplugin-vue-components/vite';
import { HorizonWebPluginResolvers } from '@aurora/horizon-web-unplugin-resolver';

export default defineConfig({
  plugins: [
    Components({
      resolvers: [
        HorizonWebPluginResolvers({
            // your config
        })
      ]
    }),
  ]
})
```
```ts [VueCli]
const { default: Components } = require('unplugin-vue-components/webpack');
const { HorizonWebPluginResolvers } = require('@aurora/horizon-web-unplugin-resolver');

module.exports = {
  configureWebpack: {
    plugins: [
      Components({
        resolvers: [
          HorizonWebPluginResolvers({
            // your config
          }),
        ],
      }),
    ],
  },
}
```
```ts [Webpack]
const { default: Components } = require('unplugin-vue-components/webpack');
const { HorizonWebPluginResolvers } = require('@aurora/horizon-web-unplugin-resolver');

module.exports = {
  plugins: [
    Components({
      resolvers: [
        HorizonWebPluginResolvers({
          // your config
        }),
      ],
    }),
  ]
}
```
:::

::: tip
For `UnpluginResolvers` configuration options, please refer to [UnpluginResolver Configuration](./config-unplugin-resolver)
:::
