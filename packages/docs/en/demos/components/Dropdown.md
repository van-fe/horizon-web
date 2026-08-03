## Basic Usage
Provides `#dropdown` slot to place `h-dropdown-menu`, or you can directly place `h-dropdown-menu` in `#default` without using named slots
:::demo components/Dropdown/basic.vue :::

## Trigger Object
You can use the `#suffix` slot of `h-button` and use `h-button-group` to split the trigger button
:::demo components/Dropdown/trigger-target.vue :::

## Icon
Set `props.icon` for `h-menu-item` to add an `icon` prefix
:::demo components/Dropdown/icon.vue :::

## Trigger Method
Use `click`, `hover`, or `context-menu` to trigger the dropdown.
:::demo components/Dropdown/trigger.vue :::

## Directive Event
You can get the click event of `h-dropdown-item` through the `emit.command` event, or trigger the command through the `click` event mounted on `h-dropdown-item`
:::demo components/Dropdown/command.vue :::

## Manually Toggle Menu
Exposes `handleOpen` `handleClose` to manually control menu toggle

Of course, you can set `trigger="manual"` and pass in `visible` to control whether it is displayed
:::demo components/Dropdown/manual.vue :::

## Grouped Menu
Use `h-dropdown-group` to organize menu items into groups.
:::demo components/Dropdown/group.vue :::

## Multi-level Menu
Use `h-dropdown-submenu` to enable multi-level menu
:::demo components/Dropdown/submenu.vue :::

## Theme
Provides three themes: `default` `gray` `midnight`
:::demo components/Dropdown/themes.vue :::
