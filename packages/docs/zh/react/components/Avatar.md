# Avatar 头像

Avatar 用于展示人物、团队或对象的身份图像，也支持文字缩写和自定义内容。

## 基础用法

```tsx
import { Avatar } from '@aurora/horizon-web-react';
import '@aurora/horizon-web-react/style.css';
```

:::react-demo react/components/Avatar/basic.tsx :::

## 可访问性

图片头像应提供准确的 `alt`。装饰性头像可以使用空字符串；文字或自定义内容应提供可辨识的可访问名称。

## Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `size` | `'mini' \| 'small' \| 'smedium' \| 'medium' \| 'large' \| number` | `'medium'` | 预设或像素尺寸 |
| `src` | `string \| readonly string[]` | — | 图片地址、文字来源或最多九张组合图片 |
| `fit` | `CSSProperties['objectFit']` | `'cover'` | 图片适应方式 |
| `type` | `'normal' \| 'work'` | `'normal'` | 普通图片或文字缩写模式 |
| `fallbackSrc` | `string` | 默认头像 | 图片加载失败后的地址 |
| `randomSrc` | `readonly string[]` | `[]` | 未提供有效图片时的候选地址 |
| `alt` | `string` | `''` | 图片替代文本 |
| `icon` | `ReactNode` | — | 图标内容 |
| `fallback` | `ReactNode` | — | 图片加载失败后的内容 |
| `children` | `ReactNode` | — | 完全自定义的头像内容 |

组件接受适用的原生 `span` 属性，`ref` 指向根 `HTMLSpanElement`。

## Callbacks

| 回调 | 类型 | 说明 |
| --- | --- | --- |
| `onError` | `(event: SyntheticEvent<HTMLImageElement>) => void` | 图片加载失败时调用 |
