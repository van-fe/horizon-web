### 基础用法
基础的文字链接用法
:::demo ./demos/base.vue:::

### 不同尺寸
通过设置 `size` 来控制尺寸
:::demo ./demos/size.vue:::

### 不同类型
使用 `type` 来设置 `link` 的不同状态
:::demo ./demos/type.vue:::

### 不同状态
文字链接不同状态
:::demo ./demos/status.vue:::

### 跳转方式
文字链接跳转方式，与 `a` 标签的 `target` 相同
:::demo ./demos/jump-reaction.vue:::

### 下划线
文字链接下划线
:::demo ./demos/underline.vue:::

[//]: # (### ICON)

[//]: # (可以设置 `icon`)

[//]: # (:::demo ./demos/icon.vue:::)

### 注释
有注释效果的链接。文字链接不提供弹框，请使用 `n-popover` 包裹
:::demo ./demos/attribute.vue:::

[//]: # (### 锚点)

[//]: # (带有锚点，也可以设置 `anchor-offset` 滚动至距顶 px)

[//]: # ()
[//]: # (因为本文档的内容放在了 `n-main` 中，所以需要设置 `scroll-target`)

[//]: # ()
[//]: # (需要注意的是:)

[//]: # (- 如果同时传入了 `anchor` 、 `to` 或 `href`，会忽略 `to` 与 `href`)

[//]: # (- 必须使用 history 的路由形式，hash 路由形式会影响锚点的使用)

[//]: # (:::demo ./demos/anchor.vue:::)

### 配合 `vue-router` 使用
可以通过 `to` `replace` 参数配合 `vue-router`

> *需要注意，`to` 判断优先级高于 `href`*
:::demo ./demos/vue-router.vue :::

### 前后缀
有前后缀的链接
:::demo ./demos/prefix-suffix.vue :::
