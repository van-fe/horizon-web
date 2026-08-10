
## Basic Selection

Use `titles` to name each list. `filterable` adds search while disabled items retain context.

:::demo vue/components/Transfer/basic.vue :::

## Grouped Data

Mark read-only group headings with `isGroup` to make longer lists easier to scan.

:::demo vue/components/Transfer/group.vue :::

## Single Assignment

Compose radio controls through `leftBody` when the target must contain only one item.

:::demo vue/components/Transfer/radio.vue :::

## Custom People Rows

Use the `item` slot for avatars and team details, and pass a function to `filterable` for custom matching.

:::demo vue/components/Transfer/people.vue :::

## Tree Data

Nested `children` allow users to browse levels and select a team or an individual.

:::demo vue/components/Transfer/tree.vue :::

## Target Ordering

Enable `draggable` to reorder items directly in the target list. A clear insertion marker previews the drop position, and rows settle with the same FLIP motion as SortableList after drop.

:::demo vue/components/Transfer/drag.vue :::

## Custom Panels

Header, body, and control slots can replace the default lists with business-specific views such as tables.

:::demo vue/components/Transfer/table.vue :::
