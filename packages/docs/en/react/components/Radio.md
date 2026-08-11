# Radio

Radio selects one option from a mutually exclusive group. Use a stable `name` for native keyboard grouping and `RadioButton` for a segmented button presentation.

```tsx
import { Radio, RadioButton, RadioGroup } from '@aurora/horizon-web-react';
import '@aurora/horizon-web-react/style.css';
```

:::react-demo react/components/Radio/basic.tsx :::

## Radio props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` / `defaultValue` | `ChoiceValue` | — / `''` | Controlled group value and initial uncontrolled value |
| `optionValue` | `ChoiceValue` | `''` | Value represented by this option |
| `disabled` / `readOnly` | `boolean` | `false` | Disables interaction or renders only the selected label |
| `bordered` | `boolean` | `false` | Shows a bordered radio |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Bordered or button size |
| `fill` | `string` | `''` | Button fill color |
| `name` | `string` | Generated | Native radio-group name |
| `children` | `ReactNode \| (context) => ReactNode` | Option value | Label content; context contains `checked` and `value` |
| `onChange` | `(value) => void` | — | Selection callback |
| `onBlur` | Native handler | — | Native input blur callback |

`RadioButton` accepts the same value, state, size, fill, callback, and label props. The ref exposes `focus()` and the native `input`.

## RadioGroup props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` / `defaultValue` | `ChoiceValue` | — / `''` | Controlled value and initial uncontrolled value |
| `disabled` / `readOnly` | `boolean` | `false` | State inherited by every option |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Size inherited by every option |
| `name` | `string` | Generated | Shared native name |
| `onChange` | `(value) => void` | — | Group selection callback |
| `onBlur` | Native handler | — | Called when a child input loses focus |
