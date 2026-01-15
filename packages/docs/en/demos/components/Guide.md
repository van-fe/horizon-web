## Basic Usage
:::demo components/Guide/basic.vue :::

## Direct Parameter Passing
In some cases, you may not need to use the `n-guide-item` component to build steps, you can directly pass in data to build
:::demo components/Guide/itemList.vue :::

## Mask
You can set `mask = false` to close the mask
:::demo components/Guide/mask.vue :::

## Complete Example
In most cases, the elements that need to be focused appear dynamically, and new elements will appear after interacting with the previously focused element

In this case, you cannot use the controller to switch between steps
:::demo components/Guide/whole.vue :::
