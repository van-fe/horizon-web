# Dropdown 下拉菜单

Dropdown 用键盘可访问的菜单承载上下文操作或导航入口。

## 基础用法

:::react-demo react/components/Dropdown/basic.tsx :::

## 触发方式

支持悬停、点击和右键菜单三种触发方式。

:::react-demo react/components/Dropdown/triggers.tsx :::

## 分组与多级菜单

:::react-demo react/components/Dropdown/nested.tsx :::

## API

### Dropdown

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `children` | `ReactElement` | — | 唯一触发元素 |
| `menu` | `ReactNode` | — | 菜单内容 |
| `trigger` | `'hover' \| 'click' \| 'context-menu' \| 'manual'` | `'hover'` | 打开方式 |
| `open` / `defaultOpen` | `boolean` | — / `false` | 受控状态或初始打开状态 |
| `theme` | `'default' \| 'gray' \| 'midnight'` | `'default'` | 视觉主题 |
| `size` | `'small' \| 'medium'` | `'medium'` | 菜单尺寸 |
| `disabled` | `boolean` | `false` | 禁止打开菜单 |
| `align` | `'left' \| 'right' \| 'center'` | `'left'` | 未设置 `placement` 时的对齐方式 |
| `placement` | `PopoverPlacement` | — | 明确指定浮层位置 |
| `width` | `string \| number` | — | 菜单宽度 |
| `submenuLeft` | `boolean` | `false` | 子菜单向左展开 |
| `portal` / `portalContainer` | `boolean` / `PortalTarget` | `true` / `'body'` | Portal 开关与挂载位置 |
| `showDelay` / `hideDelay` | `number` | `200` / `100` | 悬停打开与关闭延迟，单位毫秒 |
| `distance` | `number` | `4` | 菜单与触发元素的距离 |
| `exclusive` | `boolean` | `true` | 打开时关闭其他互斥菜单 |
| `hideEvent` | `'click' \| 'mousedown' \| 'mouseup'` | `'click'` | 外部关闭事件 |
| `onOpenChange` | `(open, details) => void` | — | 打开状态请求回调 |
| `onCommand` | `(command) => void` | — | 菜单项命令回调 |

组件 ref 提供 `open()`、`close()` 和 `focusFirst()`，并支持原生 `div` 属性。

### DropdownMenu 与 DropdownGroup

`DropdownMenu` 支持原生 `div` 属性，并以菜单语义渲染子元素。`DropdownGroup` 额外提供 `title?: string` 和 `titleContent?: ReactNode`；富标题内容使用 `titleContent`。

### DropdownItem

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `children` | `ReactNode` | — | 菜单项内容 |
| `icon` | `ReactNode` | — | 前置图标 |
| `command` | `unknown` | — | 传给 `onCommand` 的值 |
| `disabled` / `active` | `boolean` | `false` | 禁用与激活状态 |
| `divided` | `boolean` | `false` | 在菜单项前显示分隔线 |
| `allowImmediatePropagation` | `boolean` | `false` | 允许同一原生事件上的后续监听器执行 |
| `onPress` | `(event) => void` | — | 菜单项激活回调 |

### DropdownSubmenu

`DropdownSubmenu` 提供 `submenu: ReactNode`、`title?: string`、`children?: ReactNode`、`icon?: ReactNode`、`trigger?: 'hover' | 'click'`，以及 `disabled`、`active`、`selected` 状态属性。`onPress` 用于监听子菜单触发器激活，同时支持原生 `div` 属性。
