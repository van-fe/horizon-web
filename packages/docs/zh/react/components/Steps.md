# Steps 步骤条

步骤条用于展示多阶段流程中的当前位置和各阶段状态。

```tsx
import { Step, Steps } from '@aurora/horizon-react';
import '@aurora/horizon-react/style.css';
```

## 受控进度

使用 `value` 和 `onChange` 将当前步骤保存在业务状态中。启用 `clickable` 后，每个可用步骤都使用原生按钮，并可通过键盘操作。

:::react-demo react/components/Steps/basic.tsx :::

## 方向与外观

步骤条支持水平或垂直方向、小型或中型尺寸，以及数字节点或点状节点；标签可放在节点侧边或下方。

:::react-demo react/components/Steps/appearance.tsx :::

## 切换守卫与禁用步骤

`onBeforeChange` 可以返回布尔值或 Promise；返回或解析为 `false`，以及 Promise 拒绝时，当前步骤保持不变。禁用的 `Step` 会展示为不可用，也不能触发切换。

:::react-demo react/components/Steps/guard.tsx :::

## Steps props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | — | 组合的 `Step` 条目 |
| `value` | `number` | — | 受控的当前索引 |
| `defaultValue` | `number` | `0` | 非受控初始索引 |
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | 排列方向 |
| `labelPlacement` | `'horizontal' \| 'vertical'` | `'horizontal'` | 标签位置 |
| `labelAlign` | `'center' \| 'left'` | `'center'` | 水平布局标签对齐 |
| `size` | `'small' \| 'medium'` | `'medium'` | 组件尺寸 |
| `status` | `'wait' \| 'process' \| 'finish' \| 'warning' \| 'error'` | `'process'` | 当前步骤状态 |
| `progressDot` | `boolean` | `false` | 使用点状节点 |
| `clickable` | `boolean` | `false` | 启用步骤操作 |
| `controllable` | `boolean` | `true` | 操作后更新当前索引 |
| `initial` | `number` | `0` | 自动索引起始值 |
| `onBeforeChange` | `StepsBeforeChange<StepProps>` | — | 同步或异步切换守卫 |
| `onChange` | `(current: number) => void` | — | 当前索引变化 |

`Steps` 接受原生 `ol` 属性。ref 实现 `StepsHandle`：`focus(index?)` 聚焦可用步骤，`root` 暴露有序列表元素。

## Step props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `ReactNode` | `''` | 步骤标题 |
| `subtitle` | `ReactNode` | — | 步骤副标题 |
| `description` | `ReactNode` | `''` | 步骤描述 |
| `icon` | `ReactNode` | — | 自定义节点图标 |
| `index` | `number` | — | 动态步骤的显式索引 |
| `clickable` | `boolean` | — | 覆盖父级可点击设置 |
| `disabled` | `boolean` | `false` | 禁止激活 |
| `onClick` | `(event, index) => void` | — | 激活可用步骤 |
| `buttonProps` | `ButtonHTMLAttributes<HTMLButtonElement>` | — | 原生操作按钮属性 |

`Step` 接受原生 `li` 属性，ref 指向列表条目。
