# Dialog

Dialog presents focused information or actions in a modal layer. It manages focus containment, background scroll locking, stacked dismissal, Portal rendering, and guarded close requests.

```tsx
import { Dialog, type DialogHandle } from '@aurora/horizon-web-react';
import '@aurora/horizon-web-react/style.css';
```

## Basic usage

Use the ref commands for imperative workflows, or use `open` and `onOpenChange` when application state owns visibility. The built-in confirm action does not close automatically, so successful workflows can decide when closing is appropriate.

:::react-demo react/components/Dialog/basic.tsx :::

## Controlled close guard

`beforeClose(close)` intercepts every close request. Invoke the supplied `close` function after validation, saving, or another asynchronous task has authorized the request. While authorization is pending, duplicate close requests are ignored.

:::react-demo react/components/Dialog/guarded.tsx :::

## Sizes and custom content

The title, icon, body, and footer accept React nodes. Four sizes are available, and a custom footer can compose any action layout required by the workflow.

:::react-demo react/components/Dialog/custom.tsx :::

## Destroy on close

Enable `destroyOnClose` when state owned by body components should be discarded after closing. Without it, closed content remains mounted and hidden.

:::react-demo react/components/Dialog/destroy.tsx :::

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | — | Dialog body content |
| `title` | `ReactNode` | — | Visible title content |
| `icon` | `ReactNode` | — | Icon displayed before the title and body |
| `footer` | `ReactNode` | — | Custom footer; replaces built-in actions |
| `ariaLabel` | `string` | Provider label | Accessible name when no visible title exists |
| `open` | `boolean` | — | Controlled open state |
| `defaultOpen` | `boolean` | `false` | Initial uncontrolled open state |
| `top` | `string \| number` | — | Top offset; numbers use pixels |
| `size` | `'small' \| 'medium' \| 'large' \| 'huge'` | `'medium'` | Dialog size |
| `mask` | `boolean` | `true` | Shows the background mask |
| `maskClose` | `boolean` | `true` | Allows outside-pointer dismissal through the mask |
| `escClose` | `boolean` | `true` | Allows the topmost dialog to close on `Escape` |
| `closeButton` | `boolean` | `true` | Shows the header close button when a title exists |
| `okButtonProps` | `boolean \| Partial<ButtonProps>` | `{}` | Shows and configures the built-in confirm button; `false` hides it |
| `okText` | `string` | Provider label | Confirm button label |
| `cancelButtonProps` | `boolean \| Partial<ButtonProps>` | `{}` | Shows and configures the built-in cancel button; `false` hides it |
| `cancelText` | `string` | Provider label | Cancel button label |
| `beforeClose` | `(close: () => void) => void` | — | Guard that explicitly authorizes a close request |
| `destroyOnClose` | `boolean` | `false` | Unmounts the dialog after closing |
| `zIndex` | `number` | managed | Overrides the managed layer z-index |
| `lockScroll` | `boolean` | `true` | Locks background scrolling while open |
| `draggable` | `boolean` | `false` | Allows primary-pointer dragging from the built-in header |
| `portal` | `boolean` | `true` | Renders through a Portal |
| `portalContainer` | `PortalTarget` | `'body'` | Portal destination |
| `classNames` | `DialogClassNames` | — | Classes for `header`, `body`, `footer`, `mask`, and `wrapper` regions |
| `className` / `style` | native `div` values | — | Root layer customization |

Other supported native `div` attributes are forwarded to the root layer.

## Callbacks

| Callback | Type | Description |
| --- | --- | --- |
| `onOpenChange` | `(open: boolean, details: DialogOpenChangeDetails) => void` | Reports requested visibility changes and their reason |
| `onOk` | `() => void` | Runs after the built-in confirm action; does not close automatically |
| `onCancel` | `() => void` | Runs before the built-in cancel action requests closing |
| `onOpen` / `onOpened` | `() => void` | Reports opening start and completion |
| `onClose` / `onClosed` | `() => void` | Reports closing start and completion |
| `onCloseIconClick` | `() => void` | Reports the header close action |
| `onMaskClick` | `() => void` | Reports an enabled mask dismissal |
| `onClosePendingChange` | `(pending: boolean) => void` | Reports whether a callback-style close guard is awaiting authorization |

An `onClick` supplied through either button-props object runs first. Calling `event.preventDefault()` there suppresses the corresponding built-in action.

## Ref

A `DialogHandle` ref exposes:

| Member | Type | Description |
| --- | --- | --- |
| `open()` | `() => void` | Requests opening the dialog |
| `close()` | `() => void` | Requests closing through `beforeClose` |
| `focus()` | `() => void` | Focuses the dialog element |
| `dialog` | `HTMLDivElement \| null` | Readonly dialog element |

## Global labels

`HorizonWebProvider` accepts `dialogLabels` with `ok`, `cancel`, `close`, and `dialog` strings. Instance-level `okText`, `cancelText`, visible title content, and `ariaLabel` take precedence where applicable.

## Accessibility and stacking

Dialog uses `role="dialog"` and modal ARIA semantics, traps focus while open, restores focus after closing, and locks background scrolling by default. When dialogs are stacked, only the topmost layer responds to `Escape` or outside interaction.
