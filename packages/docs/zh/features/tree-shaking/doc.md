# 按需加载

## Tree Shaking

`HorizonWeb` 组件支持 ES module 提供的 tree-shaking 能力，如果只想使用其中某几个组件，引入全量组件包将会增加项目构建之后的体积。而 es module 提供了原始的 tree-shaking 能力，可以避免该场景下将全量的组件代码打包到项目中。

## 全量引入

通常来说我们使用 horizon-web 的方式如下：

```ts
import { createApp } from 'vue';
import { HorizonWeb } from '@aurora/horizon-web';
import '@aurora/horizon-web/dist/style.css'; 

import App from './App.vue';

const app = createApp(App);

app.use(HorizonWeb);
```

通过如上的方式注册之后就可以在任意组件中使用 HorizonWeb 提供的组件能力，例如：`<h-button>`、`<h-input>` 等 vue 组件。这种方式的优点是可以无需单独注册组件，直接就可以在自定义组件中使用，但是这种方式的问题是会将全量的组件库代码构建到项目中，增大了项目体积。

## 手动按需引入

基于 es module 的 tree-shaking 能力，可以非常方便地做到组件的按需加载：

```javascript
import { createApp } from 'vue';
import { HButton, HInput } from 'packages/horizon-web/src/index';
import 'packages/horizon-web/es/components/Button/src/style/index.css';
import 'packages/horizon-web/es/components/Input/src/style/index.css';

import App from './App.vue';

const app = createApp(App);

app.use(HButton);
app.use(HInput);
```

通过如上的方式就可以实现 组件的按需引入，无需担心会产生多余的代码。但是略显繁琐，需要单独导入每一个组件然后注册它们。

## 自动按需引入

基于上面提到的问题，horizon-web 在这里提供了一种自动按需加载的能力，其工作原理是会在构建过程中分析用到的组件，所以需要根据构建工具的不同做如下配置，以 `vite` 为例：

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

通过如上的配置之后就可以实现自动按需引入，考虑到国际化的使用你需要按照如下方式使用：

```ts
// main.ts
import { createApp } from 'vue';
import { HorizonWebProvides } from '@aurora/horizon-web';
import App from './App.vue';

const app = createApp(App).use(HorizonWebProvides);
app.mount('#app');
```

然后在组件中

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

无需通过任何导入就可以直接使用组件，并且不会打包没有出现的代码，但是这种方式存在如下问题：

* 不适合 JSX，无法在 JSX 中识别出来使用到的 horizon-web 组件
* 使用的组件名称必须是 `<h-xxx>`，不支持`动态组件`的按需引入，如果存在动态组件(形如：`<component :is="input" />`)，则涉及到的组件请参照 `手动按需引入` 的方式进行引入
