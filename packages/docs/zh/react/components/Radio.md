# Radio 单选框

Radio 用于从一组互斥选项中选择一项。使用稳定的 `name` 获得原生键盘分组行为，需要按钮外观时使用 `RadioButton`。

```tsx
import { Radio, RadioButton, RadioGroup } from '@aurora/horizon-react';
import '@aurora/horizon-react/style.css';
```

:::react-demo react/components/Radio/basic.tsx :::

## Radio 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` / `defaultValue` | `ChoiceValue` | — / `''` | 受控组值与非受控初始值 |
| `optionValue` | `ChoiceValue` | `''` | 当前选项所代表的值 |
| `disabled` / `readOnly` | `boolean` | `false` | 禁止交互或只展示已选标签 |
| `bordered` | `boolean` | `false` | 显示带边框单选框 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 边框或按钮尺寸 |
| `fill` | `string` | `''` | 按钮填充色 |
| `name` | `string` | 自动生成 | 原生单选组名称 |
| `children` | `ReactNode \| (context) => ReactNode` | 选项值 | 标签内容；上下文包含 `checked` 和 `value` |
| `onChange` | `(value) => void` | — | 选择回调 |
| `onBlur` | 原生事件回调 | — | 原生输入失焦回调 |

`RadioButton` 接受相同的值、状态、尺寸、填充色、回调与标签属性。ref 提供 `focus()` 和原生 `input`。

## RadioGroup 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` / `defaultValue` | `ChoiceValue` | — / `''` | 受控值与非受控初始值 |
| `disabled` / `readOnly` | `boolean` | `false` | 由所有子项继承的状态 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 由所有子项继承的尺寸 |
| `name` | `string` | 自动生成 | 共享的原生名称 |
| `onChange` | `(value) => void` | — | 组选择回调 |
| `onBlur` | 原生事件回调 | — | 子项失焦时触发 |
