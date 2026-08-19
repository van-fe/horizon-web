# Typography

Typography presents headings, body text, and supporting text consistently, with ellipsis, copy, and editing capabilities.

## Basic Usage

```tsx
import { Typography } from '@aurora/horizon-react';
import '@aurora/horizon-react/style.css';
```

:::react-demo react/components/Typography/basic.tsx :::

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | — | Controlled text |
| `defaultValue` | `string` | `''` | Initial uncontrolled text |
| `tag` | `string` | `'span'` | Rendered tag |
| `level` | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | — | Heading level |
| `variant` | `'default' \| 'secondary' \| 'success' \| 'warning' \| 'danger'` | `'default'` | Semantic variant |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Text size |
| `weight` | `'regular' \| 'medium' \| 'semibold' \| 'bold'` | `'regular'` | Font weight |
| `block` / `italic` / `underline` / `deleted` / `code` | `boolean` | `false` | Text styles |
| `ellipsis` | `boolean \| number` | `false` | One-line or multi-line truncation |
| `copyable` | `boolean` | `false` | Shows the copy action |
| `editable` | `boolean` | `false` | Enables editing |
| `disabled` | `boolean` | `false` | Disables actions |
| `prefix` / `suffix` / `children` | `ReactNode` | — | Text-region content |

## Callbacks and ref

| API | Type | Description |
| --- | --- | --- |
| `onValueChange` | `(value: string) => void` | Text value changed |
| `onChange` | `(value: string) => void` | Edit committed |
| `onCopy` | `(value: string, success: boolean) => void` | Copy result |
| `ref.edit()` | `() => void` | Enters edit mode |
| `ref.cancelEdit()` | `() => void` | Cancels editing |
| `ref.copy()` | `() => Promise<boolean>` | Copies the current text |
