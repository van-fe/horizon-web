# TimeSelect 时间选择

TimeSelect 根据固定间隔生成时间选项，并组合 React 原生 Select renderer。选中值始终使用 `HH:mm`，`format` 只改变标签。

## 基础用法

:::react-demo react/components/TimeSelect/basic.tsx :::

## 展示格式

:::react-demo react/components/TimeSelect/format.tsx :::

## 可选边界

:::react-demo react/components/TimeSelect/bounds.tsx :::

## Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` / `defaultValue` | `string` | — | `HH:mm` 格式的受控值或非受控初始值。 |
| `start` / `end` | `string` | `'09:00'` / `'18:00'` | 生成区间。 |
| `step` | `string` | `'00:30'` | 大于零的选项间隔。 |
| `includeEndTime` | `boolean` | `false` | 是否包含对齐或未对齐的结束选项。 |
| `minTime` / `maxTime` | `string` | — | 闭区间可选边界，区间外选项保持可见但禁用。 |
| `format` | `string` | `'HH:mm'` | Day.js 标签格式。 |
| `editable` | `boolean` | `true` | 是否允许输入筛选。 |
| `disabled` / `clearable` | `boolean` | `false` / `true` | 交互状态。 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Select 尺寸。 |
| `placeholder` | `string` | Provider 文本 | 输入占位文字。 |
| `placement` | `WebPlacement` | `'bottom-start'` | 面板位置。 |
| `portal` / `portalContainer` | `boolean` / `PortalTarget` | `true` / `'body'` | Portal 行为。 |
| `emptyContent` / `panelHeader` / `panelFooter` | `ReactNode` | — | 面板内容区域。 |
| `renderOption` | `(option, state) => ReactNode` | — | 自定义时间选项。 |
| `name` / `required` / `invalid` | 原生/表单属性 | — | 表单集成。 |

## Callbacks 与 Ref

`onChange(value)` 返回规范化的 `HH:mm` 值；`onOpenChange`、`onFocus` 和 `onBlur` 提供面板与焦点状态。

`TimeSelectHandle` 暴露 `focus()`、`blur()`、`clear()`、`open()`、`close()` 和 `updatePosition()`。
