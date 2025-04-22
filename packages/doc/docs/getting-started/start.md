# 快速开始

### 安装
```
npm i @nio-fe/lego
```
### 全量使用
```ts
import { createApp } from 'vue';
import Lego from '@nio-fe/lego';
import '@nio-fe/lego/dist/style.css';
import App from './App.vue';

const app = createApp(App).use(Lego);
app.mount('#app');
```


### 按需引用
```ts
// src/main.ts
import { createApp } from 'vue';
import { LegoProvides } from '@nio-fe/lego';
import App from './App.vue';

const app = createApp(App).use(LegoProvides);
app.mount('#app');
```

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import Components from 'unplugin-vue-components/vite';
import { LegoPluginResolvers } from '@nio-fe/unplugin-resolver';

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
