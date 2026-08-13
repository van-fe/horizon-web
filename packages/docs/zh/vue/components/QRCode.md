# QRCode 二维码

QRCode 生成可配置的 SVG 二维码，并提供加载、中央图标、失效和刷新状态。

## 基础用法

:::demo vue/components/QRCode/basic.vue :::

当编码内容敏感或不适合作为可访问名称时，请传入 `aria-label`。`refresh` 事件只报告刷新操作，业务需要更新 `expired` 才会展示新的二维码。

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
| `expiredText` | `string` | 本地化文案 | 失效提示 |
| `ariaLabel` | `string` | 编码内容 | 可访问名称 |

## Events

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `refresh` | `MouseEvent` | 请求刷新二维码 |
| `error` | `unknown` | SVG 生成失败 |

## Slots

| 插槽 | 说明 |
| --- | --- |
| `expired` | 自定义失效遮罩 |
