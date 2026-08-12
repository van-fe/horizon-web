# Mask 遮罩

Mask 在指定区域上方显示可配置的遮罩，并让可选操作内容保持在遮罩之上。

## 基础用法

在有定位上下文的容器中使用 `absolute`。隐藏状态仍保留 DOM，但根节点会透明且不响应指针事件。

:::react-demo react/components/Mask/basic.tsx :::

## 视觉类型

通过语义化类型选择遮罩强度，无需硬编码产品颜色。

:::react-demo react/components/Mask/variants.tsx :::

## 自定义外观

`color`、`opacity` 和 `fuzzified` 可以定制遮罩，同时继续使用共享布局与过渡行为。

:::react-demo react/components/Mask/custom.tsx :::

## Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `variant` | `'default' \| 'weak' \| 'strong' \| 'inverse' \| 'transparent' \| 'customize'` | `'default'` | 遮罩视觉类型 |
| `visible` | `boolean` | `true` | 是否显示遮罩 |
| `absolute` | `boolean` | `false` | 覆盖最近的定位容器，而不是视口 |
| `opacity` | `number \| string` | `1` | 遮罩透明度 |
| `color` | `string` | — | 自定义遮罩颜色 |
| `zIndex` | `number` | `1` | 根层级 |
| `fuzzified` | `boolean` | `false` | 使用半透明模糊效果 |
| `contentFullSize` | `boolean` | `false` | 内容区域占满遮罩 |
| `scrimClassName` | `string` | — | 遮罩背景 class |
| `scrimStyle` | `CSSProperties` | — | 遮罩背景样式 |
| `children` | `ReactNode` | — | 遮罩上方内容 |

## Callbacks

| 回调 | 签名 | 说明 |
| --- | --- | --- |
| `onMaskClick` | `(event: MouseEvent<HTMLDivElement>) => void` | 仅点击遮罩背景时触发 |

转发的 ref 指向根 `HTMLDivElement`。交互内容需要提供自己的可访问名称和焦点行为。
