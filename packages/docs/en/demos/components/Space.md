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
| --h-space--small | var(--h-spacing-3) | small size spacing  |
| --h-space--medium | var(--h-spacing-5) | medium size spacing  |
| --h-space--large | var(--h-spacing-7) | large size spacing  |
| --h-space--horizontal--small | var(--h-space--small) |  horizontal small spacing  |
| --h-space--horizontal--medium | var(--h-space--medium) | horizontal medium spacing  |
| --h-space--horizontal--large | var(--h-space--large) | horizontal large spacing  |
| --h-space--vertical--small | var(--h-space--small) | vertical small spacing  |
| --h-space--vertical--medium | var(--h-space--medium) | vertical medium spacing  |
| --h-space--vertical--large | var(--h-space--large) | vertical large spacing |
| --h-space--wrap--small | var(--h-space--vertical--small) var(--h-space--vertical--small) |  wrap small spacing up down left right  |
|  --h-space--wrap--medium | var(--h-space--vertical--medium) var(--h-space--vertical--medium) |  wrap medium spacing up down left right |
|  --h-space--wrap--large | var(--h-space--vertical--large) var(--h-space--vertical--large) |  wrap large spacing up down left right |
