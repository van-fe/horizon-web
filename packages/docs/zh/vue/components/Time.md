## 倒计时

传入秒数即可开始倒计时，并可通过 `finished` 事件在结束时更新业务状态。

:::demo vue/components/Time/demo1.vue :::

## 计时模式

`forward` 用于正向计时，`end-time` 根据绝对截止时间计算剩余时长，`calculative` 则展示两个时间点之间的静态差值。

:::demo vue/components/Time/props.vue :::

## 自定义内容

默认插槽会提供 `dd`、`hh`、`mm`、`ss`，可组合成数字看板或更易读的自然语言时长。

:::demo vue/components/Time/slot.vue :::

## Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `time` | `Date \| number \| string` | `10` | 时长或开始时间 |
| `end-time` | `Date \| number \| string` | `0` | 绝对结束时间 |
| `forward` | `boolean` | `false` | 是否正向计时 |
| `calculative` | `boolean` | `false` | 是否静态展示两个时间值的差 |

## Events

| 事件 | 说明 |
| --- | --- |
| `finished` | 倒计时归零时触发 |

## Slots

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `default` | `{ dd?, hh?, mm?, ss }` | 自定义时间内容 |
