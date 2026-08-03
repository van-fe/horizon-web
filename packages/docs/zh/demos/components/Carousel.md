Carousel 在有限空间中轮换同层级内容。每一项应提供简洁 `label`，轮播区域应使用能描述用途的 `aria-label`。

## 基础用法

在 `h-carousel` 中放置多个 `h-carousel-item`，可使用箭头、指示器、触摸或键盘切换。

:::demo components/Carousel/basic.vue :::

## 自动轮播

`interval` 设置轮播间隔。组件会在悬停、页面不可见或焦点进入时暂停；示例还提供显式暂停与恢复操作。

:::demo components/Carousel/autoplay.vue :::

## 渐隐、受控索引与实例方法

通过 `v-model` 控制索引，`effect="fade"` 使用渐隐效果。实例提供 `prev`、`next`、`setActiveItem`、`pause` 和 `play`。

:::demo components/Carousel/effect.vue :::

## 垂直方向

设置 `direction="vertical"` 使用垂直轮播。聚焦后可用方向键、Home 和 End 导航。

:::demo components/Carousel/vertical.vue :::

## 无障碍说明

非活动项会从辅助技术和键盘导航中隐藏。自动轮播应提供可发现的暂停方式，并在用户主动暂停后保持暂停。
