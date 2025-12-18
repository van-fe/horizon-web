### 基本示例
为符合大多数场景，对话框默认会显示主要和辅助按钮。
:::demo ./demos/demo1.vue :::

### 垂直位置
默认情况下，对话框会垂直居中显示，你可以通过 `vertical-position` 调整为距离顶部一定距离显示。
:::demo ./demos/verticalPosition.vue :::

### 按钮设置
你可以设置按钮是否显示，或通过插槽完全自定义底部。
:::demo ./demos/demo2.vue :::

### 图标
你可以给对话框设置一个图标，它会展示在所有内容之前。
:::demo ./demos/demo3.vue :::

### 尺寸
根据不同的场景，你可以选择使用 `small`, `medium`, `large`, `huge` 四种尺寸的对话框。
设计规范更新，后续废弃自定义宽度，统一使用尺寸控制。
:::demo ./demos/demo4.vue :::

### 溢出内容
当对话框内容过长时，仅内容部分会支持滚动。
:::demo ./demos/demo5.vue :::

### 渲染方式
你可以通过传入 `display-type` 来控制对话框的渲染方式，`if` 表示按照 `v-if` 进行渲染，`show`（默认） 表示按照 `v-show` 进行渲染，二者区别可以参考 [v-if vs v-show](https://vuejs.org/guide/essentials/conditional.html#v-if-vs-v-show)。  
:::demo ./demos/demo6.vue :::

### 自定义class
通过 classNames 属性设置弹窗内部区域（header、body、footer、mask、wrapper）的 className。
:::demo ./demos/demo7.vue :::
