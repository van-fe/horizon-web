# Tooltip

Tooltip provides concise contextual help for an interface element and supports hover, focus, click, context-menu, and controlled opening.

## Basic usage

```tsx
import { Tooltip } from '@aurora/horizon-web-react';
import '@aurora/horizon-web-react/style.css';
```

:::react-demo react/components/Tooltip/basic.tsx :::

## Accessibility and interaction

While open, the trigger references the `role="tooltip"` content with `aria-describedby`. Focus-triggered tooltips remain available to keyboard users, and an open tooltip closes with `Escape`. Click and context-menu triggers also dismiss on an outside pointer press.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactElement` | — | The single trigger element |
| `content` | `ReactNode` | — | Tooltip content |
| `trigger` | `'hover' \| 'focus' \| 'click' \| 'contextmenu' \| 'manual'` | `'hover'` | Opening interaction |
| `open` | `boolean` | — | Controlled open state |
| `defaultOpen` | `boolean` | `false` | Initial uncontrolled state |
| `disabled` | `boolean` | `false` | Prevents display and interaction |
| `enterable` | `boolean` | `false` | Allows pointer entry into the floating content |
| `showAfter` | `number` | `200` | Delay before opening in milliseconds |
| `hideAfter` | `number` | `200` | Delay before closing in milliseconds |
| `placement` | `WebPlacement` | `'top'` | Preferred placement |
| `distance` | `number` | `12` | Main-axis distance |
| `skidding` | `number` | `0` | Cross-axis offset |
| `flip` | `boolean` | `true` | Flips when space is insufficient |
| `fallbackPlacements` | `WebPlacement[]` | opposite side | Alternative placements |
| `shift` | `boolean` | `true` | Shifts the floating content into the viewport |
| `arrow` | `boolean` | `true` | Renders an arrow |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Tooltip size |
| `theme` | `'dark' \| 'light'` | `'dark'` | Tooltip theme |
| `portal` | `boolean` | `true` | Uses a portal |
| `portalContainer` | `PortalTarget` | `'body'` | Portal destination |
| `className` | `string` | — | Floating class name |
| `style` | `CSSProperties` | — | Floating inline style |
| `zIndex` | `number` | `1000` | CSS stacking level |

## Callbacks

| Callback | Type | Description |
| --- | --- | --- |
| `onOpenChange` | `(open: boolean, details: { reason: TooltipOpenReason }) => void` | Called when the open state changes |

## Ref

The component ref exposes `open()`, `close()`, and asynchronous `update()` methods for immediate visibility changes and position recomputation.
