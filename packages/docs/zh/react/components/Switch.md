# Switch 开关

Switch 用于编辑布尔状态，支持受控和非受控用法，并通过原生 checkbox 参与键盘操作和表单提交。

## 基础用法

```tsx
import { Switch } from '@aurora/horizon-web-react';
import '@aurora/horizon-web-react/style.css';
```

:::react-demo react/components/Switch/basic.tsx :::

## 受控和非受控状态

使用 `value` 与 `onChange` 管理受控状态；只提供 `defaultValue` 时，Switch 在内部维护状态。`beforeChange` 可以同步或异步决定是否接受下一状态。

## Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | `boolean` | — | 受控值 |
| `defaultValue` | `boolean` | `false` | 非受控初始值 |
| `beforeChange` | `boolean \| ((nextValue: boolean) => boolean \| PromiseLike<boolean>)` | — | 状态改变前的守卫 |
| `disabled` | `boolean` | `false` | 禁止交互 |
| `readOnly` | `boolean` | `false` | 只读状态 |
| `label` | `ReactNode` | — | 标签内容 |
| `labelPosition` | `'top' \| 'left' \| 'right'` | `'top'` | 标签位置 |
| `status` | `boolean` | `false` | 显示状态文字 |
| `statusPosition` | `'outside' \| 'inside'` | `'outside'` | 状态文字位置 |
| `statusOnText` | `ReactNode` | Provider 文案 | 开启状态文字 |
| `statusOffText` | `ReactNode` | Provider 文案 | 关闭状态文字 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 开关尺寸 |
| `className` | `string` | — | 根元素类名 |
| `inputProps` | `InputHTMLAttributes<HTMLInputElement>` | — | 原生 input 属性 |

`ref` 指向内部 `HTMLInputElement`。

## Callbacks

| 回调 | 类型 | 说明 |
| --- | --- | --- |
| `onChange` | `(value: boolean, details: { reason: 'toggle' }) => void` | 接受新状态后调用 |
| `onBlur` | `FocusEventHandler<HTMLInputElement>` | 原生失焦回调 |
