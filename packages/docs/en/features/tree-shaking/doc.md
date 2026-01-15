# On-Demand Loading

## Tree Shaking

`HorizonWeb` components support the tree-shaking capability provided by ES module. If you only want to use a few of them, importing the full component package will increase the volume after project build. ES module provides original tree-shaking capability, which can avoid bundling full component code into the project in this scenario.

## Full Import

Usually we use horizon-web in the following way:

```ts
import { createApp } from 'vue';
import { HorizonWeb } from '@aurora/horizon-web';
import '@aurora/horizon-web/dist/style.css'; 

import App from './App.vue';

const app = createApp(App);

app.use(HorizonWeb);
```

After registering in the above way, you can use the component capabilities provided by HorizonWeb in any component, such as: `<h-button>`, `<h-input>` and other vue components. The advantage of this method is that you don't need to register components separately, and you can use them directly in custom components. However, the problem with this method is that it will bundle the full component library code into the project, increasing the project volume.

## Manual On-Demand Import

Based on the tree-shaking capability of es module, you can easily achieve on-demand loading of components:

```javascript
import { createApp } from 'vue';
import { NButton, NInput } from 'packages/horizon-web/src/index';
import 'packages/horizon-web/es/components/Button/src/style/index.css';
import 'packages/horizon-web/es/components/Input/src/style/index.css';

import App from './App.vue';

const app = createApp(App);

app.use(NButton);
app.use(NInput);
```

Through the above method, you can achieve on-demand import of components without worrying about generating redundant code. But it is slightly cumbersome, requiring separate import of each component and then registering them.

## Automatic On-Demand Import

Based on the problems mentioned above, horizon-web provides an automatic on-demand loading capability here. Its working principle is to analyze the components used during the build process, so you need to configure according to different build tools. Take `vite` as an example:

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite'
import { HorizonWebPluginResolvers } from '@aurora/horizon-web-unplugin-resolver'

export default defineConfig({
  // ...
  plugins: [
    Components({
      resolvers: [
        HorizonWebPluginResolvers()
      ]
    }),
    // ...
  ]
})
```

After configuring as above, you can achieve automatic on-demand import. Considering the use of internationalization, you need to use it as follows:

```ts
// main.ts
import { createApp } from 'vue';
import { HorizonWebProvides } from '@aurora/horizon-web';
import App from './App.vue';

const app = createApp(App).use(HorizonWebProvides);
app.mount('#app');
```

Then in the component

```vue
// App.vue
<template>
  <h-button @click="clickHandle">Click Me</h-button>
</template>

<script>
  export default {
    // ...
  }
</script>
```

You can use components directly without any import, and unused code will not be bundled. However, this method has the following problems:

* Not suitable for JSX, cannot recognize horizon-web components used in JSX
* The component name used must be `<h-xxx>`, does not support on-demand import of `dynamic components`. If there are dynamic components (like: `<component :is="input" />`), please refer to the `Manual On-Demand Import` method to import the involved components
