### 基础用法
通过 `src` 设置图片的路径，通过 `width` 和 `max-width` 设置图片的宽度和最大宽度。  
你可以不设置图片的高度，这样图片就可以保持原始宽高比了。
:::demo ./demos/basic.vue :::

### 设置高度
你也可以通过 `height` 和 `max-height` 设置图片的高度和最大高度，这相当于自定义了图片宽高比。
:::demo ./demos/height.vue :::

### 设置宽高比
有时候图片的宽度不是固定值，导致你无法很方便地设置高度，但你又希望能自定义图片的宽高比，此时 `aspect-ratio` 可以帮到你，详情请参见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/aspect-ratio)。
:::demo ./demos/aspect.vue :::

### 适应内容框
在图片的实际宽高比与原始宽高比不一致时，你可以通过 `object-fit` 属性控制图片如何适应内容框，详情请参见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit)。  
虚线是用来指示当前内容框的大小。
:::demo ./demos/fit.vue :::

### 设置标题
设置 `show-tooltip` 为 `true`, 且 `title` 不为空，即会以 tooltip 的形式展示图片标题。
:::demo ./demos/title.vue :::

### 设置圆角
通过 `rounded` 来控制图片的圆角度数。
:::demo ./demos/rounded.vue :::

### 占位图
默认情况下，图片加载过程中会显示自适应大小的占位图，你也可以通过插槽 `placeholder` 进行自定义。
:::demo ./demos/placeholder.vue :::

### 加载失败
默认情况下，图片加载失败后会显示自适应大小的错误内容，你也可以通过插槽 `error` 进行自定义。
:::demo ./demos/error.vue :::

### 懒加载
传入 `lazyload` 即可启用懒加载，仅当图片首次出现在可视区域时才加载图片。  
你可以打开开发者工具 - Network - 筛选 Img，然后回到页面顶部后刷新页面，观察图片是何时加载的。
:::demo ./demos/lazyload.vue :::

### 图片查看器
传入 `show-viewer` 即可启用图片查看器 `<h-viewer />`。
:::demo ./demos/viewer.vue :::

### 操作项
有时你希望鼠标移上图片后显示一些操作项，你可以将 `show-actions` 设为 `true`，并通过 `actions-list` 传入一个操作列表。  
默认情况下，当图片宽度大于 `40px` 时，操作项会显示为按钮，否则会展示为一个下拉列表；当图片宽度大于 `80px` 时，操作项会位于右下角，否则会居中。你也可以通过 `actions-type` 和 `actions-position` 完全自定义类型和位置。
:::demo ./demos/actions.vue :::

### 内容插槽
如果你需要完全自定义图片上的内容，你可以使用默认插槽，它将始终展示在图片上层；我们还提供了 `hover` 插槽，仅当鼠标移上图片时才展示插槽。  
仅当图片已经加载成功后，内容插槽才会生效。
:::demo ./demos/slot.vue :::

### 图片列表
为了更方便的展示一系列图片，我们还提供了 `n-image-list` 组件，你可以控制每张图片的间距，以及最多展示的图片数量。
:::demo ./demos/list.vue :::

### 自定义溢出
你可以通过 `limit-text-size` 控制溢出文本的字号，还可以通过 `limit` 插槽完全自定义溢出的展示。
:::demo ./demos/listCustom.vue :::
