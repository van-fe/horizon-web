# Progress 进度

Progress 展示任务的完成程度，支持线形、圆形和仪表盘形式。

## 基础用法

```tsx
import { Progress } from '@aurora/horizon-react';
import '@aurora/horizon-react/style.css';
```

:::react-demo react/components/Progress/basic.tsx :::

组件根节点具有 `progressbar` 角色，并提供当前值、范围和文本描述。

## Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `percentage` | `number` | — | 当前百分比，范围为 0 到 100 |
| `type` | `'line' \| 'circle' \| 'dashboard'` | `'line'` | 进度类型 |
| `status` | `'' \| 'success' \| 'warning' \| 'exception' \| 'error'` | `''` | 状态 |
| `size` | `'mini' \| 'small' \| 'medium' \| 'large'` | `'medium'` | 尺寸 |
| `duration` | `number` | `3` | 动画时长（秒） |
| `format` | `(percentage: number) => string` | 百分比文本 | 文本格式化函数 |
| `content` | `string \| number \| boolean` | `''` | 固定文本内容 |
| `placement` | `'' \| 'follow'` | `''` | 线形文本位置 |
| `textBold` | `boolean` | `false` | 文本加粗 |
| `showText` | `boolean` | `true` | 显示文本 |
| `color` | `string \| readonly (string \| ProgressColorStop)[] \| ProgressColorResolver` | `''` | 自定义颜色 |
| `children` | `ReactNode` | — | 自定义可视文本 |
