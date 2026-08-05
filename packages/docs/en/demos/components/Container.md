## Header and Main Content


:::demo components/Container/demo1.vue :::

## Header, Main, and Footer

Add `h-footer` for save state, pagination, or supporting information to complete a vertical page shell.

:::demo components/Container/demo2.vue :::

## Aside and Main Content

A container with only `h-aside` and `h-main` lays out horizontally by default. On narrow screens, move the aside above the content so it does not squeeze the main region.

:::demo components/Container/demo3.vue :::

## Sidebar Below a Global Header

Nest another `h-container` to place one global header above both the sidebar and main content.

:::demo components/Container/demo4.vue :::

## Complete Layout with Workspace Footer

The inner container can combine `h-main` and `h-footer` for step status or review information scoped to the workspace.

:::demo components/Container/demo5.vue :::

## Full-height Sidebar

Place `h-aside` in the outer container to let it span the header and main content on the right, a common desktop application layout.

:::demo components/Container/demo6.vue :::

## Complete Application Shell

Aside, header, main, and footer can form a complete application. Add an explicit narrow-screen reflow for sidebars and fixed-height regions.

:::demo components/Container/demo7.vue :::
