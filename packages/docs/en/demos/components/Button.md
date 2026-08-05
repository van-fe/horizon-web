Button triggers an immediate action. Keep a clear primary and secondary hierarchy, and give icon-only controls an accessible name.

## Type and Shape

`type` communicates primary, normal, and dangerous actions. `round` applies a pill-shaped treatment.

:::demo components/Button/basic.vue :::

## Size

Use `size` for different interface densities and `auto-fit` to keep short labels compact.

:::demo components/Button/size.vue :::

## Plain and Ghost

`plain` lowers visual emphasis. Combine it with `ghost` on a strong-colored surface.

:::demo components/Button/plain.vue :::

## Text Button

`text` works for low-emphasis actions that keep users in the current context.

:::demo components/Button/text.vue :::

## Link Button

`link` applies link styling, `href` uses native navigation, and `to` uses Vue Router.

:::demo components/Button/link.vue :::

## Active State

`active` communicates the selected view, filter, or tool.

:::demo components/Button/active.vue :::

## Disabled State

`disabled` prevents interaction. Explain why an action is unavailable in nearby supporting copy.

:::demo components/Button/disabled.vue :::

## Icon and Loading

`icon` works with or without text; set `aria-label` when no visible label exists. `loading` represents an asynchronous action in progress.

:::demo components/Button/icon.vue :::

## Block Button

`block` fills the container and works well in narrow forms or high-confidence confirmation areas.

:::demo components/Button/block.vue :::

## Button Group

`h-button-group` joins strongly related controls and can compose with a dropdown to create a split action.

:::demo components/Button/button-group.vue :::

## Guarded Async Action

`debounce-fn` prevents duplicate execution until its Promise settles. `debounce-type` selects a `disabled`, `loading`, or logic-only state.

:::demo components/Button/debounce-fn.vue :::

## Border Style

`border-style` supports `solid`, `dotted`, and `dashed` treatments for semantically related secondary actions.

:::demo components/Button/border-style.vue :::

## Custom Color (BETA)

`color` accepts built-in names and color literals, then derives interaction states. Prefer built-in names in product flows; the hexadecimal value below exists only to demonstrate custom input.

:::demo components/Button/custom-color.vue :::
