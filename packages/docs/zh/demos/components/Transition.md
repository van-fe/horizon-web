Transition 封装了 Horizon Web 的常用进入、离开与列表位移动画。

## 淡入淡出

`fade-in-linear` 使用线性透明度变化，`fade-in` 使用缓动曲线。

:::demo components/Transition/fade.vue :::

## 缩放

通过不同 `zoom-in-*` 名称选择变换原点，`speed` 控制动画速度。

:::demo components/Transition/zoom.vue :::

## 展开收起

`collapse` 处理垂直尺寸，`collapse-horizontal` 处理水平尺寸。水平内容应避免在过渡期间换行。

:::demo components/Transition/collapse.vue :::

## 滑动

使用 `slide-up`、`slide-right`、`slide-down` 或 `slide-left` 指定进入方向。

:::demo components/Transition/slide.vue :::

## 列表位移

设置 `group` 并使用 `float`，可让增删后的列表条目平滑移动到新位置。

:::demo components/Transition/float.vue :::
