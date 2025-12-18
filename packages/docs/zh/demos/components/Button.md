## 基本用法
通过控制 `type` 字段，来开启不同按钮颜色

设置 `round`，让按钮置为椭圆形状

:::demo components/Button/basic.vue :::

## 尺寸
控制 `size` 字段，设置不同按钮尺寸
:::demo components/Button/size.vue :::

## 简洁按钮
使用 `plain = true` 开启简洁按钮

如果需要在黑色背景下应用，则设置 `ghost = true` 开启幽灵按钮形式
:::demo components/Button/plain.vue :::

## 文字按钮
使用 `text = true` 开启文字按钮
:::demo components/Button/text.vue :::

## 链接按钮
使用 `link = true` 开启链接按钮

设置 `to` 或 `href` 可以直接进行跳转
:::demo components/Button/link.vue :::

## 激活态按钮
设置 `active = true`，可以将按钮置为激活态
:::demo components/Button/active.vue :::

## 禁用
设置 `disabled = true`，将按钮置为不可用状态
:::demo components/Button/disabled.vue :::

## 图标按钮
设置 `icon`，会自动判断是否有使用默认插槽而显示正方形或自适应
:::demo components/Button/icon.vue :::

## 块级按钮
设置 `block = true`，可以让按钮宽度占满父级
:::demo components/Button/block.vue :::

## 按钮组
使用 `n-button-group` 包裹按钮，可以设置平滑接壤的按钮组
:::demo components/Button/button-group.vue :::

## 防抖调用函数
通过 `debounce-fn` 传入一个函数，该函数会在点击按钮时自动触发，且如果该函数返回了 Promise，则会在执行过程中自动实现防抖，避免多次点击产生的作用。此时绑定的 `click` 事件将被忽略。 

你还可以通过 `debounce-type` 控制防抖过程中的按钮状态。

如果你需要点击按钮时执行调用接口等异步操作，这将会非常实用。

:::demo components/Button/debounce-fn.vue :::

## 边框样式
边框可以设置为 `solid` `dotted` `dashed`，默认是 `solid`
:::demo components/Button/border-style.vue :::


## 自定义颜色 (BETA)
设置 `color` 后，会根据给定的颜色自动计算悬浮、点击等状态的颜色

系统内置了五种颜色: <code>brand</code> <code>indigo</code> <code>purple</code> <code>magenta</code> <code>orange</code>

:::demo components/Button/custom-color.vue :::
