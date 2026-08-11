# Space 间距

Space 使用统一间距排列一组内容，支持水平、垂直、换行和分隔符布局。

## 基础用法

```tsx
import { Space, SpaceItem } from '@aurora/horizon-web-react';
import '@aurora/horizon-web-react/style.css';
```

:::react-demo react/components/Space/basic.tsx :::

## Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `size` | `'small' \| 'medium' \| 'large' \| number \| string \| [number \| string, number \| string]` | `'medium'` | 预设或自定义间距 |
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | 排列方向 |
| `align` | `'start' \| 'end' \| 'center' \| 'baseline'` | 水平时为 `'center'` | 交叉轴对齐 |
| `wrap` | `boolean` | `false` | 水平排列时允许换行 |
| `block` | `boolean` | `false` | 使用块级宽度 |
| `separator` | `boolean \| ReactNode` | `false` | 使用默认分割线或自定义分隔内容 |
| `children` | `ReactNode` | — | 被排列的内容 |

`SpaceItem` 可为单个项目附加原生 `div` 属性。两个组件的 `ref` 均指向对应的 `HTMLDivElement`。
