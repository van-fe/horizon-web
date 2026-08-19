# Link 文字链接

Link 支持原生导航、路由适配器导航、操作触发、锚点滚动以及加载和禁用状态。链接内容应清晰说明目的地或要执行的操作。

```tsx
import { Link } from '@aurora/horizon-react';
import '@aurora/horizon-react/style.css';
```

:::react-demo react/components/Link/basic.tsx :::

路由目标由最近的 `HorizonWebProvider` `navigate` 回调处理。如果路由链接还需要保留新标签页打开、复制地址等原生语义，请同时提供 `resolveHref`。

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `variant` | `'primary' \| 'normal' \| 'danger'` | `'primary'` | 语义颜色 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 文字尺寸 |
| `underline` | `boolean \| 'always'` | `true` | 下划线策略 |
| `disabled` | `boolean` | `false` | 阻止导航和操作 |
| `loading` | `boolean` | `false` | 显示 Provider 加载文案并禁止交互 |
| `href` | `string` | — | 原生目的地 |
| `target` | `'_blank' \| '_self' \| '_parent' \| '_top'` | — | 浏览上下文目标 |
| `to` | `unknown` | — | Provider 导航目标 |
| `replace` | `boolean` | `false` | Provider 导航时请求替换历史记录 |
| `attribute` | `boolean` | `false` | 使用注释样式 |
| `anchor` | `string` | — | 锚点标识和标记 |
| `anchorPosition` | `'left' \| 'right'` | `'right'` | 锚点标记位置 |
| `anchorOffset` | `number` | `0` | 滚动像素偏移 |
| `scrollTarget` | `string \| Element` | `'body'` | 滚动容器或选择器 |
| `prefix` / `suffix` | `ReactNode` | — | 主标签前后内容 |
| `icon` | `ReactNode` | — | 后缀图标或内容 |
| `onClick` | `(event: MouseEvent) => void` | — | 原生链接或操作回调 |

转发的 ref 指向实际渲染的 `HTMLAnchorElement`，锚点模式下指向 `HTMLSpanElement`。
