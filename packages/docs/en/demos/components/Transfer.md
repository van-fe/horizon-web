
## Basic Selection

Use `titles` to name each list. `filterable` adds search while disabled items retain context.

:::demo components/Transfer/basic.vue :::

## Grouped Data

Mark read-only group headings with `isGroup` to make longer lists easier to scan.

:::demo components/Transfer/group.vue :::

## Single Assignment

Compose radio controls through `leftBody` when the target must contain only one item.

:::demo components/Transfer/radio.vue :::

## Custom People Rows

Use the `item` slot for avatars and team details, and pass a function to `filterable` for custom matching.

:::demo components/Transfer/people.vue :::

## Tree Data

Nested `children` allow users to browse levels and select a team or an individual.

:::demo components/Transfer/tree.vue :::

## Target Ordering

Enable `draggable` to reorder items directly in the target list.

:::demo components/Transfer/drag.vue :::

## Custom Panels

Header, body, and control slots can replace the default lists with business-specific views such as tables.

:::demo components/Transfer/table.vue :::
