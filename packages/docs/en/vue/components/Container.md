## Header and Main Content


:::demo vue/components/Container/demo1.vue :::

## Header, Main, and Footer

Add `h-footer` for save state, pagination, or supporting information to complete a vertical page shell.

:::demo vue/components/Container/demo2.vue :::

## Aside and Main Content

A container with only `h-aside` and `h-main` lays out horizontally by default. On narrow screens, move the aside above the content so it does not squeeze the main region.

:::demo vue/components/Container/demo3.vue :::

## Sidebar Below a Global Header

Nest another `h-container` to place one global header above both the sidebar and main content.

:::demo vue/components/Container/demo4.vue :::

## Complete Layout with Workspace Footer

The inner container can combine `h-main` and `h-footer` for step status or review information scoped to the workspace.

:::demo vue/components/Container/demo5.vue :::

## Full-height Sidebar

Place `h-aside` in the outer container to let it span the header and main content on the right, a common desktop application layout.

:::demo vue/components/Container/demo6.vue :::

## Complete Application Shell

Aside, header, main, and footer can form a complete application. Add an explicit narrow-screen reflow for sidebars and fixed-height regions.

:::demo vue/components/Container/demo7.vue :::

## API Summary

- Container accepts `direction="horizontal" | "vertical"`; without it, direct Header or Footer children select vertical layout.
- Header and Footer accept `height`; Aside accepts `width`. Numbers are converted to pixels and CSS dimension strings are preserved.
- Container, Header, Aside, Main, and Footer expose their content through the default slot.
