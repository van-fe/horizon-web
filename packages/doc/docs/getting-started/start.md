# 快速开始

### 安装
```
npm i @aurora/horizon-web
```
### 全量使用
```ts
import { createApp } from 'vue';
import Lego from '@aurora/horizon-web';
import '@aurora/horizon-web/dist/style.css';
import App from './App.vue';

const app = createApp(App).use(Lego);
app.mount('#app');
```


### 按需引用
```ts
// src/main.ts
import { createApp } from 'vue';
import { LegoProvides } from '@aurora/horizon-web';
import App from './App.vue';

const app = createApp(App).use(LegoProvides);
app.mount('#app');
```

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import Components from 'unplugin-vue-components/vite';
import { LegoPluginResolvers } from '@aurora/unplugin-resolver';

export default defineConfig({
  // ...
  plugins: [
  Components({
    resolvers: [
      LegoPluginResolvers()
    ]
  }),
  // ...
]
})
```
