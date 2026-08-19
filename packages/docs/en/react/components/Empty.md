# Empty

Empty presents a consistent placeholder when data or content is unavailable and can include a follow-up action.

```tsx
import { Empty } from '@aurora/horizon-react';
import '@aurora/horizon-react/style.css';
```

:::react-demo react/components/Empty/basic.tsx :::

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `image` | `string` | built-in illustration | Image source |
| `size` | `'small' \| 'medium' \| 'large' \| number` | `'medium'` | Image size |
| `description` | `string` | — | Description |
| `imageAlt` | `string` | `''` | Image alternative text |
| `imageContent` / `descriptionContent` | `ReactNode` | — | Custom image and description |
| `children` | `ReactNode` | — | Footer content |

The component accepts native `div` attributes and forwards its ref to the root `HTMLDivElement`.
