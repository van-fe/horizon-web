# Popconfirm

Popconfirm asks for explicit confirmation next to an action trigger. It is useful when an operation is difficult to reverse but does not require a full modal dialog.

```tsx
import { Popconfirm } from '@aurora/horizon-react';
import '@aurora/horizon-react/style.css';
```

## Basic confirmation

Use `title` for a concise question. Confirmation and cancellation callbacks run only after their corresponding action is selected.

:::react-demo react/components/Popconfirm/basic.tsx :::

## Controlled state and asynchronous guard

Use `open` with `onOpenChange` when application state owns visibility. `beforeConfirm` may return a boolean or promise; returning `false` keeps the confirmation open, and rejected guards are reported through `onConfirmError`.

:::react-demo react/components/Popconfirm/controlled.tsx :::

## Custom content, icon, and labels

`content` and `icon` accept React nodes. `HorizonWebProvider` supplies default action labels through `popconfirmLabels`, while instance-level `confirmText` and `cancelText` take precedence.

:::react-demo react/components/Popconfirm/custom.tsx :::

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactElement` | — | Single trigger element |
| `title` | `string` | — | Concise confirmation title |
| `content` | `ReactNode` | — | Rich confirmation content; takes precedence over `title` |
| `icon` | `ReactNode` | warning icon | Status icon beside the content |
| `open` | `boolean` | — | Controlled open state |
| `defaultOpen` | `boolean` | `false` | Initial uncontrolled open state |
| `disabled` | `boolean` | `false` | Disables opening and closes an active confirmation |
| `placement` | `'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'right' \| 'left'` | `'top'` | Floating placement |
| `confirmText` | `string` | provider label | Confirm action label |
| `cancelText` | `string` | provider label | Cancel action label |
| `confirmButtonProps` | `Partial<ButtonProps>` | `{}` | Confirm button options |
| `cancelButtonProps` | `Partial<ButtonProps>` | `{}` | Cancel button options |
| `beforeConfirm` | `() => boolean \| PromiseLike<boolean>` | — | Guard executed before confirmation finishes |
| `portal` | `boolean` | `true` | Renders the confirmation through a Portal |
| `portalContainer` | `PortalTarget` | `'body'` | Portal destination |
| `zIndex` | `number` | `1000` | Floating layer z-index |
| `className` / `style` | native `div` values | — | Floating surface customization |

Other supported native `div` attributes are forwarded to the floating surface.

## Callbacks

| Callback | Type | Description |
| --- | --- | --- |
| `onOpenChange` | `(open: boolean, details: PopconfirmChangeDetails) => void` | Reports requested visibility changes and their reason |
| `onConfirm` | `(event: MouseEvent<HTMLElement>) => void` | Runs after the guard allows confirmation |
| `onCancel` | `(event: MouseEvent<HTMLElement>) => void` | Runs when cancellation is selected |
| `onConfirmError` | `(error: unknown) => void` | Reports a rejected confirmation guard; the confirmation remains open |

Button-level `onClick` handlers run before the component action. Calling `event.preventDefault()` there prevents the corresponding confirm or cancel operation.

## Ref

A `PopconfirmHandle` ref exposes:

| Member | Type | Description |
| --- | --- | --- |
| `open()` | `() => void` | Requests opening the confirmation |
| `close()` | `() => void` | Requests closing the confirmation |
| `trigger` | `HTMLElement \| null` | Readonly trigger element |
| `dialog` | `HTMLDivElement \| null` | Readonly confirmation content element |

## Accessibility

The floating surface uses `alertdialog` semantics, associates the content as its accessible label, focuses the first enabled action after opening, closes on `Escape` or outside interaction, and returns focus to the trigger after closing.
