## Basic Usage
Control the `type` field to enable different button colors

Set `round` to make the button oval-shaped

:::demo components/Button/basic.vue :::

## Size
Control the `size` field to set different button sizes
:::demo components/Button/size.vue :::

## Plain Button
Use `plain = true` to enable plain button

If you need to apply it on a black background, set `ghost = true` to enable ghost button form
:::demo components/Button/plain.vue :::

## Text Button
Use `text = true` to enable text button
:::demo components/Button/text.vue :::

## Link Button
Use `link = true` to enable link button

Set `to` or `href` to jump directly
:::demo components/Button/link.vue :::

## Active Button
Set `active = true` to set the button to active state
:::demo components/Button/active.vue :::

## Disabled
Set `disabled = true` to set the button to unavailable state
:::demo components/Button/disabled.vue :::

## Icon Button
Set `icon`, it will automatically determine whether the default slot is used and display square or adaptive
:::demo components/Button/icon.vue :::

## Block Button
Set `block = true` to make the button width fill the parent
:::demo components/Button/block.vue :::

## Button Group
Use `n-button-group` to wrap buttons, you can set a smooth adjacent button group
:::demo components/Button/button-group.vue :::

## Debounce Function Call
Pass a function through `debounce-fn`, this function will be automatically triggered when the button is clicked, and if the function returns a Promise, it will automatically implement debounce during execution to avoid the effects of multiple clicks. The bound `click` event will be ignored at this time.

You can also control the button state during debounce through `debounce-type`.

This will be very useful if you need to perform asynchronous operations such as calling interfaces when clicking the button.

:::demo components/Button/debounce-fn.vue :::

## Border Style
The border can be set to `solid` `dotted` `dashed`, the default is `solid`
:::demo components/Button/border-style.vue :::


## Custom Color (BETA)
After setting `color`, it will automatically calculate the colors of hover, click and other states based on the given color

The system has five built-in colors: <code>brand</code> <code>indigo</code> <code>purple</code> <code>magenta</code> <code>orange</code>

:::demo components/Button/custom-color.vue :::
