# Alert

Alert presents important inline feedback with status semantics, actions, and dismissal.

```tsx
import { Alert } from '@aurora/horizon-web-react';
import '@aurora/horizon-web-react/style.css';
```

:::react-demo react/components/Alert/basic.tsx :::

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` / `description` | `string` | `''` | Title and description |
| `type` | `'success' \| 'info' \| 'warning' \| 'error'` | `'info'` | Status type |
| `closable` / `rounded` | `boolean` | `true` | Dismissal and radius |
| `showIcon` | `boolean` | `false` | Shows a status icon |
| `size` | `'small' \| 'medium'` | `'medium'` | Size |
| `primaryButtonText` / `defaultButtonText` | `string` | `''` | Action labels |
| `onPrimary` / `onDefault` | `(close: () => void) => void` | — | Action callbacks |
| `onClose` | `(event) => void` | — | Dismissal callback |
| `children` / `icon` | `ReactNode` | — | Custom content and icon |

Warning and error states use an assertive `alert`; other states use a polite `status`. The ref targets the root `HTMLDivElement`.
