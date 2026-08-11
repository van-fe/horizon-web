# Dropdown

Dropdown presents contextual actions or navigation in a keyboard-accessible menu.

## Basic usage

:::react-demo react/components/Dropdown/basic.tsx :::

## Trigger methods

Hover, click, and context-menu triggers are available.

:::react-demo react/components/Dropdown/triggers.tsx :::

## Groups and nested menus

:::react-demo react/components/Dropdown/nested.tsx :::

## API

### Dropdown

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactElement` | — | Single trigger element |
| `menu` | `ReactNode` | — | Menu content |
| `trigger` | `'hover' \| 'click' \| 'context-menu' \| 'manual'` | `'hover'` | Opening interaction |
| `open` / `defaultOpen` | `boolean` | — / `false` | Controlled or initial open state |
| `theme` | `'default' \| 'gray' \| 'midnight'` | `'default'` | Visual theme |
| `size` | `'small' \| 'medium'` | `'medium'` | Menu size |
| `disabled` | `boolean` | `false` | Disables opening |
| `align` | `'left' \| 'right' \| 'center'` | `'left'` | Alignment when `placement` is omitted |
| `placement` | `PopoverPlacement` | — | Explicit floating placement |
| `width` | `string \| number` | — | Menu width |
| `submenuLeft` | `boolean` | `false` | Opens nested menus to the left |
| `portal` / `portalContainer` | `boolean` / `PortalTarget` | `true` / `'body'` | Portal behavior and destination |
| `showDelay` / `hideDelay` | `number` | `200` / `100` | Hover delays in milliseconds |
| `distance` | `number` | `4` | Distance from the trigger |
| `exclusive` | `boolean` | `true` | Closes other exclusive dropdowns |
| `hideEvent` | `'click' \| 'mousedown' \| 'mouseup'` | `'click'` | Outside dismissal event |
| `onOpenChange` | `(open, details) => void` | — | Reports requested open-state changes |
| `onCommand` | `(command) => void` | — | Reports an activated item command |

The ref exposes `open()`, `close()`, and `focusFirst()`. Native `div` attributes are supported.

### DropdownMenu and DropdownGroup

`DropdownMenu` accepts native `div` attributes and renders its children with `menu` semantics. `DropdownGroup` adds `title?: string` and `titleContent?: ReactNode`; `titleContent` can provide a rich group heading.

### DropdownItem

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | — | Item content |
| `icon` | `ReactNode` | — | Leading icon |
| `command` | `unknown` | — | Value passed to `onCommand` |
| `disabled` / `active` | `boolean` | `false` | Disabled and active states |
| `divided` | `boolean` | `false` | Shows a divider before the item |
| `allowImmediatePropagation` | `boolean` | `false` | Allows later listeners on the same native event |
| `onPress` | `(event) => void` | — | Runs when the item is activated |

### DropdownSubmenu

`DropdownSubmenu` accepts `submenu: ReactNode`, `title?: string`, `children?: ReactNode`, `icon?: ReactNode`, `trigger?: 'hover' | 'click'`, and the `disabled`, `active`, and `selected` state props. `onPress` observes activation of its menu trigger. Native `div` attributes are also supported.
