## Different Sizes
Provides three sizes: `large`, `medium`, `small`, default is `medium`.
:::demo components/InputNumber/size.vue :::

## Different Styles
Provides three styles: `normal` `emphasize` `no-border`, default is `normal`.
:::demo components/InputNumber/style.vue :::

## Input Box with Step and Max/Min Values
You can limit input items by setting `step` and `min`, `max`. 

:::demo components/InputNumber/range.vue :::

## Controller Position, Hide Controller
In some business scenarios, the controller position needs to be changed to both sides

When you don't need to use the controller and only need the filter function, you can set `controls = false`
:::demo components/InputNumber/controls-position.vue :::

## Disabled State
:::demo components/InputNumber/disabled.vue :::

## Long Press
In some scenarios, long pressing the controller is allowed to increase/decrease the value
:::demo components/InputNumber/lang-press.vue :::

## Clear
inputNumber allows clearing
::: demo ./demos/clearable.vue :::

## Placeholder Text
::: demo ./demos/placeholder.vue :::

## Readonly
After setting `readonly`, `controls` will not be displayed
::: demo ./demos/readonly.vue :::

## Prefix/Suffix
You can configure prefix and suffix
::: demo ./demos/prefix-suffix.vue :::

## Combined Input Box
You can set prepend and append slots through `slots.prepend` `slots.append`
::: demo ./demos/prepend-append.vue :::

## Number Conversion
Convert numbers to the format you need through `formatter`, and then convert the formatted string to processable numbers through `parser`
:::demo components/InputNumber/formatter.vue :::

## Zero Padding
Starting from `2.4.6`, if zero padding is needed, you need to set `string-mode = true`
:::demo components/InputNumber/reserve-decimal-separator.vue :::

## Precision Update
Starting from `2.4.7`, you can listen to precision updates

:::demo components/InputNumber/precision-update.vue :::
