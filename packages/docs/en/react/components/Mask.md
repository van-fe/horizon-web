# Mask

Mask places a configurable scrim above a surface while keeping optional action content above the scrim.

## Basic Usage

Use `absolute` inside a positioned container. A hidden mask remains mounted but becomes transparent and non-interactive.

:::react-demo react/components/Mask/basic.tsx :::

## Visual Variants

Choose a semantic overlay strength without hardcoding product colors.

:::react-demo react/components/Mask/variants.tsx :::

## Custom Appearance

`color`, `opacity`, and `fuzzified` customize the scrim while preserving the shared layout and transition behavior.

:::react-demo react/components/Mask/custom.tsx :::

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'default' \| 'weak' \| 'strong' \| 'inverse' \| 'transparent' \| 'customize'` | `'default'` | Scrim visual variant |
| `visible` | `boolean` | `true` | Shows the mask |
| `absolute` | `boolean` | `false` | Covers the nearest positioned container instead of the viewport |
| `opacity` | `number \| string` | `1` | Scrim opacity |
| `color` | `string` | — | Custom scrim color |
| `zIndex` | `number` | `1` | Root stacking level |
| `fuzzified` | `boolean` | `false` | Uses the translucent blur treatment |
| `contentFullSize` | `boolean` | `false` | Makes the content region fill the mask |
| `scrimClassName` | `string` | — | Class applied to the scrim |
| `scrimStyle` | `CSSProperties` | — | Style applied to the scrim |
| `children` | `ReactNode` | — | Content rendered above the scrim |

## Callbacks

| Callback | Signature | Description |
| --- | --- | --- |
| `onMaskClick` | `(event: MouseEvent<HTMLDivElement>) => void` | Called only when the scrim is pressed |

The forwarded ref points to the root `HTMLDivElement`. Interactive content should provide its own accessible name and focus behavior.
