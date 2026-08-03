Viewer 在全屏层中查看图片、视频或混合资源列表。

## 基础用法

通过 `sources` 传入资源，并使用 `v-model` 控制打开状态。

:::demo components/Viewer/basic.vue :::

## 循环切换

`loop` 让上一项和下一项操作在列表首尾循环。

:::demo components/Viewer/loop.vue :::

## 自动隐藏工具栏

`auto-hide-tools` 控制工具栏是否在无操作后隐藏。

:::demo components/Viewer/autohide.vue :::

## 图注

图片 source 可配置多个 `legends`；提供 `handler` 后图注可点击。视频不支持图注。

:::demo components/Viewer/legend.vue :::

## 自定义工具

`tools` 可重排内置工具，也可加入包含图标、标题和处理函数的自定义操作。

:::demo components/Viewer/tools.vue :::

## 从缩略图打开

点击页面中的缩略图时，使用 `init-index` 从对应资源开始查看。

:::demo components/Viewer/imgclick.vue :::

## 键盘与指针

- <kbd>Esc</kbd> 关闭查看器
- <kbd>←</kbd> / <kbd>→</kbd> 切换资源
- <kbd>↑</kbd> / <kbd>↓</kbd> 缩放图片
- 双击在原始大小与自适应大小间切换
- 滚轮、触控板和捏合手势可浏览或缩放图片
