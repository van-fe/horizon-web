### 基本用法
固钉默认固定在页面顶部

固钉使用 `div` 包裹元素，所以如果需要修改样式，可以直接给予 `style.display` 为 `inline-block` 等值即可

:::demo ./demos/basic.vue :::

### 设定 offset
如果希望固钉可以距滚动容器有距离，可以指定 `offset`

:::demo ./demos/offset.vue :::

### 指定容器
固钉默认监听 `document.body` 的滚动事件，如果需要另外指定，可以设置 `target`

:::demo ./demos/target.vue :::

### 套层滚动容器
如果固钉所在容器的父级还可以滚动，如果不做特殊设置则无法准确保证元素在容器内

此时需要对父级滚动事件做监听

:::demo ./demos/multiple-scroll-container.vue :::

### 固定底部
可以设置 `position = 'bottom'` 让固钉固定在底部

:::demo ./demos/bottom.vue :::
