# Layout 栅格布局

Grid 和 GridItem 使用浏览器原生 CSS Grid 构建响应式轨道布局。较小断点声明的值会自然延续，直到更大断点再次覆盖。

## 基础分栏

Grid 默认使用 24 列，每个 GridItem 声明自身占据的轨道数。

:::react-demo react/components/Layout/basic.tsx :::

## 响应式值

`cols`、全部间距属性、`span` 和 `offset` 可以传入数字，也可以传入以 `xs`、`sm`、`md`、`lg`、`xl`、`xxl` 为键的对象。

:::react-demo react/components/Layout/responsive.tsx :::

## 定位与对齐

通过两个方向的 gap 分别控制行列间距；`align` 和 `justify` 控制单元格内对齐，`offset` 用于保留起始轨道。

:::react-demo react/components/Layout/placement.tsx :::

## Grid API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `tag` | `ElementType` | `'div'` | 根元素类型 |
| `cols` | `GridValue` | `24` | 列数 |
| `gap` | `GridValue` | `0` | 行列像素间距 |
| `columnGap` | `GridValue` | `gap` | 列像素间距 |
| `rowGap` | `GridValue` | `gap` | 行像素间距 |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch'` | `'stretch'` | 垂直对齐方式 |
| `justify` | `'start' \| 'center' \| 'end' \| 'stretch'` | `'stretch'` | 水平对齐方式 |
| `children` | `ReactNode` | — | 网格内容 |

Grid 接受所选元素的原生属性，并将 ref 转发到根元素。

## GridItem API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `span` | `GridValue` | `1` | 占据列数；在对应断点为 0 时隐藏 |
| `offset` | `GridValue` | `0` | 起始方向预留列数 |
| `children` | `ReactNode` | — | 网格项内容 |

GridItem 接受原生 `div` 属性并转发 ref，同时提供 `GridItem` 与 `Grid.Item` 两种入口。

## 断点

断点范围为：`xs` 不超过 480px，`sm` 从 480px 开始，`md` 从 1024px 开始，`lg` 从 1440px 开始，`xl` 从 1920px 开始，`xxl` 从 2880px 开始。
