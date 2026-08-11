
## Page Scroll

Use `visibility-height` to set the reveal threshold. The demo reports the click result in the page.

:::demo vue/components/Backtop/basic.vue :::

## Custom Button Content

The default size and behavior remain intact while the default slot combines a short label and icon.

:::demo vue/components/Backtop/custom.vue :::

## Custom Scroll Target

Use `target` for a local scrolling area. The target should scroll, remain keyboard-focusable, and use a unique selector.

:::demo vue/components/Backtop/target.vue :::

## API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `visibility-height` | `number` | `400` | Scroll threshold that reveals the action |
| `bottom` | `number` | `120` | Pixel offset from the viewport bottom |
| `right` | `number` | `24` | Pixel offset from the viewport right edge |
| `target` | `string` | `window` | Selector for the observed scrolling element |
| `aria-label` | `string` | `Back to top` | Accessible action name |

The default slot replaces the arrow content. The `click` event receives the native mouse event. A template ref exposes `scrollToTop()` and `focus()`.
