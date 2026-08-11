# Input

Input captures single-line text, passwords, and multi-line content. Use an accessible label or `aria-label` for every field.

```tsx
import { Input } from '@aurora/horizon-web-react';
import '@aurora/horizon-web-react/style.css';
```

:::react-demo react/components/Input/basic.tsx :::

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` / `defaultValue` | `string` | — / `''` | Controlled value and initial uncontrolled value |
| `type` | `'text' \| 'textarea' \| 'password'` | `'text'` | Field type |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Field size |
| `placeholder` | `string` | — | Placeholder text |
| `clearable` | `boolean` | `false` | Shows a clear action when a value exists |
| `readOnly` / `disabled` | `boolean` | `false` | Native interaction states |
| `showPassword` | `boolean` | `false` | Shows the password visibility action |
| `showLimit` | `boolean` | `false` | Shows the character count when `maxLength` is set |
| `maxLength` / `minLength` | `number` | — | Native length bounds |
| `allowOverflow` | `boolean` | `false` | Allows input beyond `maxLength` and displays an error state |
| `rows` | `number` | `2` | Textarea rows |
| `resize` | `InputResizeMode` | `'vertical'` | Textarea resize behavior |
| `autoSize` | `boolean \| { minRows?: number; maxRows?: number }` | `false` | Automatically adjusts textarea height |
| `variant` | `'normal' \| 'emphasize' \| 'no-border'` | `'normal'` | Visual style |
| `status` | `'error'` | — | Validation state |
| `prefix` / `suffix` | `ReactNode` | — | Content inside the field |
| `prepend` / `append` | `ReactNode` | — | Content adjoining the field |
| `onValueChange` | `(value: string) => void` | — | Immediate value callback |
| `onInput` | `(value: string, event: FormEvent) => void` | — | Input callback with the native event |
| `onChange` | `(value: string) => void` | — | Fires on blur when the focused value changed |
| `onClear` | `() => void` | — | Clear callback |

The ref exposes `input`, `focus()`, `blur()`, and `select()`.
