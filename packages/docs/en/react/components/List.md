# List

List displays repeated, similarly structured content in a continuous collection.

## Data Rendering

Pass typed source data and render each row with `renderItem`.

:::react-demo react/components/List/basic.tsx :::

## Content Regions

List supports header, footer, and static children. ListItem provides title, leading content, description, body, and actions.

:::react-demo react/components/List/regions.tsx :::

## Bounded Height

A positive `maxHeight` keeps long collections scrollable inside the component.

:::react-demo react/components/List/bounded.tsx :::

## List Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `data` | `readonly Item[]` | — | Source items |
| `renderItem` | `(item, index) => ReactNode` | — | Item renderer |
| `children` | `ReactNode` | — | Static list content |
| `header` / `footer` | `ReactNode` | — | Header and footer content |
| `zebra` | `boolean` | `false` | Alternating row backgrounds |
| `border` | `boolean` | `false` | Outer border |
| `split` | `boolean` | `true` | Item separators |
| `maxHeight` | `number` | `0` | Maximum height; non-positive values disable it |
| `size` | `'small' \| 'medium'` | Provider size | Item spacing size |

## ListItem Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` / `subtitle` | `string` | — | Fallback title and subtitle |
| `titleContent` | `ReactNode` | — | Custom title content |
| `titleSize` | `'small' \| 'medium'` | Provider size | Title size |
| `titleBold` | `boolean` | `true` | Bold fallback title |
| `describe` | `string` | — | Fallback description |
| `descriptionContent` | `ReactNode` | — | Custom description content |
| `leading` / `actions` | `ReactNode` | — | Leading content and trailing actions |
| `children` | `ReactNode` | — | Item body content |

Both components forward refs to their root `HTMLDivElement` and accept native div attributes.
