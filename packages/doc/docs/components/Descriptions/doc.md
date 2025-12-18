<!-- ### 基本用法
简单地成组展示多个只读字段，一般用于详情页的信息(如用户详情,车辆详情)
:::demo ./demos/basic.vue ::: -->

### 单列样式
单列的描述列表样式
:::demo ./demos/single.vue :::

### 垂直样式
字段统一居左对齐,垂直列表
:::demo ./demos/vertical.vue :::

### 带边框展示
带边框和背景颜色的列表
:::demo ./demos/border.vue :::

### 属性
:::demo ./demos/props.vue :::

### 响应式
通过配置descriptions和description-item的 `xs` `sm` `md` `lg` `xl` 属性，可以调配在不同尺寸下的列数以及每项所占列数
width < 456 时为 `xs`, 456 <= width < 760 时为`sm`， 760 <= width < 1176 时为`md`,
1176 <= width < 1656 时为 `lg`, 1656 <= width 时为 `xl`
:::demo ./demos/responsive.vue :::
