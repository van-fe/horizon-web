Switch 用于在两个互斥状态之间切换，并保留键盘、表单和辅助技术语义。

## 基础用法
:::demo vue/components/Switch/basic.vue :::

## 标签位置
可以通过配置 `label-position` 控制标签的位置
:::demo vue/components/Switch/labelPosition.vue :::

## 内部状态文字
设置 `status-position="inside"` 可将状态文字展示在开关轨道内部。内部空间有限，建议使用简短文字。
:::demo vue/components/Switch/insideText.vue :::

## 尺寸
提供了 `medium/small` 两种尺寸
:::demo vue/components/Switch/size.vue :::

## 禁用和只读
使用 `disabled` 和 `readonly` 控制是否禁用和只读
:::demo vue/components/Switch/disabled.vue :::

## 拦截修改
配置 `before-change`，可以拦截是否允许改变值
:::demo vue/components/Switch/beforeChange.vue :::
