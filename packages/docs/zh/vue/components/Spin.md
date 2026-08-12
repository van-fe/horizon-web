## 基础用法
用于短时异步操作，可设置尺寸和提示文字。
:::demo vue/components/Spin/basic.vue :::

## 包裹内容与延迟
包裹内容时显示区域遮罩；`delay` 可以避免极短请求造成闪烁。
:::demo vue/components/Spin/nested.vue :::

## Props

| Prop | Type | Default | 说明 |
| --- | --- | --- | --- |
| `spinning` | `boolean` | `true` | 是否处于加载状态 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 指示器尺寸 |
| `delay` | `number` | `0` | 延迟显示毫秒数 |
| `tip` | `string` | — | 加载提示文字 |
| `mask` | `boolean` | `true` | 包裹内容时显示半透明遮罩 |
| `fullscreen` | `boolean` | `false` | 覆盖整个视口 |

## Slots

| Slot | 说明 |
| --- | --- |
| `default` | 被区域加载状态覆盖的内容 |
| `indicator` | 自定义加载指示器 |
| `tip` | 自定义可见提示内容 |
