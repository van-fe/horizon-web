Carousel 在有限空间中轮换同层级内容。图片轮播采用纯图片内容、圆形方向箭头和圆点指示器；每一项应提供简洁 `label`，轮播区域应使用能描述用途的 `aria-label`。

## 基础用法

在 `h-carousel` 中放置多个 `h-carousel-item`。基础图片轮播默认显示方向箭头和底部圆点，也支持触摸与键盘切换。

:::demo components/Carousel/basic.vue :::

## 自动轮播

`interval` 设置轮播间隔。组件会在悬停、页面不可见或焦点位于内部时临时暂停；用户显式暂停后会保持暂停。

:::demo components/Carousel/autoplay.vue :::

## 渐隐切换

设置 `effect="fade"` 使用渐隐切换效果。示例同时隐藏方向箭头，让画面保持简洁。

:::demo components/Carousel/effect.vue :::

## 垂直方向

设置 `direction="vertical"` 使用垂直轮播，指示器随之显示在右侧。聚焦走马灯根节点后可用方向键、Home 和 End 导航。

:::demo components/Carousel/vertical.vue :::

## 卡片化

当页面宽度方向空间充足时，设置 `effect="card"` 使用卡片化风格。当前项居中显示，前后项作为半透明预览分布在两侧。

:::demo components/Carousel/card.vue :::

## 纵向卡片

纵向卡片需要同时设置 `direction="vertical"`、`effect="card"` 和 `indicator-position="outer-right"`。容器高度应为卡片高度的 1.5 倍；下例使用 300px 高的容器和 200px 高的卡片。

:::demo components/Carousel/vertical-card.vue :::

## 指示器

通过 `indicator-type` 在 `dot`、`line` 和 `slider` 之间切换指示器样式；也可以通过 `indicator-position` 设置指示器位置。方向箭头与左右指示器同时显示时，同侧箭头会自动向内避让。

:::demo components/Carousel/indicator.vue :::

## 无障碍说明

非活动项会从辅助技术和键盘导航中隐藏。自动轮播应提供可发现的暂停方式，并在用户主动暂停后保持暂停。
