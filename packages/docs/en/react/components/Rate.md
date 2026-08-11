# Rate

Rate lets people select or review a score with pointer and keyboard input. Give interactive ratings an accessible name and use `readOnly` for display-only scores.

```tsx
import { Rate } from '@aurora/horizon-web-react';
import '@aurora/horizon-web-react/style.css';
```

:::react-demo react/components/Rate/basic.tsx :::

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` / `defaultValue` | `number` | — / `3` | Controlled value and initial uncontrolled value |
| `count` | `number` | `5` | Number of rating items |
| `half` | `boolean` | `false` | Enables half-step input |
| `showTooltip` | `boolean` | `false` | Shows the current value or matching tooltip label |
| `tooltip` | `readonly (string \| number)[]` | `[]` | Labels whose length should match `count` |
| `readOnly` / `disabled` | `boolean` | `false` | Interaction states |
| `size` | `'small' \| 'medium' \| 'large' \| number` | `'medium'` | Icon size |
| `color` / `voidColor` / `disabledColor` | `string` | Theme values | Item colors |
| `gutter` | `number` | `5` | Gap after each icon in pixels |
| `renderIcon` | `ReactNode \| (context) => ReactNode` | `★` | Custom icon content; context contains `index`, `status`, and `value` |
| `onChange` | `(value: number) => void` | — | Value-change callback |
| `onBlur` | `(event: FocusEvent) => void` | — | Native blur callback |

The ref exposes `focus()`.
