### 基础用法

| 分辨率(px)         | 大小      | 建议最多所分列数 | 间隔gutters,hspace,vspace(px) |
|-----------------|---------|----------|-----------------------------|
| 0 ≤ X <480      | XSmall  | 4        | 8                           |
| 480 ≤ X <1024   | Small   | 8        | 16                          |
| 1024 ≤ X < 1440 | Medium  | 12       | 16                          |
| 1440 ≤ X < 1920 | Large   | 12       | 16                          |
| 1920 ≤ X < 2880 | XLarge  | 24       | 24                          |
| 2880 ≤ X ≤ 3840 | XXLarge | 24       | 48                          |

:::demo ./demos/demo1.vue :::

### 列元素间距

通过 `gutter` 属性设置行列元素之间的间距

通过 `hspace` 属性设置行内列元素之间的间距，`hspace` 优先级高于 `gutter`

通过 `vspace` 属性设置与下一行元素之间的间距，`vspace` 优先级高于 `gutter`，最后一行的 `vspace` 无效

:::demo ./demos/demo2.vue :::

### 对齐方式
:::demo ./demos/demo3.vue :::

### 响应式
通过配置 `xs` `sm` `md` `lg` `xl` `xxl` 属性，可以调配在不同分辨率下所占范围
:::demo ./demos/responsive.vue :::
