# Progress

Progress communicates task completion with line, circle, and dashboard presentations.

## Basic Usage

```tsx
import { Progress } from '@aurora/horizon-web-react';
import '@aurora/horizon-web-react/style.css';
```

:::react-demo react/components/Progress/basic.tsx :::

The root uses the `progressbar` role and exposes its current value, range, and text description.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `percentage` | `number` | — | Current percentage from 0 through 100 |
| `type` | `'line' \| 'circle' \| 'dashboard'` | `'line'` | Progress presentation |
| `status` | `'' \| 'success' \| 'warning' \| 'exception' \| 'error'` | `''` | Status |
| `size` | `'mini' \| 'small' \| 'medium' \| 'large'` | `'medium'` | Size |
| `duration` | `number` | `3` | Animation duration in seconds |
| `format` | `(percentage: number) => string` | percentage text | Text formatter |
| `content` | `string \| number \| boolean` | `''` | Fixed text content |
| `placement` | `'' \| 'follow'` | `''` | Line-label placement |
| `textBold` | `boolean` | `false` | Uses bold text |
| `showText` | `boolean` | `true` | Shows the text |
| `color` | `string \| readonly (string \| ProgressColorStop)[] \| ProgressColorResolver` | `''` | Custom color |
| `children` | `ReactNode` | — | Custom visible label |
