# Slider

Slider selects a single value or a range from a continuous or stepped interval. Give every interactive slider an accessible name.

```tsx
import { Slider } from '@aurora/horizon-react';
import '@aurora/horizon-react/style.css';
```

:::react-demo react/components/Slider/basic.tsx :::

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` / `defaultValue` | `number \| readonly [number, number]` | — / `0` | Controlled value and initial uncontrolled value |
| `min` / `max` | `number` | `0` / `100` | Value bounds |
| `step` | `number` | `1` | Adjustment step |
| `range` | `boolean` | `false` | Enables two-thumb range selection |
| `disabled` | `boolean` | `false` | Disables interaction |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Slider size |
| `tone` | `'primary' \| 'info' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | Semantic color |
| `color` | `string` | — | Custom progress color |
| `trackClickable` | `boolean` | `true` | Allows track clicks to update the value |
| `keyboard` | `boolean` | `true` | Enables arrow, Home, and End keys |
| `showSeparators` | `boolean` | `false` | Shows step ticks |
| `showInput` | `boolean` | `false` | Shows a number input in single-value mode |
| `inputProps` | `InputHTMLAttributes<HTMLInputElement>` | — | Native number-input attributes |
| `showTooltip` | `boolean` | `true` | Shows the active thumb value |
| `tooltipPlacement` | `SliderTooltipPlacement` | `'top'` | Tooltip placement |
| `formatTooltip` | `(value: number) => string` | — | Formats tooltip content |
| `onChange` | `(value: SliderValue) => void` | — | Value-change callback |
| `onFocus` / `onBlur` | `(event: FocusEvent) => void` | — | Thumb focus callbacks |

The ref exposes `focus()`.
