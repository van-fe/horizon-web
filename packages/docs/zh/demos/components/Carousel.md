## 基础用法

在 `h-carousel` 中放置多个 `h-carousel-item`。轮播项可承载图片、卡片或任意自定义内容。

:::demo components/Carousel/basic.vue :::

## 自动轮播

默认开启自动轮播，`interval` 用于设置间隔。组件会在鼠标悬停、页面不可见或焦点进入时暂停；右上角按钮可显式暂停和恢复。

:::demo components/Carousel/autoplay.vue :::

## 渐隐、受控索引与实例方法

通过 `v-model` 控制当前索引，`effect="fade"` 使用渐隐效果。实例提供 `prev`、`next`、`setActiveItem`、`pause` 和 `play` 方法。

:::demo components/Carousel/effect.vue :::

## 垂直方向

设置 `direction="vertical"` 可垂直轮播。组件支持触摸滑动；聚焦走马灯后，可使用方向键、Home 和 End 键导航。

:::demo components/Carousel/vertical.vue :::

## 无障碍说明

自动轮播提供独立的暂停/恢复按钮，焦点进入后不会自行恢复；非活动轮播项会从辅助技术和键盘导航中隐藏。建议为走马灯设置能描述内容用途的 `aria-label`，并为每个轮播项设置简洁的 `label`。
