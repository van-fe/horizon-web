# Descriptions 描述列表

Descriptions 用于在详情页或摘要区域中成组展示只读字段。

## 基本用法

每一组标签和值使用一个 `DescriptionItem`。

:::react-demo react/components/Descriptions/basic.tsx :::

## 响应式网格

响应式属性根据组件容器宽度计算，条目也可以使用同一组断点调整跨列数。

:::react-demo react/components/Descriptions/responsive.tsx :::

## 自定义内容

需要 React 内容时，可以使用 `titleContent`、`labelContent` 和条目 children。

:::react-demo react/components/Descriptions/custom.tsx :::

## Descriptions Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `title` | `string` | `''` | 标题 |
| `titleContent` | `ReactNode` | — | 自定义标题内容 |
| `border` | `boolean` | `false` | 显示单元格边框 |
| `size` | `'small' \| 'medium' \| 'large'` | Provider 尺寸 | 间距尺寸 |
| `type` | `'horizontal' \| 'vertical'` | `'horizontal'` | 排列类型 |
| `column` | `number` | `1` | 默认列数 |
| `labelPosition` | `'left' \| 'top'` | `'left'` | 标签位置 |
| `xs` / `sm` / `md` / `lg` / `xl` | `number` | — | 各容器断点的列数 |
| `labelClass` / `valueClass` | `string` | — | 区域附加类名 |
| `children` | `ReactNode` | — | 描述条目 |

## DescriptionItem Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `label` | `string` | `''` | 标签文字 |
| `labelContent` | `ReactNode` | — | 自定义标签内容 |
| `value` | `string` | `'--'` | 值文字 |
| `children` | `ReactNode` | — | 自定义值内容 |
| `spanCol` | `number` | `1` | 默认跨列数 |
| `spanRow` | `number` | `1` | 跨行数 |
| `xs` / `sm` / `md` / `lg` / `xl` | `number` | — | 各容器断点的跨列数 |

两个组件的 ref 都指向根 `HTMLDivElement`。Descriptions 使用原生描述列表语义。
