## Basic Usage
Provides `#dropdown` slot to place `n-dropdown-menu`, or you can directly place `n-dropdown-menu` in `#default` without using named slots
:::demo components/Dropdown/basic.vue :::

## Trigger Object
You can use the `#suffix` slot of `n-button` and use `n-button-group` to split the trigger button
:::demo components/Dropdown/trigger-target.vue :::

## Icon
Set `props.icon` for `n-menu-item` to add an `icon` prefix
:::demo components/Dropdown/icon.vue :::

## Trigger Method
Allows using `click` `hover` `contextMenu` to trigger
:::demo components/Dropdown/trigger.vue :::

## Directive Event
You can get the click event of `n-dropdown-item` through the `emit.command` event, or trigger the command through the `click` event mounted on `n-dropdown-item`
:::demo components/Dropdown/command.vue :::

## Manually Toggle Menu
Exposes `handleOpen` `handleClose` to manually control menu toggle

Of course, you can set `trigger="manual"` and pass in `visible` to control whether it is displayed
:::demo components/Dropdown/manual.vue :::

## Grouped Menu
You can use `n-dropdown-gruop` to group
:::demo components/Dropdown/group.vue :::

## Multi-level Menu
Use `n-dropdown-submenu` to enable multi-level menu
:::demo components/Dropdown/submenu.vue :::

## Theme
Provides three themes: `default` `gray` `midnight`
:::demo components/Dropdown/themes.vue :::
