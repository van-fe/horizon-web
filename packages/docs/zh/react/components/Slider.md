# Slider 滑块

Slider 用于从连续或离散区间中选择单值或范围。每个可交互滑块都应提供无障碍名称。

```tsx
import { Slider } from '@aurora/horizon-react';
import '@aurora/horizon-react/style.css';
```

:::react-demo react/components/Slider/basic.tsx :::

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` / `defaultValue` | `number \| readonly [number, number]` | — / `0` | 受控值和非受控初始值 |
| `min` / `max` | `number` | `0` / `100` | 数值边界 |
| `step` | `number` | `1` | 调整步长 |
| `range` | `boolean` | `false` | 启用双游标范围选择 |
| `disabled` | `boolean` | `false` | 禁用交互 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 滑块尺寸 |
| `tone` | `'primary' \| 'info' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | 语义色 |
| `color` | `string` | — | 自定义进度颜色 |
| `trackClickable` | `boolean` | `true` | 允许点击轨道更新值 |
| `keyboard` | `boolean` | `true` | 启用方向键、Home 和 End 键 |
| `showSeparators` | `boolean` | `false` | 显示步长刻度 |
| `showInput` | `boolean` | `false` | 在单值模式下显示数字输入框 |
| `inputProps` | `InputHTMLAttributes<HTMLInputElement>` | — | 原生数字输入属性 |
| `showTooltip` | `boolean` | `true` | 显示当前游标值 |
| `tooltipPlacement` | `SliderTooltipPlacement` | `'top'` | 提示位置 |
| `formatTooltip` | `(value: number) => string` | — | 格式化提示内容 |
| `onChange` | `(value: SliderValue) => void` | — | 值变化回调 |
| `onFocus` / `onBlur` | `(event: FocusEvent) => void` | — | 游标聚焦回调 |

ref 提供 `focus()`。
