# Application

Application provides scoped configuration to descendant Horizon Web components without adding a DOM wrapper.

## Application configuration

Use one Application near the product root to define locale, namespace, default size, time-zone display, routing adapters, labels, and popup placement policy.

:::react-demo react/components/Application/basic.tsx :::

## Nested scopes

Nested Application components inherit parent values and override only the fields they receive.

:::react-demo react/components/Application/nested.tsx :::

## Core props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `locale` | `string` | inherited | Locale identifier |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Default descendant size |
| `namespace` | `string` | `'H'` | CSS class namespace |
| `showTimeZone` | `boolean \| readonly ('date-picker' \| 'timeline')[]` | `false` | Time-zone display scope |
| `getPopupContainer` | `(trigger?: HTMLElement) => HTMLElement \| null \| undefined` | inherited | Popup container resolver |
| `children` | `ReactNode` | — | Configured descendants |

Application also accepts the routing adapters and label groups exposed by `HorizonWebProvider`. `Application` and `HorizonWebProvider` use the same scoped configuration context.

The component renders only its children, so native attributes and refs do not apply.
