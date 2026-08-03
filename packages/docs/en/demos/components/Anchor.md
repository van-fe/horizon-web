## Navigation sizes

Use `size` to switch between `medium` and `small`. The demo uses an isolated scroll container so text and navigation widths can be compared directly.

:::demo components/Anchor/demo1.vue :::

## URL hash

`change-hash` controls whether clicking an anchor updates the URL hash. With it disabled, Anchor still scrolls to the target without creating browser history, which suits dialogs and nested panels.

:::demo components/Anchor/demo2.vue :::

## Custom scroll container and hierarchy

`scroll-container` accepts a selector, element, or Window. Nested scroll regions usually pair with `:change-hash="false"`; `show-title-suffix` displays the number of child sections after a top-level title.

:::demo components/Anchor/demo3.vue :::

## Scroll and activation offsets

`scroll-offset` controls where a clicked target lands. `bounds-offset` controls where the active link changes while scrolling. Both accept pixels or `start`, `center`, and `end`.

:::demo components/Anchor/demo4.vue :::

## Collapsible navigation

Set `use-collapse` to enable collapse mode and customize its prompt with `collapse-text`. Use `v-model:collapse` when the current state must remain visible outside Anchor.

:::demo components/Anchor/demo9.vue :::

## Side line

`show-line` controls the side line and `show-highlight-line` controls its active segment. The demo disables the dependent control when the whole line is hidden.

:::demo components/Anchor/demo5.vue :::

## Navigation events

`click` returns the selected link information and native event. `change` fires when scrolling activates a different section. The demo surfaces both results above the preview.

:::demo components/Anchor/demo6.vue :::

## Dynamic configuration

`size`, `max-height`, `show-title-suffix`, and each AnchorLink `title` can update dynamically. The controls make navigation layout, scrolling, and overflow behavior immediately visible.

:::demo components/Anchor/demo7.vue :::

## Automatic table of contents

With `auto-render`, Anchor scans headings in the scroll container according to `auto-render-rules`. After the content structure changes, call the exposed `refreshAnchorList()` method to scan again.

:::demo components/Anchor/demo8.vue :::
