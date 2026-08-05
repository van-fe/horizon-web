## Normal State

Bind a string with `v-model` and switch `input-style` among `normal`, `emphasize`, and `no-border`. When the field is disabled, explain why it cannot be edited.

:::demo components/Input/demo1.vue :::

## Password Input

With `type="password"`, the value is concealed. Enable `show-password` for the built-in visibility control, set an appropriate `autocomplete` value, and expose password-strength rules. `suffix-icon` is not rendered while `show-password` is enabled.

:::demo components/Input/password.vue :::

## Disabled State

`disabled` prevents editing and focus interaction. It suits values managed by an external system, provided the surrounding interface explains the lock source and any available next step.

:::demo components/Input/disabled.vue :::

## Clearable

With `clearable`, a clear control appears while the field has a value and emits `clear` when used. Treat clearing as an explicit action and update previews, validation, and status feedback accordingly.

:::demo components/Input/clearable.vue :::

## Validation Status

Pass `status="error"` to mark invalid input. Pair the visual state with a precise message and connect it through `aria-describedby` or adjacent text so assistive technology can identify the correction.

:::demo components/Input/status.vue :::

## Sizes

The component provides `small`, `medium`, and `large`, with `medium` as the default. Choose a size according to interface density and action prominence rather than mixing sizes arbitrarily.

:::demo components/Input/size.vue :::

## Icons and Affixes

Use `prefix-icon`, `suffix-icon`, or the `prefix` and `suffix` slots for currency, units, status, and help entry points. Interactive icons need an accessible name and keyboard focus.

:::demo components/Input/icon.vue :::

## Grouped Input

The `prepend` and `append` slots can attach a protocol, domain suffix, unit, or another control. Keep enough room for the primary input on narrow screens and label every nested control.

:::demo components/Input/mixed.vue :::

## Embedded in Composite Controls

`embedded` reuses Input value, focus, disabled, and IME behavior without its default appearance. Combine it with `fit-content` for recipient, tag, Picker, and similar composite form controls.

:::demo components/Input/embedded.vue :::

## Textarea

Set `type="textarea"` and use `rows` plus `resize` for the initial size and user-resizing behavior. `auto-size` can grow with content or accept `{ minRows, maxRows }` bounds.

:::demo components/Input/textarea.vue :::

## Character Limits

`maxlength` and `show-limit` expose the current count. With `enable-out-of-exceeded`, users can keep typing, so pair it with `status` or form rules that clearly flag overflow.

:::demo components/Input/limit.vue :::

## Search

A search field can combine a prefix icon, `clearable`, and the Enter key event. Display result counts, empty states, and the last submitted term in the page instead of handling them only in the console.

:::demo components/Input/search.vue :::

## Events

Input emits `input`, `change`, `clear`, focus, and keyboard events. `input` fires throughout editing, while `change` fires after blur when the value changed. A visible event counter makes their timing easier to compare.

:::demo components/Input/event.vue :::
