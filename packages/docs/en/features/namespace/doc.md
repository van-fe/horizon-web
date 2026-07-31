# Namespace

The default namespace provided by horizon-web is `n`. In special environments such as micro-applications, you need to customize the namespace to reduce component function and style confusion caused by naming conflicts.

:::tip This feature has been supported since 2.0.0 :::

## Modify Using HApplication

You can use `HApplication`'s `props.namespace` to modify the namespace

```vue
<template>
  <h-application namespace="x">
    <!-- your code here -->
  </h-application>
</template>
```

## Modify Using setNamespace

If you don't use `HApplication`, you can use the `setNamespace` method to modify.

You need to ensure that `setNamespace` runs before calling `createApp`.

```ts
import { setNamespace } from '@aurora/horizon-web';

setNamespace('x');

// then you can createApp
```

:::warning The above method will modify the `namespace` for both `horizon-web` and `table` and `icon`:::

## Set SCSS Variables

## Full Import
Create an `scss` file in your project: `For example: (styles/horizon-web.scss)`:

```scss
@forward '@aurora/horizon-web/es/styles/index.scss' with (
  $namespace: 'x',
);

// if you use table at the same time, you should set namespace too.
@forward '@aurora/horizon-web-table/dist/styles/index.scss' with (
    $horizon-web-namespace: 'x',
    $table-namespace: 'x-table'
);

```

Import this file in your entry file `main.ts`

<br>

## On-Demand Import

Because only `horizon-web` has the ability to import on-demand, you can only create a `forward` file with only `horizon-web` (for example: `styles/horizon-web.scss`)

:::tip
If you also use `table`, follow the `Full Import` above, keep the `table` configuration and import it in the entry file.
:::


```scss
@forward '@aurora/horizon-web/es/styles/mixins/config.scss' with (
  $namespace: 'x',
);
```

Then set `css` in `vite.config.ts`:

```ts
import { defineConfig } from 'vite';
import Components from 'unplugin-vue-components/vite';
import { HorizonWebPluginResolvers } from '@aurora/horizon-web-unplugin-resolver';

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

If you use `vue.config.js`, the configuration is similar

```js
const { default: Components } = require('unplugin-vue-components/webpack');
const { HorizonWebPluginResolvers } = require('@aurora/horizon-web-unplugin-resolver');

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

## On-Demand Import + SCSS Variables

On-demand import is only supported by `@aurora/horizon-web`. `@aurora/horizon-web-table` uses a full style import.

The difference from the above **Set SCSS Variables** is that the content of `styles/horizon-web.scss` is changed to:

```scss
@forward '@aurora/horizon-web/es/styles/mixins/config.scss' with (
  $namespace: 'x',
);

// if you use table at the same time, you should set namespace too.
@forward '@aurora/horizon-web-table/dist/styles/index.scss' with (
    $horizon-web-namespace: 'x',
    $table-namespace: 'x-table'
);

```

The rest of the configuration is the same
