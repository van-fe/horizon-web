## 基础用法
通过控制 `status` 实现改变当前节点的状态
:::demo components/Steps/basic.vue :::

## 小型步骤条
可以设置 `size = 'small'` 开启小型步骤条
:::demo components/Steps/small-size.vue :::

## 步骤切换
可以通过传入 `modelValue` 切换步骤，当对应的 `update:modelValue` 也会在变更时通知
:::demo components/Steps/switch-step.vue :::

## 点状步骤条
可以设置 `progress-dot = true` 开启点状步骤条
:::demo components/Steps/dot.vue :::

## 竖直方向的步骤条
设置 `direction = "vertical"` 启用竖向步骤条
:::demo components/Steps/vertical.vue :::

## 可点击
设置 `clickable = true`，可以通过点击进行切换步骤
:::demo components/Steps/click.vue :::

## 指定标签放置位置
配置 `label-placement` 可以调整标签位置
:::demo components/Steps/align-center.vue :::

## 指定标签布局
通过设定 `label-align`，`center` 为居中， `left` 为居左

仅支持 `label-placement="vertical"` 或 `:progress-dot="true"` 的情况
:::demo components/Steps/label-align.vue :::

## 异步加载
因为 `steps` 组件是在 `n-step` 挂载时才会确定每个步骤的下标，所以如果存在前后步骤固定，但中间步骤是异步加载的，会导致最终顺序不正确

因此需要给 `n-step` 设置 `index`，确保顺序是符合预期的
:::demo components/Steps/async-load.vue :::

## 拦截切换
在设置了 `clickable = true` 时，用户点击切换步骤无法受开发者控制，所以提供了 `before-change` 拦截切换请求
:::demo components/Steps/before-change.vue :::

## 禁用
给 `step-item` 设置 `disabled` ，则可以禁止与当前步骤交互
:::demo components/Steps/disabled.vue :::
