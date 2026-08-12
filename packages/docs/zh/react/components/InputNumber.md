# InputNumber 数字输入框

InputNumber 用于编辑带边界的数值，支持精度安全的步进、格式化以及键盘和指针控制。

## 基础用法

:::react-demo react/components/InputNumber/basic.tsx :::

## 精度与格式化

需要避免 JavaScript 数字精度限制时使用 `stringMode`。`formatter` 控制展示内容，`parser` 将格式化文本转换回数值。

:::react-demo react/components/InputNumber/precision.tsx :::

## 控制按钮与内容区域

控制按钮可以位于右侧或分布在两侧。长按会连续步进，并在指针抬起、取消或组件卸载时停止。

:::react-demo react/components/InputNumber/controls.tsx :::

## Props

| Prop | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` / `defaultValue` | `number \| string \| null` | — / `null` | 受控值或初始值 |
| `min` / `max` | `number \| string` | `-Infinity` / `Infinity` | 数值边界 |
| `step` | `number` | `1` | 步长 |
| `stepStrictly` | `boolean` | `false` | 将值约束到步长倍数 |
| `precision` | `number` | — | 小数位数 |
| `stringMode` | `boolean` | `false` | 使用字符串输出高精度值 |
| `variant` | `'normal' \| 'emphasize' \| 'no-border'` | `'normal'` | 视觉样式 |
| `controls` | `boolean` | `true` | 展示步进按钮 |
| `controlsPosition` | `'right' \| 'between'` | `'right'` | 步进按钮位置 |
| `longPress` | `boolean` | `false` | 长按连续步进 |
| `longPressInterval` | `number` | `200` | 重复间隔，单位毫秒 |
| `formatter` / `parser` | 函数 | — | 格式化展示与解析输入 |
| `clearable` | `boolean` | `false` | 展示清空按钮 |
| `disabled` / `readOnly` | `boolean` | `false` | 交互状态 |
| `prefix` / `suffix` | `ReactNode` | — | 输入框内部前后内容 |
| `prepend` / `append` | `ReactNode` | — | 输入框外部前后内容 |

## 回调与 ref

每次模型更新都会调用 `onValueChange(value)`；输入过程中调用 `onInput(value)`；失焦、步进或清空确认不同值时调用 `onChange(value)`。组件也支持原生聚焦、失焦、键盘和滚轮回调。

ref 提供 `input`、`focus()`、`blur()`、`increase()`、`decrease()` 和 `clear()`。

InputNumber 会消费 FormItem 的禁用、错误、标签、描述和校验触发状态。步进控件使用真实按钮，输入框提供 spinbutton 数值语义。
