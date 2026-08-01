Set the spacing between components directly.

## Configuration Information
| Size   | Dimension |
| ------ | ---- |
| small  | 8px  |
| medium | 16px |
| large  | 24px |

## Difference from Flex Component
Space provides spacing for inline elements, and it will add a wrapper element for each child element for inline alignment. Suitable for equal spacing arrangement of multiple child elements in rows and columns.

Flex provides spacing for block-level elements, and it does not add wrapper elements. Suitable for child element layout in vertical or horizontal directions, and provides more flexibility and control capabilities.

## Basic Usage
Default component horizontal spacing.
:::demo components/Space/basic.vue :::

## Vertical Spacing
Use `direction` to set vertical spacing
:::demo components/Space/vertical.vue :::

## Spacing Size
Use size to set the spacing between elements. Three sizes are preset: small, middle, large. You can also customize the spacing. If size is not set, it defaults to small.
:::demo components/Space/size.vue :::

## Alignment
Define the alignment of components by setting the `align` attribute
:::demo components/Space/align.vue :::

## Auto Wrap
Set `wrap`, only effective in `horizontal`
:::demo components/Space/wrap.vue :::

## Design Token
| Variable | Default Value | Description |
| --- | --- | --- |
| --h-space-spacing-gap-small | var(--h-spacing-3) | small size spacing  |
| --h-space-spacing-gap-medium | var(--h-spacing-5) | medium size spacing  |
| --h-space-spacing-gap-large | var(--h-spacing-7) | large size spacing  |
| --h-space-spacing-horizontal-gap-small | var(--h-space-spacing-gap-small) |  horizontal small spacing  |
| --h-space-spacing-horizontal-gap-medium | var(--h-space-spacing-gap-medium) | horizontal medium spacing  |
| --h-space-spacing-horizontal-gap-large | var(--h-space-spacing-gap-large) | horizontal large spacing  |
| --h-space-spacing-vertical-gap-small | var(--h-space-spacing-gap-small) | vertical small spacing  |
| --h-space-spacing-vertical-gap-medium | var(--h-space-spacing-gap-medium) | vertical medium spacing  |
| --h-space-spacing-vertical-gap-large | var(--h-space-spacing-gap-large) | vertical large spacing |
| --h-space-spacing-wrap-gap-small | var(--h-space-spacing-horizontal-gap-small) var(--h-space-spacing-vertical-gap-small) |  wrap small spacing up down left right  |
|  --h-space-spacing-wrap-gap-medium | var(--h-space-spacing-horizontal-gap-medium) var(--h-space-spacing-vertical-gap-medium) |  wrap medium spacing up down left right |
|  --h-space-spacing-wrap-gap-large | var(--h-space-spacing-horizontal-gap-large) var(--h-space-spacing-vertical-gap-large) |  wrap large spacing up down left right |
