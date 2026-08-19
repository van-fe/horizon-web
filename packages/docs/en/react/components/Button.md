# Button

Button triggers immediate actions and supports native buttons, native links, application navigation, and guarded asynchronous work.

## Basic Usage

```tsx
import { Button } from '@aurora/horizon-react';
import '@aurora/horizon-react/style.css';
```

:::react-demo react/components/Button/basic.tsx :::

## Navigation

`href` creates a native link and preserves browser behavior. `to` delegates to the `HorizonWebProvider` `navigate` adapter for application routing.

```tsx
<HorizonWebProvider navigate={(to, options) => router.navigate(to, options)}>
  <Button to="/projects">Projects</Button>
</HorizonWebProvider>
```

## Asynchronous Actions

`asyncAction` prevents duplicate triggers until its Promise settles. Use `asyncState="loading"` for a loading treatment or `asyncState="disabled"` for a disabled treatment. `onActionFinished` and `onActionError` report completion.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'primary' \| 'normal' \| 'danger'` | `'primary'` | Visual intent |
| `size` | `'huge' \| 'large' \| 'medium' \| 'small'` | `'medium'` | Button size |
| `round` | `boolean` | `false` | Uses a pill shape |
| `plain` | `boolean` | `false` | Uses the plain treatment |
| `ghost` | `boolean` | `false` | Uses the ghost treatment |
| `text` | `boolean` | `false` | Uses the text-button treatment |
| `link` | `boolean` | `false` | Uses the link treatment |
| `block` | `boolean` | `false` | Fills the container width |
| `active` | `boolean` | `false` | Displays the active state |
| `loading` | `boolean` | `false` | Displays the loading state |
| `disabled` | `boolean` | `false` | Prevents interaction |
| `autoFit` | `boolean` | `false` | Shrinks to fit its content |
| `borderStyle` | `'solid' \| 'dashed' \| 'dotted'` | `'solid'` | Border style |
| `icon` | `ReactNode` | — | Leading icon |
| `suffix` | `ReactNode` | — | Trailing content |
| `href` | `string` | — | Native link destination |
| `target` | `HTMLAnchorElement['target']` | `'_self'` | Native link target |
| `to` | `unknown` | — | Provider navigation adapter target |
| `replace` | `boolean` | `false` | Replaces the current navigation entry |
| `asyncAction` | `() => unknown \| PromiseLike<unknown>` | — | Guarded asynchronous action |
| `asyncState` | `'none' \| 'loading' \| 'disabled'` | `'none'` | Visual state during async execution |
| `children` | `ReactNode` | — | Button content |

The component also accepts applicable native `button` attributes. Its `ref` resolves to the rendered `HTMLButtonElement` or `HTMLAnchorElement`.

## Callbacks

| Callback | Type | Description |
| --- | --- | --- |
| `onClick` | `(event: MouseEvent<HTMLElement>) => void` | Regular button action |
| `onActionFinished` | `() => void` | Async action completed successfully |
| `onActionError` | `(error: unknown) => void` | Async action failed |
