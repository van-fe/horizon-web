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
| --n-space--small | var(--n-spacing-3) | small size spacing  |
| --n-space--medium | var(--n-spacing-5) | medium size spacing  |
| --n-space--large | var(--n-spacing-7) | large size spacing  |
| --n-space--horizontal--small | var(--n-space--small) |  horizontal small spacing  |
| --n-space--horizontal--medium | var(--n-space--medium) | horizontal medium spacing  |
| --n-space--horizontal--large | var(--n-space--large) | horizontal large spacing  |
| --n-space--vertical--small | var(--n-space--small) | vertical small spacing  |
| --n-space--vertical--medium | var(--n-space--medium) | vertical medium spacing  |
| --n-space--vertical--large | var(--n-space--large) | vertical large spacing |
| --n-space--wrap--small | var(--n-space--vertical--small) var(--n-space--vertical--small) |  wrap small spacing up down left right  |
|  --n-space--wrap--medium | var(--n-space--vertical--medium) var(--n-space--vertical--medium) |  wrap medium spacing up down left right |
|  --n-space--wrap--large | var(--n-space--vertical--large) var(--n-space--vertical--large) |  wrap large spacing up down left right |
