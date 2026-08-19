# Checkbox 多选框

Checkbox 用于选择零个或多个相互独立的选项。需要共享数组值时使用 `CheckboxGroup`，需要紧凑按钮外观时使用 `CheckboxButton`。

```tsx
import { Checkbox, CheckboxButton, CheckboxGroup } from '@aurora/horizon-react';
import '@aurora/horizon-react/style.css';
```

:::react-demo react/components/Checkbox/basic.tsx :::

## Checkbox 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` / `defaultValue` | `CheckboxValue` | — / `false` | 受控值与非受控初始值 |
| `optionValue` | `string \| number \| boolean` | `''` | 组内选项所代表的值 |
| `trueValue` / `falseValue` | `ChoiceValue` | — | 标量模式下的选中值与未选中值 |
| `disabled` / `readOnly` | `boolean` | `false` | 禁止交互或只展示已选标签 |
| `bordered` / `indeterminate` | `boolean` | `false` | 边框与不确定状态 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 边框或按钮尺寸 |
| `fill` | `string` | `''` | 按钮填充色 |
| `children` | `ReactNode \| (context) => ReactNode` | 选项值 | 标签内容；上下文包含 `checked` 和 `value` |
| `onChange` | `(value, details) => void` | — | 值变化回调，同时提供选中状态和选项值 |
| `onBlur` / `onClick` | 原生事件回调 | — | 原生输入事件 |

`CheckboxButton` 接受相同的值、状态、尺寸、填充色、回调与标签属性。ref 提供 `focus()`、`toggle()` 和原生 `input`。

## CheckboxGroup 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` / `defaultValue` | `readonly ChoiceValue[]` | — / `[]` | 受控值数组与非受控初始数组 |
| `disabled` / `readOnly` | `boolean` | `false` | 由所有子项继承的状态 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 由所有子项继承的尺寸 |
| `onChange` | `(values) => void` | — | 组值变化回调 |
| `onBlur` | 原生事件回调 | — | 子项失焦时触发 |
