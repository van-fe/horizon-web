### 基本用法
通过 `sources` 传入资源列表。
:::demo components/Viewer/basic.vue :::

### 循环展示
你可以传入 `loop` 启用循环切换功能。
:::demo components/Viewer/loop.vue :::

### 自动隐藏工具栏
默认情况下 3 秒无操作会自动隐藏工具栏，你可以禁用这一行为。
:::demo components/Viewer/autohide.vue :::

### 图注
图注是图片上的标签，你可以给一张图片配置多个图注，设置了 `handler` 的图注是可点击的。  
只有图片才支持图注，视频不支持。
:::demo components/Viewer/legend.vue :::

### 自定义按钮
你可以重新组合想要的内置按钮，或者添加完全自定义的按钮。
:::demo components/Viewer/tools.vue :::

### 点击图片触发
要想通过点击页面上已经存在的图片触发画廊，需要一点额外的工作。
:::demo components/Viewer/imgclick.vue :::

### 按键支持
<kbd>Esc</kbd> 关闭查看器  
<kbd>←</kbd> 上一张图片  
<kbd>→</kbd> 下一张图片  
<kbd>↑</kbd> 放大图片  
<kbd>↓</kbd> 缩小图片  
<kbd>鼠标双击</kbd> 在原始大小和自适应大小间切换  
<kbd>鼠标滚轮或双指捏合</kbd> 放大或缩小图片  
