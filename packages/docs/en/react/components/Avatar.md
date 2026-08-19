# Avatar

Avatar identifies a person, team, or object with an image, initials, or custom content.

## Basic Usage

```tsx
import { Avatar } from '@aurora/horizon-react';
import '@aurora/horizon-react/style.css';
```

:::react-demo react/components/Avatar/basic.tsx :::

## Accessibility

Provide an accurate `alt` for meaningful images. Use an empty string for decorative images, and give text or custom content an accessible name when its meaning is not already visible.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `'mini' \| 'small' \| 'smedium' \| 'medium' \| 'large' \| number` | `'medium'` | Preset or pixel size |
| `src` | `string \| readonly string[]` | — | Image URL, initials source, or up to nine group images |
| `fit` | `CSSProperties['objectFit']` | `'cover'` | Image fitting mode |
| `type` | `'normal' \| 'work'` | `'normal'` | Regular image or initials treatment |
| `fallbackSrc` | `string` | Default avatar | Image used after a load error |
| `randomSrc` | `readonly string[]` | `[]` | Candidate images when no valid source is present |
| `alt` | `string` | `''` | Image alternative text |
| `icon` | `ReactNode` | — | Icon content |
| `fallback` | `ReactNode` | — | Content rendered after an image load error |
| `children` | `ReactNode` | — | Fully custom avatar content |

The component accepts applicable native `span` attributes. Its `ref` resolves to the root `HTMLSpanElement`.

## Callbacks

| Callback | Type | Description |
| --- | --- | --- |
| `onError` | `(event: SyntheticEvent<HTMLImageElement>) => void` | Called when the image fails to load |
