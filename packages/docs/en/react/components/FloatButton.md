# FloatButton

FloatButton keeps a compact action above page content. It supports semantic buttons and links, tooltips, badges, stacking, pointer dragging, edge adsorption, and expandable action groups.

```tsx
import {
  FloatButton,
  FloatButtonGroup,
  type FloatButtonHandle,
  type FloatButtonGroupHandle,
} from '@aurora/horizon-web-react';
import '@aurora/horizon-web-react/style.css';
```

## Basic usage

Actions without `href` render as native buttons. A ref can show, hide, focus, or inspect the current action element.

:::react-demo react/components/FloatButton/basic.tsx :::

## Content, badge, and navigation

Use `icon` and `description` as React regions. A string tooltip uses the default settings, while an object accepts Tooltip options. Supplying `href` renders a native link.

:::react-demo react/components/FloatButton/content.tsx :::

## Expandable action group

FloatButtonGroup shares appearance and visibility with its actions. With `useCollapse`, it can own expansion internally or receive `expanded` and `onExpandedChange` for controlled state.

:::react-demo react/components/FloatButton/group.tsx :::

## Pointer dragging

Dragging emits lifecycle callbacks and removes the action from automatic stacking. It adsorbs to the right edge by default; `adsorbBottom` also permits bottom-edge adsorption.

:::react-demo react/components/FloatButton/draggable.tsx :::

## FloatButton props {#float-button-api}

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `icon` | `ReactNode` | — | Icon region |
| `description` | `ReactNode` | — | Description region |
| `ariaLabel` | `string` | Provider label | Accessible name when no description is present |
| `tooltip` | `string \| FloatButtonTooltipOptions` | — | Tooltip text or Tooltip options |
| `variant` | `'normal' \| 'primary'` | `'normal'` | Visual variant |
| `shape` | `'circle' \| 'square'` | `'circle'` | Button shape |
| `href` | `string` | — | Navigation URL; switches the action to an anchor |
| `target` | `'_blank' \| '_self' \| '_parent' \| '_top'` | `'_self'` | Link browsing context |
| `badge` | `boolean \| FloatButtonBadgeOptions` | `false` | Dot badge or Badge options |
| `draggable` | `boolean` | `false` | Enables pointer dragging |
| `adsorbBottom` | `boolean` | `false` | Allows bottom-edge adsorption |
| `visible` | `boolean` | — | Controlled visibility |
| `defaultVisible` | `boolean` | `true` | Initial uncontrolled visibility |
| `disabled` | `boolean` | `false` | Disables button activation and dragging |
| `className` / `style` | native button values | — | Action customization |

Other compatible native button attributes are forwarded. When `href` is supplied, shared ARIA, class, style, and event attributes are applied to the anchor.

## FloatButton callbacks

| Callback | Type | Description |
| --- | --- | --- |
| `onClick` | `(event: ReactMouseEvent<HTMLButtonElement \| HTMLAnchorElement>) => void` | Reports activation |
| `onVisibleChange` | `(visible: boolean) => void` | Reports imperative visibility requests |
| `onDragStart` | `() => void` | Reports drag start |
| `onDragging` | `() => void` | Reports pointer movement during dragging |
| `onDragEnd` | `() => void` | Reports drag completion and adsorption |

## FloatButton ref

| Member | Type | Description |
| --- | --- | --- |
| `show()` | `() => void` | Shows an uncontrolled action or requests controlled visibility |
| `hide()` | `() => void` | Hides an uncontrolled action or requests controlled visibility |
| `focus()` | `() => void` | Focuses the action |
| `element` | `HTMLButtonElement \| HTMLAnchorElement \| null` | Readonly action element |

## FloatButtonGroup props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | — | Grouped actions |
| `variant` | `'normal' \| 'primary'` | — | Variant shared by child actions |
| `shape` | `'circle' \| 'square'` | — | Shape shared by child actions |
| `useCollapse` | `boolean` | `false` | Enables the collapse action and floating panel |
| `trigger` | `'click' \| 'hover'` | `'click'` | Expansion interaction |
| `expandIcon` / `foldIcon` | `ReactNode` | built-in icons | Collapse action icons |
| `expandTooltip` / `foldTooltip` | `string \| FloatButtonTooltipOptions` | — | Collapse action tooltips |
| `badge` | `FloatButtonBadgeOptions` | — | Collapse action badge |
| `draggable` | `boolean` | `false` | Enables dragging the collapse action |
| `adsorbBottom` | `boolean` | `false` | Allows bottom adsorption for the collapse action |
| `visible` | `boolean` | — | Controlled group visibility |
| `defaultVisible` | `boolean` | `true` | Initial uncontrolled group visibility |
| `expanded` | `boolean` | — | Controlled expansion |
| `defaultExpanded` | `boolean` | `false` | Initial uncontrolled expansion |

## FloatButtonGroup callbacks and ref

| Callback | Type | Description |
| --- | --- | --- |
| `onVisibleChange` | `(visible: boolean) => void` | Reports group visibility requests |
| `onExpandedChange` | `(expanded: boolean, details: FloatButtonGroupExpansionDetails) => void` | Reports expansion requests and their reason |
| `onExpand` / `onFold` | `() => void` | Reports requested expansion or folding |
| `onClick` | `() => void` | Reports collapse action clicks |

`FloatButtonGroupHandle` exposes `show()`, `hide()`, `expand()`, `fold()`, and `toggle()`.

## Global labels and accessibility

`HorizonWebProvider` accepts `floatButtonLabels` with `button`, `expand`, and `fold` strings. An instance `ariaLabel` or a visible description takes precedence for a standalone action.

The action uses native button or link semantics and remains keyboard focusable. Tooltip ownership is attached to the same semantic element. The collapse action exposes expanded state and receives localized accessible labels from the provider.
