## Basic Usage
:::demo vue/components/Descriptions/basic.vue :::

## Single Column Style
Single column description list style, three different sizes
:::demo vue/components/Descriptions/single.vue :::

## Vertical Style
Fields are uniformly left-aligned, vertical list
:::demo vue/components/Descriptions/vertical.vue :::

## Display with Border
List with border and background color
:::demo vue/components/Descriptions/border.vue :::

## Attributes
:::demo vue/components/Descriptions/props.vue :::

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `''` | Section title |
| `border` | `boolean` | `false` | Displays cell borders |
| `size` | `'small' \| 'medium' \| 'large'` | Application size | Spacing size |
| `type` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction |
| `column` | `number` | `1` | Default column count |
| `labelPosition` | `'left' \| 'top'` | `'left'` | Label position |
| `xs` / `sm` / `md` / `lg` / `xl` | `number` | — | Columns at each container breakpoint |
| `labelClass` / `valueClass` | `string` | — | Additional region class name |

## DescriptionItem Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | `''` | Label text |
| `value` | `string` | `'--'` | Value text |
| `spanCol` | `number` | `1` | Default column span |
| `spanRow` | `number` | `1` | Row span |
| `xs` / `sm` / `md` / `lg` / `xl` | `number` | — | Span at each container breakpoint |

## Slots

Descriptions provides `default` and `title`. DescriptionItem provides `default` and `label`.
