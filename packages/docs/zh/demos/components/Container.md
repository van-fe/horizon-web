## 顶栏与主内容

当 `h-container` 的直接子元素包含 `h-header` 时，会自动采用纵向排列，适合标题栏与主内容组成的简单页面。

:::demo components/Container/demo1.vue :::

## 顶栏、主内容与底栏

加入 `h-footer` 可以承载保存状态、分页或辅助信息，形成完整的纵向页面骨架。

:::demo components/Container/demo2.vue :::

## 侧栏与主内容

容器只包含 `h-aside` 和 `h-main` 时默认横向排列。窄屏下应将侧栏转为顶部导航，避免挤压主内容。

:::demo components/Container/demo3.vue :::

## 顶栏下的侧栏布局

通过嵌套 `h-container`，可以让全局顶栏位于侧栏和主内容上方。

:::demo components/Container/demo4.vue :::

## 带工作区底栏的完整布局

内层容器可继续组合 `h-main` 与 `h-footer`，用于步骤状态、审核信息等与工作区相关的底栏。

:::demo components/Container/demo5.vue :::

## 贯穿页面的侧栏

把 `h-aside` 放在最外层，可让侧栏贯穿右侧的顶栏和主内容，适合桌面应用和管理后台。

:::demo components/Container/demo6.vue :::

## 完整应用骨架

侧栏、顶栏、主内容和底栏可以组合成完整应用。实际页面仍需为侧栏和固定高度区域补充窄屏回流策略。

:::demo components/Container/demo7.vue :::
