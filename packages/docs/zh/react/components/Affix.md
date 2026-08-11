# Affix 固钉

Affix 将内容固定在视口或滚动容器的顶部/底部边界，并保留原始布局占位，避免周围内容跳动。

## 视口边界

:::react-demo react/components/Affix/basic.tsx :::

## 容器边界与 ref

ref 持有的滚动容器可通过稳定的目标解析函数传入。布局变化未触发滚动或 resize 时，可使用命令主动重新计算。

:::react-demo react/components/Affix/target.tsx :::

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `offset` | `number` | `0` | 与边界的像素偏移 |
| `position` | `'top' \| 'bottom'` | `'top'` | 固定边缘 |
| `target` | `string \| HTMLElement \| Window \| (() => target)` | `window` | 滚动边界目标 |
| `zIndex` | `number` | — | 固定状态层级 |
| `onChange` | `(affixed: boolean) => void` | — | 固定状态变化回调 |
| `children` | `ReactNode` | — | 被固定内容 |

`AffixHandle` 提供 `updatePosition()` 与只读 `element`。占位元素不进入无障碍树，内容保留原生语义和属性。
