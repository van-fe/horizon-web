# Spin

Spin communicates short asynchronous work as an inline, regional, or fullscreen loading state.

## Basic Usage

Set `spinning` to control the loading state and `tip` to provide a readable status label.

:::react-demo react/components/Spin/basic.tsx :::

## Nested Content and Delay

Wrapping content adds an optional regional mask. `delay` avoids flicker when work completes quickly.

:::react-demo react/components/Spin/nested.tsx :::

## Custom Indicator

Use `indicator` and `tipContent` for custom visual content while keeping the status semantics.

:::react-demo react/components/Spin/custom.tsx :::

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `spinning` | `boolean` | `true` | Whether loading is active |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Indicator size |
| `delay` | `number` | `0` | Delay before showing, in milliseconds |
| `tip` | `string` | — | Loading text and accessible status label |
| `mask` | `boolean` | `true` | Shows a translucent mask over nested content |
| `fullscreen` | `boolean` | `false` | Covers the viewport |
| `indicator` | `ReactNode` | — | Custom loading indicator |
| `tipContent` | `ReactNode` | — | Custom visible tip content |
| `children` | `ReactNode` | — | Content covered by the regional state |

The forwarded ref points to the root `HTMLDivElement`. When `tip` is absent, `HorizonWebProvider.spinLabels.loading` supplies the status label.
