# PageHeader

PageHeader establishes a page title, supporting context, navigation, and page-level actions.

## Basic Usage

The back action is keyboard accessible and uses the Provider label unless `backAriaLabel` is set.

:::react-demo react/components/PageHeader/basic.tsx :::

## Breadcrumb

Use `breadcrumb` for the current hierarchy. Set `showBack={false}` when the hierarchy is the only navigation affordance.

:::react-demo react/components/PageHeader/breadcrumb.tsx :::

## Content Regions

Title, description, tags, actions, icon, and the extended body accept React content. The layout wraps page actions on narrow screens.

:::react-demo react/components/PageHeader/regions.tsx :::

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` / `content` | `string` | — | Fallback title and supporting text |
| `showBack` | `boolean` | `true` | Shows the back action |
| `useDivider` | `boolean` | `true` | Shows the divider below the main region |
| `disabledHeaderTooltip` | `boolean` | `false` | Disables the overflowing-title tooltip |
| `backAriaLabel` | `string` | Provider label | Accessible name for the back action |
| `backIcon` | `ReactNode` | Arrow icon | Back action icon |
| `titleContent` / `titleContainer` | `ReactNode` | — | Custom title or complete title container |
| `header` | `ReactNode` | — | Complete heading region |
| `description` / `tags` / `actions` | `ReactNode` | — | Supporting content, tags, and page actions |
| `breadcrumb` | `ReactNode` | — | Breadcrumb content |
| `children` | `ReactNode` | — | Extended content below the heading |

## Callback

| Callback | Signature | Description |
| --- | --- | --- |
| `onBack` | `() => void` | Called when the back action is activated |

PageHeader forwards its ref to the root `HTMLElement` and accepts native header attributes. Override `pageHeaderLabels.back` on `HorizonWebProvider` to localize the default back label.
