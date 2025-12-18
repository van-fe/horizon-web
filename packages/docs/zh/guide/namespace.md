# 命名空间
`LEGO` 默认的命名空间是 `n`，在以下情况下，可能需要自定义命名空间：
- 多个版本 `LEGO` 混用
- 三方工具包
- ...

**而使用自定义命名空间的好处**：
- 不同版本 `css` 样式可以完全隔离，互不干扰
- 三方工具包可以稳定使用当前版本的 `LEGO`，不受最新版本的各种影响
- ...

## 脚本配置

### 入口文件配置
```ts
import { setNamespace } from '@nio-fe/lego';

setNamespace('x');

// then you can createApp and mount
```

### 使用 `n-application` 配置
有些情况下，你可能不能配置自己的入口文件，则可以通过这个方式定义命名空间

```vue
<template>
  <n-application namespace="x">
    <!--  ...  -->
  </n-application>
</template>
```

## 样式配置

### 全量使用
新建一个 `scss` 文件，然后引入这个文件即可：
```scss
@forward '@nio-fe/lego/es/styles/index.scss' with (
  $namespace: 'x',
);
```

### 按需使用
1. 新建一个 `scss` 文件 （假定路径是 `./src/assets/lego.scss`）:
    ```scss
    @forward '@nio-fe/lego/es/styles/mixins/config.scss' with (
      $namespace: 'x',
    );
    ```
2. 在构建器配置中配置:
    ::: code-group
    ```ts [Vite]
    import { defineConfig } from 'vite';
    import Components from 'unplugin-vue-components/vite';
    import { LegoPluginResolvers } from '@nio-fe/unplugin-resolver';
    
    // https://vitejs.dev/config/
    export default defineConfig({
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: `@use "./src/assets/lego.scss" as *;`,
          },
        },
      },
      plugins: [
        Components({
          resolvers: [
            LegoPluginResolvers({
              importStyle: 'scss',
            }),
          ],
        }),
      ],
    });
    ```
    ```ts [VueCli]
    const { default: Components } = require('unplugin-vue-components/webpack');
    const { LegoPluginResolvers } = require('@nio-fe/unplugin-resolver');
    
    module.exports = {
      css: {
        loaderOptions: {
          scss: {
            additionalData: `@use "./src/assets/lego.scss" as *;`,
          },
        }
      },
      configureWebpack: {
        plugins: [
          Components({
            resolvers: [
              LegoPluginResolvers({
                importStyle: 'scss',
              }),
            ],
          }),
        ],
      },
    }
    ```
    :::
        