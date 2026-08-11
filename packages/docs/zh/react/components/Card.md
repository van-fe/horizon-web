# Card 卡片

Card 用于承载一组相关内容和操作，可配置标题、头尾内容、分割线、边框和圆角。

## 基础用法

```tsx
import { Card } from '@aurora/horizon-web-react';
import '@aurora/horizon-web-react/style.css';
```

:::react-demo react/components/Card/basic.tsx :::

## Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `title` | `string` | `''` | 默认标题；存在时优先展示 |
| `topDivider` | `boolean` | `false` | 显示头部下方分割线 |
| `bottomDivider` | `boolean` | `false` | 显示底部上方分割线 |
| `radius` | `'small' \| 'medium' \| 'large' \| 'none'` | `'medium'` | 圆角尺寸 |
| `border` | `boolean` | `true` | 显示边框 |
| `header` | `ReactNode` | — | 自定义头部内容 |
| `footer` | `ReactNode` | — | 底部内容 |
| `children` | `ReactNode` | — | 卡片主体内容 |

组件接受适用的原生 `section` 属性，`ref` 指向根 `HTMLElement`。
