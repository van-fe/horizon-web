## Basic Example
To meet most scenarios, the dialog will display primary and secondary buttons by default.
:::demo components/Dialog/demo1.vue :::

## Vertical Position
By default, the dialog will be displayed vertically centered. You can adjust it to display at a certain distance from the top through `vertical-position`.
:::demo components/Dialog/verticalPosition.vue :::

## Button Settings
You can set whether buttons are displayed, or completely customize the bottom through slots.
:::demo components/Dialog/demo2.vue :::

## Icon
You can set an icon for the dialog, which will be displayed before all content.
:::demo components/Dialog/demo3.vue :::

## Size
According to different scenarios, you can choose to use four sizes of dialogs: `small`, `medium`, `large`, `huge`.
:::demo components/Dialog/demo4.vue :::

## Overflow Content
When the dialog content is too long, only the content part will support scrolling.
:::demo components/Dialog/demo5.vue :::

## Rendering Method
You can control the rendering method of the dialog by passing in `display-type`. `if` means rendering according to `v-if`, `show` (default) means rendering according to `v-show`. For the difference between the two, please refer to [v-if vs v-show](https://vuejs.org/guide/essentials/conditional.html#v-if-vs-v-show).  
:::demo components/Dialog/demo6.vue :::

## Custom class
Set the className of the internal areas (header, body, footer, mask, wrapper) of the popup through the classNames attribute.
:::demo components/Dialog/demo7.vue :::
