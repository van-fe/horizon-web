## Basic Usage
:::demo vue/components/PageHeader/basic.vue :::

## Use with Breadcrumb
:::demo vue/components/PageHeader/breadcrumb.vue :::

## Interactive Content
:::demo vue/components/PageHeader/interactive.vue :::

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `icon` | `Icon \| string \| null` | Back icon | Back icon; `null` hides the action |
| `title` / `content` | `string` | — | Fallback title and supporting text |
| `useDivider` | `boolean` | `true` | Shows the divider below the main region |
| `disabledHeaderTooltip` | `boolean` | `false` | Disables the overflowing-title tooltip |
| `backAriaLabel` | `string` | Locale text | Accessible name for the back action |

## Events

| Event | Description |
| --- | --- |
| `back` | Emitted when the back action is activated |

## Slots

| Slot | Description |
| --- | --- |
| `default` | Extended content below the heading |
| `icon` | Back icon |
| `header` | Complete heading region |
| `title` / `titleOuter` | Title content or complete title container |
| `tags` | Tags beside the title |
| `content` | Supporting content |
| `extra` | Page-level actions |
| `breadcrumb` | Breadcrumb content |
