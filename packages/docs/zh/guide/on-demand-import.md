# 按需引入
如果对于打包后产物的体积有要求，则请使用按需引入的方式使用 `LEGO`.

## 安装
需要安装一些包来启用按需引入:

::: code-group
```sh [npm]
$ npm install unplugin-vue-components @aurora/unplugin-resolver -D
```
```sh [yarn]
$ yarn add unplugin-vue-components @aurora/unplugin-resolver -D
```
```sh [pnpm]
$ pnpm add unplugin-vue-components @aurora/unplugin-resolver -D
```
:::

## 配置

### `main.ts` 入口文件

```ts {3,4,7}
import { createApp } from 'vue';
import App from './App.vue';
import { LegoProvides } from '@aurora/horizon-web';
import '@aurora/horizon-web/es/styles/base.css';

createApp(App)
  .use(LegoProvides)
  .mount('#app');
```

### 构建器配置
::: code-group
```ts [Vite]
import { defineConfig } from 'vite';
import Components from 'unplugin-vue-components/vite';
import { LegoPluginResolvers } from '@aurora/unplugin-resolver';

export default defineConfig({
  plugins: [
    Components({
      resolvers: [
        LegoPluginResolvers({
            // your config
        })
      ]
    }),
  ]
})
```
```ts [VueCli]
const { default: Components } = require('unplugin-vue-components/webpack');
const { LegoPluginResolvers } = require('@aurora/unplugin-resolver');

module.exports = {
  configureWebpack: {
    plugins: [
      Components({
        resolvers: [
          LegoPluginResolvers({
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
const { LegoPluginResolvers } = require('@aurora/unplugin-resolver');

module.exports = {
  plugins: [
    Components({
      resolvers: [
        LegoPluginResolvers({
          // your config
        }),
      ],
    }),
  ]
}
```
:::

::: tip
`UnpluginResolvers` 配置项请参考 [UnpluginResolver配置](./config-unplugin-resolver)
:::