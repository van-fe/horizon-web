## CSS Grid Layout

Use `h-grid` and `h-grid-item` for new layouts. The container defines responsive tracks and spacing, while each item describes its placement with `span` and `offset`. The implementation uses native CSS Grid without negative margins or compensating column padding.

:::demo vue/components/Layout/grid.vue :::

## Columns

The grid uses 24 columns by default. Set `span` to combine equal columns or build asymmetric layouts.

:::demo vue/components/Layout/demo1.vue :::

## Row and Column Gaps

Use `gap` for uniform spacing, or control each direction with `column-gap` and `row-gap`. All three properties accept responsive values.

:::demo vue/components/Layout/demo2.vue :::

## Item Alignment

`align` and `justify` control the vertical and horizontal alignment of items inside their grid areas. Available values are `start`, `center`, `end`, and `stretch`.

:::demo vue/components/Layout/demo3.vue :::

## Responsive Layout

`cols`, `gap`, `column-gap`, `row-gap`, `span`, and `offset` accept responsive objects with `xs`, `sm`, `md`, `lg`, `xl`, and `xxl` keys. Values naturally carry forward until the next breakpoint overrides them.

:::demo vue/components/Layout/responsive.vue :::

## API summary

Grid supports `tag`, `cols`, `gap`, `column-gap`, `row-gap`, `align`, and `justify`. GridItem supports `span` and `offset`; setting a responsive span to `0` hides the item at that breakpoint. Both components expose only the `default` slot and no events or commands.
