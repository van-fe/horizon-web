# Select

Select chooses one value from a collection. It supports data options, declarative options, controlled state, text filtering, keyboard interaction, and a portal popup.

## Basic usage

```tsx
import { Select } from '@aurora/horizon-react';
import '@aurora/horizon-react/style.css';
```

:::react-demo react/components/Select/basic.tsx :::

## Declarative options

```tsx
import { Option, OptionGroup, Select } from '@aurora/horizon-react';

<Select placeholder="Choose a city">
  <OptionGroup label="Popular cities">
    <Option value="shanghai">Shanghai</Option>
    <Option value="tokyo">Tokyo</Option>
  </OptionGroup>
</Select>;
```

## Keyboard and accessibility

The trigger uses `role="combobox"` and owns a `role="listbox"` popup. Arrow keys move the active option, `Enter` selects, `Home` and `End` move to a boundary, and `Escape` closes the popup. Disabled options are skipped.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `SelectValue` | — | Controlled selected value |
| `defaultValue` | `SelectValue` | — | Initial uncontrolled value |
| `open` | `boolean` | — | Controlled popup state |
| `defaultOpen` | `boolean` | `false` | Initial uncontrolled popup state |
| `options` | `SelectOptionData[]` | — | Data options |
| `children` | `Option \| OptionGroup` | — | Declarative options |
| `filterable` | `boolean` | `false` | Enables text filtering |
| `filter` | `(input, option) => boolean` | Built-in text filter | Custom option filter |
| `placeholder` | `string` | Provider dictionary | Placeholder text |
| `emptyContent` | `ReactNode` | Provider dictionary | Empty-state content |
| `disabled` | `boolean` | `false` | Disables interaction |
| `clearable` | `boolean` | `false` | Shows a clear button |
| `required` | `boolean` | `false` | Adds required semantics |
| `invalid` | `boolean` | `false` | Adds invalid semantics and styling |
| `name` | `string` | — | Native form field name |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Component size |
| `placement` | `WebPlacement` | `'bottom-start'` | Popup placement |
| `portal` | `boolean` | `true` | Uses a portal for the popup |
| `portalContainer` | `PortalTarget` | `'body'` | Portal destination |
| `panelHeader` | `ReactNode` | — | Popup header |
| `panelFooter` | `ReactNode` | — | Popup footer |
| `renderOption` | `(option, state) => ReactNode` | — | Custom option content |

## Callbacks

| Callback | Type | Description |
| --- | --- | --- |
| `onChange` | `(value, details) => void` | Runs when the selected value changes; `details.reason` identifies the source |
| `onOpenChange` | `(open, details) => void` | Runs when popup state changes |
| `onBlur` | `FocusEventHandler` | Runs when the trigger loses focus |

## Ref

The ref exposes `focus()`, `open()`, `close()`, `clear()`, and `updatePosition()`.
