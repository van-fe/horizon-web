## 导航尺寸

通过 `size` 在 `medium` 与 `small` 之间切换。示例使用独立滚动容器，便于直接比较文字和导航宽度。

:::demo components/Anchor/demo1.vue :::

## URL Hash

`change-hash` 控制点击锚点时是否同步 URL hash。关闭后仍会滚动到目标，但不会创建浏览器历史记录，适合弹窗或嵌套面板。

:::demo components/Anchor/demo2.vue :::

## 自定义滚动容器与层级

`scroll-container` 接受选择器、元素或 Window。嵌套滚动区域通常配合 `:change-hash="false"`；`show-title-suffix` 可在一级标题后展示子章节数量。

:::demo components/Anchor/demo3.vue :::

## 滚动与激活偏移

`scroll-offset` 决定点击后的目标落点，`bounds-offset` 决定滚动时何处切换高亮章节。两者都支持像素值以及 `start`、`center`、`end`。

:::demo components/Anchor/demo4.vue :::

## 折叠导航

设置 `use-collapse` 启用折叠模式，并可用 `collapse-text` 自定义提示。通过 `v-model:collapse` 可同步当前折叠状态。

:::demo components/Anchor/demo9.vue :::

## 侧边线

`show-line` 控制侧边线，`show-highlight-line` 单独控制当前章节的高亮线。关闭侧边线时，示例会同步禁用无效配置。

:::demo components/Anchor/demo5.vue :::

## 导航事件

`click` 返回被点击链接的信息与原生事件；滚动导致激活章节变化时触发 `change`。示例把两类结果直接显示在预览上方。

:::demo components/Anchor/demo6.vue :::

## 动态配置

`size`、`max-height`、`show-title-suffix` 和 AnchorLink 的 `title` 均可动态更新。使用响应式控件可以直接观察导航布局、滚动条和溢出行为。

:::demo components/Anchor/demo7.vue :::

## 自动生成目录

设置 `auto-render` 后，Anchor 会按照 `auto-render-rules` 扫描滚动容器中的标题并生成层级导航。内容结构变化后，可通过暴露的 `refreshAnchorList()` 重新扫描。

:::demo components/Anchor/demo8.vue :::
