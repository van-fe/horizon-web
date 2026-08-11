# Rate 评分

Rate 支持通过指针和键盘选择或查看评分。交互式评分应提供无障碍名称，只展示评分时使用 `readOnly`。

```tsx
import { Rate } from '@aurora/horizon-web-react';
import '@aurora/horizon-web-react/style.css';
```

:::react-demo react/components/Rate/basic.tsx :::

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` / `defaultValue` | `number` | — / `3` | 受控值和非受控初始值 |
| `count` | `number` | `5` | 评分项数量 |
| `half` | `boolean` | `false` | 允许半分输入 |
| `showTooltip` | `boolean` | `false` | 显示当前值或对应提示文本 |
| `tooltip` | `readonly (string \| number)[]` | `[]` | 数量应与 `count` 一致的提示文本 |
| `readOnly` / `disabled` | `boolean` | `false` | 交互状态 |
| `size` | `'small' \| 'medium' \| 'large' \| number` | `'medium'` | 图标尺寸 |
| `color` / `voidColor` / `disabledColor` | `string` | 主题值 | 评分项颜色 |
| `gutter` | `number` | `5` | 图标后的像素间距 |
| `renderIcon` | `ReactNode \| (context) => ReactNode` | `★` | 自定义图标；上下文包含 `index`、`status` 和 `value` |
| `onChange` | `(value: number) => void` | — | 值变化回调 |
| `onBlur` | `(event: FocusEvent) => void` | — | 原生失焦回调 |

ref 提供 `focus()`。
