## 基础用法
:::demo vue/components/Hover/hover.vue :::

## 禁用
设定 disabled 值为 true，即可禁用 hover 组件
:::demo vue/components/Hover/disabled.vue :::

## 延时出现和延时隐藏
可以设置 hoverShowDelay 的值来调整鼠标进入容器后，元素延迟出现的时长
可以设置 hoverHideDelay 的值来调整鼠标离开容器后，元素延迟隐藏的时长
:::demo vue/components/Hover/delay.vue :::

## API 摘要

### Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `disabled` | `boolean` | `false` | 禁用鼠标触发的状态切换 |
| `hoverShowDelay` | `number` | `0` | 移入后的显示延迟（毫秒） |
| `hoverHideDelay` | `number` | `0` | 移出后的隐藏延迟（毫秒） |

### Events

`mouseEnter`、`mouseMove`、`mouseLeave` 提供原生鼠标事件；`visibleChange` 在悬停状态实际变化时提供布尔值。

### Slots 与 Exposes

默认插槽接收 `{ hover: boolean }`。组件实例提供 `show()` 和 `hide()`。

