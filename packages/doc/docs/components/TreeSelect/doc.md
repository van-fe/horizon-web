### 基本用法
结合了 `Picker` 和 `Tree` 组件，所以 `Tree` 组件的大部分配置都可以直接传入

**考虑到操作便捷性，`TreeSelect` 暂时不允许拖拽排序**

**注意：`tree-data` 中的 `value` 必须整棵树唯一**

:::demo ./demos/basic.vue :::

### 可清空
设置 `clearable = true`，即可在有值的时候清空已选项
:::demo ./demos/clearable.vue :::

### 单选
可以开启 `show-radio`，让叶子节点前面出现 `Radio` 组件
:::demo ./demos/single.vue :::

### 多选
与 `select` 一样，多选的标签使用了 `n-tag` 和 `n-tag-group` 组件结合

默认情况下，不会折叠选中项。可以配置 `collapse-tags = true` 折叠已选项

另外可以配置 `collapse-tags-tooltip = true`，可以在悬浮在 `+N` 上时显示其他已选项，并可以快捷反选已选项

另外，如果你的 `select` 空间很小，可能会此被挤压到只有 `+N` ，则可以配置 `max-collapse-tags`，强制展示多少个已选项，其余已选项则会折叠起来

:::demo ./demos/multiple.vue :::

### 多选限制
如果希望在多选时，限制用户选择的个数，则配置 `multiple-limit` 即可
:::demo ./demos/multiple-limit.vue :::

### 父子节点严格模式

可以通过设置 `check-strictly` 来控制是否父子节点是否严格控制

如果设置为 `true`，则可以点选任意非 `disabled` 状态的节点

如果设置为 `false`，则不可展开 `disabled` 的节点，并且也无法选择其下属节点

:::demo ./demos/check-strictly.vue :::

### 展开、选择控制
通过 `expand-on-click-node` 配置，可以控制是否允许在点击节点整行时，展开子节点（默认为 `true`）

`check-on-click-node` 则控制是否允许在点击节点整行时，选中子节点（默认为 `false`）

**`check-on-click-node` 仅对多选有效**

**但如果单选配置了 `check-strictly = true`，还请注意配置 `expand-on-click-node` `check-on-click-node` 优化点选操作**

:::demo ./demos/expand-and-check.vue :::

### 优化选择操作
自 `2.3.5` 开始，默认在点击叶子节点时，自动勾选节点

如果仍希望控制叶子节点只有在点击 `checkbox` 才进行选中，则可以设置 `check-on-click-leaf = false`

对于单选，则只有 `show-radio = true` 时，`check-on-click-leaf` 才有效，否则无论如何都会点击选中

:::demo ./demos/check-on-leaf.vue :::

### 控制展开
通过 `expand-values`，可以控制展开的字段，也可以使用双向绑定获取展开的值

如果不希望自动将父级展开，则需要设置 `is-default-expand-parent = false`

:::demo ./demos/expand-values.vue :::

### 默认全部展开
设置 `is-default-expand-all = true`，将所有数据全部展开

但请注意，如果数据是异步获取的，需要在取到数据后再渲染

在 `demo` 中，使用了 `v-if` 处理

并且仅在初始化时有效，后期 `tree-data` 变更将不会有处理

:::demo ./demos/default-expand-all.vue :::

### 禁用
在 `tree-data` 数据中，某项设置`disabled = true`，可以对其项禁用

但如果希望整棵树禁用，则直接给予 `disabled = true` 给 `n-tree` 即可

但无论哪种禁用方式，都不会影响展开功能

子级禁用状态也会受父子关联的配置影响

如果在多选状态下，希望父节点选择时，可以更改禁用的子节点的选中状态，则 `parent-effect-disabled-child` 需要设置为 `true`

:::demo ./demos/disabled.vue :::

### 自定义展开图标
可以配置 `fold-icon` 自定义展开图标

如果需要在展开状态切换过程中使用顺时针旋转 `90°`，则 `expand-icon` 留空即可

如果展开状态无法使用动画来展示，还请同时设置 `expand-icon` 和 `fold-icon`

:::demo ./demos/expand-icon.vue :::

### 选项统计
传入 `use-statistic = true`，即可对多选项进行统计

可以设置 `statistic-text` 来指定统计文字

:::demo ./demos/statistic.vue :::

### 过滤
设置 `filterable = true` 即可开启过滤功能
:::demo ./demos/filter.vue :::

### 过滤保留关键字
在过滤+多选的情况下，设置 `reserve-keyword` 可以设置三种保留关键字的模式

`true`: 保留关键字

`false`: 不保留关键字

`'reserve-deselect'`: 仅在反选时保留关键字

`'reserve-special'`: 不保留关键字，但对过滤的内容仍然保留，只有用户手动清空输入文字或失焦输入框后，才会改变过滤内容

:::demo ./demos/reserve-keyword.vue :::

### 面板中的过滤
如果不希望直接在触发器中进行过滤输入，`TreeSelect` 提供了两种方式（都需要先开启 `panel-filterable`)：

1. 内置的输入面板：开启 `use-build-in-panel-filter` 即可
2. 使用自定义插槽：通过 `slots.panelHeaderRender` 插槽放置你的输入框，然后通过 `panel-filter-input-value` 传入过滤的内容

:::demo ./demos/filter-in-panel.vue :::

### 过滤并处理高亮
默认高亮色为品牌色，如果希望对搜索结果处理，则可以通过 `highlightMethod` 来处理

注意防止 `xss` 攻击
:::demo ./demos/highlight-filter.vue :::

### 动态加载
如果某个节点的子节点需要使用动态加载时，需要给该节点的 `isLeaf` 属性设置成 `false`
:::demo ./demos/dynamic-load.vue :::

### 自定义节点
可以通过 `treeNodeRender` 插槽自定义节点渲染

也可以在传入 `tree-data` 时，`label` 设置为 `((option: NTreeData) => VNode)` 类型用来自定义某个固定节点，此时优先级高于 `treeNodeRender` 插槽

:::demo ./demos/custom-render.vue :::

### 字段映射
使用 `field-map` 来自定义映射的字段

在此示例中，`label` 使用 `text`，`value` 使用 `key`，`children` 使用 `items`

**注意：禁止新定义的映射覆盖原有含义的字段，例如不可以把 `value` 作为 `label` 的字段映射，否则会出错**

对于 `ts` 类型报错的问题，可以在全局 `declare NTreeExtendsData` 类型解决（以下方 `demo` 中使用字段为例）：

```ts
import type { NTreeExtendsData } from '@nio-fe/lego';

declare module '@nio-fe/lego' {
  interface NTreeExtendsData {
    key?: string;
    text?: string;
    items?: NTreeExtendsData[];
  }
}
```

:::demo ./demos/field-map.vue :::

### 虚拟滚动
在大数据量的情况下，节点过多会导致性能变差，所以可以使用虚拟滚动的能力

需配置 `use-virtual-scroll = true`， 且 `height` 或 `max-height` 任意一个即可启用虚拟滚动

:::demo ./demos/virtual-scroll.vue :::

### 不可选择
传入 `options` 时，可以设定 `selectable = false`，即可不允许选择该项（但展开不受限）

和 `disabled` 不同的是，该配置只会影响自身与用户的交互，且会受父子级的勾选状态影响从而展示不同状态

如果启用了单选，则最好搭配 `show-radio = true`，否则在展示形式上无法看出区别
:::demo ./demos/selectable.vue :::

### 通用 Tree 类型定义
:::code ../../../../lego/src/utils/useTree/types.ts :::

### 组件 Tree 类型定义
:::code ../../../../lego/src/components/Tree/src/utils/types.ts :::

### 组件 TreeSelect 类型定义
:::code ../../../../lego/src/components/TreeSelect/src/utils/types.ts :::