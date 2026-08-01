## Normal State
Input box style
:::demo components/Input/demo1.vue :::

## Password Input
When `type` is set to `password`, the input box will hide the input content. Click the eye icon on the right to view the input content

PS: When `show-password` is set to `true` in `password` state, `suffix-icon` will be invalid
:::demo components/Input/password.vue :::

## Disabled State
Input will be disabled in `disabled` state
:::demo components/Input/disabled.vue :::

## Clearable
Set `clearable` to display a clear icon when there is a value
:::demo components/Input/clearable.vue :::

## Input Status
Pass in `status=error` to display error state
:::demo components/Input/status.vue :::

## Size
The component provides three sizes: `small` `medium` `large`, default is `medium`
:::demo components/Input/size.vue :::

## Icons and Prefix/Suffix
Set icons through `prefix-icon` and `suffix-icon`

You can set prefix and suffix content through `prefix` and `suffix` `slot`, which can be used to set icons with action
:::demo components/Input/icon.vue :::

## Combined Input Box
You can add a prepend or append element to the input box through `prepend` and `append` `slot`  
`--h-input-background-prepend-append: transparent` is to solve the background color problem of icons and prefix/suffix
:::demo components/Input/mixed.vue :::

## Embedded in Composite Controls
Use `embedded` to reuse Input value, focus, disabled, and IME behavior without its default appearance. Combine it with `fit-content` to size the field by its content in Picker, tag-input, and similar composite form controls.
:::demo components/Input/embedded.vue :::

## Multi-line Input Box
When `type` is set to `textarea`, the input box will become a multi-line input box

You can set whether the multi-line input box is draggable through `resize`
:::demo components/Input/textarea.vue :::

## Character Limit
You can display the character limit of the input box through `maxlength` and `showLimit`

Note: After enabling `enable-out-of-exceeded`, the character count will not be limited, so form validation needs to be combined with the `max` setting of `h-form`
:::demo components/Input/limit.vue :::

## Search Input Box
Search input box, you can clear the input content with one click
:::demo components/Input/search.vue :::

## Input Events
You can bind events to the input box. For specific events, see the description below
:::demo components/Input/event.vue :::
