# Spin 加载中

Spin 用于表达短时异步任务，可作为内联、区域或全屏加载状态使用。

## 基础用法

使用 `spinning` 控制加载状态，使用 `tip` 提供可读的状态标签。

:::react-demo react/components/Spin/basic.tsx :::

## 包裹内容与延迟

包裹内容后可显示区域遮罩；`delay` 能避免很快完成的任务造成闪烁。

:::react-demo react/components/Spin/nested.tsx :::

## 自定义指示器

通过 `indicator` 和 `tipContent` 自定义视觉内容，同时保留状态语义。

:::react-demo react/components/Spin/custom.tsx :::

## Props

| Prop | Type | Default | 说明 |
| --- | --- | --- | --- |
| `spinning` | `boolean` | `true` | 是否处于加载状态 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 指示器尺寸 |
| `delay` | `number` | `0` | 延迟显示毫秒数 |
| `tip` | `string` | — | 加载文字与可访问状态标签 |
| `mask` | `boolean` | `true` | 包裹内容时显示半透明遮罩 |
| `fullscreen` | `boolean` | `false` | 覆盖整个视口 |
| `indicator` | `ReactNode` | — | 自定义加载指示器 |
| `tipContent` | `ReactNode` | — | 自定义可见提示内容 |
| `children` | `ReactNode` | — | 被区域加载状态覆盖的内容 |

转发的 ref 指向根 `HTMLDivElement`。未设置 `tip` 时，状态标签来自 `HorizonWebProvider.spinLabels.loading`。
