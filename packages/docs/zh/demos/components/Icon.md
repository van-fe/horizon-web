---
outline: [2, 3]
---

## 使用前的说明

`Horizon Web` 组件库使用了 `@aurora/icon` 图标库，如需使用图标请先安装 `@aurora/icon`。

::: code-group
```sh [bun]
$ bun add @aurora/icon
```
```sh [yarn]
$ yarn add @aurora/icon
```
```sh [bun]
$ bun add @aurora/icon
```
```sh [bun]
$ bun add @aurora/icon
```
:::

然后引入并使用 `@aurora/icon` 组件库。

```ts{3,7}
import { createApp } from 'vue';
import App from './App.vue';
import { AIcon } from '@aurora/icon';

// ...
const app = createApp(App)
           .use(AIcon);

// ...
```

## 图标展示

下面按名称语义展示 `@aurora/icon` 导出的全部图标组件。点击图标名称即可复制对应的按需引入代码。

### 导航与方向 {#icon-navigation}

<IconGallery group="navigation" locale="zh" />

### 操作与编辑 {#icon-actions}

<IconGallery group="actions" locale="zh" />

### 状态与反馈 {#icon-status}

<IconGallery group="status" locale="zh" />

### 人员与沟通 {#icon-people}

<IconGallery group="people" locale="zh" />

### 文件与内容 {#icon-files}

<IconGallery group="files" locale="zh" />

### 数据与开发 {#icon-data}

<IconGallery group="data" locale="zh" />

### 媒体与设备 {#icon-media}

<IconGallery group="media" locale="zh" />

### 车辆与出行 {#icon-vehicles}

<IconGallery group="vehicles" locale="zh" />

### 业务与服务 {#icon-business}

<IconGallery group="business" locale="zh" />

### 品牌与产品 {#icon-brands}

<IconGallery group="brands" locale="zh" />

### 通用与其他 {#icon-general}

<IconGallery group="general" locale="zh" />
