Card 将一组相关信息和操作组织成独立区块。标题、正文与底部操作应保持清晰层级，并适配窄屏和明暗主题。

## 基础配置

交互式配置器展示 `title`、`border`、分割线和 `radius` 的组合效果。

:::demo components/Card/basic.vue :::

## 多种正文内容

默认插槽可承载图片、活动列表、标签页等内容；响应式栅格会在窄屏改为单列。

:::demo components/Card/content.vue :::

## 自定义头部

头部插槽可组合紧凑操作、选择框、状态标签或图标，同时保留明确的文字标题。

:::demo components/Card/header.vue :::

## 自定义底部

底部插槽适合元数据和与正文紧密相关的操作。示例将发布结果显示在卡片组下方。

:::demo components/Card/footer.vue :::

## 拖拽与悬浮反馈

卡片可作为业务拖拽目标或可选择表面；动效应轻量，并尊重系统的减少动态效果设置。

:::demo components/Card/other.vue :::
