## Basic Usage
Set the image path through `src`, and set the image width and maximum width through `width` and `max-width`.  
You don't need to set the image height, so the image can maintain its original aspect ratio.
:::demo components/Image/basic.vue :::

## Set Height
You can also set the image height and maximum height through `height` and `max-height`, which is equivalent to customizing the image aspect ratio.
:::demo components/Image/height.vue :::

## Set Aspect Ratio
Sometimes the image width is not a fixed value, making it inconvenient to set the height, but you want to customize the image aspect ratio. At this time, `aspect-ratio` can help you. For details, see [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio).
:::demo components/Image/aspect.vue :::

## Fit Content Box
When the actual aspect ratio of the image is inconsistent with the original aspect ratio, you can control how the image fits the content box through the `object-fit` attribute. For details, see [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit).  
The dashed line is used to indicate the size of the current content box.
:::demo components/Image/fit.vue :::

## Set Title
Set `show-tooltip` to `true` and `title` is not empty, and the image title will be displayed in the form of tooltip.
:::demo components/Image/title.vue :::

## Set Border Radius
Control the border radius of the image through `rounded`.
:::demo components/Image/rounded.vue :::

## Placeholder
By default, a placeholder of adaptive size will be displayed during image loading. You can also customize it through the `placeholder` slot.
:::demo components/Image/placeholder.vue :::

## Load Failed
By default, error content of adaptive size will be displayed after the image fails to load. You can also customize it through the `error` slot.
:::demo components/Image/error.vue :::

## Lazy Load
Pass in `lazyload` to enable lazy loading. Images will only be loaded when they first appear in the visible area.  
You can open Developer Tools - Network - Filter Img, then go back to the top of the page and refresh the page to observe when the images are loaded.
:::demo components/Image/lazyload.vue :::

## Image Viewer
Pass in `show-viewer` to enable the image viewer `<h-viewer />`.
:::demo components/Image/viewer.vue :::

## Action Items
Sometimes you want to display some action items when the mouse moves over the image. You can set `show-actions` to `true` and pass in an action list through `actions-list`.  
By default, when the image width is greater than `40px`, the action items will be displayed as buttons, otherwise they will be displayed as a dropdown list; when the image width is greater than `80px`, the action items will be located in the bottom right corner, otherwise they will be centered. You can also completely customize the type and position through `actions-type` and `actions-position`.
:::demo components/Image/actions.vue :::

## Content Slot
If you need to completely customize the content on the image, you can use the default slot, which will always be displayed on the upper layer of the image; we also provide a `hover` slot, which will only be displayed when the mouse moves over the image.  
The content slot will only take effect after the image has been successfully loaded.
:::demo components/Image/slot.vue :::

## Image List
To make it easier to display a series of images, we also provide the `n-image-list` component. You can control the spacing between each image and the maximum number of images to display.
:::demo components/Image/list.vue :::

## Custom Overflow
You can control the font size of overflow text through `limit-text-size`, and you can also completely customize the overflow display through the `limit` slot.
:::demo components/Image/listCustom.vue :::
