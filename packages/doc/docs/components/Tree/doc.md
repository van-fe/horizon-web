### 基本用法
按照 `NTreeData` 的结构，传给 `tree-data` 即可生成树结构

**注意：`tree-data` 中的 `value` 必须整棵树唯一**

:::demo ./demos/basic.vue :::

### 强调色
可以设置 `stress = true`，使已选项的字体颜色和背景设置为品牌色，更加醒目
:::demo ./demos/stress.vue :::

### 单选框与多选框
配置 `show-checkbox`（默认开启）和 `shwo-radio`（默认关闭），可以控制显示选项前的选择组件
:::demo ./demos/checkbox-and-radio.vue :::

### 前缀图标
设置 `prefix-icon`，可以设定前缀图标
:::demo ./demos/prefix-icon.vue :::

### 节点自定义前缀图标
如果不同节点有不同的前缀图标，则可以在 `tree-data` 的数据中每个节点设置 `prefix-icon` 即可，接收 `VNode` `Component` `string(icon name)` 类型
:::demo ./demos/prefix-icon-in-node.vue :::

### 父子关联
设定 `check-strictly`，可以控制是否在层级上关联勾选

对于单选，如果设置 `check-strictly = true`，则也可以选择非叶子节点

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

### 控制勾选
通过 `selected-values`，可以控制勾选的项目，也可以使用双向绑定获取勾选的值
:::demo ./demos/selected-values.vue :::

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

### 过滤
`Tree` 组件内置了过滤能力，设置 `filterable = true` 即可开启过滤功能
:::demo ./demos/filter.vue :::

### 过滤并处理高亮
默认高亮色为品牌色，如果希望对搜索结果处理，则可以通过 `highlightMethod` 来处理
:::demo ./demos/highlight-filter.vue :::

### 动态加载
如果某个节点的子节点需要使用动态加载时，需要给该节点的 `isLeaf` 属性设置成 `false`
:::demo ./demos/dynamic-load.vue :::

### 多选限制
如果希望在多选时，限制用户选择的个数，则配置 `multiple-limit` 即可
:::demo ./demos/multiple-limit.vue :::

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

### 受控模式
组件提供了非常丰富的方法，可以使用这些方法来操作树组件
:::demo ./demos/controls.vue :::

### 虚拟滚动
在大数据量的情况下，节点过多会导致性能变差，所以可以使用虚拟滚动的能力

需配置 `use-virtual-scroll = true`， 且 `height` 或 `max-height` 任意一个即可启用虚拟滚动

此处展示了 5w 条数据（因为需要处理父子层级关系，层级越多性能影响越大，这个会在后续迭代中优化计算能力）

:::demo ./demos/virtual-scroll.vue :::

### 拖拽排序
设置 `draggable = true`，即可开启拖拽排序

默认只能在鼠标按在拖拽图标上才可以拖拽，可以配置 `drag-on-handler = false`，整行都可以拖拽

如果希望拖拽时不将当前节点拖拽到叶子节点下，并生成子节点，则需要设置 `dragToLeaf = false`

可以设置 `before-drop`，以拦截拖拽结果

如果希望某些节点不允许拖拽，可以在传入的 `tree-data` 中该节点配置 `draggable: false` 即可

:::demo ./demos/draggable.vue :::

### 优化 selected-values 数据处理
在 `2.3.4(含)` 版本之前，多选情况下，如果同时给 `selected-values` 传入【非叶子节点】和其子级的【叶子节点】，则只会勾选【叶子节点】，但 `2.3.5` 的重构版没有对这个 `BUG` 进行逻辑适配

在 `2.4.6` 开始，会对之前此 `BUG` 进行逻辑适配：

1. 如果【非叶子节点】有勾选，会判断其【子级】（不包括子级以后）是否有勾选，如果有勾选则忽略【该非叶子节点】的勾选态（即 `Component` 、`Basic` 的半选状态）
2. 但如果【非叶子节点】的【子级】没有勾选，则会把其下所有子节点都勾选（即 `Data` 及其子级的勾选状态）

:::demo ./demos/optimize-selected-values.vue :::

### 不可选择
传入 `options` 时，可以设定 `selectable = false`，即可不允许选择该项（但展开不受限）

**下面是与 disabled 的对比表格（级联选择和树选择器同理）：**

<table class="md-table text-center">
    <thead>
        <tr>
            <th rowspan="2"></th>
            <th rowspan="2">设置对象</th>
            <th rowspan="2" width="120">鼠标选择对象</th>
            <th>disabled = true</th>
            <th>selectable = false</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th rowspan="9" width="120">父子节点关联</th>
            <th rowspan="3" width="80">根节点</th>
            <th width="80">当前根节点</th>
            <td>不可勾选、交互</td>
            <td>不可勾选、交互</td>
        </tr>
        <tr>
            <th width="80">子节点</th>
            <td>不可勾选、交互</td>
            <td>可以自由勾选并交互，并且可以关联勾选其后代节点状态</td>
        </tr>
        <tr>
            <th width="80">叶子节点</th>
            <td>不可勾选、交互</td>
            <td colspan="2">可以勾选并交互</td>
        </tr>
        <tr>
            <th rowspan="3" width="80">子节点</th>
            <th width="80">根节点</th>
            <td>可以勾选、交互 <br> 但不可更改其后代设置了 <code>disabled</code> 的节点状态</td>
            <td>可以勾选、交互 <br> 但不可更改其后代设置了 <code>unselectable</code> 的节点状态</td>
        </tr>
        <tr>
            <th width="80">当前子节点</th>
            <td>不可勾选、交互</td>
            <td>不可勾选、交互</td>
        </tr>
        <tr>
            <th width="80">叶子节点</th>
            <td>不可勾选、交互</td>
            <td>可以勾选并交互</td>
        </tr>
        <tr>
            <th rowspan="3" width="80">叶子节点</th>
            <th width="80">根节点</th>
            <td>可以勾选、交互 <br> 但不可更改其后代设置了 <code>disabled</code> 的节点状态</td>
            <td>可以勾选、交互 <br> 但不可更改其后代设置了 <code>unselectable</code> 的节点状态</td>
        </tr>
        <tr>
            <th width="80">子节点</th>
            <td>可以勾选、交互 <br> 但不可更改其后代设置了 <code>disabled</code> 的节点状态</td>
            <td>可以勾选、交互 <br> 但不可更改其后代设置了 <code>unselectable</code> 的节点状态</td>
        </tr>
        <tr>
            <th width="80">当前叶子节点</th>
            <td>不可勾选、交互</td>
            <td>不可勾选、交互</td>
        </tr>
        <tr>
            <th rowspan="3" width="120">父子节点不关联</th>
            <th>根节点</th>
            <td rowspan="3" colspan="3">自身不可以勾选、交互，其他节点不干扰</td>
        </tr>
        <tr>
            <th>子节点</th>
        </tr>
        <tr>
            <th>叶子结点</th>
        </tr>
    </tbody>
</table>

如果启用了单选，则最好搭配 `show-radio = true`，否则在展示形式上无法看出区别
:::demo ./demos/selectable.vue :::

### 显示连线
配置 `show-line`，可以开启节点之间的连线
:::demo ./demos/show-line.vue :::


### 滚动到目标节点
通过 `scrollTo` 方法，可以滚动到设定的节点

如果不传值，则使用 `selected-values` 的第一个值

:::demo ./demos/scroll-to.vue :::

### 通用 Tree 类型定义
:::code ../../../../lego/src/utils/useTree/types.ts :::

### 组件 Tree 类型定义
:::code ../../../../lego/src/components/Tree/src/utils/types.ts :::
