# Drawer

Drawer slides a focused panel from an interface edge while preserving context on the underlying page. It supports four placements, responsive presets, guarded closing, modal interaction management, and pointer resizing.

```tsx
import { Drawer, type DrawerHandle } from '@aurora/horizon-web-react';
import '@aurora/horizon-web-react/style.css';
```

## Basic usage

Use ref commands for imperative workflows, or use `open` with `onOpenChange` when application state owns visibility. The built-in confirm action does not close automatically, so the application can close only after its operation succeeds.

:::react-demo react/components/Drawer/basic.tsx :::

## Controlled state and asynchronous guard

`beforeClose` can return `false` or a rejected promise to prevent closing. Returning `true`, `void`, or a fulfilled promise authorizes the request. Duplicate close requests are ignored while an asynchronous guard is pending.

:::react-demo react/components/Drawer/guarded.tsx :::

## Placements and sizes

Drawers can open from any edge. Preset sizes respond to viewport bands, while numeric values use pixels and other strings are applied as custom lengths.

:::react-demo react/components/Drawer/placements.tsx :::

## Custom regions and resizing

React nodes supplied through `header` and `footer` replace their complete built-in regions. `sizeDraggable` adds a placement-aware pointer handle to resize the panel.

:::react-demo react/components/Drawer/custom.tsx :::

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | — | Drawer body content |
| `title` | `ReactNode` | — | Title in the built-in header |
| `header` | `ReactNode \| boolean` | `true` | Custom complete header, or built-in header visibility |
| `footer` | `ReactNode \| boolean` | `true` | Custom complete footer, or built-in footer visibility |
| `ariaLabel` | `string` | Provider label | Accessible name when no `title` is supplied |
| `open` | `boolean` | — | Controlled open state |
| `defaultOpen` | `boolean` | `false` | Initial uncontrolled open state |
| `placement` | `'left' \| 'right' \| 'top' \| 'bottom'` | `'right'` | Interface edge from which the panel opens |
| `size` | `'small' \| 'medium' \| 'large' \| string \| number` | `'medium'` | Responsive preset or custom extent |
| `mask` | `boolean` | `true` | Shows the background mask and enables modal semantics |
| `maskClosable` | `boolean` | `true` | Allows mask interaction to request closing |
| `escClosable` | `boolean` | `true` | Allows the topmost drawer to close on `Escape` |
| `closable` | `boolean` | `true` | Shows the close button in the built-in header |
| `okButton` | `boolean \| Partial<ButtonProps>` | `true` | Shows and configures the built-in confirm button |
| `okButtonText` | `string` | Provider label | Confirm button label |
| `cancelButton` | `boolean \| Partial<ButtonProps>` | `true` | Shows and configures the built-in cancel button |
| `cancelButtonText` | `string` | Provider label | Cancel button label |
| `beforeClose` | `() => void \| boolean \| PromiseLike<boolean \| void>` | — | Result-style close guard |
| `lockScroll` | `boolean` | follows `mask` | Overrides background scroll locking |
| `sizeDraggable` | `boolean` | `false` | Enables pointer resizing from the panel edge |
| `loading` | `boolean` | `false` | Shows loading on the built-in confirm button |
| `destroyOnClose` | `boolean` | `true` | Unmounts the drawer after closing |
| `portal` | `boolean` | `true` | Renders through a Portal |
| `portalContainer` | `PortalTarget` | `'body'` | Portal destination |
| `zIndex` | `number` | managed | Overrides the managed layer z-index |
| `classNames` | `DrawerClassNames` | — | Classes for `mask`, `container`, `header`, `body`, and `footer` |
| `className` / `style` | native `div` values | — | Root layer customization |

Other supported native `div` attributes are forwarded to the root layer.

## Callbacks

| Callback | Type | Description |
| --- | --- | --- |
| `onOpenChange` | `(open: boolean, details: DrawerOpenChangeDetails) => void` | Reports requested visibility changes and their reason |
| `onOk` | `() => void` | Runs after the built-in confirm action; does not close automatically |
| `onCancel` | `() => void` | Runs before the built-in cancel action requests closing |
| `onOpen` / `onOpened` | `() => void` | Reports opening start and completion |
| `onClose` / `onClosed` | `() => void` | Reports closing start and completion |
| `onMaskClick` | `() => void` | Reports every mask click, including when `maskClosable` is false |
| `onIconClick` | `() => void` | Reports the built-in header close action |
| `onClosePendingChange` | `(pending: boolean) => void` | Reports asynchronous close-guard state |

An `onClick` supplied through either button object runs first. Calling `event.preventDefault()` there suppresses the corresponding built-in action.

## Ref

A `DrawerHandle` ref exposes:

| Member | Type | Description |
| --- | --- | --- |
| `open()` | `() => void` | Requests opening the drawer |
| `close()` | `() => void` | Requests closing through `beforeClose` |
| `focus()` | `() => void` | Focuses the drawer panel |
| `drawer` | `HTMLDivElement \| null` | Readonly panel element |

## Global labels

`HorizonWebProvider` accepts `drawerLabels` with `ok`, `cancel`, `close`, and `drawer` strings. Instance button text, visible title content, and `ariaLabel` take precedence where applicable.

## Accessibility and stacking

Drawer uses `role="dialog"`, constrains focus while open, restores focus after closing, and locks background scrolling when configured. With a mask, it also exposes modal semantics. When drawers are stacked, only the topmost layer responds to `Escape`.
