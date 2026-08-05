Backtop 用于长页面或独立滚动容器，达到指定滚动距离后提供快速返回顶部的操作。

## 页面滚动

通过 `visibility-height` 设置出现阈值。示例会在页面内直接反馈点击结果。

:::demo components/Backtop/basic.vue :::

## 自定义按钮内容

默认按钮尺寸与交互保持不变，默认插槽可组合简短文字和图标。

:::demo components/Backtop/custom.vue :::

## 指定滚动容器

通过 `target` 监听局部滚动区域。目标元素应可滚动、可聚焦，并使用唯一选择器避免多个示例互相影响。

:::demo components/Backtop/target.vue :::
