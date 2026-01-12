### 基础使用
:::demo components/Menu/basic.vue :::

### 带标题的一级菜单
如果希望 icon 和 标题内容一起显示，需要设置 `collapse-forever = true`
:::demo components/Menu/shrink.vue :::

### 横向菜单
设置 mode 为 `horizontal` 即可开启横向菜单

当子菜单超过三级后，`submenu-expand-type = 'full'` 时将不会继续渲染

:::demo components/Menu/horizontal.vue :::

### 拖拽更改菜单宽度
可以设置 `resizable = true` 开启拖拽改变菜单栏宽度的功能

如果不希望在拖拽的过程中折叠菜单，则可以控制 `resize-to-collapse = false` 即可
:::demo components/Menu/resizer.vue :::

### 拦截点选
设置 `before-select`，可以拦截用户点选菜单的操作
:::demo components/Menu/before-select.vue :::
