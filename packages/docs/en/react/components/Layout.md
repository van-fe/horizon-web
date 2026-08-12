# Layout

Grid and GridItem build responsive track layouts with native CSS Grid. Values declared at a smaller breakpoint carry forward until a larger breakpoint overrides them.

## Columns

Grid uses 24 columns by default. Each GridItem declares how many tracks it occupies.

:::react-demo react/components/Layout/basic.tsx :::

## Responsive values

`cols`, all gap props, `span`, and `offset` accept either a number or an object keyed by `xs`, `sm`, `md`, `lg`, `xl`, and `xxl`.

:::react-demo react/components/Layout/responsive.tsx :::

## Placement and alignment

Use directional gaps for independent row and column spacing. `align` and `justify` control item alignment, while `offset` reserves leading tracks.

:::react-demo react/components/Layout/placement.tsx :::

## Grid API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `tag` | `ElementType` | `'div'` | Root element type |
| `cols` | `GridValue` | `24` | Column count |
| `gap` | `GridValue` | `0` | Row and column gap in pixels |
| `columnGap` | `GridValue` | `gap` | Column gap in pixels |
| `rowGap` | `GridValue` | `gap` | Row gap in pixels |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch'` | `'stretch'` | Vertical item alignment |
| `justify` | `'start' \| 'center' \| 'end' \| 'stretch'` | `'stretch'` | Horizontal item alignment |
| `children` | `ReactNode` | — | Grid content |

Grid accepts native attributes for the selected element and forwards its ref.

## GridItem API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `span` | `GridValue` | `1` | Occupied columns; zero hides the item at that breakpoint |
| `offset` | `GridValue` | `0` | Leading empty columns |
| `children` | `ReactNode` | — | Item content |

GridItem accepts native `div` attributes and forwards its ref. It is exported as both `GridItem` and `Grid.Item`.

## Breakpoints

The active ranges are `xs` up to 480px, `sm` from 480px, `md` from 1024px, `lg` from 1440px, `xl` from 1920px, and `xxl` from 2880px.
