
## Basic Usage

Pass resources through `sources` and control visibility with `v-model`.

:::demo vue/components/Viewer/basic.vue :::

## Loop

`loop` wraps previous and next navigation at both ends of the source list.

:::demo vue/components/Viewer/loop.vue :::

## Auto-hide Tools

`auto-hide-tools` controls whether the toolbar disappears after inactivity.

:::demo vue/components/Viewer/autohide.vue :::

## Legends

An image source can define multiple `legends`. A legend becomes interactive when it has a `handler`. Video sources do not support legends.

:::demo vue/components/Viewer/legend.vue :::

## Custom Tools

Use `tools` to reorder built-in controls or add a custom action with an icon, title, and handler.

:::demo vue/components/Viewer/tools.vue :::

## Open from a Thumbnail

When a page thumbnail is selected, use `init-index` to open the corresponding source.

:::demo vue/components/Viewer/imgclick.vue :::

## Keyboard and Pointer

- <kbd>Esc</kbd> closes the viewer
- <kbd>←</kbd> / <kbd>→</kbd> navigates sources
- <kbd>↑</kbd> / <kbd>↓</kbd> zooms images
- Double-click toggles between actual and fitted size
- Wheel, trackpad, and pinch gestures pan or zoom images
