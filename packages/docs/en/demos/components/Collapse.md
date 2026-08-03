## When to Use

Collapse panels group supporting information and reveal it on demand, keeping the primary path clear. Prefer regular headings and a full page when users usually need to read everything in sequence.

## Basic Usage

The default mode allows multiple panels to stay open. Use `v-model:active-key` for expanded items, and enable `filled` for stronger section grouping.

:::demo components/Collapse/basic.vue :::

## Size and Icon Position

Use `size` to adjust panel density and `expand-icon-position` to place the expand icon before or after the title.

:::demo components/Collapse/size.vue :::

## Accordion

Set `accordion` to keep only one panel open. In this mode, `active-key` should be a single string or number rather than an array.

:::demo components/Collapse/accordion.vue :::

## Nested Panels

Use nesting only for a clear parent-child hierarchy. Maintain separate `active-key` models for the outer and inner groups.

:::demo components/Collapse/nest.vue :::

## Custom Titles

Use the `title` slot to combine icons, status, and actions. Stop event propagation on header buttons so the action does not also toggle the panel.

:::demo components/Collapse/other.vue :::
