## 基本用法
最基本用法
:::demo components/Segmented/basic.vue :::

## Block 模式
设置 `block` 让其适应父级宽度。通过 `label` 传入的文字被截断时，会自动用 Tooltip 展示完整内容；自定义插槽需要自行处理提示。
:::demo components/Segmented/block.vue :::

## 不可用
:::demo components/Segmented/disabled.vue :::

## 滚动的分段器
当选项超级多时候，控制器根据宽度计算，可以通过 `scrollable` 关闭。<strong style="color: red;">(PS:一般不推荐 Segmented 做太多选项节点)</strong>
:::demo components/Segmented/scroll.vue :::

## 受控模式
通过 `activeKey` 来激活对应的选项
:::demo components/Segmented/controlled.vue :::

## 不同大小的分段器
通过 `size` 设置大小, 默认大小：`medium`
:::demo components/Segmented/size.vue :::

## 动态加载数据
异步加载更多的选项
:::demo components/Segmented/load-more.vue :::

## 自定义渲染
使用 `slot` 自定义节点渲染
:::demo components/Segmented/customize.vue :::

## 支持设置图标、角标
使用 `icon` 设置选项图标
:::demo components/Segmented/icon.vue :::

## 和表单一起使用
可以通过启用 `form` 属性，以适配 `h-form` 组件
:::demo components/Segmented/form.vue :::
