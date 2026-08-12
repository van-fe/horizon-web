# InputNumber

InputNumber edits bounded numeric values with precision-safe stepping, optional formatting, and keyboard or pointer controls.

## Basic usage

:::react-demo react/components/InputNumber/basic.tsx :::

## Precision and formatting

Use `stringMode` when decimal precision must not be limited by JavaScript numbers. `formatter` controls display and `parser` converts the formatted text back to a numeric value.

:::react-demo react/components/InputNumber/precision.tsx :::

## Controls and regions

Controls can sit on the right or on both sides. Long press repeats a step and stops on pointer release, cancellation, or unmount.

:::react-demo react/components/InputNumber/controls.tsx :::

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` / `defaultValue` | `number \| string \| null` | — / `null` | Controlled or initial value |
| `min` / `max` | `number \| string` | `-Infinity` / `Infinity` | Numeric boundaries |
| `step` | `number` | `1` | Step size |
| `stepStrictly` | `boolean` | `false` | Rounds values to step multiples |
| `precision` | `number` | — | Decimal places |
| `stringMode` | `boolean` | `false` | Emits strings for precision-safe values |
| `variant` | `'normal' \| 'emphasize' \| 'no-border'` | `'normal'` | Visual style |
| `controls` | `boolean` | `true` | Shows step controls |
| `controlsPosition` | `'right' \| 'between'` | `'right'` | Step-control position |
| `longPress` | `boolean` | `false` | Repeats steps while pressed |
| `longPressInterval` | `number` | `200` | Repeat interval in milliseconds |
| `formatter` / `parser` | functions | — | Display and parse formatted text |
| `clearable` | `boolean` | `false` | Shows a clear action |
| `disabled` / `readOnly` | `boolean` | `false` | Interaction state |
| `prefix` / `suffix` | `ReactNode` | — | Content inside the field |
| `prepend` / `append` | `ReactNode` | — | Content attached outside the field |

## Callbacks and ref

`onValueChange(value)` runs for every model update. `onInput(value)` runs while typing, while `onChange(value)` runs after blur, step, or clear commits a different value. Native focus, blur, keyboard, and wheel callbacks are also available.

The ref exposes `input`, `focus()`, `blur()`, `increase()`, `decrease()`, and `clear()`.

InputNumber consumes FormItem disabled, invalid, label, description, and validation-trigger state. Step controls are real buttons, and the input exposes spinbutton value semantics.
