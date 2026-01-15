## Basic Usage
:::demo components/Menu/basic.vue :::

## First-level Menu with Title
If you want the icon and title content to be displayed together, you need to set `collapse-forever = true`
:::demo components/Menu/shrink.vue :::

## Horizontal Menu
Set mode to `horizontal` to enable horizontal menu

When submenus exceed three levels, they will not continue to render when `submenu-expand-type = 'full'`

:::demo components/Menu/horizontal.vue :::

## Drag to Change Menu Width
You can set `resizable = true` to enable the function of dragging to change the menu bar width

If you don't want the menu to collapse during dragging, you can control `resize-to-collapse = false`
:::demo components/Menu/resizer.vue :::

## Intercept Selection
Set `before-select` to intercept user menu selection operations
:::demo components/Menu/before-select.vue :::
