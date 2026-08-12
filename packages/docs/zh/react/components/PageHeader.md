# PageHeader 页头

PageHeader 用于声明页面标题、辅助上下文、导航层级和页面级操作。

## 基本用法

返回操作支持键盘访问；未设置 `backAriaLabel` 时使用 Provider 文案。

:::react-demo react/components/PageHeader/basic.tsx :::

## 面包屑

使用 `breadcrumb` 展示当前层级；当面包屑是唯一导航入口时，可设置 `showBack={false}`。

:::react-demo react/components/PageHeader/breadcrumb.tsx :::

## 内容区域

标题、说明、标签、操作、图标和扩展主体均接受 React 内容；窄屏时页面操作会自动换行。

:::react-demo react/components/PageHeader/regions.tsx :::

## Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `title` / `content` | `string` | — | 默认标题和说明文字 |
| `showBack` | `boolean` | `true` | 显示返回操作 |
| `useDivider` | `boolean` | `true` | 显示主区域底部分割线 |
| `disabledHeaderTooltip` | `boolean` | `false` | 禁用标题溢出提示 |
| `backAriaLabel` | `string` | Provider 文案 | 返回操作的可访问名称 |
| `backIcon` | `ReactNode` | 箭头图标 | 返回操作图标 |
| `titleContent` / `titleContainer` | `ReactNode` | — | 自定义标题或完整标题容器 |
| `header` | `ReactNode` | — | 完整标题区 |
| `description` / `tags` / `actions` | `ReactNode` | — | 说明、标签和页面操作 |
| `breadcrumb` | `ReactNode` | — | 面包屑内容 |
| `children` | `ReactNode` | — | 标题区下方的扩展内容 |

## Callback

| 回调 | 签名 | 说明 |
| --- | --- | --- |
| `onBack` | `() => void` | 返回操作被激活时调用 |

PageHeader 将 ref 转发到根 `HTMLElement`，并接受原生 header 属性。可通过 `HorizonWebProvider` 的 `pageHeaderLabels.back` 本地化默认返回文案。
