## 页面顶部固定

Affix 默认监听窗口滚动并固定在视口顶部。组件会保留原始占位，避免内容在进入固定状态时跳动。

:::demo components/Affix/basic.vue :::

## 顶部偏移

使用 `offset` 为全局导航或安全区域预留距离。数值单位为像素。

:::demo components/Affix/offset.vue :::

## 指定滚动容器

通过 `target` 指定元素或选择器，固钉会根据该容器计算边界。示例使用唯一 ID，避免同一文档中的多个 Demo 相互选中。

:::demo components/Affix/target.vue :::

## 嵌套滚动容器

Affix 会监听 `target` 自身；若外层容器也能滚动，需要在外层滚动时调用暴露的 `updatePosition()`。示例使用 Vue 的滚动监听，组件卸载时会自动移除。

:::demo components/Affix/multiple-scroll-container.vue :::

## 固定在底部

设置 `position="bottom"` 后，可配合 `offset` 构建始终可见的提交或保存操作。固定元素仍会被限制在目标容器边界内。

:::demo components/Affix/bottom.vue :::
