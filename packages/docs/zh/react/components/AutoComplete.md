# AutoComplete 自动补全

AutoComplete 在保留自由输入能力的同时提供文字建议，支持受控状态、异步选项、键盘导航、自定义选项内容和 Portal 面板。

## 基础用法

:::react-demo react/components/AutoComplete/basic.tsx :::

## 受控状态

当应用需要同时管理输入值和面板状态时，使用 `value` 与 `open`。

:::react-demo react/components/AutoComplete/controlled.tsx :::

## 自定义内容

:::react-demo react/components/AutoComplete/custom.tsx :::

## 键盘与无障碍

输入框使用 `role="combobox"` 并关联 `role="listbox"`。方向键移动高亮建议，`Enter` 选择，`Escape` 关闭面板；当前建议通过 `aria-activedescendant` 通知辅助技术。

## Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | `string \| null` | — | 受控输入值 |
| `defaultValue` | `string` | `''` | 非受控初始值 |
| `open` | `boolean` | — | 受控面板状态 |
| `defaultOpen` | `boolean` | `false` | 非受控面板初始状态 |
| `options` | `AutoCompleteOptionData[]` | `[]` | 建议项 |
| `disabled` | `boolean` | `false` | 禁止交互 |
| `clearable` | `boolean` | `false` | 显示清空按钮 |
| `trigger` | `'click' \| 'hover'` | `'click'` | 面板触发方式 |
| `inputEmitFrequency` | `number` | `200` | 输入值和搜索回调的防抖毫秒数 |
| `selectedOptionOrderToTop` | `boolean` | `false` | 打开时将当前建议置顶 |
| `loading` | `boolean` | `false` | 显示加载状态 |
| `emptyContent` | `ReactNode` | Provider 字典 | 空状态内容 |
| `loadingContent` | `ReactNode` | Provider 字典 | 加载状态内容 |
| `panelHeader` | `ReactNode` | — | 面板头部 |
| `panelFooter` | `ReactNode` | — | 面板底部 |
| `renderOption` | `(option, state) => ReactNode` | — | 自定义建议项内容 |
| `portal` | `boolean` | `true` | 通过 Portal 渲染面板 |
| `portalContainer` | `PortalTarget` | `'body'` | Portal 目标容器 |

## Callbacks

| 回调 | 类型 | 说明 |
| --- | --- | --- |
| `onValueChange` | `(value) => void` | 防抖提交输入值后调用 |
| `onSearch` | `(value) => void` | 提交可搜索输入值后调用 |
| `onOpenChange` | `(open, details) => void` | 请求改变面板状态时调用 |
| `onChange` | `(value, details) => void` | 建议项改变输入值时调用 |
| `onSelect` | `(value, details) => void` | 选中建议项时调用 |
| `onClear` | `() => void` | 清空后调用 |

## Ref

`ref` 暴露 `input`、`focus()`、`blur()`、`open()`、`close()`、`clear()` 和 `updatePosition()`。
