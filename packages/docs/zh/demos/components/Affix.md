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

Affix 会自动监听目标容器及其外层滚动，并在窗口或目标容器尺寸变化后更新位置。布局由其他脚本直接修改且没有触发滚动或 resize 时，可以调用暴露的 `updatePosition()` 主动重新计算。

:::demo components/Affix/multiple-scroll-container.vue :::

## 固定在底部

设置 `position="bottom"` 后，可配合 `offset` 构建始终可见的提交或保存操作。未提供 `target` 时使用窗口底部，提供目标容器时则限制在该容器边界内。

:::demo components/Affix/bottom.vue :::
