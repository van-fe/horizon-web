# Pagination

Pagination divides a large result set into navigable pages and can also control the number of items shown per page.

```tsx
import { Pagination } from '@aurora/horizon-react';
import '@aurora/horizon-react/style.css';
```

## Controlled pagination

Use `value` and `onPageChange` for the current page, and `pageSize` with `onPageSizeChange` for the page size. `onChange` receives both values after either one changes.

:::react-demo react/components/Pagination/basic.tsx :::

## Layout and variants

The default variant renders the regions listed by `layout`. The `simple` variant shows the total and pager, while `simplest` presents previous and next actions with a page input.

:::react-demo react/components/Pagination/variants.tsx :::

## Custom regions and disabled state

Use `prefix`, `previous`, `next`, and `suffix` for custom content. Setting `disabled` makes every page, size, and jump action unavailable.

:::react-demo react/components/Pagination/custom.tsx :::

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `number` | — | Controlled current page |
| `defaultValue` | `number` | `1` | Initial uncontrolled page |
| `pageSize` | `number` | — | Controlled page size |
| `defaultPageSize` | `number` | `10` | Initial uncontrolled page size |
| `total` | `number` | `0` | Total number of items |
| `pageSizes` | `readonly number[]` | `[10, 20, 30, 40, 50]` | Available page sizes |
| `pagerCount` | `number` | `7` | Maximum number of pager items; use an odd value of at least five |
| `layout` | `string \| readonly PaginationLayoutItem[]` | `'pager, sizes, jumper, total'` | Ordered regions in the default variant |
| `variant` | `'default' \| 'simple' \| 'simplest'` | `'default'` | Presentation variant |
| `hideOnSinglePage` | `boolean` | `false` | Hides the navigation when only one page exists |
| `showRange` | `boolean` | `true` | Shows the current item range in the total region |
| `align` | `'left' \| 'center' \| 'right'` | `'right'` | Horizontal alignment |
| `disabled` | `boolean` | `false` | Disables all actions |
| `size` | `'medium' \| 'large'` | `'medium'` | Component size |
| `labels` | `Partial<PaginationLabels>` | — | Local visible and accessible copy |
| `prefix` | `ReactNode` | — | Content before the controls |
| `previous` | `ReactNode` | — | Previous-page button content |
| `next` | `ReactNode` | — | Next-page button content |
| `suffix` | `ReactNode` | — | Content after the controls |

`Pagination` accepts native `nav` attributes.

## Callbacks

| Callback | Type | Description |
| --- | --- | --- |
| `onChange` | `(page: number, pageSize: number) => void` | Page or page size changed |
| `onPageChange` | `(page: number) => void` | Current page changed |
| `onPageSizeChange` | `(pageSize: number) => void` | Page size changed |
| `onPrevious` | `(page: number) => void` | Previous-page action completed |
| `onCurrentPageClick` | `(page: number) => void` | The current page was activated again |
| `onNext` | `(page: number) => void` | Next-page action completed |
| `onJump` | `(page: number) => void` | Jump-input action completed |

The ref implements `PaginationHandle`: `focus(page?)` focuses the first available action or a requested page, and `root` exposes the navigation element.

Global pagination copy can be configured with `paginationLabels` on `HorizonWebProvider`. A component-level `labels` value overrides the corresponding provider fields.
