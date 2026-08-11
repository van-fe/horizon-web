# Backtop

Backtop reveals a compact action after a page or scrolling container crosses a configured threshold, then returns that target to the top with motion-aware scrolling.

## Scroll container

Pass a selector, element, window, or stable target resolver. The action is a native button and accepts native button attributes.

:::react-demo react/components/Backtop/basic.tsx :::

## Custom content and commands

Custom children replace the default arrow. A ref can request scrolling or focus the visible action.

:::react-demo react/components/Backtop/custom.tsx :::

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `visibilityHeight` | `number` | `400` | Scroll threshold that reveals the action |
| `bottom` | `number` | `120` | Pixel offset from the viewport bottom |
| `right` | `number` | `24` | Pixel offset from the viewport right edge |
| `target` | `string \| Window \| HTMLElement \| (() => target)` | `window` | Observed and scrolled target |
| `children` | `ReactNode` | arrow icon | Visible action content |
| `ariaLabel` | `string` | provider label | Accessible action name |
| native button props | `ButtonHTMLAttributes<HTMLButtonElement>` | — | Native attributes except conflicting fields |

## Callback and ref

`onClick(event)` receives the native React mouse event after scrolling begins. `BacktopHandle` exposes `scrollToTop()`, `focus()`, and the readonly `element`.

`HorizonWebProvider` accepts `backtopLabels.button` for the default accessible name.

## Accessibility

The action uses a native `button` with `type="button"`. Provide a concise `ariaLabel` when custom content does not contain a meaningful text label. Reduced-motion preferences skip the smooth animation.
