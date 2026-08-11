# Result

Result communicates operation outcomes or HTTP error states and offers follow-up actions.

```tsx
import { Result } from '@aurora/horizon-web-react';
import '@aurora/horizon-web-react/style.css';
```

:::react-demo react/components/Result/basic.tsx :::

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` / `subtitle` | `string` | `''` | Title and subtitle |
| `type` | `'info' \| 'success' \| 'warning' \| 'error' \| 403 \| 404 \| 500 \| '403' \| '404' \| '500'` | `'success'` | Result type |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Size |
| `primaryButton` / `secondaryButton` | `boolean` | `true` | Shows action buttons |
| `primaryButtonText` / `secondaryButtonText` | `string` | — | Button labels |
| `primaryButtonProps` / `secondaryButtonProps` | `Partial<ButtonProps>` | — | Button options |
| `icon` / `titleContent` / `subtitleContent` / `extra` | `ReactNode` | — | Custom regions |
| `onPrimaryClick` / `onSecondaryClick` | `(event) => void` | — | Action callbacks |
