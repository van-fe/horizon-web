# CommandPalette 命令面板

CommandPalette 为应用操作提供可搜索、键盘优先的入口，支持受控与非受控显示、Command/Ctrl + K、禁用命令、异步执行和自定义渲染。

## 基础用法与 Ref

:::react-demo react/components/CommandPalette/basic.tsx :::

## 异步命令

`perform` 可以返回 Promise。同一命令执行期间会忽略重复触发；执行失败时调用 `onError`，并保持面板打开。

:::react-demo react/components/CommandPalette/async.tsx :::

## 过滤与自定义渲染

:::react-demo react/components/CommandPalette/custom.tsx :::

## Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `open` / `defaultOpen` | `boolean` | — / `false` | 受控显示状态或非受控初始状态。 |
| `commands` | `readonly CommandPaletteCommand[]` | `[]` | 可用命令列表。 |
| `placeholder` | `string` | Provider 文本 | 搜索占位文字。 |
| `emptyText` | `string` | Provider 文本 | 无结果文字。 |
| `hotkey` | `boolean` | `true` | 是否启用 Command/Ctrl + K。 |
| `closeOnSelect` | `boolean` | `true` | 执行成功后是否请求关闭。 |
| `filter` | `(query, command) => boolean` | 标签/关键词匹配 | 自定义命令过滤函数。 |
| `renderCommand` | `(command, context) => ReactNode` | — | 自定义命令项；context 包含 `active` 和 `pending`。 |
| `renderEmpty` | `ReactNode \| (() => ReactNode)` | — | 自定义空状态。 |

面板内容根元素支持原生 `div` 属性。

## Callbacks

| 回调 | 签名 | 说明 |
| --- | --- | --- |
| `onOpenChange` | `(open, reason) => void` | 报告 `hotkey`、`escape`、`outside-pointer`、`select` 或 `imperative`。 |
| `onSelect` | `(command) => void` | 命令执行成功后调用。 |
| `onSearch` | `(query) => void` | 查询内容变化时调用。 |
| `onError` | `(error, command) => void` | 命令执行失败时调用。 |

## Ref 与 Provider

`CommandPaletteHandle` 暴露 `open()`、`close()`、`focus()` 和当前 `input` 元素。`HorizonWebProvider.commandPaletteLabels` 可配置对话框名称、搜索占位文字和无结果文字。
