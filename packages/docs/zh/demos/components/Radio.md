## 基础用法
用 `modelValue` 设置绑定值
:::demo components/Radio/basic.vue :::

## 开启边框
使用 `border = true` 可开启边框样式，边框模式支持 `props.size`
:::demo components/Radio/border.vue :::

## 按钮样式
只需要把`h-radio`元素换成`h-radio-button`元素即可，同时提供`size`属性控制大小
:::demo components/Radio/button.vue :::

## 单选框组
结合`h-radio-group`和`h-radio`或者`h-radio-button`可以实现单选框组，用于多个互斥选项
:::demo components/Radio/group.vue :::

## 禁用状态
设置 `disabled = true` 即可开启禁用
:::demo components/Radio/disabled.vue :::
