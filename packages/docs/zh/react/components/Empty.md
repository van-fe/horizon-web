# Empty 空状态

Empty 在无数据或无内容时展示统一占位，并可提供后续操作。

```tsx
import { Empty } from '@aurora/horizon-web-react';
import '@aurora/horizon-web-react/style.css';
```

:::react-demo react/components/Empty/basic.tsx :::

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `image` | `string` | 内置插图 | 图片地址 |
| `size` | `'small' \| 'medium' \| 'large' \| number` | `'medium'` | 图片尺寸 |
| `description` | `string` | — | 描述文本 |
| `imageAlt` | `string` | `''` | 图片替代文本 |
| `imageContent` / `descriptionContent` | `ReactNode` | — | 自定义图片与描述 |
| `children` | `ReactNode` | — | 底部内容 |

组件接受原生 `div` 属性，`ref` 指向根 `HTMLDivElement`。
