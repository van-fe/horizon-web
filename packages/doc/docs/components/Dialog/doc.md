### 基本示例
对话框的基本用法。
:::demo ./demos/basic.vue :::

### 居中布局
通过 `top` 设置居中距离顶部的距离，例如下面 `top=100px` 的示例。
:::demo ./demos/vertical-position.vue :::

<!-- ### 按钮设置
你可以设置按钮是否显示，或通过插槽完全自定义底部。
:::demo ./demos/btn.vue ::: -->

<!-- ### 图标
你可以给对话框设置一个图标，它会展示在所有内容之前。
:::demo ./demos/icon.vue ::: -->
### 可拖动
开启 `draggable` 属性，允许用户拖动对话框。
:::demo ./demos/draggable.vue :::

### 尺寸
根据不同的场景，你可以选择使用 `small`, `medium`, `large`, `huge` 四种尺寸的对话框。
:::demo ./demos/size.vue :::

### 溢出内容
当对话框内容过长时，仅内容部分会支持滚动。
:::demo ./demos/overflow.vue :::

### 关闭后不销毁
你可以通过传入 `destroyOnClose` 来控制关闭对话框后销毁组件
:::demo ./demos/render.vue :::

### 自定义
自定义布局对话框各部分
:::demo ./demos/customize.vue :::

### 带分割线
通过自定义 slots，实现分割线效果
:::demo ./demos/divider.vue :::