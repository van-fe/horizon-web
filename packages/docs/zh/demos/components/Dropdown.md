## 基本用法
提供了 `#dropdown` 插槽放置 `h-dropdown-menu`，也可以不使用具名插槽直接在 `#default` 中放置 `h-dropdown-menu`
:::demo components/Dropdown/basic.vue :::

## 触发对象
可以借用 `h-button` 的 `#suffix` 插槽和使用 `h-button-group` 分割触发按钮
:::demo components/Dropdown/trigger-target.vue :::

## 图标
给 `h-menu-item` 设置 `props.icon`，可以前置一个 `icon`
:::demo components/Dropdown/icon.vue :::

## 触发方式
允许使用 `click` `hover` `contextMenu` 来触发
:::demo components/Dropdown/trigger.vue :::

## 指令事件
可以通过 `emit.command` 事件获取 `h-dropdown-item` 的点击事件，也可以通过挂载在 `h-dropdown-item` 的 `click` 事件触发命令
:::demo components/Dropdown/command.vue :::

## 手动开关菜单
对外暴露了 `handleOpen` `handleClose`，可以手动控制菜单开关

当然你可以设置 `trigger="manual"`，并传入 `visible` 来控制是否显示
:::demo components/Dropdown/manual.vue :::

## 分组菜单
可以使用 `h-dropdown-gruop` 分组
:::demo components/Dropdown/group.vue :::

## 多级菜单
使用 `h-dropdown-submenu` 可以启用多级菜单
:::demo components/Dropdown/submenu.vue :::

## 主题
提供了三种主题： `default` `gray` `midnight`
:::demo components/Dropdown/themes.vue :::
