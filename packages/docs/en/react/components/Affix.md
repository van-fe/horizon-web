# Affix

Affix keeps content visible at the top or bottom boundary of the viewport or a scrolling container while preserving its original layout space.

## Viewport boundary

:::react-demo react/components/Affix/basic.tsx :::

## Container boundary and ref

Use a stable target resolver for a ref-owned container. The imperative handle recalculates after layout changes that do not emit scroll or resize events.

:::react-demo react/components/Affix/target.tsx :::

## API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `offset` | `number` | `0` | Pixel offset from the boundary |
| `position` | `'top' \| 'bottom'` | `'top'` | Boundary edge |
| `target` | `string \| HTMLElement \| Window \| (() => target)` | `window` | Scroll boundary target |
| `zIndex` | `number` | — | Stacking level while affixed |
| `onChange` | `(affixed: boolean) => void` | — | Reports affixed-state changes |
| `children` | `ReactNode` | — | Affixed content |

`AffixHandle` exposes `updatePosition()` and the readonly `element`. The placeholder is hidden from the accessibility tree; the content keeps its native semantics and attributes.
