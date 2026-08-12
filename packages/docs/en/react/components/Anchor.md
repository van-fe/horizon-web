# Anchor

Anchor presents page sections as native links, follows the active section while its target scrolls, and preserves nested hierarchy.

## Section navigation

Use a stable resolver for a ref-owned scroll container. `changeHash={false}` keeps navigation local to the current surface.

:::react-demo react/components/Anchor/basic.tsx :::

## Controlled collapse

`collapsed` and `onCollapseChange` make the navigation state explicit. The toggle is a native button with `aria-expanded`.

:::react-demo react/components/Anchor/collapse.tsx :::

## Automatic headings

`autoRenderRules` maps selectors to hierarchy levels. Call `refreshAnchorList()` after dynamic headings are added.

:::react-demo react/components/Anchor/automatic.tsx :::

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `'small' \| 'medium'` | `'medium'` | Navigation size |
| `maxHeight` | `number` | `750` | Maximum scrollable height |
| `changeHash` | `boolean` | `true` | Allows native hash updates |
| `scrollContainer` | `string \| HTMLElement \| Window \| (() => target)` | `window` | Observed and scrolled target |
| `scrollBehavior` | `'auto' \| 'smooth'` | `'smooth'` | Native scrolling behavior |
| `scrollOffset` | `number \| 'start' \| 'center' \| 'end'` | `'start'` | Click destination alignment |
| `boundsOffset` | `number \| 'start' \| 'center' \| 'end'` | `5` | Active-section boundary |
| `useCollapse` | `boolean` | `false` | Enables the collapse action |
| `collapsed` / `defaultCollapsed` | `boolean` | — / `false` | Controlled or initial collapse state |
| `collapseText` | `ReactNode` | `'Navigation'` | Collapse action content |
| `showLine` / `showHighlightLine` | `boolean` | `true` | Side-line visibility |
| `showTitleSuffix` | `boolean` | `false` | Shows top-level child counts |
| `autoRender` | `boolean` | `false` | Scans headings automatically |
| `autoRenderRules` | `readonly (string \| readonly string[])[]` | `h1`–`h6` | Selectors grouped by level |
| `linkTarget` | native anchor target | — | Overrides every AnchorLink target |

`AnchorLink` accepts `href`, `title`, `titleContent`, `target`, nested `children`, `className`, and `style`.

## Callbacks and ref

`onLinkClick(link, event)`, `onChange(link, previousLink)`, and `onCollapseChange(collapsed)` report user and scroll state. `AnchorHandle` exposes `updateActiveLink()`, `refreshAnchorList()`, `updateScrollContainer()`, `getAnchorList()`, and the readonly root `element`.

## Accessibility

Anchor renders a labelled `nav`, native links, and a native collapse button. Give the navigation a specific `aria-label` when several section navigations appear on one page.
