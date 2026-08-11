# Checkbox

Checkbox selects zero or more independent options. Use `CheckboxGroup` for a shared array value and `CheckboxButton` when the same behavior needs a compact button presentation.

```tsx
import { Checkbox, CheckboxButton, CheckboxGroup } from '@aurora/horizon-web-react';
import '@aurora/horizon-web-react/style.css';
```

:::react-demo react/components/Checkbox/basic.tsx :::

## Checkbox props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` / `defaultValue` | `CheckboxValue` | — / `false` | Controlled value and initial uncontrolled value |
| `optionValue` | `string \| number \| boolean` | `''` | Value represented by an item in a group |
| `trueValue` / `falseValue` | `ChoiceValue` | — | Custom scalar values for checked and unchecked states |
| `disabled` / `readOnly` | `boolean` | `false` | Disables interaction or renders only a selected label |
| `bordered` / `indeterminate` | `boolean` | `false` | Bordered and mixed visual states |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Bordered or button size |
| `fill` | `string` | `''` | Button fill color |
| `children` | `ReactNode \| (context) => ReactNode` | Option value | Label content; context contains `checked` and `value` |
| `onChange` | `(value, details) => void` | — | Value callback with checked state and option value |
| `onBlur` / `onClick` | Native handlers | — | Native input callbacks |

`CheckboxButton` accepts the same value, state, size, fill, callback, and label props. The ref exposes `focus()`, `toggle()`, and the native `input`.

## CheckboxGroup props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` / `defaultValue` | `readonly ChoiceValue[]` | — / `[]` | Controlled values and initial uncontrolled values |
| `disabled` / `readOnly` | `boolean` | `false` | State inherited by every option |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Size inherited by every option |
| `onChange` | `(values) => void` | — | Group value callback |
| `onBlur` | Native handler | — | Called when a child input loses focus |
