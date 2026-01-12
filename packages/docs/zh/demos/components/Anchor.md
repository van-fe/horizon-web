### 设置尺寸
通过`size`属性可以设置：组件的尺寸，支持 `'medium' | 'small'`。
:::demo components/Anchor/demo1.vue :::

### 是否改变hash
通过`changeHash`属性可以设置：点击锚点，而不改变当前URL的hash值，即让浏览器不产生对应的历史记录。
:::demo components/Anchor/demo2.vue :::

### 自定义滚动容器
通过`scrollContainer`属性可以设置：滚动的容器。若指定了页面中嵌套的子滚动容器，并且该容器没有设置fixed定位，需配合`:changeHash="false"`使用。

通过`showTitleSuffix`属性可以设置：一级导航的“title”末尾是否展示数字后缀（表示其下面的二级导航的总个数）。
:::demo components/Anchor/demo3.vue :::

### 设置偏移量
通过`scrollOffset`属性可以设置：滚动的偏移量。即文档滚动结束时，锚点距离“滚动容器”顶部的距离。

通过`boundsOffset`属性可以设置：锚点区域边界的偏移量。即滚动内容距离“滚动容器”顶部达到指定偏移量时触发“当前高亮的Link”改变。
:::demo components/Anchor/demo4.vue :::

### 是否开启折叠模式
通过`useCollapse`属性可以设置是否开启“折叠模式”；通过`collapse`属性可以设置默认的“折叠状态”；也可以监听组件的`update:collapse`事件，从而做一些额外的操作。
:::demo components/Anchor/demo9.vue :::

### 是否展示侧边线
通过`showLine`属性可以设置：是否展示侧边线。
:::demo components/Anchor/demo5.vue :::

### 监听自定义事件
可以监听组件的`click`和`change`事件，从而做一些额外的操作。
:::demo components/Anchor/demo6.vue :::

### 额外的使用场景
动态变化：AnchorProps中的 `size` | `maxHeight` | `showTitleSuffix`  属性、AnchorLinkProps中的 `title` 属性。
:::demo components/Anchor/demo7.vue :::

### 自动渲染
通过`autoRender`属性可以开启“自动渲染”模式：开启后，将会自动遍历`scrollContainer`容器内部的元素并生成电梯导航，生成规则详见`autoRenderRules`属性。
:::demo components/Anchor/demo8.vue :::
