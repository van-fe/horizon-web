### i18n 配置
通过 Application 来配置多语言，让你的应用可以随时切换语言。
:::demo ./demos/i18n.vue :::

### size 配置
通过 `size` props，可以控制所有组件的大小

但部分组件并不支持 `small` | `large`，使用时需要注意组件文档说明
:::demo ./demos/size.vue :::

### 全局配置挂载容器
设置 `getPopupContainer`，设置 Popover/Tooltip/Popconfirm/Message/Dialog/MessageBox/Notification 挂载容器
:::demo ./demos/popup-container.vue :::

### 显示时区
配置 `show-time-zone = true` 后，可以在包裹下的以下组件显示时区：
1. DatePickerV2：在不设置 `format` 时才有效 （切换开启关闭后，需要聚焦一下输入框才会更新时区）
2. Timeline：在开启 `v2` 且不设置 `format` 时才有效

:::demo ./demos/show-time-zone.vue :::
