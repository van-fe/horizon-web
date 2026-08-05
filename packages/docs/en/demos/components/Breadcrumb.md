Breadcrumb communicates the current page's place in a hierarchy and works best for paths with at least two levels that users may revisit.

## Basic Usage

Use `texts` for a concise path and `title` to emphasize the final item.

:::demo components/Breadcrumb/basic.vue :::

## Sizes

`medium` suits page-level navigation, while `small` fits cards and compact panels.

:::demo components/Breadcrumb/size.vue :::

## Router Navigation

Items with `to` use Vue Router. Set `replace` when navigation should not add a history entry.

:::demo components/Breadcrumb/link-mode.vue :::

## Width and Collapse

`full` wraps, while `ellipsis` collects overflow into a menu. When writing `h-breadcrumb-item` nodes manually, give each a stable, unique `key`.

:::demo components/Breadcrumb/collapse.vue :::

## Long Text and Current Page

Long items truncate automatically, and `title` emphasizes the current page.

:::demo components/Breadcrumb/special-style.vue :::

## Custom Separator

`separator` accepts text or a component, and the `separator` slot supports custom markup.

:::demo components/Breadcrumb/custom-divider.vue :::

## Custom Item

Use `h-breadcrumb-item` to compose compact interactions such as a team switcher into the path.

:::demo components/Breadcrumb/custom-item.vue :::

## Composed Content and Per-item Separators

The default item slot and item-level `separator` slot can combine status icons with distinct separator treatments.

:::demo components/Breadcrumb/custom.vue :::
