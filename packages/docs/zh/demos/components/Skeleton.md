## 使用说明

Skeleton 在内容加载期间预告页面结构，让等待过程更稳定、更容易理解。它适合重复列表、信息卡片和长文本等布局相对明确的场景。

骨架占位应尽量贴近最终内容的尺寸与层级，避免加载完成后出现明显跳动或预期落差。

## 基础用法

不传入插槽时，Skeleton 会显示默认的三行文本骨架。通过 `animated` 控制加载动画。

:::demo components/Skeleton/demo1.vue :::

## 自定义内容

使用 `loadingTemplate` 描述加载中的占位结构，并在默认插槽中放置真实内容。两种结构越接近，状态切换就越自然。

:::demo components/Skeleton/demo2.vue :::

## 骨架元素

SkeletonItem 提供 `avatar`、`text`、`operate`、`image` 和 `picture` 五种基础形状，可组合成贴合业务内容的骨架屏。

:::demo components/Skeleton/demo3.vue :::
