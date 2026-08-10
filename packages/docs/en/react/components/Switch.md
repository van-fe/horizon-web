# Switch

Switch edits a boolean value, supports controlled and uncontrolled state, and uses a native checkbox for keyboard operation and form submission.

## Basic Usage

```tsx
import { Switch } from '@aurora/horizon-web-react';
import '@aurora/horizon-web-react/style.css';
```

:::react-demo react/components/Switch/basic.tsx :::

## Controlled and Uncontrolled State

Use `value` with `onChange` for controlled state. Provide only `defaultValue` when the Switch should maintain its own state. `beforeChange` can synchronously or asynchronously decide whether to accept the next value.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `boolean` | — | Controlled value |
| `defaultValue` | `boolean` | `false` | Initial uncontrolled value |
| `beforeChange` | `boolean \| ((nextValue: boolean) => boolean \| PromiseLike<boolean>)` | — | Guard evaluated before a change |
| `disabled` | `boolean` | `false` | Prevents interaction |
| `readOnly` | `boolean` | `false` | Makes the control read-only |
| `label` | `ReactNode` | — | Label content |
| `labelPosition` | `'top' \| 'left' \| 'right'` | `'top'` | Label position |
| `status` | `boolean` | `false` | Shows status text |
| `statusPosition` | `'outside' \| 'inside'` | `'outside'` | Status text position |
| `statusOnText` | `ReactNode` | Provider label | Text for the on state |
| `statusOffText` | `ReactNode` | Provider label | Text for the off state |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Switch size |
| `className` | `string` | — | Root class name |
| `inputProps` | `InputHTMLAttributes<HTMLInputElement>` | — | Native input attributes |

The `ref` resolves to the internal `HTMLInputElement`.

## Callbacks

| Callback | Type | Description |
| --- | --- | --- |
| `onChange` | `(value: boolean, details: { reason: 'toggle' }) => void` | Called after accepting the next value |
| `onBlur` | `FocusEventHandler<HTMLInputElement>` | Native blur callback |
