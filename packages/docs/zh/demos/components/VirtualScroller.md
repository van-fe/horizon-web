## RecycleScroller 基本用法
如果是能够确定元素尺寸的场景, 使用RecycleScroller的性能会更好
:::demo components/VirtualScroller/RecycleScrollerDemo.vue :::

## RecycleScroller 网格用法
网格模式下itemSize即是单个网格的宽和高, 可以配合itemSecondarySize实现不同的宽高
:::demo components/VirtualScroller/GridDemo.vue :::

## VirtualScroller 基本用法
VirtualScroller不关心被滚动容器包裹的元素是否指定了高度
:::demo components/VirtualScroller/VirtualScrollerDemo.vue :::

## VirtualScroller 横向滚动
VirtualScroller不关心被滚动容器包裹的元素是否指定了宽度, Demo中为NVirtualScrollerItem设置随机宽度是为了让文本换行
:::demo components/VirtualScroller/HorizontalDemo.vue :::

<!-- ## VirtualScroller 实现聊天对话框 -->
<!-- :::demo components/VirtualScroller/ChatDemo.tsx ::: -->