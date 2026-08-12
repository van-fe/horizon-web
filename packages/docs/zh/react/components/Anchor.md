# Anchor 锚点导航

Anchor 使用原生链接展示页面章节，在目标滚动时同步活动项，并保留嵌套层级。

## 章节导航

ref 持有的滚动容器可通过稳定解析函数传入。`changeHash={false}` 可让跳转只影响当前界面。

:::react-demo react/components/Anchor/basic.tsx :::

## 受控折叠

通过 `collapsed` 与 `onCollapseChange` 明确管理导航状态。折叠操作使用带 `aria-expanded` 的原生按钮。

:::react-demo react/components/Anchor/collapse.tsx :::

## 自动标题

`autoRenderRules` 将选择器映射到目录层级。动态增加标题后调用 `refreshAnchorList()` 重新扫描。

:::react-demo react/components/Anchor/automatic.tsx :::

## Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `size` | `'small' \| 'medium'` | `'medium'` | 导航尺寸 |
| `maxHeight` | `number` | `750` | 最大滚动高度 |
| `changeHash` | `boolean` | `true` | 是否允许原生 hash 更新 |
| `scrollContainer` | `string \| HTMLElement \| Window \| (() => target)` | `window` | 监听与滚动目标 |
| `scrollBehavior` | `'auto' \| 'smooth'` | `'smooth'` | 原生滚动行为 |
| `scrollOffset` | `number \| 'start' \| 'center' \| 'end'` | `'start'` | 点击后的目标落点 |
| `boundsOffset` | `number \| 'start' \| 'center' \| 'end'` | `5` | 活动章节边界 |
| `useCollapse` | `boolean` | `false` | 启用折叠操作 |
| `collapsed` / `defaultCollapsed` | `boolean` | — / `false` | 受控或初始折叠状态 |
| `collapseText` | `ReactNode` | `'Navigation'` | 折叠操作内容 |
| `showLine` / `showHighlightLine` | `boolean` | `true` | 侧边线显示状态 |
| `showTitleSuffix` | `boolean` | `false` | 显示一级标题的子项数量 |
| `autoRender` | `boolean` | `false` | 自动扫描标题 |
| `autoRenderRules` | `readonly (string \| readonly string[])[]` | `h1`–`h6` | 按层级分组的选择器 |
| `linkTarget` | 原生链接 target | — | 覆盖全部 AnchorLink 目标 |

`AnchorLink` 支持 `href`、`title`、`titleContent`、`target`、嵌套 `children`、`className` 和 `style`。

## 回调与 ref

`onLinkClick(link, event)`、`onChange(link, previousLink)` 与 `onCollapseChange(collapsed)` 分别报告点击、滚动活动项和折叠状态。`AnchorHandle` 提供 `updateActiveLink()`、`refreshAnchorList()`、`updateScrollContainer()`、`getAnchorList()` 以及只读根元素 `element`。

## 无障碍

Anchor 渲染带名称的 `nav`、原生链接和原生折叠按钮。同一页面存在多个章节导航时，应提供明确的 `aria-label`。
