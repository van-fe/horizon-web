# TimeSelect

TimeSelect generates fixed-interval clock options and composes the native React Select renderer. The selected value always uses `HH:mm`; `format` only changes labels.

## Basic usage

:::react-demo react/components/TimeSelect/basic.tsx :::

## Display format

:::react-demo react/components/TimeSelect/format.tsx :::

## Selectable bounds

:::react-demo react/components/TimeSelect/bounds.tsx :::

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` / `defaultValue` | `string` | — | Controlled value or initial uncontrolled value in `HH:mm`. |
| `start` / `end` | `string` | `'09:00'` / `'18:00'` | Generated range. |
| `step` | `string` | `'00:30'` | Positive option interval. |
| `includeEndTime` | `boolean` | `false` | Includes an aligned or unaligned ending option. |
| `minTime` / `maxTime` | `string` | — | Inclusive selectable bounds; outside options remain visible but disabled. |
| `format` | `string` | `'HH:mm'` | Day.js label format. |
| `editable` | `boolean` | `true` | Enables text filtering. |
| `disabled` / `clearable` | `boolean` | `false` / `true` | Interaction states. |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Select size. |
| `placeholder` | `string` | provider text | Input placeholder. |
| `placement` | `WebPlacement` | `'bottom-start'` | Popup placement. |
| `portal` / `portalContainer` | `boolean` / `PortalTarget` | `true` / `'body'` | Portal behavior. |
| `emptyContent` / `panelHeader` / `panelFooter` | `ReactNode` | — | Popup regions. |
| `renderOption` | `(option, state) => ReactNode` | — | Custom time option. |
| `name` / `required` / `invalid` | native/form props | — | Form integration. |

## Callbacks and ref

`onChange(value)` reports the normalized `HH:mm` value. `onOpenChange`, `onFocus`, and `onBlur` expose popup and focus state.

`TimeSelectHandle` exposes `focus()`, `blur()`, `clear()`, `open()`, `close()`, and `updatePosition()`.
