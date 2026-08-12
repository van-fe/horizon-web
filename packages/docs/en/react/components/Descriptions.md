# Descriptions

Descriptions presents grouped read-only fields for detail pages and summaries.

## Basic Usage

Use `DescriptionItem` for each label and value pair.

:::react-demo react/components/Descriptions/basic.tsx :::

## Responsive Grid

The responsive props are resolved from the component container width. Items can use the same breakpoints to change their column span.

:::react-demo react/components/Descriptions/responsive.tsx :::

## Custom Content

Use `titleContent`, `labelContent`, and item children when a region needs React content.

:::react-demo react/components/Descriptions/custom.tsx :::

## Descriptions Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `''` | Section title |
| `titleContent` | `ReactNode` | — | Custom title content |
| `border` | `boolean` | `false` | Displays cell borders |
| `size` | `'small' \| 'medium' \| 'large'` | Provider size | Spacing size |
| `type` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction |
| `column` | `number` | `1` | Default column count |
| `labelPosition` | `'left' \| 'top'` | `'left'` | Label position |
| `xs` / `sm` / `md` / `lg` / `xl` | `number` | — | Column count at each container breakpoint |
| `labelClass` / `valueClass` | `string` | — | Additional region class name |
| `children` | `ReactNode` | — | Description items |

## DescriptionItem Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | `''` | Label text |
| `labelContent` | `ReactNode` | — | Custom label content |
| `value` | `string` | `'--'` | Value text |
| `children` | `ReactNode` | — | Custom value content |
| `spanCol` | `number` | `1` | Default column span |
| `spanRow` | `number` | `1` | Row span |
| `xs` / `sm` / `md` / `lg` / `xl` | `number` | — | Column span at each container breakpoint |

Both components forward refs to their root `HTMLDivElement`. Descriptions uses native description-list semantics.
