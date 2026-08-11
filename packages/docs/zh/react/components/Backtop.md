# Backtop 回到顶部

Backtop 在页面或滚动容器超过指定阈值后显示紧凑操作，并通过尊重减少动态效果偏好的滚动行为返回顶部。

## 滚动容器

`target` 可接收选择器、元素、窗口或稳定的目标解析函数。操作使用原生按钮，并支持原生按钮属性。

:::react-demo react/components/Backtop/basic.tsx :::

## 自定义内容与命令

`children` 会替换默认箭头，ref 可主动请求滚动或聚焦当前可见操作。

:::react-demo react/components/Backtop/custom.tsx :::

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `visibilityHeight` | `number` | `400` | 显示操作的滚动阈值 |
| `bottom` | `number` | `120` | 距离视口底部的像素值 |
| `right` | `number` | `24` | 距离视口右侧的像素值 |
| `target` | `string \| Window \| HTMLElement \| (() => target)` | `window` | 被监听和滚动的目标 |
| `children` | `ReactNode` | 箭头图标 | 可见操作内容 |
| `ariaLabel` | `string` | Provider 文案 | 可访问名称 |
| 原生按钮属性 | `ButtonHTMLAttributes<HTMLButtonElement>` | — | 冲突字段之外的原生属性 |

## 回调与 ref

`onClick(event)` 在滚动开始后收到原生 React 鼠标事件。`BacktopHandle` 提供 `scrollToTop()`、`focus()` 和只读 `element`。

`HorizonWebProvider` 可通过 `backtopLabels.button` 配置默认可访问名称。

## 无障碍

操作使用带 `type="button"` 的原生 `button`。自定义内容没有明确文字时，应提供简洁的 `ariaLabel`。启用减少动态效果偏好后会跳过平滑动画。
