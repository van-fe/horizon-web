# Steps

Steps presents the current position and state of a multi-stage process.

```tsx
import { Step, Steps } from '@aurora/horizon-react';
import '@aurora/horizon-react/style.css';
```

## Controlled progress

Use `value` and `onChange` to keep the active stage in application state. When `clickable` is enabled, each available stage uses a native button and remains keyboard accessible.

:::react-demo react/components/Steps/basic.tsx :::

## Direction and appearance

Choose horizontal or vertical orientation, small or medium sizing, and numbered or dot nodes. Labels can be placed beside or below nodes.

:::react-demo react/components/Steps/appearance.tsx :::

## Guarded and disabled stages

`onBeforeChange` may return a boolean or promise. Returning or resolving to `false`, or rejecting, keeps the current stage unchanged. A disabled `Step` is rendered as unavailable and cannot be activated.

:::react-demo react/components/Steps/guard.tsx :::

## Steps props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | — | Composed `Step` items |
| `value` | `number` | — | Controlled current index |
| `defaultValue` | `number` | `0` | Initial uncontrolled index |
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | Orientation |
| `labelPlacement` | `'horizontal' \| 'vertical'` | `'horizontal'` | Label placement |
| `labelAlign` | `'center' \| 'left'` | `'center'` | Horizontal label alignment |
| `size` | `'small' \| 'medium'` | `'medium'` | Component size |
| `status` | `'wait' \| 'process' \| 'finish' \| 'warning' \| 'error'` | `'process'` | Current-stage status |
| `progressDot` | `boolean` | `false` | Uses dot nodes |
| `clickable` | `boolean` | `false` | Enables stage actions |
| `controllable` | `boolean` | `true` | Lets actions update the current index |
| `initial` | `number` | `0` | Starting value for automatic indexes |
| `onBeforeChange` | `StepsBeforeChange<StepProps>` | — | Sync or async change guard |
| `onChange` | `(current: number) => void` | — | Current index changed |

`Steps` accepts native `ol` attributes. Its ref implements `StepsHandle`: `focus(index?)` focuses an available stage and `root` exposes the ordered-list element.

## Step props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `ReactNode` | `''` | Stage title |
| `subtitle` | `ReactNode` | — | Stage subtitle |
| `description` | `ReactNode` | `''` | Stage description |
| `icon` | `ReactNode` | — | Custom node icon |
| `index` | `number` | — | Explicit index for dynamic stages |
| `clickable` | `boolean` | — | Overrides parent clickability |
| `disabled` | `boolean` | `false` | Disables activation |
| `onClick` | `(event, index) => void` | — | Available stage activated |
| `buttonProps` | `ButtonHTMLAttributes<HTMLButtonElement>` | — | Native action-button attributes |

`Step` accepts native `li` attributes and forwards its ref to the list item.
