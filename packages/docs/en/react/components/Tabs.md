# Tabs

Tabs let people switch between related views without leaving the current context.

```tsx
import { Tab, Tabs } from '@aurora/horizon-web-react';
import '@aurora/horizon-web-react/style.css';
```

## Controlled selection

Use `value` and `onChange` when the selected view belongs to application state. Disabled items remain in the tab order model but cannot be selected.

:::react-demo react/components/Tabs/basic.tsx :::

## Variants and sizes

Choose line, card, segment, or page presentation. Page tabs use their own fixed sizing.

:::react-demo react/components/Tabs/variants.tsx :::

## Editable and draggable tabs

`editable` adds an accessible add action. Individual tabs can be closable, while `draggable` reports the reordered key sequence through `onSort`.

:::react-demo react/components/Tabs/editable.tsx :::

## Tabs props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `TabsKey` | — | Controlled selected tab |
| `defaultValue` | `TabsKey` | — | Initial uncontrolled selected tab |
| `size` | `'small' \| 'medium' \| 'large' \| 'huge'` | `'small'` | Component size |
| `variant` | `'line' \| 'card' \| 'segment' \| 'page'` | `'line'` | Presentation variant |
| `draggable` | `boolean` | `false` | Enables drag reordering |
| `scrollable` | `boolean` | `true` | Enables overflow navigation |
| `focusable` | `boolean` | `true` | Brings the selected tab into view |
| `arrow` | `boolean` | `true` | Shows overflow navigation arrows |
| `underline` | `boolean` | `true` | Shows the line-variant divider |
| `indicator` | `boolean` | `true` | Shows the selection indicator |
| `editable` | `boolean` | `false` | Shows the add action |
| `beforeChange` | `(key: TabsKey) => boolean \| PromiseLike<boolean>` | — | Guards selection changes |
| `extra` | `ReactNode \| (context) => ReactNode` | — | Extra actions |
| `children` | `ReactNode` | — | Tab items |

`Tabs` accepts native `div` attributes. Callbacks are `onChange(key)`, `onAdd()`, `onClose(key)`, and `onSort(current, target, keys)`. Its ref implements `TabsHandle`: `focus(key?)` focuses the selected/first enabled tab or a requested tab, and `root` exposes the tablist element.

## Tab props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `TabsKey` | — | Required unique tab identity |
| `label` | `ReactNode` | — | Tab label |
| `icon` | `ReactNode` | — | Leading icon |
| `iconSize` | `string \| number` | — | Icon size |
| `disabled` | `boolean` | `false` | Disables selection |
| `closable` | `boolean` | `false` | Shows a close action |
| `draggable` | `boolean` | `true` | Allows this tab to be dragged |
| `children` | `ReactNode \| (context) => ReactNode` | — | Custom tab content |

`Tab` accepts native `div` attributes and supports `onClick(key)` and `onClose(key)`. Arrow Left/Right, Home, and End move focus and selection through enabled tabs.
