## Pin to the page top


:::demo vue/components/Affix/basic.vue :::

## Top offset

Use `offset` to reserve room for global navigation or a safe area. Numeric values are measured in pixels.

:::demo vue/components/Affix/offset.vue :::

## Custom scroll container

Pass an element or selector through `target` and Affix will calculate its boundaries from that container. The demo uses a unique ID so multiple examples on the page cannot select one another.

:::demo vue/components/Affix/target.vue :::

## Nested scroll containers

Affix automatically responds to scrolling in the target and its outer containers, and recalculates after the window or target container resizes. Call the exposed `updatePosition()` method when application code changes layout without causing a scroll or resize event.

:::demo vue/components/Affix/multiple-scroll-container.vue :::

## Pin to the bottom

Set `position="bottom"` and combine it with `offset` for persistent submit or save actions. Without `target`, Affix uses the viewport bottom; with a target container, it stays within that container boundary.

:::demo vue/components/Affix/bottom.vue :::

## API

Props are `offset` (`0`), `position` (`top` or `bottom`), `target` (selector or element), and `z-index`. The default slot contains the affixed content, `change` reports state changes, and a template ref exposes `updatePosition()`.
