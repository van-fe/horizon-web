# TreeSelect 树形选择器

TreeSelect 用于从浮层树中选择一个或多个层级值，支持受控与非受控状态、文本筛选、暂存确认、动态分支、字段映射、自定义渲染，以及与 Tree 一致的键盘导航。

## 基础选择与 ref

使用 `treeData` 传入受控数据，或通过 `defaultTreeData` 提供非受控初始数据。`TreeSelectHandle` ref 可以聚焦、打开、清空选择、读取选中节点并调用树命令。

:::react-demo react/components/TreeSelect/basic.tsx :::

## 多选与筛选

配合 `multiple` 和 `showCheckbox` 开启多选。`filterable` 在触发器中搜索层级；`collapseTags`、`maxCollapseTags` 与 `collapseTagsTooltip` 可保持长选择结果紧凑易读。

:::react-demo react/components/TreeSelect/multiple-filter.tsx :::

## 受控确认

启用 `needConfirm` 后，树交互先更新草稿；确认时通过 `onValueChange` 提交，取消时恢复已提交值。应用可以同时控制 `value` 与 `open`。

:::react-demo react/components/TreeSelect/controlled-confirm.tsx :::

## 字段映射、动态加载与渲染

`fieldMap` 可将已有数据字段适配为树模型。未加载分支设置 `isLeaf: false` 并提供 `dynamicLoad`；`onTreeDataChange` 接收不可变更新后的数据。`renderNode` 可读取规范化节点状态，不需要改写源对象。

:::react-demo react/components/TreeSelect/field-map-dynamic.tsx :::

## 值与选项模型

单选值为 `TreeValue`（`string` 或 `number`），多选值为 `TreeValue[]`；`null` 或 `undefined` 表示未选择。整棵树解析后的每个值都必须唯一。

`TreeSelectOption` 提供 `value`、`label`、可选的 `children`、`disabled`、`selectable`、`isLeaf` 等树字段。业务字段可以保留在源对象上，并在渲染函数中通过 `originOption` 读取。

## Props

### 值、面板与筛选

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` / `defaultValue` | `TreeSelectModelValue` | — | 受控值或非受控初始值。 |
| `initialValue` | `TreeSelectModelValue` | `[]` | 清空时提交的回退值。 |
| `open` / `defaultOpen` | `boolean` | — / `false` | 受控面板状态或非受控初始状态。 |
| `filterValue` / `defaultFilterValue` | `string` | — / `''` | 受控筛选文字或非受控初始文字。 |
| `trigger` | `'click' \| 'hover' \| 'never'` | `'click'` | 面板触发方式。 |
| `disabled` | `boolean` | `false` | 禁用触发器与树交互。 |
| `clearable` | `boolean` | `false` | 非空选择时显示清空操作。 |
| `filterable` | `boolean` | `false` | 允许在触发器中搜索。 |
| `filterMethod` | `TreeFilterMethod` | 默认标签匹配 | 匹配规范化树节点。 |
| `filterToHideChildren` | `boolean` | `true` | 筛选时隐藏不匹配的子节点。 |
| `expandFilteredTree` | `boolean` | `true` | 展开包含匹配项的分支。 |
| `reserveKeyword` | `boolean \| 'reserve-deselect' \| 'reserve-special'` | `true` | 选择后保留或清空触发器关键词。 |
| `panelFilterable` | `boolean` | `false` | 在面板内显示独立筛选输入框。 |
| `panelInputPlaceholder` | `string` | Provider 值 | 面板筛选输入框占位文字。 |

### 树数据、展开与选择

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `treeData` / `defaultTreeData` | `readonly TreeSelectOption[]` | — / `[]` | 受控数据或非受控初始数据。 |
| `fieldMap` | `TreeFieldMap` | — | 将树语义字段映射到数据源字段。 |
| `expandValues` / `defaultExpandedValues` | `readonly TreeValue[]` | — | 受控展开值或非受控初始展开值。 |
| `isDefaultExpandAll` | `boolean` | `false` | 默认展开全部初始分支。 |
| `isDefaultExpandParent` | `boolean` | `true` | 解析初始展开值时包含祖先。 |
| `expandOnClickNode` | `boolean` | `true` | 点击分支整行时切换展开。 |
| `multiple` | `boolean` | `false` | 开启多选。 |
| `multipleLimit` | `number` | `Infinity` | 多选最大值数量。 |
| `checkStrictly` | `boolean` | `false` | 让父子节点独立选择。 |
| `checkOnClickNode` | `boolean` | `false` | 点击分支整行时选择。 |
| `checkOnClickLeaf` | `boolean` | `true` | 点击叶子整行时选择。 |
| `showCheckbox` / `showRadio` | `boolean` | `true` / `false` | 显示明确的多选或单选控件。 |
| `parentEffectDisabledChild` | `boolean` | `false` | 允许父节点选择影响禁用后代。 |
| `stress` | `boolean` | `false` | 强调选中的节点行。 |
| `dynamicLoad` | `TreeDynamicLoader` | — | 展开 `isLeaf: false` 分支时加载子节点。 |

### 触发器、标签与浮层

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `placeholder` | `string` | Provider 值 | 触发器占位文字。 |
| `size` / `treeSize` | `ChoiceSize` / `TreeSize` | Provider 值 | 触发器与树节点行尺寸。 |
| `inputVariant` | `'normal' \| 'emphasize' \| 'no-border'` | `'normal'` | 触发器视觉变体。 |
| `inputStatus` | `'normal' \| 'error' \| 'warning' \| 'success'` | `'normal'` | 触发器校验状态。 |
| `inputProps` | `Omit<InputHTMLAttributes<HTMLInputElement>, 'value' \| 'onChange' \| 'onClick'>` | — | 触发器原生输入框属性。 |
| `placement` | `PopoverPlacement` | `'bottom-start'` | 首选浮层位置。 |
| `portal` / `portalContainer` | `boolean` / `PortalTarget` | `true` / `'body'` | Portal 行为与目标容器。 |
| `distance` / `skidding` | `number` | `4` / — | 浮层主轴和交叉轴偏移。 |
| `hoverShowDelay` / `hoverHideDelay` | `number` | `0` / `200` | hover 触发延迟，单位为毫秒。 |
| `panelWidth` | `string \| number` | — | 面板行内尺寸。 |
| `fitInputWidth` | `boolean \| 'fit-content'` | `true` | 面板宽度策略。 |
| `popupClassName` / `panelStyle` | `string` / `CSSProperties` | — | 面板类名与行内样式。 |
| `collapseTags` | `boolean` | `false` | 折叠多选标签。 |
| `maxCollapseTags` | `number` | — | 摘要出现前最多展示的标签数。 |
| `collapseTagsTooltip` | `boolean` | `false` | 在原生提示中展示隐藏标签文字。 |
| `useStatistic` / `statisticText` | `boolean` / `string` | `false` / Provider 值 | 显示选择数量摘要。 |
| `needConfirm` | `boolean` | `false` | 确认前暂存选择变化。 |
| `confirmText` / `cancelText` | `string` | Provider 值 | 确认操作文字。 |
| `confirmButtonProps` / `cancelButtonProps` | `Partial<ButtonProps>` | — | 确认操作按钮属性。 |

树布局、拖拽、提示、连线、高度限制与放置拦截使用相应的 Tree 属性：`height`、`maxHeight`、`indent`、`tooltip`、`draggable`、`dragOnHandler`、`dragToLeaf`、`beforeDrop`、`draggableIcon`、`undraggableIcon`、`draggableIconAlwaysVisible` 和 `showLine`。

## Renderers

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `renderTrigger` | `(context: TreeSelectTriggerContext) => ReactNode` | 渲染完整触发器；应将 `context.triggerProps` 展开到一个可聚焦元素。 |
| `renderTag` | `(tag: TreeSelectTagData) => ReactNode` | 渲染一个选中标签。 |
| `renderSelection` | `(nodes, tags) => ReactNode` | 渲染选中值区域。 |
| `renderNode` | `(context: TreeNodeRenderContext) => ReactNode` | 渲染一行规范化树节点。 |
| `panelHeader` / `panelFooter` | `ReactNode` | 面板头部与底部内容。 |
| `emptyContent` | `ReactNode` | 空状态内容。 |

## Callbacks

| 回调 | 类型 | 说明 |
| --- | --- | --- |
| `onValueChange` | `(value: TreeSelectModelValue) => void` | 返回已提交值提案。 |
| `onOpenChange` | `(open, details) => void` | 返回面板状态提案与原因。 |
| `onFilterValueChange` | `(value: string) => void` | 返回触发器或面板筛选文字。 |
| `onExpandedValuesChange` | `(values: TreeValue[]) => void` | 返回展开值提案。 |
| `onTreeDataChange` | `(data: readonly TreeSelectOption[]) => void` | 返回加载、拖拽或命令产生的不可变数据。 |
| `onExpand` / `onSelect` | Tree 回调签名 | 单次展开或选择交互后调用。 |
| `onNodeClick` / `onNodeContextMenu` | Tree 回调签名 | 节点指针交互时调用。 |
| `onLoadError` / `onDropError` | 错误回调 | 返回动态加载或异步放置失败。 |
| `onConfirm` / `onCancel` | `(value, event?) => void` | 接受或放弃暂存会话后调用。 |
| `onClear` | `(value) => void` | 清空操作提出回退值后调用。 |

## Ref

`TreeSelectHandle` 提供 `input`、`popup`、`focus()`、`blur()`、`open()`、`close()`、`clear()`、`confirm()`、`cancel()`、`setFilterValue(value)`、`getPendingValue()` 和 `updatePosition()`。同时提供 Tree 的检查与修改命令：`getSelectedNodes()`、`getPartSelectedNodes()`、`getUnselectedNodes()`、`setSelectedStatus()`、`clearSelectedValues()`、`getExpandNodes()`、`setExpandedStatus()`、`setAllExpandedStatus()`、`getNodesByValue()`、`setNodeByValue()`、`addNodeChildrenByValue()`、`deleteNodeByValue()`、`getVisibleItems()` 和 `scrollTo()`。

## Provider 与无障碍

`HorizonWebProvider` 通过 `treeSelectLabels` 提供占位文字、空状态、树名称、选择数量和标签移除文案；确认操作文字来自 `pickerLabels`。实例属性优先于 Provider 文案。

默认输入框使用 `role="combobox"`，声明树形浮层，并通过 `aria-controls` 关联活动树。方向键可把焦点移入树并在可用节点间导航；分支展开、选择、Home、End 与 Escape 保持 Tree 和浮层的既有行为。使用 `renderTrigger` 时，应把 `triggerProps` 应用到唯一的可聚焦元素，保留所有权、键盘处理、禁用状态与焦点行为。
