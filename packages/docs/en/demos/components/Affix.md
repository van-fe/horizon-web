## Pin to the page top

Affix listens to window scrolling by default and pins its content to the viewport top. It preserves the original space so surrounding content does not jump.

:::demo components/Affix/basic.vue :::

## Top offset

Use `offset` to reserve room for global navigation or a safe area. Numeric values are measured in pixels.

:::demo components/Affix/offset.vue :::

## Custom scroll container

Pass an element or selector through `target` and Affix will calculate its boundaries from that container. The demo uses a unique ID so multiple examples on the page cannot select one another.

:::demo components/Affix/target.vue :::

## Nested scroll containers

Affix listens to its own `target`. If an outer container also scrolls, call the exposed `updatePosition()` method from the outer scroll handler. The demo uses a Vue listener that is removed automatically on unmount.

:::demo components/Affix/multiple-scroll-container.vue :::

## Pin to the bottom

Set `position="bottom"` and combine it with `offset` for persistent submit or save actions. The pinned element still remains inside the target boundary.

:::demo components/Affix/bottom.vue :::
