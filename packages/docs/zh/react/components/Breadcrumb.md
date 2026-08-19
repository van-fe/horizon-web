# Breadcrumb 面包屑

Breadcrumb 用于说明当前页面在信息层级中的位置。适合两级以上、并且用户可能需要返回上级的路径。

```tsx
import { Breadcrumb, BreadcrumbItem } from '@aurora/horizon-react';
import '@aurora/horizon-react/style.css';
```

## 数据与组合

使用 `items` 构建数据驱动路径。当某一层需要富内容、独立分隔符或自己的回调时，可组合 `BreadcrumbItem` 子元素。

:::react-demo react/components/Breadcrumb/basic.tsx :::

## 路由适配

带有 `to` 的条目会将导航交给最近的 `HorizonWebProvider`。同时提供 `resolveHref`，可以保留复制地址、在新标签页打开等原生链接能力。需要替换当前历史记录时设置 `replace`。

:::react-demo react/components/Breadcrumb/navigation.tsx :::

## 尺寸与分隔符

`medium` 适合页面级导航，`small` 适合紧凑卡片或面板。默认分隔符可以是文本或其他展示型 React 内容，每个条目也可以单独覆盖。

:::react-demo react/components/Breadcrumb/appearance.tsx :::

## 响应式折叠

`full` 会展示所有层级。使用 `ellipsis` 时，组件会观察可用宽度，将溢出的中间层级收进可访问的展开菜单，同时保留首层和当前层级。

:::react-demo react/components/Breadcrumb/collapse.tsx :::

## 无障碍

根节点渲染为 `nav` 地标，默认 `aria-label` 为 `Breadcrumb`。路由条目使用链接，操作条目使用按钮，非交互层级保持为文本。需要本地化省略项的展开标签时，请设置 `HorizonWebProvider` 的 `breadcrumbLabels.collapsed`。

## Breadcrumb 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `items` | `readonly BreadcrumbItemData[]` | `[]` | 数据驱动的层级条目 |
| `children` | `ReactNode` | — | 组合的 `BreadcrumbItem` 内容 |
| `separator` | `ReactNode` | `'/'` | 默认分隔内容 |
| `title` | `boolean` | `false` | 由条目继承的默认标题强调样式 |
| `size` | `'small' \| 'medium'` | `'medium'` | 由条目继承的组件尺寸 |
| `displayType` | `'full' \| 'ellipsis'` | `'full'` | 溢出显示策略 |
| `onItemClick` | `(item, event) => void` | — | 交互条目激活后调用 |
| `aria-label` | `string` | `'Breadcrumb'` | 导航地标的无障碍名称 |

组件还支持原生 `nav` 属性。转发的 ref 指向渲染后的 `HTMLElement`。

## BreadcrumbItem 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `text` | `string` | — | 数据驱动渲染使用的条目文本 |
| `children` | `ReactNode` | — | 组合条目内容，优先于 `text` |
| `separator` | `ReactNode` | 继承父级 | 当前条目后的分隔内容 |
| `title` | `boolean` | 继承父级 | 使用标题强调样式 |
| `to` | `unknown` | — | 交给 Provider 处理的路由目标 |
| `replace` | `boolean` | `false` | 路由导航时请求替换历史记录 |
| `size` | `'small' \| 'medium'` | 继承父级 | 条目尺寸 |
| `clickable` | `boolean` | `false` | 将不带 `to` 的条目作为操作项 |
| `onClick` | `(event: MouseEvent) => void` | — | 当前交互条目激活时调用 |

转发的条目 ref 指向根 `HTMLSpanElement`。
