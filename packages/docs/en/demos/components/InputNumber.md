## Sizes

The component provides `large`, `medium`, and `small`, with `medium` as the default. Match the size to a prominent setup step, a standard form, or a compact policy row.

:::demo components/InputNumber/size.vue :::

## Styles

`input-style` supports `normal`, `emphasize`, and `no-border`. Appearance can be combined with states such as `disabled` and `clearable` without losing the bound value.

:::demo components/InputNumber/style.vue :::

## Range and Step

Use `min`, `max`, and `step` to constrain the value. `precision` controls decimal places, while `step-strictly` requires values to be exact step multiples. Keep boundaries and outcomes visible.

:::demo components/InputNumber/range.vue :::

## Control Placement

`controls-position="right"` uses compact controls on the right, while `between` places decrement and increment on opposite sides. Set `controls="false"` for numeric entry without steppers.

:::demo components/InputNumber/controls-position.vue :::

## Disabled State

`disabled` prevents input, stepping, and focus interaction. For externally synchronized numbers, explain the lock source and surface the current state if temporary unlocking is available.

:::demo components/InputNumber/disabled.vue :::

## Long Press

With `enable-lang-press`, holding a control repeatedly increments or decrements the value. `lang-press-frequency` sets the repeat interval; shorter intervals suit bulk changes while single clicks remain available.

:::demo components/InputNumber/lang-press.vue :::

## Clearable

Enable `clearable` to restore an optional number to an empty value and emit `clear`. Give emptiness a clear domain meaning, such as falling back to an automatic policy.

:::demo components/InputNumber/clearable.vue :::

## Placeholder

When the model is `null` or `undefined`, `placeholder` can explain the default policy used in the absence of a value. Placeholder text does not replace a field label.

:::demo components/InputNumber/placeholder.vue :::

## Readonly

`readonly` preserves content and focus behavior but prevents editing and hides the controls. It suits approved values that users still need to inspect or select.

:::demo components/InputNumber/readonly.vue :::

## Prefix and Suffix

Use `prefix-icon`, `suffix-icon`, or the `prefix` and `suffix` slots for currency, percentages, points, and supporting guidance. Affixes should not obscure the field's label.

:::demo components/InputNumber/prefix-suffix.vue :::

## Grouped Input

The `prepend` and `append` slots can attach currencies, units, or semantic text. Interactive controls such as Select inside a slot need their own accessible names and usable narrow-screen sizing.

:::demo components/InputNumber/prepend-append.vue :::

## Number Formatting

`formatter` produces the displayed string, while `parser` converts edited content back to a number or string the model can use. Keep the two functions symmetrical so presentation formatting never enters business calculations.

:::demo components/InputNumber/formatter.vue :::

## Preserve Trailing Zeros

JavaScript numbers do not retain trailing decimal zeros. When the display and returned value require a fixed format, combine `string-mode` with `precision` to preserve an exact string such as `1.2000`.

:::demo components/InputNumber/reserve-decimal-separator.vue :::

## Dynamic Precision

`precision` can update reactively for decimal places selected by currency, measurement standards, or user preferences. Numeric and string modes share the display precision but return different types.

:::demo components/InputNumber/precision-update.vue :::

## Fixed Precision

`precision` sets the decimal places retained after commit. Whole units, currency, and detailed measurements can use 0, 2, or more places; the decimal places in `step` should not exceed `precision`.

:::demo components/InputNumber/precision.vue :::
