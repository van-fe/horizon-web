## Basic Usage

| Resolution(px) | Size | Columns | Spacing gutters,hspace,vspace(px) |
| -------- | ------- | ------- |-----------------------------|
| 0 ≤ X <480 | XSmall | 8 | 4                           |
| 480 ≤ X <1024 | Small | 12 | 16                          |
| 1024 ≤ X < 1440 | Medium | 24 | 16                          |
| 1440 ≤ X < 1920 | Large | 24 | 16                          |
| 1920 ≤ X < 2880 | XLarge | 24 | 24                          |
| 2880 ≤ X ≤ 3840 | XXLarge | 24 | 48                          |

:::demo components/Layout/demo1.vue :::

## Column Element Spacing

Set the spacing between row and column elements through the `gutter` attribute

Set the spacing between column elements in a row through the `hspace` attribute. `hspace` has higher priority than `gutter`

Set the spacing with the next row element through the `vspace` attribute. `vspace` has higher priority than `gutter`, and the `vspace` of the last row is invalid

:::demo components/Layout/demo2.vue :::

## Alignment
:::demo components/Layout/demo3.vue :::

## Responsive
By configuring `xs` `sm` `md` `lg` `xl` `xxl` attributes, you can adjust the range occupied at different resolutions
:::demo components/Layout/responsive.vue :::
