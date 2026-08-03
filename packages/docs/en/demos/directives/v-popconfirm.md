
## Component Instructions
Unlike all other component libraries, we provide a directive rather than a component to achieve this effect. The advantage of this is that you don't need to modify the element structure, nor do you need to manually move the `click` event on the target element to the bubble popup - all of this is automatic.

## Basic Example
Add `v-popconfirm` to the operation element that needs secondary confirmation, and it will automatically transfer the element's `click` event to the popup.
:::demo directives/v-popconfirm/basic.vue :::

## Custom Text
You can reset the text by passing a string to `v-popconfirm`, or you can pass a complete configuration object.
:::demo directives/v-popconfirm/title.vue :::

## Custom Type
Pass the desired type through `type`, which will correspond to different icons. `none` means no icon is displayed.
:::demo directives/v-popconfirm/type.vue :::

## Custom Position
The position of the bubble popup defaults to `top`, with 15 optional values.
:::demo directives/v-popconfirm/demo2.vue :::

## Custom Buttons
You can completely customize the button text and parameters.
:::demo directives/v-popconfirm/demo3.vue :::
