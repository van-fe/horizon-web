设置组件直接的间距。

### 配置信息
| 大小   | 尺寸 |
| ------ | ---- |
| small  | 8px  |
| medium | 16px |
| large  | 24px |

### 与 Flex 组件的区别
Space 为内联元素提供间距，其本身会为每一个子元素添加包裹元素用于内联对齐。适用于行、列中多个子元素的等距排列。

Flex 为块级元素提供间距，其本身不会添加包裹元素。适用于垂直或水平方向上的子元素布局，并提供了更多的灵活性和控制能力。

### 基本用法
默认组件水平间距。
:::demo components/Space/basic.vue :::

### 垂直间距
使用 `direction` 设置使用垂直间距
:::demo components/Space/vertical.vue :::

### 间距大小
使用 size 设置元素之间的间距，预设了 small、middle、large 三种尺寸，也可以自定义间距，若不设置 size，则默认为 small。
:::demo components/Space/size.vue :::

### 对齐
通过设置 `align` 属性定义组件的对齐方式
:::demo components/Space/align.vue :::

### 自动换行
设置 `wrap`，仅在 `horizontal`有效
:::demo components/Space/wrap.vue :::

### Design Token
| 变量 | 默认值 | 描述 |
| --- | --- | --- |
| --n-space--small | var(--n-spacing-3) | small尺寸间距  |
| --n-space--medium | var(--n-spacing-5) | medium尺寸间距  |
| --n-space--large | var(--n-spacing-7) | large尺寸间距  |
| --n-space--horizontal--small | var(--n-space--small) |  横向small间距  |
| --n-space--horizontal--medium | var(--n-space--medium) | 横向medium间距  |
| --n-space--horizontal--large | var(--n-space--large) | 横向large间距  |
| --n-space--vertical--small | var(--n-space--small) | 纵向small间距  |
| --n-space--vertical--medium | var(--n-space--medium) | 纵向medium间距  |
| --n-space--vertical--large | var(--n-space--large) | 纵向large间距 |
| --n-space--wrap--small | var(--n-space--vertical--small) var(--n-space--vertical--small) |  换行时候上下左右small间距  |
|  --n-space--wrap--medium | var(--n-space--vertical--medium) var(--n-space--vertical--medium) |  换行时候上下左右medium间距 |
|  --n-space--wrap--large | var(--n-space--vertical--large) var(--n-space--vertical--large) |  换行时候上下左右large间距 |
