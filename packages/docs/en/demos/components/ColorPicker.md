## Basic Usage and Alpha

ColorPicker edits a solid color by default. Enable `alpha` to adjust opacity, and preview the result against a realistic surface to judge the final effect.

:::demo components/ColorPicker/alpha.vue :::

## Trigger Types and States

Use `trigger-type="square"` for a swatch trigger and add `square-text` to expose the current value. Triggers also support disabled and clearable states.

:::demo components/ColorPicker/trigger.vue :::

## Custom Trigger

Use the `trigger` slot to integrate color selection into an existing action. `resultsValue.value` from the slot scope contains the formatted current value.

:::demo components/ColorPicker/custom-trigger.vue :::

## Trigger Sizes

`size` supports `small`, `medium`, and `large`. It changes only the trigger, not the popup panel. Use the `squareText` slot to replace the displayed color value.

:::demo components/ColorPicker/size.vue :::

## Advanced Capabilities

Combine gradients, swatches, recent colors, custom colors, confirmation, and screen sampling according to the editing task. Recent and custom colors are stored in the current browser.

Screen sampling depends on the [EyeDropper API](https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper) and should be progressive enhancement; keep the regular board and inputs available when unsupported.

:::demo components/ColorPicker/examples.vue :::
