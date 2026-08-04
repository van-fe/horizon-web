## 基本用法
选项卡的基本使用方法。默认为 `line` 类型，`medium` 尺寸
:::demo components/Tabs/basic.vue :::

## 状态
处于禁用状态的选项卡项目表明该选项卡项目存在，但在当前情况下不可用。设置单个选项卡 `disabled`，当 `type=page` 不生效。
:::demo components/Tabs/disable.vue :::

## 尺寸类型
定义 `small | medium | large | huge` 四个尺寸，应用在不同的场景下，默认 `small`。支持 `line | card | page` 三种类型，默认 `line`。<span style="color: #FA541C; font-weight: bold;">特别说明当类型是 `page` 时候，不支持 `size` 属性。</span>
:::demo components/Tabs/size-and-type.vue :::

## 有图标选项卡
可以在选项卡标题前添加一个图标。
:::demo components/Tabs/icon.vue :::

## 滑动
在空间紧张的情况，可以左右滑动，容纳更多选项卡。示例是在 `600px` 宽度的元素内表现形式。可以通过 `focusable` 控制是否自动滑动到激活元素
:::demo components/Tabs/scroll.vue :::


## 关闭和增加
通过设置 `h-tabs (editable)`、`h-tab (closable)` 属性可以开启动态增减选项卡。关闭和新增的逻辑由业务实现；删除当前选项卡时会默认选中第一个可用选项卡。
:::demo components/Tabs/editable.vue :::

## 右侧附加操作区域
可以在选项卡的右侧添加额外内容，例如按钮。
:::demo components/Tabs/extra.vue :::

## 文字溢出
通过 `label` 传入的标签文字被截断时，会自动用 Tooltip 展示完整名称。自定义标签插槽的结构和省略规则由使用方控制，需要时请自行组合 Tooltip。
:::demo components/Tabs/text-overflow.vue :::

## 可拖拽标签
如果需要对选项卡进行排序操作，可通过设置 `draggable` 启用。
:::demo components/Tabs/draggable.vue :::

## 结合 `h-panel` 使用
使用面板组件，开发选项卡应用
:::demo components/Tabs/with-panel.vue :::

## 切换前回调
你可以通过 `beforeChange` 来延迟或者阻止切换选项卡。
:::demo components/Tabs/before-change.vue :::

## 右键菜单
自定义 `slot` 方式来实现右键菜单
:::demo components/Tabs/tab-menu.vue :::

## 文字类页签
通过自定义 `type=line` 的页签实现，这个时候设置 `indicator=false` 即可
:::demo components/Tabs/tab-text.vue :::

## Design Token
:::code ./demos/design-token.scss :::
