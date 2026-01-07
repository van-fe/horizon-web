### 基本用法
选项卡的基本使用方法。默认为 `line` 类型，`medium` 尺寸
:::demo ./demos/basic.vue :::

### 状态
处于禁用状态的选项卡项目表明该选项卡项目存在，但在当前情况下不可用。设置单个选项卡 `disabled`，当 `type=page` 不生效。
:::demo ./demos/disable.vue :::

### 尺寸类型
定义`mini | small | medium | large`四个尺寸，应用在不同的场景下, 默认 `medium`。 定义`line | card | segment | page` 四个类型，默认 `line`。<span style="color: #FA541C; font-weight: bold;">特别说明当类型是 `page` 时候，不支持 `size` 属性。</span>
:::demo ./demos/size-and-type.vue :::

### 有图标选项卡
可以在选项卡标题前添加一个图标。
:::demo ./demos/icon.vue :::

### 滑动
在空间紧张的情况，可以左右滑动，容纳更多选项卡。示例是在 `600px` 宽度的元素内表现形式。可以通过 `focusable` 控制是否自动滑动到激活元素
:::demo ./demos/scroll.vue :::


### 关闭和增加
通过设置 `h-tabs (editable)`、`h-tab (closable)` 属性可以开启动态增减选项卡。仅在 `line | card | page` 生效；关闭和新增的逻辑由业务实现。 `v2 = true`，删除如果是当前选项卡，则默认选中第一个选项卡
:::demo ./demos/editable.vue :::

### 右侧附加操作区域
可以在选项卡的右侧添加额外内容，例如按钮。<span style="color: #FA541C; font-weight: bold;">特别说明: `segment` 类型不支持右侧操作区域按钮</span>
:::demo ./demos/extra.vue :::

### 文字溢出
超出部分用 “ ... ” 展示，并在鼠标移入出现文字提示。
:::demo ./demos/text-overflow.vue :::

### 可拖拽标签
如果需要对选项卡进行排序操作，可通过设置 `draggable` 启用。
:::demo ./demos/draggable.vue :::

### 结合 `h-panel` 使用
使用面板组件，开发选项卡应用
:::demo ./demos/with-panel.vue :::

### 切换前回调
你可以通过 `beforeChange` 来延迟或者阻止切换选项卡。
:::demo ./demos/before-change.vue :::

### 右键菜单
自定义 `slot` 方式来实现右键菜单
:::demo ./demos/tab-menu.vue :::

### 文字类页签
通过自定义 `type=line` 的页签实现，这个时候设置 `indicator=false` 即可
:::demo ./demos/tab-text.vue :::

### v1.x 兼容性
为了业务更顺滑迁移，针对 v1.x 版本做了完整兼容，通过 v2 可以设置使用 v2.x 逻辑。影响逻辑点：<br />
1.`beforeChange` 逻辑，开启后 `beforeChange` 返回 `PromiseLike<false>`阻止tab切换 <br />
2.`emits.close` ，开启后如果删除是激活的tab，则默认选中第一个
3.`size`,开启后默认使用`small`尺寸
:::demo ./demos/compatible.vue :::


### Design Token
:::code ./demos/desigh-token.scss :::