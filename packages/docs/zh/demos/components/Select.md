### 基本用法

:::demo components/Select/basic.vue :::

### 单选
可以配置 `show-selected-icon` 开启显示选中标识

也可以配置 `selected-icon` 用来自定义选中标识的图标

:::demo components/Select/single.vue :::

### 自定义 `dropdown icon`
可以通过配置 `dropdown-icon` 来控制 `dropdown icon`

如果传入 `false` 则可以置空

:::demo components/Select/icon-style.vue :::

### 多选
默认情况下，不会折叠选中项。可以配置 `collapse-tags = true` 折叠已选项

另外可以配置 `collapse-tags-tooltip = true`，可以在悬浮在 `+N` 上时显示其他已选项，并可以快捷反选已选项

另外，如果你的 `select` 空间很小，可能会此被挤压到只有 `+N` ，则可以配置 `max-collapse-tags`，强制展示多少个已选项，其余已选项则会折叠起来

如果你的选项内容过长，导致在已选项和 `+N` 之间无法容纳，则可以配置 `collapse-tags-fill-up = true`，即可让已选项尽量填满空间

自 `2.4.0` 开始，`collapse-tags-fill-up` 默认开启

:::demo components/Select/multiple.vue :::

### 全选
支持传入 `use-check-all = true`，开启全选

:::demo components/Select/check-all.vue :::

### 选项统计
传入 `use-statistic = true`，即可对多选项进行统计

可以设置 `statistic-text` 来指定统计文字

`use-statistic` 会优先于 `use-check-all`

:::demo components/Select/statistic.vue :::

### 动态设置折叠
可以通过切换 `collapse-tags` 来控制折叠状态，在 `focus` 时全部展开，`false` 时折叠

:::demo components/Select/dynamic-collapse.vue :::

### 分组
可以使用 `n-option-group` 来分组，具有具名分组和不具名分组
:::demo components/Select/group.vue :::

### 禁用
设置 `disabled = true` 即可禁用 `n-select`

给 `n-option` 设置 `disabled = true`，即可禁用当前选项

给 `n-option-group` 设置 `disabled = true`，即可禁用当前组下的所有选项

:::demo components/Select/disabled.vue :::

### 已选择选项不展示
设置 `selected-visible = false`，可以将已选项不展示在面板中

:::demo components/Select/hide-selected.vue :::

### 辅助说明文字
给 `n-option.description` 设置内容，用来辅助说明 `label`
:::demo components/Select/description.vue :::

### 过滤
设置 `filterable = true` 开启过滤

如果需要自定义过滤方法，则传输 `filter-method` 即可

如果需要下拉面板上有 `input` ，则可以配置 `use-build-in-panel-filter`，启用内置的面板上的 `input`

原本使用插槽自行实现的仍可使用

:::demo components/Select/filter.vue :::

### 过滤保留关键字
在过滤+多选的情况下，设置 `reserve-keyword` 可以设置三种保留关键字的模式

`true`: 保留关键字

`false`: 不保留关键字

`'reserve-deselect'`: 仅在反选时保留关键字

`'reserve-special'`: 不保留关键字，但对过滤的内容仍然保留，只有用户手动清空输入文字或失焦输入框后，才会改变过滤内容

:::demo components/Select/reserve-keyword.vue :::

### 确认面板
启用确认面板，则需开启 `need-confirm = true` 即可

:::demo components/Select/confirm.vue :::

### 值的转化
使用 `value-format`，传入一个函数，则可以对 `modelValue` 转化

请注意，仍然不建议使用 `value-format`，自 2.3.0 开始，`n-option.value` 已支持 `object` 类型

此方法会在 `3.x` 剔除

:::demo components/Select/format-value.vue :::

### 自定义 Option
通过 `option.default` 插槽，可以自定义展示形式

也可以对插槽 `select.optionRender` 设置，用来统一设置 `option` 的展示形式

另外，可以传入 `select.external-panel-style`，用来自定义面板的 `style`

:::demo components/Select/option.vue :::

### 选项超长
如果选项超长，会自动溢出

`select.max-tag-width` 被移除，由 `tag` 的规范约束
:::demo components/Select/overflow.vue :::

### 远程搜索
设置 `show-search` 开启远程搜索

监听 `search` 事件用来控制搜索结果展示的时机

或者通过给 `search-method` 传入异步方法，可以控制

如果希望在没有任何结果时也显示面板，则设置 `hide-panel-when-show-search-and-empty-list = false` 即可
:::demo components/Select/remote-search.vue :::

### 允许创建
设置 `allow-create` 允许创建 `option`

并借助 `before-create` 回调，来判断是否允许创建 `option`
:::demo components/Select/creatable.vue :::

### 触底加载
可以通过监听 `optionListReachBottom` 事件来获取是否滚动到了底部，然后触发更新加载

切换 `loading` 的状态可以改变弹出面板的加载状态
:::demo components/Select/reach-bottom.vue :::

### 自定义选择标签
通过 `select.tagRender` 插槽可以自定义选择后的选项在输入框中的渲染表现

使用 `option.label` 插槽，可以自定义 `n-option` 中文本的展示形式

:::demo components/Select/custom-tag-render.vue :::

### 已选择的选项置顶
可以通过设置 `selectedOptionOrderToTop = true`，开启已选择的选项向顶部排列

只有在关闭面板后，才会进行排列，正处于选择的时候不会改变排序

如果是分组的情况，则会在组内靠前排，不会将整个组往前排

:::demo components/Select/selected-option-order-to-top.vue :::

### 宽度适配
默认情况下，下拉面板的宽度会与 `select` 宽度保持一致。

在特殊情况下，`select` 宽度可能非常小，需要下拉面板的宽度不受限制，则可以设置 `fit-input-width = false` 即可

但需要注意的是，此时下拉面板的宽度不再有最大宽度限制，因此会被超长的子元素把面板宽度撑开

另外触发器本身有最小宽度 `144px`，如果需要变更则需要修改样式

:::demo components/Select/fit-width.vue :::

### 初始化值
默认情况下，在清空值后，`update:modelValue` 会默认给予 `undefined`

但你也可以通过 `initialValue` 来控制清空值后的默认值

比如可以指定 `null` `[]` 等数据

**需要注意的是，空字符串也会被认为是非空值**

:::demo components/Select/initial-value.vue :::

### 事件展示

此示例展示了所有的事件抛出，可以在控制台查看打印的事件

:::demo components/Select/events.vue :::

### 自定义空样式
可以使用 `empty-text` 控制在列表为空时展示的文字

也可以通过插槽 `slots.empty` 来控制空时展示的内容

:::demo components/Select/empty.vue :::

### 虚拟滚动
启用虚拟滚动需要配置 `options` 字段

一旦设置了此值，即将忽略 `default` 插槽的内容，并且无法自定义 `option` 的展示（即所有有关 `option` 的插槽都无法使用）

此示例创建了 5000 个元素

**因虚拟滚动组件的特殊性，可能会在过滤、搜索的情况下某项留白不可见，需要手动上下滚动一下即可恢复**

:::demo components/Select/virtual-scroller.vue :::
