## 基础使用
最简单的用法，浮层的大小由内容区域决定。

:::demo components/Popover/basic.vue :::

## 触发方式
有 4 种触发方式可选：hover、click、focus、manual。

click 表示点击 reference 切换 popper 的显隐状态；点击 popper 内部时保持显示，点击外部时隐藏。

focus 表示鼠标按下状态

:::demo components/Popover/trigger.vue :::

## 位置
有 15 种位置策略可选，可以用 top、bottom、left、right 和 auto 来表达弹出的主要方向，再加一个辅助的标志 start 和 end 来表达 popper 的对齐方式，比如在 top-start 表示弹出在顶部，向 start 方向（左边）对齐；

不加辅助的对齐标志默认居中对齐

固定方向会关闭 `flip` 以便观察准确位置；`auto` 方向仍会根据可用空间自适应。

:::demo components/Popover/position.vue :::

## PopContent 组件
Popover 的 Popper 部分的预置样式挂在 PopContent 组件上，如果需要完全自定义 Popper 部分的样式，可以不使用 PopContent 组件

完全自定义 Popper 部分的样式需要注意小三角的样式，可以用 CSS 变量设置小三角的颜色和大小

:::demo components/Popover/pop-content.vue :::

## popperClass 和 popperStyle
可以用 popperClass 来挂载 popper 部分 的 class，但要注意 CSS 的选择器；也可以用 popperStyle来挂载一些样式 

popper 本身不带 z-index 属性，全靠 fixed 的位置计算，所以如果使用在类似 dialog 的场景下，可以设置 toBody 属性为 false，让 popper 成为 dialog 内的元素，就不会受到 dialog 的 z-index 影响，也可以使用 z-index 样式进行处理

:::demo components/Popover/popper-class.vue :::

## 延迟
可以设置 hoverHideDelay 的值来调整鼠标离开 reference 后，popper 延迟隐藏的时长，该值会影响鼠标从 reference 移动到 popper 的过程中 popper 是否会隐藏，所以尽量不要设置得太短

可以设置 hoverShowDelay 的值来调整鼠标进入 reference 后，popper 延迟出现的时长

:::demo components/Popover/delay.vue :::

## Offset
可以用 distance 和 skidding 来微调 popper 的弹出位置

distance 表示 popper 在主方向上的偏移，正值表示 popper 远离 reference，负值表示 popper 靠近 reference；

reference skidding 表示 popper 在辅助方向上的的偏移，正值表示 popper 向 end 方向偏移 ，负值表示 popper 向 start 方向偏移；

:::demo components/Popover/offset.vue :::

## Flip
当显示位置的空间不够时，可以通过设置flip属性来允许 popper 显示到对面的位置，默认开启，当所有方向没法满足时候可以通过 `preventOverflow` 阻止popover被切断

可以通过设置fallbackPlacements来调整flip的位置，比如上下位置都不够展示，希望能够展示到左边，可以设置fallbackPlacements为 ['top', 'bottom', 'left']

:::demo components/Popover/flip.vue :::

## 复杂情况与嵌套
如果有多层popover的嵌套，或者popover弹出层内有使用popover来实现的组件时，要注意内层的popover或组件如果渲染到body上，会跟随body而滚动，最好设置to-body=false

下例中由于select的option响应的是mousedown事件，且mousedown完成后弹出的选项立刻消失，mouseup事件会触发在document上，导致外层popover认为用户点击了popover以外的区域，隐藏弹出层，类似情况可以设置popover的hide-event-type事件

:::demo components/Popover/complex.vue :::

## 箭头
对比带箭头与无箭头的浮层效果，可以通过 `arrow` 控制箭头是否显示。
:::demo components/Popover/arrow.vue :::

## 禁用状态
可以设置 `disabled` 控制是否禁用
:::demo components/Popover/disabled.vue :::

## Mask
可以通过 `showWithMask` 设置popper显示时是否展示一个遮罩
:::demo components/Popover/mask.vue :::

## 自定义关闭配置
通过 `hide-event-type` 指定外部交互使用 `click`、`mousedown` 或 `mouseup` 中的哪一种事件关闭浮层。

:::demo components/Popover/close-trigger.vue :::
