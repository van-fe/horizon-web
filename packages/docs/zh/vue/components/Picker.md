# Picker 选择器基础组件

Picker 为选择类控件提供统一的触发器和浮层基础，也可组合自定义选择体验，支持可编辑值、加载与空状态、确认操作和 Portal 定位。

## 基本用法

:::demo vue/components/Picker/basic.vue :::

## Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | `string \| null` | — | 展示值 |
| `disabled` | `boolean` | `false` | 禁止交互 |
| `loading` | `boolean` | `false` | 显示加载状态 |
| `clearable` | `boolean` | `false` | 显示清空操作 |
| `trigger` | `'click' \| 'hover' \| 'never'` | `'click'` | 面板触发方式 |
| `placement` | `PopoverPlacement` | `'bottom-start'` | 首选面板位置 |
| `toBody` | `boolean` | `true` | 将面板传送到 `body` |
| `inputable` | `boolean` | `false` | 允许文字输入 |
| `inputAttrs` | `PickerNativeInputAttrs` | — | 主输入框的原生 ARIA、数据、命名与表单属性；值、状态和内部事件仍由 Picker 管理 |
| `panelInputAttrs` | `PickerNativeInputAttrs` | — | 内置面板搜索输入框的原生属性 |
| `readonly` | `boolean` | `false` | 禁止输入与打开 |
| `inputStyle` | `'normal' \| 'emphasize' \| 'no-border'` | `'normal'` | 触发器视觉变体 |
| `inputStatus` | `'normal' \| 'error' \| 'warning' \| 'success'` | `'normal'` | 输入校验状态 |
| `panelStatus` | `'normal' \| 'loading' \| 'empty'` | `'normal'` | 面板内容状态 |
| `fitInputWidth` | `boolean \| 'fit-content'` | `true` | 面板宽度策略 |
| `needConfirm` | `boolean` | `false` | 显示确认操作区 |
| `destroyOnHide` | `boolean` | `false` | 隐藏后销毁面板内容 |
| `popoverOptions` | `Partial<PopoverProps>` | — | Popover 扩展参数 |

## Events

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `update:modelValue` | `value` | 可编辑值变化 |
| `show` / `hide` | — | 面板显隐变化 |
| `focus` / `blur` | — | Picker 焦点状态变化 |
| `input` | `Event` | 文字输入变化 |
| `click` | `MouseEvent` | 点击触发器 |
| `confirm` / `cancel` | `MouseEvent?` | 使用确认操作 |
| `clear` | `MouseEvent` | 使用清空操作 |
| `keydown` | `KeyboardEvent` | 键盘交互 |
| `inputFocus` / `inputBlur` | `FocusEvent` | 内部输入框焦点变化 |

## Slots

`default` 渲染面板主体。触发器区域包括 `pickerOuter`、`picker`、`pickerContainer`、`pickerInner`、`pickerPrefix`、`pickerSuffix` 和 `pickerIcon`；面板区域包括 `panelOuter`、`panel`、`panelPrefix`、`panelSuffix`、`panelEmpty`、`panelLoading`、`panelConfirm`、`panelConfirmLeft`、`panelLeftSide` 和 `panelRightSide`。

## Exposes

组件暴露 `showPopover()`、`hidePopover()`、`focus()`、`blur()`、`forceBlur()`、`wrapperDom()`、`popoverDom()`、`handleInputFocus(event)` 和 `handleInputBlur(event)`。
