## 基础用法
通过设置 `height`，内容物高度超过此高度时，会显示滚动条
:::demo components/Scrollbar/basic.vue :::

## 尺寸
在页面、抽屉、弹窗、容器中，建议使用 `medium`

在下拉弹层、编辑器中建议使用 `small`
:::demo components/Scrollbar/size.vue :::

## 横向滚动
在宽度大于容器宽度时，会显示横向滚动条
:::demo components/Scrollbar/horizon.vue :::

## 最大高度
通过设置 `max-height`，可以控制在小于设定的 `max-height` 时不显示滚动条
:::demo components/Scrollbar/max-height.vue :::

## 始终显示滚动条
可以设置 `always = true`，控制显示条始终展示

但需要注意的是，如果本身滚动大小小于容器的大小，仍然不会显示滚动条
:::demo components/Scrollbar/always.vue :::

## 手动设置滚动
通过对外暴露的 `setScrollTop` 和 `setScrollLeft` 方法，可以使用设置滚动条滚动
:::demo components/Scrollbar/manual.vue :::

## 最小尺寸
设置 `min-size`，可以保证在滚动内容非常多时，滚动条依旧容易被点击。
:::demo components/Scrollbar/min-size.vue :::
