# Pagination 分页

分页用于将大量结果拆分成可导航的页面，也可以控制每页展示的数据数量。

```tsx
import { Pagination } from '@aurora/horizon-web-react';
import '@aurora/horizon-web-react/style.css';
```

## 受控分页

使用 `value` 和 `onPageChange` 管理当前页，使用 `pageSize` 和 `onPageSizeChange` 管理每页数量。任一值变化后，`onChange` 都会同时收到当前页和每页数量。

:::react-demo react/components/Pagination/basic.tsx :::

## 布局与模式

默认模式按照 `layout` 指定的顺序展示区域；`simple` 模式展示总数和页码，`simplest` 模式使用前后翻页按钮与页码输入框。

:::react-demo react/components/Pagination/variants.tsx :::

## 自定义区域与禁用状态

通过 `prefix`、`previous`、`next` 和 `suffix` 自定义区域内容。设置 `disabled` 后，页码、每页数量和跳转操作都会变为不可用。

:::react-demo react/components/Pagination/custom.tsx :::

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `number` | — | 受控的当前页 |
| `defaultValue` | `number` | `1` | 非受控初始页 |
| `pageSize` | `number` | — | 受控的每页数量 |
| `defaultPageSize` | `number` | `10` | 非受控初始每页数量 |
| `total` | `number` | `0` | 数据总数 |
| `pageSizes` | `readonly number[]` | `[10, 20, 30, 40, 50]` | 可选择的每页数量 |
| `pagerCount` | `number` | `7` | 最大页码数量，应使用不小于五的奇数 |
| `layout` | `string \| readonly PaginationLayoutItem[]` | `'pager, sizes, jumper, total'` | 默认模式中的区域顺序 |
| `variant` | `'default' \| 'simple' \| 'simplest'` | `'default'` | 展示模式 |
| `hideOnSinglePage` | `boolean` | `false` | 只有一页时隐藏导航 |
| `showRange` | `boolean` | `true` | 在总数区域展示当前数据范围 |
| `align` | `'left' \| 'center' \| 'right'` | `'right'` | 水平对齐方式 |
| `disabled` | `boolean` | `false` | 禁用全部操作 |
| `size` | `'medium' \| 'large'` | `'medium'` | 组件尺寸 |
| `labels` | `Partial<PaginationLabels>` | — | 当前组件的可见文案与无障碍文案 |
| `prefix` | `ReactNode` | — | 控件之前的内容 |
| `previous` | `ReactNode` | — | 上一页按钮内容 |
| `next` | `ReactNode` | — | 下一页按钮内容 |
| `suffix` | `ReactNode` | — | 控件之后的内容 |

`Pagination` 接受原生 `nav` 属性。

## Callbacks

| Callback | Type | Description |
| --- | --- | --- |
| `onChange` | `(page: number, pageSize: number) => void` | 页码或每页数量变化 |
| `onPageChange` | `(page: number) => void` | 当前页变化 |
| `onPageSizeChange` | `(pageSize: number) => void` | 每页数量变化 |
| `onPrevious` | `(page: number) => void` | 上一页操作完成 |
| `onCurrentPageClick` | `(page: number) => void` | 再次激活当前页 |
| `onNext` | `(page: number) => void` | 下一页操作完成 |
| `onJump` | `(page: number) => void` | 跳转输入操作完成 |

ref 实现 `PaginationHandle`：`focus(page?)` 聚焦第一个可用操作或指定页码，`root` 暴露导航元素。

可以通过 `HorizonWebProvider` 的 `paginationLabels` 设置全局分页文案；组件上的 `labels` 会覆盖对应字段。
