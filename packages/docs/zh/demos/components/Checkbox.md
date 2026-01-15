## 基础用法
用 `modelValue` 设置绑定值
:::demo components/Checkbox/basic.vue :::

## 开启边框
使用 `border = true` 可开启边框样式，边框模式支持 `props.size`
:::demo components/Checkbox/border.vue :::

## 按钮样式
只需要把`n-checkbox`元素换成`n-checkbox-button`元素即可，同时提供`size`属性控制大小
:::demo components/Checkbox/button.vue :::

## 半选模式
设置 `props.indeterminate` 开启半选模式
:::demo components/Checkbox/indeterminate.vue :::

## 多选框组
结合`n-checkbox-group`和`n-checkbox`或者`n-checkbox-button`可以实现复选框组
:::demo components/Checkbox/group.vue :::

## 禁用状态
设置 `disabled = true` 即可开启禁用
:::demo components/Checkbox/disabled.vue :::

## 一键反选
使用暴露出的 `toggle()` 方法实现一键反选
:::demo components/Checkbox/inverse.vue :::
