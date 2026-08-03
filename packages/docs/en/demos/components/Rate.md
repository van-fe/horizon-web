## Basic Usage
Use `v-model` to bind the current rating value.
:::demo components/Rate/basic.vue :::

## Allow Half Star
Use `half` to set whether to allow half star.
:::demo components/Rate/allowHalf.vue :::

## Custom Icon
Customize the rating icon through the `icon` attribute.
:::demo components/Rate/customIcon.vue :::

## Custom Icon - Using Slot
Use the default slot to customize your own rating icon (only supports tags that can be styled with font-size and color)
:::demo components/Rate/useSlot.vue :::

## Custom Count
You can set the number of rating icons through the `count` attribute.
:::demo components/Rate/customCount.vue :::

## Custom Style
Customize icon size through the `size` attribute. The parameter can accept strings `'small' | 'medium' | 'large'` or numbers.
:::demo components/Rate/customStyle_size.vue :::

You can set the fill color, empty state color, and disabled color of the icon through the `color` `voidColor` `disabledColor` attributes respectively.
:::demo components/Rate/customStyle_color.vue :::

You can set the left and right spacing of icons through the `gutter` attribute.
:::demo components/Rate/customStyle_gutter.vue :::

## Tooltip Text
Set whether to display tooltip text through the `showTooltip` attribute, and you can customize the tooltip text through the `tooltip` attribute (the number of items in the passed array should be the same as the count value, otherwise the default tooltip text will be displayed).
:::demo components/Rate/tooltip.vue :::

## Readonly & Disabled
Set readonly state and disabled state through `readonly` `disabled` attributes respectively.
:::demo components/Rate/unable.vue :::
