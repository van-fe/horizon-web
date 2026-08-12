# Picker 选择器基础组件

Picker 是选择类控件的组合基础，统一管理触发器、面板状态、值展示、加载与空状态、确认操作、Portal 定位和命令，同时把具体选择内容留给业务组合。

## 基础组合

:::react-demo react/components/Picker/basic.tsx :::

## 受控确认

应用需要维护草稿值，并在确认后再提交时，可以同时控制 `value` 与 `open`。

:::react-demo react/components/Picker/controlled.tsx :::

## 自定义触发器与状态

:::react-demo react/components/Picker/custom.tsx :::

## 键盘与无障碍

默认触发器使用 `role="combobox"`，通过 `aria-expanded` 报告面板状态，并用 `aria-controls` 关联面板。`Escape` 关闭面板，面板关闭时按 `ArrowDown` 或 `Enter` 可以打开。自定义触发器会获得 `triggerProps`，应将其展开到唯一可聚焦元素上，以保留相同的语义与命令能力。

## Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | `Value` | — | 受控展示值 |
| `defaultValue` | `Value` | — | 非受控初始值 |
| `open` | `boolean` | — | 受控面板状态 |
| `defaultOpen` | `boolean` | `false` | 非受控面板初始状态 |
| `disabled` | `boolean` | `false` | 禁止交互 |
| `inputable` | `boolean` | `false` | 默认触发器允许输入 |
| `readonly` | `boolean` | `false` | 禁止输入与打开 |
| `clearable` | `boolean` | `false` | 值有文字时显示清空操作 |
| `trigger` | `'click' \| 'hover' \| 'never'` | `'click'` | 面板触发方式 |
| `placement` | `PopoverPlacement` | `'bottom-start'` | 首选面板位置 |
| `portal` | `boolean` | `true` | 通过 Portal 渲染面板 |
| `portalContainer` | `PortalTarget` | `'body'` | Portal 目标容器 |
| `fitInputWidth` | `boolean \| 'fit-content'` | `true` | 面板宽度策略 |
| `inputStyle` | `'normal' \| 'emphasize' \| 'no-border'` | `'normal'` | 触发器视觉变体 |
| `inputStatus` | `'normal' \| 'error' \| 'warning' \| 'success'` | `'normal'` | 校验状态 |
| `panelStatus` | `'normal' \| 'loading' \| 'empty'` | `'normal'` | 面板内容状态 |
| `needConfirm` | `boolean` | `false` | 显示确认操作区 |
| `confirmButtonProps` | `ButtonProps` | — | 确认按钮属性 |
| `cancelButtonProps` | `ButtonProps` | — | 取消按钮属性 |
| `formatValue` | `(value) => ReactNode` | 文本转换 | 格式化触发器展示值 |
| `parseInput` | `(text) => Value` | 原样字符串 | 转换可编辑输入 |
| `renderTrigger` | `(context) => ReactNode` | 默认输入框 | 渲染完整触发器 |
| `children` | `ReactNode \| (context) => ReactNode` | — | 面板内容 |
| `panelHeader` | `ReactNode` | — | 面板头部 |
| `panelFooter` | `ReactNode` | — | 面板底部 |

## Callbacks

| 回调 | 类型 | 说明 |
| --- | --- | --- |
| `onValueChange` | `(value) => void` | 展示值变化时调用 |
| `onOpenChange` | `(open, details) => void` | 请求改变面板状态时调用 |
| `onConfirm` | `(event?) => void` | 确认关闭面板前调用 |
| `onCancel` | `(event?) => void` | 取消关闭面板前调用 |
| `onClear` | `(event?) => void` | 清空后调用 |
| `onInput` | `(event) => void` | 可编辑输入变化后调用 |
| `onFocus` / `onBlur` | `(event) => void` | 默认触发器焦点变化时调用 |
| `onKeyDown` / `onClick` | `(event) => void` | 默认触发器交互时调用 |

## Ref

`ref` 暴露 `input`、`popup`、`focus()`、`blur()`、`open()`、`close()`、`clear()` 和 `updatePosition()`。

## Provider

`HorizonWebProvider.pickerLabels` 配置默认确认与取消文案；空状态和清空文案使用 `selectLabels`，加载文案使用 `spinLabels`。
