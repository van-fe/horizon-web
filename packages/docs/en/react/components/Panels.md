# Panels

Panels displays one keyed content panel at a time. The selection remains controlled by application state.

```tsx
import { Panel, Panels } from '@aurora/horizon-web-react';
import '@aurora/horizon-web-react/style.css';
```

## Controlled selection

Compose named `Panel` children and update `value` from the control that owns the selection.

:::react-demo react/components/Panels/basic.tsx :::

## Vertical motion

Enable `animated` for directional switching and `vertical` for up/down motion. Reduced-motion preferences disable the CSS animation.

:::react-demo react/components/Panels/vertical.tsx :::

## Disabled and narrow content

A disabled panel is excluded from display. Long content wraps within narrow containers.

:::react-demo react/components/Panels/disabled.tsx :::

## Panels props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string \| number` | — | Required current panel key |
| `animated` | `boolean` | `false` | Animates keyed panel changes |
| `vertical` | `boolean` | `false` | Uses vertical instead of horizontal motion |
| `panelLabelledBy` | `string` | — | Element id that labels the active `tabpanel` |
| `children` | `ReactNode` | — | Composed `Panel` items |

`Panels` accepts native `div` attributes and forwards its ref to the root element.

## Panel props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string \| number` | — | Required unique panel key |
| `disabled` | `boolean` | `false` | Excludes the panel from display |
| `children` | `ReactNode` | — | Panel content |

`Panel` accepts native `div` attributes and forwards its ref to the content element.
