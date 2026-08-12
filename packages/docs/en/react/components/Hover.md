# Hover

Hover provides hover state for one target without adding a DOM wrapper. The target can be a React element or a render function receiving the current state.

## Basic usage

:::react-demo react/components/Hover/basic.tsx :::

## Delayed transitions

Opposite delayed transitions cancel each other, so a quick enter and leave cannot commit stale state.

:::react-demo react/components/Hover/delay.tsx :::

## Commands and disabled state

`disabled` blocks pointer-driven transitions. Explicit `show()` and `hide()` commands remain available for programmatic control.

:::react-demo react/components/Hover/commands.tsx :::

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `disabled` | `boolean` | `false` | Disables pointer-driven state changes |
| `showDelay` | `number` | `0` | Show delay after entry, in milliseconds |
| `hideDelay` | `number` | `0` | Hide delay after leave, in milliseconds |
| `children` | `ReactElement \| (state) => ReactElement` | — | The single target element or render function |

## Callbacks

| Callback | Argument | Description |
| --- | --- | --- |
| `onMouseEnter` | `React.MouseEvent` | Pointer entered the target |
| `onMouseMove` | `React.MouseEvent` | Pointer moved within the target |
| `onMouseLeave` | `React.MouseEvent` | Pointer left the target |
| `onVisibleChange` | `boolean` | Hover state actually changed |

## Ref

| Method | Description |
| --- | --- |
| `show()` | Shows hover state |
| `hide()` | Hides hover state |

Hover feedback must not be the only way to access a feature or information. Keyboard and touch users need an equivalent path.
