# Result 结果

Result 用于反馈操作结果或 HTTP 异常状态，并提供后续操作。

```tsx
import { Result } from '@aurora/horizon-web-react';
import '@aurora/horizon-web-react/style.css';
```

:::react-demo react/components/Result/basic.tsx :::

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `title` / `subtitle` | `string` | `''` | 标题与副标题 |
| `type` | `'info' \| 'success' \| 'warning' \| 'error' \| 403 \| 404 \| 500 \| '403' \| '404' \| '500'` | `'success'` | 结果类型 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 尺寸 |
| `primaryButton` / `secondaryButton` | `boolean` | `true` | 显示操作按钮 |
| `primaryButtonText` / `secondaryButtonText` | `string` | — | 按钮文本 |
| `primaryButtonProps` / `secondaryButtonProps` | `Partial<ButtonProps>` | — | 按钮配置 |
| `icon` / `titleContent` / `subtitleContent` / `extra` | `ReactNode` | — | 自定义区域 |
| `onPrimaryClick` / `onSecondaryClick` | `(event) => void` | — | 操作回调 |
