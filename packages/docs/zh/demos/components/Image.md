## 基础用法

通过 `src` 指定图片资源，并用 `width`、`max-width` 约束响应式容器。未设置高度时，图片会保留资源自身的宽高比；始终提供能表达内容的 `alt` 文本。

:::demo components/Image/basic.vue :::

## 设置高度

`height` 和 `max-height` 可建立稳定的内容框，适合横幅、卡片封面等需要对齐的布局。配合 `object-fit="cover"` 可以在不同高度间保持完整的视觉填充。

:::demo components/Image/height.vue :::

## 设置宽高比

当容器宽度随视口变化时，`aspect-ratio` 能让图片继续保持预期比例。常见的方形、编辑卡片和宽屏比例可对应不同发布渠道，具体规则参见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/aspect-ratio)。

:::demo components/Image/aspect.vue :::

## 适应内容框

当资源比例与内容框不一致时，用 `object-fit` 决定拉伸、完整显示或裁切策略。选择模式时应结合图片主体安全区，具体行为参见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit)。

:::demo components/Image/fit.vue :::

## 设置标题

同时设置 `title` 与 `show-tooltip` 后，鼠标悬停时会展示完整标题。`title` 适合补充被界面截断的资产名称，不能替代用于无障碍描述的 `alt`。

:::demo components/Image/title.vue :::

## 设置圆角

通过 `rounded` 设置数值、带单位的字符串或百分比圆角，可在内容卡片、功能入口和头像裁切之间复用同一图片能力。

:::demo components/Image/rounded.vue :::

## 占位图

图片尚未获得可用 `src` 或仍在加载时会展示默认占位图。使用 `placeholder` 插槽可以补充审批、生成或上传中的业务说明，同时应让后续加载结果可见。

:::demo components/Image/placeholder.vue :::

## 加载失败

加载失败时组件会显示默认错误状态；`error` 插槽可提供更明确的恢复路径。示例通过本地无效 data URI 模拟解码失败，并用仓库内资源完成重试，不依赖外部网络。

:::demo components/Image/error.vue :::

## 懒加载

设置 `lazyload` 后，图片首次进入可视区域才会请求资源。对于长列表，应让滚动容器可获得键盘焦点，并用 `load` 事件反馈已完成数量。

:::demo components/Image/lazyload.vue :::

## 图片查看器

设置 `show-viewer` 后，点击图片会打开查看器。可通过 `viewer-src` 为缩略图提供独立的大图资源，并用 `title` 或 `alt` 补充查看器中的内容名称。

:::demo components/Image/viewer.vue :::

## 操作项

设置 `show-actions` 并传入 `actions-list`，可在悬停时提供预览、导出或归档等操作。默认的 `auto` 类型和位置会根据图片尺寸在图标与下拉菜单之间自动切换；操作结果应在页面中可见，而不是只写入控制台。

:::demo components/Image/actions.vue :::

## 内容插槽

默认插槽始终覆盖在加载成功的图片上方，`hover` 插槽仅在悬停时显示。覆盖层应保持文字对比度，并避免遮挡图片的关键内容。

:::demo components/Image/slot.vue :::

## 图片列表

`h-image-list` 通过 `margin` 控制缩略图间距，通过 `limit` 控制可见数量；启用子图片的 `show-viewer` 后，可以从任一可见项浏览完整列表。

:::demo components/Image/list.vue :::

## 自定义溢出

当图片数量超过 `limit` 时，最后一个可见位置会显示溢出数量。使用 `limit` 插槽可以加入更符合业务语义的提示，`limit-text-size` 用于调整其字号。

:::demo components/Image/listCustom.vue :::
