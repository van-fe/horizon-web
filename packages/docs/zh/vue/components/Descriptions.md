## 基本用法
简单地成组展示多个只读字段，一般用于详情页的信息(如用户详情,车辆详情)
:::demo vue/components/Descriptions/basic.vue :::

## 单列样式
单列的描述列表样式,三种不同尺寸
:::demo vue/components/Descriptions/single.vue :::

## 垂直样式
字段统一居左对齐,垂直列表
:::demo vue/components/Descriptions/vertical.vue :::

## 带边框展示
带边框和背景颜色的列表
:::demo vue/components/Descriptions/border.vue :::

## 属性
:::demo vue/components/Descriptions/props.vue :::

## Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `title` | `string` | `''` | 标题 |
| `border` | `boolean` | `false` | 显示单元格边框 |
| `size` | `'small' \| 'medium' \| 'large'` | Application 尺寸 | 间距尺寸 |
| `type` | `'horizontal' \| 'vertical'` | `'horizontal'` | 排列类型 |
| `column` | `number` | `1` | 默认列数 |
| `labelPosition` | `'left' \| 'top'` | `'left'` | 标签位置 |
| `xs` / `sm` / `md` / `lg` / `xl` | `number` | — | 各容器断点的列数 |
| `labelClass` / `valueClass` | `string` | — | 区域附加类名 |

## DescriptionItem Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `label` | `string` | `''` | 标签文字 |
| `value` | `string` | `'--'` | 值文字 |
| `spanCol` | `number` | `1` | 默认跨列数 |
| `spanRow` | `number` | `1` | 跨行数 |
| `xs` / `sm` / `md` / `lg` / `xl` | `number` | — | 各容器断点的跨列数 |

## Slots

Descriptions 提供 `default` 和 `title`；DescriptionItem 提供 `default` 和 `label`。
