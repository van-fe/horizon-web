# Popover

Popover displays interactive contextual content next to a single trigger element. It supports delayed pointer interaction, focus, click, controlled state, automatic placement, Portal rendering, masks, and imperative control.

```tsx
import { PopContent, Popover } from '@aurora/horizon-react';
import '@aurora/horizon-react/style.css';
```

## Basic usage

:::react-demo react/components/Popover/basic.tsx :::

## Trigger interactions

Hover, focus, and click triggers share the same accessible dialog ownership. Click popovers close on the configured outside event or `Escape`.

:::react-demo react/components/Popover/triggers.tsx :::

## Controlled state and mask

Use `open` and `onOpenChange` when application state owns visibility. `manual` disables automatic trigger changes, while the ref still provides immediate commands.

:::react-demo react/components/Popover/controlled.tsx :::

## Popover props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactElement` | — | Single trigger element |
| `content` | `ReactNode` | — | Floating content |
| `trigger` | `'hover' \| 'click' \| 'focus' \| 'manual'` | `'hover'` | Opening interaction |
| `open` | `boolean` | — | Controlled open state |
| `defaultOpen` | `boolean` | `false` | Initial uncontrolled state |
| `placement` | `PopoverPlacement` | `'top'` | Preferred or automatic placement |
| `distance` / `skidding` | `number` | `8` / `0` | Main- and cross-axis offsets |
| `flip` | `boolean` | `true` | Tries fallback placements |
| `fallbackPlacements` | `PopoverPlacement[]` | — | Alternative placements |
| `arrow` | `boolean` | `true` | Shows the arrow |
| `arrowOptions` | `{ size?: number }` | `{ size: 8 }` | Arrow dimensions |
| `destroyOnHide` | `boolean` | `true` | Unmounts closed content |
| `portal` | `boolean` | `true` | Uses a Portal |
| `portalContainer` | `PortalTarget` | `'body'` | Portal destination |
| `sameWidth` / `sameHeight` | `boolean` | `false` | Matches reference dimensions |
| `setMinWidth` | `boolean` | `false` | Uses min-width instead of fixed width |
| `showDelay` / `hideDelay` | `number` | `0` / `100` | Pointer open and close delays |
| `hideEvent` | `'click' \| 'mousedown' \| 'mouseup'` | `'click'` | Outside dismissal event |
| `disabled` | `boolean` | `false` | Disables opening |
| `mask` | `PopoverMaskOptions` | — | Optional overlay mask |
| `theme` | `'light' \| 'dark'` | `'light'` | Visual theme inherited by `PopContent` |
| `strategy` | `'fixed' \| 'absolute'` | `'fixed'` | Positioning strategy |
| `className` / `style` | native `div` values | — | Floating surface customization |

## Callbacks and ref

`onOpenChange(open, details)` reports requested state and its reason. `onShow()` and `onHide()` report committed visibility. `onEnterReference`, `onLeaveReference`, and `onClick` expose native React mouse events.

The `PopoverHandle` ref provides `open()`, `close()`, `updatePosition()`, plus readonly `reference` and `floating` DOM elements.

## PopContent

`PopContent` accepts native `div` attributes, `children`, and an optional `theme`. Inside Popover it inherits the parent theme.
