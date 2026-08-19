# Tabs 页签

页签用于在相关视图之间快速切换，并保持用户处于当前上下文。

```tsx
import { Tab, Tabs } from '@aurora/horizon-react';
import '@aurora/horizon-react/style.css';
```

## 受控选择

当选中视图属于业务状态时，使用 `value` 和 `onChange`。禁用项仍保留在页签结构中，但不能被选中。

:::react-demo react/components/Tabs/basic.tsx :::

## 外观与尺寸

可以选择线型、卡片、分段或页面外观；页面页签使用固定尺寸。

:::react-demo react/components/Tabs/variants.tsx :::

## 可编辑与拖拽页签

`editable` 会加入可访问的新增操作。单个页签可以关闭，`draggable` 则通过 `onSort` 返回排序后的标识序列。

:::react-demo react/components/Tabs/editable.tsx :::

## Tabs Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `TabsKey` | — | 受控选中项 |
| `defaultValue` | `TabsKey` | — | 非受控初始选中项 |
| `size` | `'small' \| 'medium' \| 'large' \| 'huge'` | `'small'` | 组件尺寸 |
| `variant` | `'line' \| 'card' \| 'segment' \| 'page'` | `'line'` | 外观类型 |
| `draggable` | `boolean` | `false` | 允许拖拽排序 |
| `scrollable` | `boolean` | `true` | 允许溢出导航 |
| `focusable` | `boolean` | `true` | 将选中项移入视口 |
| `arrow` | `boolean` | `true` | 展示溢出导航箭头 |
| `underline` | `boolean` | `true` | 展示线型分割线 |
| `indicator` | `boolean` | `true` | 展示选中指示器 |
| `editable` | `boolean` | `false` | 展示新增操作 |
| `beforeChange` | `(key: TabsKey) => boolean \| PromiseLike<boolean>` | — | 切换守卫 |
| `extra` | `ReactNode \| (context) => ReactNode` | — | 额外操作 |
| `children` | `ReactNode` | — | 页签条目 |

`Tabs` 接受原生 `div` 属性。回调包括 `onChange(key)`、`onAdd()`、`onClose(key)` 和 `onSort(current, target, keys)`。ref 实现 `TabsHandle`：`focus(key?)` 聚焦当前/第一个可用页签或指定页签，`root` 暴露 tablist 元素。

## Tab Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `TabsKey` | — | 必填的唯一标识 |
| `label` | `ReactNode` | — | 页签文本 |
| `icon` | `ReactNode` | — | 前置图标 |
| `iconSize` | `string \| number` | — | 图标尺寸 |
| `disabled` | `boolean` | `false` | 禁用选择 |
| `closable` | `boolean` | `false` | 展示关闭操作 |
| `draggable` | `boolean` | `true` | 允许当前页签拖拽 |
| `children` | `ReactNode \| (context) => ReactNode` | — | 自定义页签内容 |

`Tab` 接受原生 `div` 属性，并支持 `onClick(key)` 与 `onClose(key)`。方向键左右、Home 和 End 会在可用页签间移动焦点和选择。
