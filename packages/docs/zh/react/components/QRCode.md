# QRCode 二维码

QRCode 生成可配置的 SVG 二维码，并提供加载、中央图标、失效和刷新状态。

```tsx
import { QRCode } from '@aurora/horizon-web-react';
import '@aurora/horizon-web-react/style.css';
```

## 基础用法

:::react-demo react/components/QRCode/basic.tsx :::

## 视觉配置

:::react-demo react/components/QRCode/custom.tsx :::

## 失效状态

:::react-demo react/components/QRCode/expired.tsx :::

当编码内容敏感或不适合作为可访问名称时，请传入 `ariaLabel`。`onRefresh` 只报告刷新操作，业务需要更新 `expired` 才会展示新的二维码。

## Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | `string` | — | 编码内容 |
| `size` | `number` | `160` | 像素边长 |
| `level` | `'L' \| 'M' \| 'Q' \| 'H'` | `'M'` | 纠错等级 |
| `color` | `string` | `'#000000'` | 前景色 |
| `background` | `string` | `'#ffffff'` | 背景色 |
| `margin` | `number` | `1` | 静区模块数量 |
| `icon` | `string` | — | 中央图标地址 |
| `iconSize` | `number` | `32` | 中央图标尺寸 |
| `expired` | `boolean` | `false` | 显示失效遮罩 |
| `expiredText` | `string` | Provider 文案 | 失效提示 |
| `ariaLabel` | `string` | Provider 文案 | 可访问名称 |
| `expiredContent` | `ReactNode` | — | 自定义失效遮罩 |

## Callbacks

| 回调 | 签名 | 说明 |
| --- | --- | --- |
| `onRefresh` | `(event: MouseEvent<HTMLElement>) => void` | 请求刷新二维码 |
| `onError` | `(error: unknown) => void` | SVG 生成失败 |

转发的 ref 指向根 `HTMLDivElement`。

可通过 `HorizonWebProvider.qrCodeLabels` 定制二维码可访问名称以及默认失效、刷新文案。
