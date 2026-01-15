## Basic Usage
The basic style only includes single color adjustment. Set `alpha = true` to enable transparency setting
:::demo components/ColorPicker/alpha.vue :::

## Trigger Type
You can enable the style with color code by configuring `square-text = true`
:::demo components/ColorPicker/trigger.vue :::

## Custom trigger
In some cases, you may need to set your own trigger `trigger`. You can configure it using `slots.trigger`

You can use `resultsValue.value` in the return parameters to get the set value
:::demo components/ColorPicker/custom-trigger.vue :::

## Trigger Size
The trigger size is divided into S, M, and L, controlled by `size`
:::demo components/ColorPicker/size.vue :::

## Extended Styles
Extended functions include: with gradient setting, with system preset colors, with recently used colors, with custom colors, with web color picker, only one gradient, with cancel/confirm buttons, with clear button, with cancel/confirm + clear buttons;

Note: The web color picker uses the [EyeDropper API](https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper), but the specific browser support needs to be checked: [Can I Use](https://caniuse.com/?search=EyeDropper). In actual production scenarios, please use this capability with caution. This `API` is not precise and may have slight differences
:::demo components/ColorPicker/examples.vue :::
