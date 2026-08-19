# Input 输入框

Input 用于输入单行文本、密码和多行内容。每个输入框都应通过可见标签或 `aria-label` 提供无障碍名称。

```tsx
import { Input } from '@aurora/horizon-react';
import '@aurora/horizon-react/style.css';
```

:::react-demo react/components/Input/basic.tsx :::

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` / `defaultValue` | `string` | — / `''` | 受控值和非受控初始值 |
| `type` | `'text' \| 'textarea' \| 'password'` | `'text'` | 输入类型 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 输入框尺寸 |
| `placeholder` | `string` | — | 占位文本 |
| `clearable` | `boolean` | `false` | 有值时显示清空操作 |
| `readOnly` / `disabled` | `boolean` | `false` | 原生交互状态 |
| `showPassword` | `boolean` | `false` | 显示密码可见性操作 |
| `showLimit` | `boolean` | `false` | 设置 `maxLength` 时显示字数 |
| `maxLength` / `minLength` | `number` | — | 原生长度边界 |
| `allowOverflow` | `boolean` | `false` | 允许超过 `maxLength` 并显示错误状态 |
| `rows` | `number` | `2` | 文本域行数 |
| `resize` | `InputResizeMode` | `'vertical'` | 文本域缩放方式 |
| `autoSize` | `boolean \| { minRows?: number; maxRows?: number }` | `false` | 自动调整文本域高度 |
| `variant` | `'normal' \| 'emphasize' \| 'no-border'` | `'normal'` | 视觉样式 |
| `status` | `'error'` | — | 校验状态 |
| `prefix` / `suffix` | `ReactNode` | — | 输入框内部内容 |
| `prepend` / `append` | `ReactNode` | — | 输入框相邻内容 |
| `onValueChange` | `(value: string) => void` | — | 即时值变化回调 |
| `onInput` | `(value: string, event: FormEvent) => void` | — | 包含原生事件的输入回调 |
| `onChange` | `(value: string) => void` | — | 聚焦期间值变化后，在失焦时触发 |
| `onClear` | `() => void` | — | 清空回调 |

ref 提供 `input`、`focus()`、`blur()` 和 `select()`。
