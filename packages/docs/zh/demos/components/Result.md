## 基础用法
默认是 `success` 状态
:::demo components/Result/basic.vue :::

## 不同状态
支持 `success` `info` `warning` `error` 状态
:::demo components/Result/types.vue :::

## 服务状态
支持 403 404 500 的服务状态
:::demo components/Result/status.vue :::

## 自定义 icon
可以使用 `slots.icon` 插槽自定义 `icon`
:::demo components/Result/custom-icon.vue :::

## 其他内容的自定义
不仅 `icon` 可以自定义，`title` `subtitle` `extra` 都可以自定义
:::demo components/Result/custom-slot.vue :::
