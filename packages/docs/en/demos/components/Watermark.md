Watermark repeats a non-interactive mark above protected content.

## Single-line Text

Pass a string to `content`, then tune spacing, rotation, and opacity for the surface.

:::demo components/Watermark/demo1.vue :::

## Multi-line Text

Pass a string array to `content` to render a multi-line watermark.

:::demo components/Watermark/demo2.vue :::

## Image Watermark

Use `image` for a bitmap watermark. When it fails to load, `content` can provide a text fallback.

:::demo components/Watermark/demo3.vue :::

## Tamper Feedback

The component emits `tampered` when its watermark nodes are changed, allowing the application to record or surface the event.

:::demo components/Watermark/demo4.vue :::
