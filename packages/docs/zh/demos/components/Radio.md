### 基础用法
用 `modelValue` 设置绑定值
:::demo components/Radio/basic.vue :::

### 开启边框
使用 `border = true` 可开启边框样式，边框模式支持 `props.size`
:::demo components/Radio/border.vue :::

### 按钮样式
只需要把`n-radio`元素换成`n-radio-button`元素即可，同时提供`size`属性控制大小
:::demo components/Radio/button.vue :::

### 多选框组
结合`n-radio-group`和`n-radio`或者`n-radio-button`可以实现单选框组，用于多个互斥选项
:::demo components/Radio/group.vue :::

### 禁用状态
设置 `disabled = true` 即可开启禁用
:::demo components/Radio/disabled.vue :::

### 2.0.0 版本变化
自 `2.0.0` 开始，`small` 已不属于规范：

① 原本的 `size='small'` 会自动视为 `size='medium'`

② 原本的 `small` 尺寸和现在的 `medium` 尺寸一致

③ 原本的 `medium` 尺寸和现在的 `large` 尺寸一致

④ 原本的 `large` 尺寸被删除
