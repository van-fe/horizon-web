# Typography 排版

Typography 统一展示标题、正文和辅助文本，并提供省略、复制与编辑能力。

## 基础用法

```tsx
import { Typography } from '@aurora/horizon-web-react';
import '@aurora/horizon-web-react/style.css';
```

:::react-demo react/components/Typography/basic.tsx :::

## Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | `string` | — | 受控文本 |
| `defaultValue` | `string` | `''` | 非受控初始文本 |
| `tag` | `string` | `'span'` | 渲染标签 |
| `level` | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | — | 标题级别 |
| `variant` | `'default' \| 'secondary' \| 'success' \| 'warning' \| 'danger'` | `'default'` | 语义类型 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 文本尺寸 |
| `weight` | `'regular' \| 'medium' \| 'semibold' \| 'bold'` | `'regular'` | 字重 |
| `block` / `italic` / `underline` / `deleted` / `code` | `boolean` | `false` | 文本样式 |
| `ellipsis` | `boolean \| number` | `false` | 单行或指定行数省略 |
| `copyable` | `boolean` | `false` | 显示复制操作 |
| `editable` | `boolean` | `false` | 允许编辑 |
| `disabled` | `boolean` | `false` | 禁用操作 |
| `prefix` / `suffix` / `children` | `ReactNode` | — | 文本区域内容 |

## Callbacks 与 ref

| API | 类型 | 说明 |
| --- | --- | --- |
| `onValueChange` | `(value: string) => void` | 文本值变化 |
| `onChange` | `(value: string) => void` | 编辑提交 |
| `onCopy` | `(value: string, success: boolean) => void` | 复制结果 |
| `ref.edit()` | `() => void` | 进入编辑状态 |
| `ref.cancelEdit()` | `() => void` | 取消编辑 |
| `ref.copy()` | `() => Promise<boolean>` | 复制当前文本 |
