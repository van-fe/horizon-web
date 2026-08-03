## Basic Usage
Most basic usage
:::demo components/Segmented/basic.vue :::

## Block Mode
Set `block` to adapt to parent width
:::demo components/Segmented/block.vue :::

## Unavailable
:::demo components/Segmented/disabled.vue :::

## Scrolling Segmented
When there are super many options, the controller calculates based on width. You can close it through `scrollable`. <strong style="color: red;">(PS: Generally not recommended to use Segmented for too many option nodes)</strong>
:::demo components/Segmented/scroll.vue :::

## Controlled Mode
Activate the corresponding option through `activeKey`
:::demo components/Segmented/controlled.vue :::

## Different Sizes of Segmented
Set size through `size`, default size: `medium`
:::demo components/Segmented/size.vue :::

## Dynamic Load Data
Asynchronously load more options
:::demo components/Segmented/load-more.vue :::

## Custom Render
Use `slot` to customize node rendering
:::demo components/Segmented/customize.vue :::

## Support Setting Icon and Badge
Use `icon` to set option icon
:::demo components/Segmented/icon.vue :::

## Use with Form
You can enable the `form` attribute to adapt to the `h-form` component
:::demo components/Segmented/form.vue :::
