# Alert 提示

Alert 在页面内展示重要反馈，并支持状态语义、操作和关闭。

```tsx
import { Alert } from '@aurora/horizon-react';
import '@aurora/horizon-react/style.css';
```

:::react-demo react/components/Alert/basic.tsx :::

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `title` / `description` | `string` | `''` | 标题与描述 |
| `type` | `'success' \| 'info' \| 'warning' \| 'error'` | `'info'` | 状态类型 |
| `closable` / `rounded` | `boolean` | `true` | 可关闭与圆角 |
| `showIcon` | `boolean` | `false` | 显示状态图标 |
| `size` | `'small' \| 'medium'` | `'medium'` | 尺寸 |
| `primaryButtonText` / `defaultButtonText` | `string` | `''` | 操作文本 |
| `onPrimary` / `onDefault` | `(close: () => void) => void` | — | 操作回调 |
| `onClose` | `(event) => void` | — | 关闭回调 |
| `children` / `icon` | `ReactNode` | — | 自定义内容与图标 |

警告和错误使用 assertive `alert`，其他类型使用 polite `status`。`ref` 指向根 `HTMLDivElement`。
