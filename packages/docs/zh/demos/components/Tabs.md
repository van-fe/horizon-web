Tabs 用于在同一上下文中切换并列内容。标签应简短、层级一致；当标签较多或文案较长时，优先开启滚动并保留完整名称的提示。

## 基本用法

通过 `v-model:active-key` 同步当前标签。默认采用 `line` 类型，适合页面内的同级导航。

:::demo components/Tabs/basic.vue :::

## 卡片类型

`type="card"` 具有更明确的容器边界，适合设置、编辑器等局部工作区。

:::demo components/Tabs/card.vue :::

## 禁用状态

为单个 `h-tab` 设置 `disabled`，可以保留导航结构并说明当前内容暂不可用。`page` 类型不会应用禁用状态。

:::demo components/Tabs/disable.vue :::

## 类型与尺寸

组件支持 `line`、`card`、`page` 三种类型，以及 `small`、`medium`、`large`、`huge` 四种尺寸。`page` 类型会忽略 `size`；`underline` 和 `indicator` 只对 `line` 生效。

:::demo components/Tabs/size-and-type.vue :::

## 图标标签

使用 `icon` 在文字前展示图标。图标应帮助识别内容，不应替代清晰的文字标签。

:::demo components/Tabs/icon.vue :::

## 滚动标签

标签超出可用宽度时，`scrollable` 允许横向浏览；`arrow` 控制箭头，`focusable` 控制激活项是否自动进入可视区域。

:::demo components/Tabs/scroll.vue :::

## 动态新增与关闭

在 `h-tabs` 上设置 `editable` 展示新增入口，在 `h-tab` 上设置 `closable` 展示关闭入口。新增、删除和业务数据更新由应用在 `add`、`close` 事件中完成。

:::demo components/Tabs/editable.vue :::

## 附加操作区

`extra` 插槽可放置刷新、重置等作用于当前视图的操作，并会提供当前标签尺寸。

:::demo components/Tabs/extra.vue :::

## 长文本与溢出

空间有限时，可通过自定义标签插槽截断文字，并用 Tooltip 保留完整名称。请同时保证键盘用户能够访问完整信息。

:::demo components/Tabs/text-overflow.vue :::

## 拖拽排序

设置 `draggable` 开启标签排序，`sort` 事件会返回起止位置和排序后的 key。单个标签可通过自己的 `draggable` 禁止拖动。

:::demo components/Tabs/draggable.vue :::

## 与 Panels 联动

Tabs 只负责导航；将同一个 active key 绑定到 `h-tabs` 和 `h-panels`，即可建立可访问的内容切换关系。

:::demo components/Tabs/with-panel.vue :::

## 切换前守卫

`before-change` 返回 `false` 或 `Promise<false>` 时会阻止切换，适合保护未保存内容、权限校验或异步确认。

:::demo components/Tabs/before-change.vue :::

## 右键菜单

通过自定义标签插槽组合 Dropdown，可以为标签提供复制、关闭等上下文操作。菜单操作仍由业务维护标签数据。

:::demo components/Tabs/tab-menu.vue :::

## 文字型标签

关闭 `indicator` 和 `underline` 后，可在标签插槽中组合 Tag，构建紧凑的筛选导航。

:::demo components/Tabs/tab-text.vue :::

## Page 等宽布局

`type="page"` 会在可用宽度内排列页面级标签，适合步骤和主视图切换。长标签应在窄屏下保持可读或提供完整提示。

:::demo components/Tabs/width.vue :::

## 自定义标签

`h-tab` 默认插槽提供 `state` 与 `activeKey`，可组合数量、状态、Tooltip 等信息，同时保持 Tabs 的选择与键盘行为。

:::demo components/Tabs/slot.vue :::

## Design Token

:::code ./demos/design-token.scss :::
