# Hover 悬停状态

Hover 为单个目标提供悬停状态，不增加额外 DOM 包装。目标既可以是 React 元素，也可以是根据当前状态返回元素的 render function。

## 基础用法

:::react-demo react/components/Hover/basic.tsx :::

## 延迟切换

显示和隐藏延迟相互取消，快速移入再移出不会留下过期状态。

:::react-demo react/components/Hover/delay.tsx :::

## 命令与禁用

`disabled` 只阻止鼠标切换；`show()` 和 `hide()` 仍可用于明确的程序控制。

:::react-demo react/components/Hover/commands.tsx :::

## Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `disabled` | `boolean` | `false` | 禁用鼠标触发的状态切换 |
| `showDelay` | `number` | `0` | 移入后的显示延迟（毫秒） |
| `hideDelay` | `number` | `0` | 移出后的隐藏延迟（毫秒） |
| `children` | `ReactElement \| (state) => ReactElement` | — | 唯一目标元素或 render function |

## Callbacks

| 回调 | 参数 | 说明 |
| --- | --- | --- |
| `onMouseEnter` | `React.MouseEvent` | 鼠标进入目标 |
| `onMouseMove` | `React.MouseEvent` | 鼠标在目标内移动 |
| `onMouseLeave` | `React.MouseEvent` | 鼠标离开目标 |
| `onVisibleChange` | `boolean` | 悬停状态实际变化 |

## Ref

| 方法 | 说明 |
| --- | --- |
| `show()` | 显示悬停状态 |
| `hide()` | 隐藏悬停状态 |

悬停反馈不能作为获取功能或信息的唯一方式；键盘和触屏用户必须存在等价路径。
