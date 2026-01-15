# Namespace
The default namespace of `Horizon Web` is `h`. In the following cases, you may need to customize the namespace:
- Multiple versions of `Horizon Web` are used together
- Third-party toolkits
- ...

**Benefits of using custom namespace**:
- CSS styles of different versions can be completely isolated without interfering with each other
- Third-party toolkits can stably use the current version of `Horizon Web` without being affected by various impacts of the latest version
- ...

## Script Configuration

## Entry File Configuration
```ts
import { setNamespace } from '@aurora/horizon-web';

setNamespace('x');

// then you can createApp and mount
```

## Using `h-application` Configuration
In some cases, you may not be able to configure your own entry file, so you can define the namespace in this way

```vue
<template>
  <h-application namespace="x">
    <!--  ...  -->
  </h-application>
</template>
```

## Style Configuration

## Full Usage
Create a new `scss` file and import it:
```scss
@forward '@aurora/horizon-web/es/styles/index.scss' with (
  $namespace: 'x',
);
```

## On-Demand Usage
1. Create a new `scss` file (assuming the path is `./src/assets/horizon-web.scss`):
    ```scss
    @forward '@aurora/horizon-web/es/styles/mixins/config.scss' with (
      $namespace: 'x',
    );
    ```
2. Configure in the builder configuration:
    ::: code-group
    ```ts [Vite]
    import { defineConfig } from 'vite';
    import Components from 'unplugin-vue-components/vite';
    import { HorizonWebPluginResolvers } from '@aurora/horizon-web-unplugin-resolver';
    
    // https://vitejs.dev/config/
    export default defineConfig({
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: `@use "./src/assets/horizon-web.scss" as *;`,
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
    ```ts [VueCli]
    const { default: Components } = require('unplugin-vue-components/webpack');
    const { HorizonWebPluginResolvers } = require('@aurora/horizon-web-unplugin-resolver');
    
    module.exports = {
      css: {
        loaderOptions: {
          scss: {
            additionalData: `@use "./src/assets/horizon-web.scss" as *;`,
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
    :::
