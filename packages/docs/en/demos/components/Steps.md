## Basic Usage
Change the state of the current node by controlling `status`
:::demo components/Steps/basic.vue :::

## Small Steps
You can set `size = 'small'` to enable small steps
:::demo components/Steps/small-size.vue :::

## Step Switch
You can switch steps by passing in `modelValue`. The corresponding `update:modelValue` will also notify when changed
:::demo components/Steps/switch-step.vue :::

## Dot Steps
You can set `progress-dot = true` to enable dot steps
:::demo components/Steps/dot.vue :::

## Vertical Steps
Set `direction = "vertical"` to enable vertical steps
:::demo components/Steps/vertical.vue :::

## Clickable
Set `clickable = true` to switch steps by clicking
:::demo components/Steps/click.vue :::

## Specify Label Placement Position
Configure `label-placement` to adjust label position
:::demo components/Steps/align-center.vue :::

## Specify Label Layout
By setting `label-align`, `center` is centered, `left` is left-aligned

Only supports `label-placement="vertical"` or `:progress-dot="true"` situations
:::demo components/Steps/label-align.vue :::

## Async Load
Because the `steps` component determines the index of each step only when `n-step` is mounted, if there are fixed front and back steps but the middle steps are loaded asynchronously, it will cause the final order to be incorrect

Therefore, you need to set `index` for `n-step` to ensure the order meets expectations
:::demo components/Steps/async-load.vue :::

## Intercept Switch
When `clickable = true` is set, user clicks to switch steps cannot be controlled by developers, so `before-change` is provided to intercept switch requests
:::demo components/Steps/before-change.vue :::

## Disabled
Set `disabled` for `step-item` to prohibit interaction with the current step
:::demo components/Steps/disabled.vue :::
