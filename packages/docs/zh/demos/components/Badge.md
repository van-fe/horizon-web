Badge 用于在明确的业务目标旁展示新状态、数量或身份标记。标记应补充内容，而不是替代可读文字。

## 基础圆点

默认圆点适合提示“有新内容”，可通过 `bottom` 切换到底部位置。

:::demo components/Badge/basic.vue :::

## 数字与最大值

设置 `type="num"` 和 `content` 展示数量；超过 `num-max` 时显示上限提示。

:::demo components/Badge/num.vue :::

## 语义颜色

`color` 可接受主题变量或自定义颜色。优先使用产品语义 token 保持明暗主题一致。

:::demo components/Badge/color.vue :::

## 图标标记

设置 `type="icon"`、`content` 与 `icon-size`，可在头像或对象上展示紧凑的身份标记。

:::demo components/Badge/icon.vue :::

## 显示与隐藏

`hidden` 完全控制标记可见性；数字 `0` 默认仍会显示，便于区分“无待办”和“未加载”。

:::demo components/Badge/hidden.vue :::

## 对齐与偏移

使用 `align` 比较中心、内部、外部和固定左边缘等定位方式，`offset` 仅用于必要的细调。

:::demo components/Badge/align.vue :::
