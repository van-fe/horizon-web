## 基础用法
:::demo components/Breadcrumb/basic.vue :::

## 尺寸设置
可以配置 `medium(default)` 和 `small` 控制尺寸，也可以专门对 `BreadcrumbItem` 设置大小
:::demo components/Breadcrumb/size.vue :::

## 跳转链接
可以通过配置 `to` 或 `replace` 允许跳转
:::demo components/Breadcrumb/link-mode.vue :::

## 折叠方式
配置 `display-type` 来控制折叠方式

`full`: 全部展示，如果超出父级宽度，则会换行展示

`ellipsis`: 省略展示，超出父级宽度，则将从第二个开始的元素开始收起，直到不超出父级宽度

**要注意的是，使用 `ellipsis` 显示模式，且使用 `n-breadcrumb-item` 渲染时，一定要给每一个 `n-breadcrumb-item` 设置一个唯一的 `key`，否则渲染内容可能会出现错误**
:::demo components/Breadcrumb/collapse.vue :::

## 特殊样式
`Horizon-web` 设计规范定义了以下的样式规则
:::demo components/Breadcrumb/special-style.vue :::

## 自定义分隔符
:::demo components/Breadcrumb/custom-divider.vue :::

## 自定义 Item 内容
可以直接使用 `BreadcrumbItem` 组件来定义内容
:::demo components/Breadcrumb/custom-item.vue :::
