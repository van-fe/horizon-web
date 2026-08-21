# Button

Button triggers immediate actions. Keep a clear action hierarchy and give icon-only controls an accessible name.

## Variant and Shape

`variant` communicates primary, normal, and dangerous actions. `round` applies a pill shape.

:::react-demo react/components/Button/basic.tsx :::

## Size

Use `size` for different interface densities and `autoFit` to keep short labels compact.

:::react-demo react/components/Button/size.tsx :::

## Plain and Ghost

`plain` lowers visual emphasis. Combine it with `ghost` on strong-colored surfaces.

:::react-demo react/components/Button/plain.tsx :::

## Text Button

`text` works for low-emphasis actions that keep users in the current context.

:::react-demo react/components/Button/text.tsx :::

## Links and Application Navigation

`href` renders a native link. `to` delegates to the `HorizonWebProvider` `navigate` adapter.

:::react-demo react/components/Button/link.tsx :::

## Active State

`active` communicates the selected view, filter, or tool.

:::react-demo react/components/Button/active.tsx :::

## Disabled and Loading

`disabled` prevents actions and `loading` communicates work in progress. Explain unavailable actions in nearby supporting text.

:::react-demo react/components/Button/disabled.tsx :::

## Icons

`icon` and `suffix` compose additional content. Set `aria-label` when an icon button has no visible text.

:::react-demo react/components/Button/icon.tsx :::

## Block Button

`block` fills the container and works well in narrow forms and clear confirmation areas.

:::react-demo react/components/Button/block.tsx :::

## Button Group

`ButtonGroup` joins related controls and provides `variant` and `size` to its child buttons through Context.

:::react-demo react/components/Button/button-group.tsx :::

## Guarded Async Action

`asyncAction` prevents duplicate triggers until its Promise settles. `asyncState` selects disabled, loading, or logic-only feedback.

:::react-demo react/components/Button/async-action.tsx :::

## Border Style

`borderStyle` supports `solid`, `dotted`, and `dashed` treatments.

:::react-demo react/components/Button/border-style.tsx :::

## Custom Color (BETA)

`color` accepts built-in names and color literals, then derives default, hover, pressed, and disabled states.

:::react-demo react/components/Button/custom-color.tsx :::

## Button Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'primary' \| 'normal' \| 'danger'` | `'primary'` | Visual variant |
| `size` | `'huge' \| 'large' \| 'medium' \| 'small'` | `'medium'` | Button size |
| `round` | `boolean` | `false` | Pill shape |
| `plain` | `boolean` | `false` | Plain treatment |
| `ghost` | `boolean` | `false` | Ghost treatment |
| `text` | `boolean` | `false` | Text-button treatment |
| `link` | `boolean` | `false` | Link treatment |
| `block` | `boolean` | `false` | Fills the container width |
| `active` | `boolean` | `false` | Active state |
| `loading` | `boolean` | `false` | Loading state |
| `disabled` | `boolean` | `false` | Prevents interaction |
| `autoFit` | `boolean` | `false` | Shrinks to fit content |
| `borderStyle` | `'solid' \| 'dashed' \| 'dotted'` | `'solid'` | Border style |
| `color` | `string` | — | Custom theme color |
| `icon` | `ReactNode` | — | Leading icon |
| `suffix` | `ReactNode` | — | Trailing content |
| `href` | `string` | — | Native link URL |
| `target` | `ButtonTarget` | `'_self'` | Native link target |
| `to` | `unknown` | — | Application navigation target |
| `replace` | `boolean` | `false` | Replaces the current navigation entry |
| `asyncAction` | `() => unknown \| PromiseLike<unknown>` | — | Guarded async action |
| `asyncState` | `'none' \| 'loading' \| 'disabled'` | `'none'` | Visual state during async execution |
| `children` | `ReactNode` | — | Button content |

The component also accepts applicable native `button` attributes. Its `ref` resolves to the rendered `HTMLButtonElement` or `HTMLAnchorElement`.

## Button Callbacks

| Callback | Type | Description |
| --- | --- | --- |
| `onClick` | `(event: MouseEvent<HTMLElement>) => void` | Regular button action |
| `onActionFinished` | `() => void` | Async action completed successfully |
| `onActionError` | `(error: unknown) => void` | Async action failed |

## ButtonGroup Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `ButtonVariant` | — | Variant inherited by grouped buttons |
| `size` | `ButtonSize` | — | Size inherited by grouped buttons |
| `children` | `ReactNode` | — | Grouped buttons |

`ButtonGroup` also accepts native `div` attributes, defaults to `role="group"`, and forwards its `ref` to the rendered `HTMLDivElement`.
