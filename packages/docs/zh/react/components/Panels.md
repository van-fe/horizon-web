# Panels 面板切换

Panels 根据键值一次展示一个内容面板，当前选择始终由应用状态控制。

```tsx
import { Panel, Panels } from '@aurora/horizon-react';
import '@aurora/horizon-react/style.css';
```

## 受控选择

组合具名 `Panel` 子项，并由负责选择的控件更新 `value`。

:::react-demo react/components/Panels/basic.tsx :::

## 垂直动画

设置 `animated` 启用方向动画，设置 `vertical` 使用上下切换。系统偏好减少动态效果时会停用 CSS 动画。

:::react-demo react/components/Panels/vertical.tsx :::

## 禁用与窄屏内容

禁用面板不会被展示，长内容会在窄容器内自动换行。

:::react-demo react/components/Panels/disabled.tsx :::

## Panels 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | `string \| number` | — | 必填，当前面板标识 |
| `animated` | `boolean` | `false` | 切换键值时播放动画 |
| `vertical` | `boolean` | `false` | 使用垂直动画而非水平动画 |
| `panelLabelledBy` | `string` | — | 为当前 `tabpanel` 提供名称的元素 id |
| `children` | `ReactNode` | — | 组合的 `Panel` 子项 |

`Panels` 支持原生 `div` 属性，ref 指向根元素。

## Panel 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `name` | `string \| number` | — | 必填，唯一面板标识 |
| `disabled` | `boolean` | `false` | 禁用并排除该面板 |
| `children` | `ReactNode` | — | 面板内容 |

`Panel` 支持原生 `div` 属性，ref 指向内容元素。
