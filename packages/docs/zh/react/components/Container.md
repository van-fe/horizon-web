# Container 布局容器

Container 使用语义化页面区域组合横向、纵向和嵌套的应用骨架。

## 顶栏、主内容与底栏

直接子元素包含 Header 或 Footer 时，容器会自动采用纵向布局。

:::react-demo react/components/Container/basic.tsx :::

## 嵌套侧栏布局

在纵向骨架中嵌套横向 Container，可以把 Aside 与 Main 放在 Header 下方并排展示。

:::react-demo react/components/Container/sidebar.tsx :::

## 显式方向与尺寸

当布局意图不应依赖子区域时可设置 `direction`。数字尺寸按像素处理，CSS 尺寸字符串会原样保留。

:::react-demo react/components/Container/dimensions.tsx :::

## API

### Container

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `direction` | `'horizontal' \| 'vertical'` | 自动推断 | 区域排列方向 |
| `children` | `ReactNode` | — | 布局区域 |

Container 接受原生 `section` 属性，并把 ref 转发到根 `HTMLElement`。

### Header

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `height` | `string \| number` | Theme 提供 `60px` | 顶栏高度 |
| `children` | `ReactNode` | — | 顶栏内容 |

Header 接受原生 `header` 属性并转发 ref。

### Aside

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `width` | `string \| number` | Theme 提供 `300px` | 侧栏宽度 |
| `children` | `ReactNode` | — | 侧栏内容 |

Aside 接受原生 `aside` 属性并转发 ref。

### Main

Main 接受原生 `main` 属性、`children` 和转发 ref。它会填充剩余空间并负责内容溢出滚动。

### Footer

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `height` | `string \| number` | Theme 提供 `60px` | 底栏高度 |
| `children` | `ReactNode` | — | 底栏内容 |

Footer 接受原生 `footer` 属性并转发 ref。

## 无障碍

Header、Aside、Main 和 Footer 分别渲染对应的 HTML 地标元素。页面通常只应包含一个主要 Main；存在多个用途不明显的 Aside 时，应为它们提供可区分的可访问名称。
