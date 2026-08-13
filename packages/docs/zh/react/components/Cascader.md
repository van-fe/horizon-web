# Cascader 级联选择器

Cascader 用于从层级数据中选择一条或多条路径。逐级面板可以紧凑呈现深层结构，同时支持筛选、暂存确认、自定义渲染和动态加载等复杂选择流程。

## 逐级选择

通过嵌套的 `children` 组织选项；选择叶子节点时会提交完整值路径。

:::react-demo react/components/Cascader/basic.tsx :::

## 多选与确认

`multiple` 会返回值路径数组。当用户需要先检查草稿再提交时，配合 `needConfirm` 使用；`multipleLimit` 可以限制可选路径数量。

:::react-demo react/components/Cascader/multiple.tsx :::

## 筛选与自定义渲染

`filterable` 会将触发器变为搜索输入框。选项标签不是纯文本时，可通过 `stringLabel` 提供搜索文字，并使用 `renderOption` 与 `renderValue` 丰富呈现内容。

:::react-demo react/components/Cascader/filter.tsx :::

## 受控动态加载

使用 `isLeaf: false` 标记尚未加载的分支。展开该分支时会调用 `loadChildren`，`onOptionsChange` 会返回更新后的选项树。应用也可以同时控制 `value` 与 `open`。

:::react-demo react/components/Cascader/dynamic.tsx :::

## 值与选项模型

单选值是一条路径，例如 `['asia', 'china', 'shanghai']`；多选值是路径数组，例如 `[['product', 'releases'], ['operations', 'incidents']]`。没有选中值时可使用 `null` 或 `undefined`。

每个 `CascaderOption` 必须提供 `value` 和 `label`，还可定义 `children`、`stringLabel`、`disabled`、`isLeaf`、`groupLabel`、`selectable` 以及业务自定义字段。适配已有数据时，可以通过 `fieldMap` 将这些语义字段映射到其他属性名。

## Props

### 选择与数据

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | `CascaderModelValue` | — | 受控选中路径或路径数组 |
| `defaultValue` | `CascaderModelValue` | — | 非受控初始选中值 |
| `options` | `readonly CascaderOption[]` | 必填 | 层级选项树 |
| `multiple` | `boolean` | `false` | 启用多选 |
| `multipleLimit` | `number` | `Infinity` | 多选模式下的最大路径数量 |
| `checkStrictly` | `boolean` | `false` | 允许分支节点与其后代独立选择 |
| `expandStrictly` | `boolean` | `true` | 严格选择分支后阻止自动展开 |
| `showCheckedStrategy` | `'fullPath' \| 'leaf'` | `'fullPath'` | 控制选中路径的展示文字 |
| `pathSeparator` | `string` | `'/'` | 展示路径标签之间的分隔符 |
| `needConfirm` | `boolean` | `false` | 确认前将选择保持为草稿 |
| `fieldMap` | `CascaderFieldMap` | — | 将选项语义字段映射到数据源属性 |

### 交互与搜索

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `open` | `boolean` | — | 受控面板状态 |
| `defaultOpen` | `boolean` | `false` | 非受控面板初始状态 |
| `trigger` | `'click' \| 'hover' \| 'never'` | `'click'` | 面板触发方式 |
| `expandTrigger` | `'click' \| 'hover'` | `'click'` | 分支展开方式 |
| `disabled` | `boolean` | `false` | 禁止全部交互 |
| `clearable` | `boolean` | `false` | 非空值时显示清空操作 |
| `filterable` | `boolean` | `false` | 启用内置文本筛选 |
| `filter` | `boolean \| CascaderSearchParams` | `false` | 启用筛选，或配置筛选、排序与结果限制 |
| `filterMethod` | `CascaderFilterFunction` | — | 自定义路径匹配函数 |
| `filterMaxResult` | `number` | `50` | 最大搜索结果数量 |
| `filterResultSort` | `CascaderFilterSortFunction` | — | 对筛选后的规范化选项排序 |
| `reserveKeyword` | `boolean \| 'reserve-deselect'` | `true` | 筛选多选时的关键词保留策略 |
| `loadChildren` | `(option) => CascaderOption[] \| PromiseLike<CascaderOption[]>` | — | 展开未加载分支时获取子选项 |

### 触发器、面板与内容

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `placeholder` | `string` | Provider 值 | 触发器占位文字 |
| `inputStatus` | `'normal' \| 'error' \| 'warning' \| 'success'` | `'normal'` | 触发器校验状态 |
| `inputStyle` | `'normal' \| 'emphasize' \| 'no-border'` | `'normal'` | 触发器视觉样式 |
| `inputProps` | `Omit<InputHTMLAttributes<HTMLInputElement>, 'value' \| 'onChange' \| 'onClick'>` | — | 传入 `name`、`aria-label`、`data-*` 等原生输入框属性；受控值和内部事件仍由 Cascader 管理 |
| `size` | `'small' \| 'medium' \| 'large'` | Provider 值 | 触发器尺寸 |
| `placement` | `PopoverPlacement` | `'bottom-start'` | 首选面板位置 |
| `portal` | `boolean` | `true` | 通过 Portal 渲染面板 |
| `portalContainer` | `PortalTarget` | `'body'` | Portal 目标容器 |
| `fitInputWidth` | `boolean \| 'fit-content'` | `'fit-content'` | 面板宽度策略 |
| `arrow` | `boolean` | `false` | 显示面板箭头 |
| `distance` | `number` | `4` | 面板主轴间距 |
| `skidding` | `number` | — | 面板交叉轴偏移 |
| `hoverShowDelay` | `number` | `0` | hover 触发时打开面板的延迟，单位为毫秒 |
| `hoverHideDelay` | `number` | `200` | hover 触发时关闭面板的延迟，单位为毫秒 |
| `renderTrigger` | `(context) => ReactNode` | 默认输入框 | 渲染完整自定义触发器；应将 `context.triggerProps` 展开到可聚焦元素 |
| `renderOption` | `(context: CascaderRenderContext) => ReactNode` | 选项标签 | 根据规范化状态渲染每个选项 |
| `renderValue` | `(options, labels) => ReactNode` | 拼接标签 | 渲染触发器中的当前选择 |
| `panelHeader` | `ReactNode` | — | 面板头部内容 |
| `panelFooter` | `ReactNode` | — | 面板底部内容 |
| `emptyContent` | `ReactNode` | Provider 值 | 空状态内容 |
| `confirmText` | `string` | Provider 值 | 确认操作文字 |
| `cancelText` | `string` | Provider 值 | 取消操作文字 |
| `confirmButtonProps` | `ButtonProps` | — | 确认按钮属性 |
| `cancelButtonProps` | `ButtonProps` | — | 取消按钮属性 |
| `panelClassName` | `string` | — | 面板类名 |
| `panelStyle` | `CSSProperties` | — | 面板行内样式 |
| `className` | `string` | — | 根元素类名 |
| `style` | `CSSProperties` | — | 根元素行内样式 |

## Callbacks

| 回调 | 类型 | 说明 |
| --- | --- | --- |
| `onValueChange` | `(value: CascaderModelValue) => void` | 已提交选择变化时调用 |
| `onOpenChange` | `(open, details) => void` | 请求改变面板状态时调用，`details.reason` 描述交互原因 |
| `onChange` | `(selected, option, result) => void` | 单个选项的选择状态变化后调用 |
| `onSelect` | `(path, option) => void` | 选中选项后调用 |
| `onDeselect` | `(path, option) => void` | 取消选中选项后调用 |
| `onSearch` | `(value: string) => void` | 搜索文字变化后调用 |
| `onOptionsChange` | `(options: readonly CascaderOption[]) => void` | 动态子节点加载后返回选项树 |
| `onLoadError` | `(error, option) => void` | 动态加载失败时调用 |
| `onConfirm` | `(value, event?) => void` | 确认暂存选择后调用 |
| `onCancel` | `(value, event?) => void` | 取消暂存选择后调用 |
| `onClear` | `() => void` | 清空选择后调用 |

## Ref

`CascaderHandle` ref 暴露以下成员：

| 成员 | 类型 | 说明 |
| --- | --- | --- |
| `input` | `HTMLInputElement \| null` | 当前默认触发器输入框 |
| `popup` | `HTMLDivElement \| null` | 当前面板元素 |
| `focus()` / `blur()` | `() => void` | 将焦点移入或移出触发器 |
| `open()` / `close()` | `() => void` | 请求改变面板显隐 |
| `clear()` | `() => void` | 清空选择 |
| `confirm()` / `cancel()` | `() => void` | 提交或放弃暂存选择 |
| `focusOption(path)` | `(path: CascaderValuePath) => void` | 将已知选项设为键盘活动项 |
| `updatePosition()` | `() => Promise<void>` | 重新计算面板位置 |

## Provider

`HorizonWebProvider` 接受包含 `placeholder`、`empty` 和 `level` 字段的 `cascaderLabels`。确认区文字来自 `pickerLabels`，清空操作文字使用 `selectLabels.clear`。单个实例上的 `placeholder`、`emptyContent`、`confirmText` 和 `cancelText` 会覆盖 Provider 默认值。

## 无障碍

默认触发器是与层级 `tree` 关联的 combobox。各面板是带名称的分组，选项会暴露层级、选中或勾选状态、展开状态和禁用状态。`ArrowUp` 与 `ArrowDown` 在同级选项间移动，`ArrowRight` 进入分支，`ArrowLeft` 返回父级，`Home` 与 `End` 在当前层级跳转，`Enter` 激活选项，`Escape` 关闭面板并将焦点返回触发器。使用 `renderTrigger` 时，应将 `triggerProps` 展开到唯一的可聚焦元素上，以保留这些关联与键盘交互。
