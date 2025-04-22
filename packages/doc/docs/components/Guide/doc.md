### 基本用法
:::demo ./demos/basic.vue :::

### 直接传参使用
某些情况下，可以不需要使用 `n-guide-item` 组件构建步骤，可以直接传入数据构建
:::demo ./demos/itemList.vue :::

### 蒙层
可以设置 `mask = false` 关闭蒙层
:::demo ./demos/mask.vue :::

### 拖拽
可以设置 `draggable` 开启拖拽功能，按住标题行进行拖拽
:::demo ./demos/drag.vue :::

### 完整示例
在大多情况下，需要聚焦的元素是动态出现的，而且还会聚焦于前一个聚焦元素交互后出现的新元素

在此种情况下，就不能使用控制器切换前后步骤了
:::demo ./demos/whole.vue :::
