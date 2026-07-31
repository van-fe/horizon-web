## 基本用法
设置 `clickable = true` 允许标签点击

设置 `bold = true`，开启标签强调状态
:::demo components/Tag/basic.vue :::

## 不同类型
通过设置 `type` 来更改状态，从而更改颜色
:::demo components/Tag/type.vue :::

## 线性标签
设置 `plain = true`，可以开启线性样式
:::demo components/Tag/plain.vue :::

## 可激活标签
给 `modelValue` 传递一个 `boolean` 值，即可激活点击后是否激活的功能。

当传递 `boolean` 后，无需额外设置 `clickable`，标签自动处于可点击的状态。
:::demo components/Tag/active.vue :::

## Icon
可以通过 `props.icon` 或 `slots.icon` 传入 `icon`
:::demo components/Tag/icon.vue :::

## 头像
可以通过 `props.avatar` 传入头像链接

或直接使用 `slots.avatar` 传入自定义头像组件
:::demo components/Tag/avatar.vue :::

## 胶囊形和方形标签
设置 `round = true`，将标签置为胶囊形

设置 `equally = true`，将标签置为长宽一致的正方形标签
:::demo components/Tag/shape.vue :::

## 可关闭标签
设置 `closable = true`，将标签置为可关闭状态

如果同时设置了 `clickable` 和 `equally`，则会在悬浮后 `props.showCloseDelay (默认1秒)` 显示关闭按钮，如果在此之前点击了按钮，则在**鼠标移开前**不会再触发显示关闭按钮

如果没有设置 `clickable`，但设置了 `equally`，则会无延迟地直接显示关闭按钮
:::demo components/Tag/closable.vue :::

## 加载中
设置 `loading = true`，可以展示加载中的 `icon`
:::demo components/Tag/loading.vue :::

## 禁用
设置 `disabled = true`，禁用标签，此时即使设置了 `closable`，也不会显示关闭按钮
:::demo components/Tag/disabled.vue :::

## 多彩标签
内置了一些颜色，可以直接使用这些颜色

当然也可以只设定一个 `color` 来自定义颜色，然后会自动生成各种状态的颜色

如果你对生成的背景色不满意，可以指定 `background`，但这个就不会自动生成颜色了

自定义颜色时，请传入色系中最深的颜色，防止在 `disabled` 等状态下不可视的问题

**为保证兼容性，2.0.2开始默认不会自动生成颜色，需要自动生成颜色需要开启 `auto-color = true`**
:::demo components/Tag/colorful.vue :::

## 新建、修改标签
通过 `h-tag-group` 的 `props.useCreate` 快速创建一个允许输入创建的标签

配合 `max-tags`，可以在标签数量达到一定值后不显示创建标签

给 `h-tag` 或 `h-tag-group` 设置 `editable = true` ，则允许标签进行编辑
:::demo components/Tag/create-update.vue :::

## 标签折叠
设置 `collapse = true`，可以将即将换行的标签折叠起来

设置 `expand = true`，可以点击折叠的数字 `tag`，收起或展开
:::demo components/Tag/collapse.vue :::
