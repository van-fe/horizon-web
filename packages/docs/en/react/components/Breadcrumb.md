# Breadcrumb

Breadcrumb communicates the current page's place in a hierarchy. Use it for paths with at least two levels when people may need to return to an ancestor.

```tsx
import { Breadcrumb, BreadcrumbItem } from '@aurora/horizon-react';
import '@aurora/horizon-react/style.css';
```

## Data and composition

Pass `items` for a data-driven path. Compose `BreadcrumbItem` children when a level needs rich content, an individual separator, or its own callback.

:::react-demo react/components/Breadcrumb/basic.tsx :::

## Route adapter

An item with `to` delegates navigation to the nearest `HorizonWebProvider`. Supply `resolveHref` as well to preserve native link behavior such as copying the address or opening it in a new tab. Set `replace` when navigation should replace the current history entry.

:::react-demo react/components/Breadcrumb/navigation.tsx :::

## Size and separator

Use `medium` for page-level navigation and `small` in compact cards or panels. The default separator may be text or any presentational React content; an item can override it locally.

:::react-demo react/components/Breadcrumb/appearance.tsx :::

## Responsive collapse

The `full` strategy shows every level. With `ellipsis`, the component observes its available width and moves overflowing middle levels into an accessible disclosure menu while keeping the first and current levels visible.

:::react-demo react/components/Breadcrumb/collapse.tsx :::

## Accessibility

The root renders a `nav` landmark with an `aria-label` of `Breadcrumb` by default. Route items render as links, action items render as buttons, and non-interactive levels remain text. Customize `breadcrumbLabels.collapsed` on `HorizonWebProvider` when the ellipsis disclosure label needs localization.

## Breadcrumb props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `readonly BreadcrumbItemData[]` | `[]` | Data-driven hierarchy items |
| `children` | `ReactNode` | — | Composed `BreadcrumbItem` content |
| `separator` | `ReactNode` | `'/'` | Default separator content |
| `title` | `boolean` | `false` | Default title emphasis inherited by items |
| `size` | `'small' \| 'medium'` | `'medium'` | Component size inherited by items |
| `displayType` | `'full' \| 'ellipsis'` | `'full'` | Overflow display strategy |
| `onItemClick` | `(item, event) => void` | — | Runs after an interactive item is activated |
| `aria-label` | `string` | `'Breadcrumb'` | Accessible name for the navigation landmark |

The component also accepts native `nav` attributes. The forwarded ref points to the rendered `HTMLElement`.

## BreadcrumbItem props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `text` | `string` | — | Item text used by data-driven rendering |
| `children` | `ReactNode` | — | Composed item content; takes precedence over `text` |
| `separator` | `ReactNode` | parent value | Separator after this item |
| `title` | `boolean` | parent value | Uses title emphasis |
| `to` | `unknown` | — | Route target handled by the provider |
| `replace` | `boolean` | `false` | Requests history replacement during route navigation |
| `size` | `'small' \| 'medium'` | parent value | Item size |
| `clickable` | `boolean` | `false` | Treats an item without `to` as an action |
| `onClick` | `(event: MouseEvent) => void` | — | Runs when this interactive item is activated |

The forwarded item ref points to the root `HTMLSpanElement`.
