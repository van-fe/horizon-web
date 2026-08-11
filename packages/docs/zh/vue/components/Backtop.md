Backtop 用于长页面或独立滚动容器，达到指定滚动距离后提供快速返回顶部的操作。

## 页面滚动

通过 `visibility-height` 设置出现阈值。示例会在页面内直接反馈点击结果。

:::demo vue/components/Backtop/basic.vue :::

## 自定义按钮内容

默认按钮尺寸与交互保持不变，默认插槽可组合简短文字和图标。

:::demo vue/components/Backtop/custom.vue :::

## 指定滚动容器

通过 `target` 监听局部滚动区域。目标元素应可滚动、可聚焦，并使用唯一选择器避免多个示例互相影响。

:::demo vue/components/Backtop/target.vue :::

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `visibility-height` | `number` | `400` | 显示操作的滚动阈值 |
| `bottom` | `number` | `120` | 距离视口底部的像素值 |
| `right` | `number` | `24` | 距离视口右侧的像素值 |
| `target` | `string` | `window` | 被监听滚动元素的选择器 |
| `aria-label` | `string` | `Back to top` | 可访问名称 |

默认插槽会替换箭头内容，`click` 事件返回原生鼠标事件。模板 ref 提供 `scrollToTop()` 和 `focus()`。
