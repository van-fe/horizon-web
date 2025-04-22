### 基础用法
:::demo ./demos/basic.vue :::

### 尺寸设置
可以配置 `medium(default)` 和 `small` 控制尺寸，也可以专门对 `BreadcrumbItem` 设置大小
:::demo ./demos/size.vue :::

### 跳转链接
可以通过配置 `to` 或 `replace` 允许跳转
:::demo ./demos/link-mode.vue :::

### 折叠方式
配置 `display-type` 来控制折叠方式

`full`: 全部展示，如果超出父级宽度，则会换行展示

`ellipsis`: 省略展示，超出父级宽度，则将从第二个开始的元素开始收起，直到不超出父级宽度

**要注意的是，使用 `ellipsis` 显示模式，且使用 `n-breadcrumb-item` 渲染时，一定要给每一个 `n-breadcrumb-item` 设置一个唯一的 `key`，否则渲染内容可能会出现错误**
:::demo ./demos/collapse.vue :::

### 特殊样式
`Horizon-web` 设计规范定义了以下的样式规则
:::demo ./demos/special-style.vue :::

### 自定义分隔符
:::demo ./demos/custom-divider.vue :::

### 自定义 Item 内容
可以直接使用 `BreadcrumbItem` 组件来定义内容
:::demo ./demos/custom-item.vue :::
