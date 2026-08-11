# Skeleton 骨架屏

Skeleton 在内容加载期间展示结构占位，并在完成后替换为真实内容。

## 基础用法

```tsx
import { Skeleton, SkeletonItem } from '@aurora/horizon-web-react';
import '@aurora/horizon-web-react/style.css';
```

:::react-demo react/components/Skeleton/basic.tsx :::

加载状态通过根节点的 `aria-busy` 表达；占位内容为装饰性元素。

## Skeleton Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `loading` | `boolean` | `true` | 显示骨架占位 |
| `animated` | `boolean` | `true` | 播放加载动画 |
| `placeholder` | `ReactNode` | 默认三行文本骨架 | 自定义占位内容 |
| `children` | `ReactNode` | — | 加载完成后的内容 |

## SkeletonItem Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `shape` | `'avatar' \| 'text' \| 'operate' \| 'image' \| 'picture'` | `'text'` | 占位形状 |

两个组件均接受适用的原生 `div` 属性，并将 `ref` 指向根 `HTMLDivElement`。
