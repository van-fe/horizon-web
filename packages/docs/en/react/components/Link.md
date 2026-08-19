# Link

Link provides native navigation, route-adapter navigation, action behavior, anchor scrolling, and loading or disabled states. Use descriptive content that explains the destination or action.

```tsx
import { Link } from '@aurora/horizon-react';
import '@aurora/horizon-react/style.css';
```

:::react-demo react/components/Link/basic.tsx :::

Route targets use the nearest `HorizonWebProvider` `navigate` callback. Provide `resolveHref` as well when the route should retain native link semantics such as opening in a new tab or copying the address.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'primary' \| 'normal' \| 'danger'` | `'primary'` | Semantic color |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Text size |
| `underline` | `boolean \| 'always'` | `true` | Underline policy |
| `disabled` | `boolean` | `false` | Prevents navigation and actions |
| `loading` | `boolean` | `false` | Shows the provider loading label and prevents interaction |
| `href` | `string` | — | Native destination |
| `target` | `'_blank' \| '_self' \| '_parent' \| '_top'` | — | Browsing-context target |
| `to` | `unknown` | — | Provider navigation target |
| `replace` | `boolean` | `false` | Requests history replacement during provider navigation |
| `attribute` | `boolean` | `false` | Uses annotation styling |
| `anchor` | `string` | — | Anchor identifier and marker |
| `anchorPosition` | `'left' \| 'right'` | `'right'` | Anchor-marker position |
| `anchorOffset` | `number` | `0` | Scroll offset in pixels |
| `scrollTarget` | `string \| Element` | `'body'` | Scroll container or selector |
| `prefix` / `suffix` | `ReactNode` | — | Content around the main label |
| `icon` | `ReactNode` | — | Trailing icon or content |
| `onClick` | `(event: MouseEvent) => void` | — | Native-link or action callback |

The forwarded ref points to the rendered `HTMLAnchorElement` or anchor-mode `HTMLSpanElement`.
