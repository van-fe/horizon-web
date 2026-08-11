# Collapse 折叠面板

折叠面板将相关内容组织为可按需展开的区域。

```tsx
import { Collapse, CollapseItem } from '@aurora/horizon-web-react';
import '@aurora/horizon-web-react/style.css';
```

## 受控面板

当展开状态属于业务数据时，使用 `value` 与 `onChange`。禁用项仍会展示，但不能触发展开操作。

:::react-demo react/components/Collapse/basic.tsx :::

## 手风琴

设置 `accordion` 后最多只展开一个面板，此时激活值是单个面板标识或 `undefined`。

:::react-demo react/components/Collapse/accordion.tsx :::

## 外观与正文生命周期

可以选择尺寸、图标位置、填充或边框外观。`directive="show"` 会保留收起后的正文，`directive="if"` 只在展开时挂载正文。

:::react-demo react/components/Collapse/appearance.tsx :::

## Collapse Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `CollapseValue` | — | 受控的展开项 |
| `defaultValue` | `CollapseValue` | `[]` | 非受控初始展开项 |
| `accordion` | `boolean` | `false` | 同一时间仅允许一个面板展开 |
| `border` | `boolean` | `false` | 使用边框外观 |
| `filled` | `boolean` | `false` | 使用填充外观 |
| `expandIconPosition` | `'left' \| 'right'` | `'left'` | 展开图标位置 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 组件尺寸 |
| `expandAll` | `boolean` | `false` | 初始展开全部可用的直接子项 |
| `children` | `ReactNode` | — | 面板条目 |

`Collapse` 接受原生 `div` 属性。可用标题发生变化后会调用 `onChange(value)`。ref 实现 `CollapseHandle`：`focus(key?)` 聚焦第一个可用标题或指定面板，`root` 暴露根元素。

## CollapseItem Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string \| number` | — | 必填的唯一面板标识 |
| `title` | `ReactNode` | — | 标题内容 |
| `disabled` | `boolean` | `false` | 禁用标题操作 |
| `expandIcon` | `ReactNode` | — | 展开图标内容 |
| `color` | `string` | — | 分隔线颜色 |
| `background` | `string` | — | 标题背景色 |
| `directive` | `'show' \| 'if'` | `'show'` | 正文保留策略 |
| `children` | `ReactNode` | — | 面板正文 |

`CollapseItem` 接受原生 `div` 属性。每个标题使用原生按钮，并通过 `aria-controls` 和 `aria-labelledby` 与正文区域建立关联。
