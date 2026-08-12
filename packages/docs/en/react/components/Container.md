# Container

Container composes semantic page regions into horizontal, vertical, and nested application shells.

## Header, main, and footer

Direct Header or Footer children select a vertical layout automatically.

:::react-demo react/components/Container/basic.tsx :::

## Nested sidebar layout

Nest a horizontal Container inside a vertical shell to place Aside next to Main below a Header.

:::react-demo react/components/Container/sidebar.tsx :::

## Explicit direction and dimensions

Set `direction` when layout intent should not depend on child regions. Numeric dimensions use pixels; CSS dimension strings are preserved.

:::react-demo react/components/Container/dimensions.tsx :::

## API

### Container

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `direction` | `'horizontal' \| 'vertical'` | inferred | Region direction |
| `children` | `ReactNode` | — | Layout regions |

Container accepts native `section` attributes and forwards its ref to the root `HTMLElement`.

### Header

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `height` | `string \| number` | `60px` from Theme | Header height |
| `children` | `ReactNode` | — | Header content |

Header accepts native `header` attributes and forwards its ref.

### Aside

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `width` | `string \| number` | `300px` from Theme | Aside width |
| `children` | `ReactNode` | — | Aside content |

Aside accepts native `aside` attributes and forwards its ref.

### Main

Main accepts native `main` attributes, `children`, and a forwarded ref. It grows to fill remaining space and owns overflow scrolling.

### Footer

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `height` | `string \| number` | `60px` from Theme | Footer height |
| `children` | `ReactNode` | — | Footer content |

Footer accepts native `footer` attributes and forwards its ref.

## Accessibility

Header, Aside, Main, and Footer render their corresponding HTML landmarks. A page should normally contain one primary Main region, and multiple Aside regions should receive distinct accessible labels when their purpose is not obvious.
