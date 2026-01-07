# 命名空间

horizon-web 提供的默认命名空间为 `n`，在微应用等特殊环境下，需要自定义命名空间，来减少因为命名冲突造成的组件功能、样式错乱。

:::tip 此功能自 2.0.0 开始支持 :::

## 使用 NApplication 修改

可以使用 `NApplication` 的 `props.namespace` 修改命名空间

```vue
<template>
  <h-application namespace="x">
    <!-- your code here -->
  </h-application>
</template>
```

## 使用 setNamespace 修改

如果不使用 `NApplication`，则可以使用 `setNamespace` 方法来修改。

需要保证 `setNamespace` 在调用 `createApp` 前运行。

```ts
import { setNamespace } from '@aurora/horizon-web';

setNamespace('x');

// then you can createApp
```

:::warning 以上方法会对 `horizon-web` 和 `table` 和 `icon` 都进行 `namespace` 的修改:::

## 设置 scss 变量

### 全量引用
在你的项目中创建一个 `scss` 文件: `例如：(styles/horizon-web.scss)`:

```scss
@forward '@aurora/horizon-web/es/styles/index.scss' with (
  $namespace: 'x',
);
```

在你的入口文件 `main.ts` 中引用此文件即可

<br>

### 按需引用

因为只有 `horizon-web` 拥有按需引用的能力，所以只能创建一个只有 `horizon-web` 的 `forward` 文件 (例如：`styles/horizon-web.scss`)

:::tip 如果你还同时使用 `table` `icon`，则按照上方的 `全量引用` 中，只保留 `table` `icon` 的配置并在入口文件引用即可）:::


```scss
@forward '@aurora/horizon-web/es/styles/mixins/config.scss' with (
  $namespace: 'x',
);
```

然后在 `vite.config.ts` 中设置 `css`：

```ts
import { defineConfig } from 'vite';
import Components from 'unplugih-vue-components/vite';
import { HorizonWebPluginResolvers } from '@aurora/unplugih-resolver';

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "path-to-horizon-web.scss" as *;`,
      },
    },
  },
  plugins: [
    Components({
      resolvers: [
        HorizonWebPluginResolvers({
          importStyle: 'scss',
        }),
      ],
    }),
  ],
});
```

如果使用的是 `vue.config.js`，则也是相似的配置

```js
const { default: Components } = require('unplugih-vue-components/webpack');
const { HorizonWebPluginResolvers } = require('@aurora/unplugih-resolver');

module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@use "path-to-horizon-web.scss" as *;`,
      },
    }
  },
  configureWebpack: {
    plugins: [
      Components({
        resolvers: [
          HorizonWebPluginResolvers({
            importStyle: 'scss',
          }),
        ],
      }),
    ],
  },
}
```

### 按需引入 + SCSS变量

按需引入只有 `@aurora/horizon-web` 支持。`@aurora/horizon-web-table` 和 `@aurora/icon` 都是全量引入

和上面的 **设置 SCSS 变量** 区别在于，`styles/horizon-web.scss` 的内容改为：

```scss
@forward '@aurora/horizon-web/es/styles/mixins/config.scss' with (
  $namespace: 'x',
);
```

其余的配置都是一致的
