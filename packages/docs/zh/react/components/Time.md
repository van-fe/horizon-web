# Time 计时

Time 用于倒计时、正向计时和静态时长展示。

## 倒计时

`time` 可传秒数；倒计时结束时触发 `onFinished`。

:::react-demo react/components/Time/basic.tsx :::

## 计时模式

`forward` 从零开始正向计时，`calculative` 展示两个时间点的静态差值。

:::react-demo react/components/Time/modes.tsx :::

## 自定义内容

函数 children 接收 `dd`、`hh`、`mm`、`ss`，适合渲染自然语言或数字看板。

:::react-demo react/components/Time/custom.tsx :::

## Props

| Prop | Type | Default | 说明 |
| --- | --- | --- | --- |
| `time` | `Date \| number \| string` | `10` | 秒数、秒级时间戳或毫秒级时间戳 |
| `endTime` | `Date \| number \| string` | `0` | 绝对结束时间 |
| `forward` | `boolean` | `false` | 是否正向计时 |
| `calculative` | `boolean` | `false` | 是否静态展示两个时间值的差 |
| `children` | `ReactNode \| ((parts: TimeParts) => ReactNode)` | — | 自定义显示内容 |
| `onFinished` | `() => void` | — | 倒计时归零时触发 |

转发的 ref 指向根 `HTMLDivElement`。
