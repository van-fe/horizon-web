# Collapse

Collapse organizes related content into panels that can be revealed when needed.

```tsx
import { Collapse, CollapseItem } from '@aurora/horizon-react';
import '@aurora/horizon-react/style.css';
```

## Controlled panels

Use `value` and `onChange` when the expanded panels belong to application state. Disabled items remain visible but cannot be activated.

:::react-demo react/components/Collapse/basic.tsx :::

## Accordion

Set `accordion` to keep at most one panel open. The active value is a single panel key or `undefined`.

:::react-demo react/components/Collapse/accordion.tsx :::

## Appearance and body lifecycle

Choose a size, icon position, filled or bordered appearance. `directive="show"` preserves a collapsed body; `directive="if"` mounts it only while expanded.

:::react-demo react/components/Collapse/appearance.tsx :::

## Collapse props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `CollapseValue` | — | Controlled expanded panels |
| `defaultValue` | `CollapseValue` | `[]` | Initial uncontrolled expanded panels |
| `accordion` | `boolean` | `false` | Allows only one expanded panel |
| `border` | `boolean` | `false` | Uses the bordered appearance |
| `filled` | `boolean` | `false` | Uses the filled appearance |
| `expandIconPosition` | `'left' \| 'right'` | `'left'` | Expand-icon position |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Component size |
| `expandAll` | `boolean` | `false` | Initially expands every enabled direct item |
| `children` | `ReactNode` | — | Composed panel items |

`Collapse` accepts native `div` attributes. `onChange(value)` runs after an enabled header changes. Its ref implements `CollapseHandle`: `focus(key?)` focuses the first enabled header or a requested panel, and `root` exposes the root element.

## CollapseItem props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string \| number` | — | Required unique panel key |
| `title` | `ReactNode` | — | Header content |
| `disabled` | `boolean` | `false` | Disables the header |
| `expandIcon` | `ReactNode` | — | Expand-icon content |
| `color` | `string` | — | Divider color |
| `background` | `string` | — | Header background color |
| `directive` | `'show' \| 'if'` | `'show'` | Body persistence strategy |
| `children` | `ReactNode` | — | Panel body |

`CollapseItem` accepts native `div` attributes. Each header is a native button with its controlled region linked through `aria-controls` and `aria-labelledby`.
