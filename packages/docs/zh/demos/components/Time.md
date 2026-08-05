## 倒计时

传入秒数即可开始倒计时，并可通过 `finished` 事件在结束时更新业务状态。

:::demo components/Time/demo1.vue :::

## 计时模式

`forward` 用于正向计时，`end-time` 根据绝对截止时间计算剩余时长，`calculative` 则展示两个时间点之间的静态差值。

:::demo components/Time/props.vue :::

## 自定义内容

默认插槽会提供 `dd`、`hh`、`mm`、`ss`，可组合成数字看板或更易读的自然语言时长。

:::demo components/Time/slot.vue :::
