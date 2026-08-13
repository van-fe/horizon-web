# Tree 树形控件

Tree 用于展示层级数据，并支持导航、选择、筛选、动态加载和拖拽排序。每个 `TreeOption` 需要唯一的 `value` 与 `label`；分支通过 `children` 表示，待加载分支可设置 `isLeaf: false`。

## 基础选择

使用 `multiple` 与 `showCheckbox` 开启父子联动多选。除非设置 `checkStrictly`，父节点的选择会包含可选择的后代节点。

:::react-demo react/components/Tree/basic.tsx :::

## 受控展开与选择

由应用管理状态时，传入 `expandValues` 和 `selectedValues`。对应回调会给出下一组建议值，因此外部操作和节点交互可以使用同一份状态。

:::react-demo react/components/Tree/controlled.tsx :::

## 筛选与动态加载

`filterable` 会显示搜索输入框。为 `isLeaf: false` 的分支提供 `dynamicLoad` 即可按需返回子节点；`onTreeDataChange` 会接收不可变更新后的树数据。

:::react-demo react/components/Tree/filter-dynamic.tsx :::

## 拖拽与自定义节点

设置 `draggable` 开启指针拖拽排序。`renderNode` 会接收当前节点的规范化状态，可在不修改源数据的前提下展示业务信息。

:::react-demo react/components/Tree/drag-render.tsx :::

## Props

### 数据、状态与筛选

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `treeData` | `readonly TreeOption[]` | — | 受控树数据。 |
| `defaultTreeData` | `readonly TreeOption[]` | `[]` | 非受控树的初始数据。 |
| `fieldMap` | `TreeFieldMap` | — | 将语义字段映射到数据源字段。 |
| `filterable` | `boolean` | `false` | 显示筛选输入框。 |
| `filterValue` / `defaultFilterValue` | `string` | `''` | 受控或非受控初始筛选文字。 |
| `filterMethod` | `TreeFilterMethod` | — | 自定义节点匹配方法。 |
| `filterToHideChildren` | `boolean` | `true` | 筛选时仅保留匹配分支中的子节点。 |
| `expandFilteredTree` | `boolean` | `true` | 展开包含筛选结果的分支。 |
| `hideFilterInput` | `boolean` | `false` | 隐藏内置筛选输入框。 |
| `filterInputProps` | `Omit<InputHTMLAttributes<HTMLInputElement>, 'disabled' \| 'onChange' \| 'placeholder' \| 'value'>` | — | 筛选输入框原生属性。 |
| `searchInputPlaceholder` | `string` | Provider 值 | 筛选输入框占位文字。 |
| `emptyText` | `string` | Provider 值 | 空结果文字。 |

### 展开与选择

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `expandValues` / `defaultExpandedValues` | `readonly TreeValue[]` | — | 受控或非受控初始展开值。 |
| `isDefaultExpandAll` | `boolean` | `false` | 初始化时展开全部分支。 |
| `isDefaultExpandParent` | `boolean` | `true` | 解析展开值时自动包含父级。 |
| `expandOnClickNode` | `boolean` | `true` | 点击分支整行时切换展开。 |
| `selectedValues` / `defaultSelectedValues` | `readonly TreeValue[]` | — | 受控或非受控初始选中值。 |
| `multiple` | `boolean` | `false` | 开启多选。 |
| `multipleLimit` | `number` | `Infinity` | 多选最大数量。 |
| `checkStrictly` | `boolean` | `false` | 让父子节点独立选择。 |
| `checkOnClickNode` | `boolean` | `false` | 点击节点整行时选择。 |
| `checkOnClickLeaf` | `boolean` | `true` | 点击叶子节点整行时选择。 |
| `showCheckbox` / `showRadio` | `boolean` | `true` / `false` | 显示复选框或单选框。 |
| `parentEffectDisabledChild` | `boolean` | `false` | 允许父节点选择影响禁用后代。 |
| `stress` | `boolean` | `false` | 强调已选择的节点行。 |

### 布局、加载与拖拽

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `size` | `TreeSize` | Provider 值 | 节点行尺寸。 |
| `disabled` | `boolean` | `false` | 禁用整棵树。 |
| `height` / `maxHeight` | `number \| string` | — | 滚动容器尺寸。 |
| `indent` | `number` | `24` | 每级缩进的像素值。 |
| `tooltip` | `boolean` | `true` | 将节点文字显示为原生提示。 |
| `tooltipShowAfter` / `tooltipHideAfter` | `number` | `100` / `200` | 共享配置保留的提示延迟值。 |
| `dynamicLoad` | `TreeDynamicLoader` | — | 加载未展开分支的子节点。 |
| `draggable` | `boolean` | `false` | 开启拖拽排序。 |
| `dragOnHandler` | `boolean` | `true` | 仅允许从拖拽手柄开始拖动。 |
| `dragToLeaf` | `boolean` | `true` | 允许把节点拖入叶子节点并成为其子节点。 |
| `beforeDrop` | `TreeBeforeDrop` | — | 放置前的同步或异步拦截方法。 |
| `draggableIcon` / `undraggableIcon` | `ReactNode` | — / `false` | 可拖动或不可拖动节点的手柄内容。 |
| `draggableIconAlwaysVisible` | `boolean` | `false` | 始终显示拖拽手柄。 |
| `showLine` | `boolean` | `false` | 显示子节点连线。 |

### 渲染与原生属性

`Tree` 还接受除冲突事件和 `children` 以外的 `HTMLAttributes<HTMLDivElement>`。可使用 `className` 和 `style` 设置根元素。

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `renderNode` | `(context: TreeNodeRenderContext) => ReactNode` | 节点标签 | 渲染节点行内容。 |
| `renderEmpty` | `ReactNode \| () => ReactNode` | — | 渲染空结果。 |

## Callbacks

| 回调 | 类型 | 说明 |
| --- | --- | --- |
| `onTreeDataChange` | `(data: readonly TreeOption[]) => void` | 返回动态加载、拖拽或 ref 命令产生的数据。 |
| `onExpandedValuesChange` | `(values: TreeValue[]) => void` | 返回请求更新后的展开值。 |
| `onSelectedValuesChange` | `(values: TreeValue[]) => void` | 返回请求更新后的选中值。 |
| `onFilterValueChange` | `(value: string) => void` | 返回筛选文字变化。 |
| `onVisibleNodesChange` | `(nodes: TreeNormalizedNode<TreeOption>[]) => void` | 返回当前可见节点顺序。 |
| `onExpand` | `(values, value, details) => void` | 分支请求展开状态变化后调用。 |
| `onSelect` | `(values, value, details) => void` | 请求选择状态变化后调用。 |
| `onNodeClick` / `onNodeContextMenu` | `(event, value, node) => void` | 节点点击或右键交互时调用。 |
| `onLoadError` | `(error, node) => void` | 动态加载失败时调用。 |
| `onDropError` | `(error) => void` | 异步放置拦截失败时调用。 |
| `onReachTop` / `onReachBottom` | `() => void` | 原生滚动抵达边界时调用。 |

## Ref

`TreeHandle` 提供 `element`、`focus(value?)`、`getSelectedNodes()`、`getPartSelectedNodes()`、`getUnselectedNodes()`、`setSelectedStatus(values, selected)`、`clearSelectedValues()`、`getExpandNodes()`、`setExpandedStatus(values, expanded)`、`setAllExpandedStatus(expanded)`、`getNodesByValue(values)`、`setNodeByValue(data, value?)`、`addNodeChildrenByValue(data, value?)`、`deleteNodeByValue(value?)`、`getVisibleItems()` 和 `scrollTo(value?)`。

## 无障碍

根元素使用 `role="tree"`，节点行使用 `role="treeitem"`，并提供层级、位置、展开、选择、勾选和禁用状态。`ArrowUp`、`ArrowDown`、`Home`、`End` 在可用节点间移动活动焦点；`ArrowRight` 展开分支或进入子节点；`ArrowLeft` 折叠分支或回到父级。`Enter` 与 `Space` 选择当前可用节点。内置搜索输入框保留正常的文本编辑键盘行为。
