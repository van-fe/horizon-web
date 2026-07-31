## Basic Usage
Pass resource list through `sources`.
:::demo components/Viewer/basic.vue :::

## Loop Display
You can pass in `loop` to enable loop switching function.
:::demo components/Viewer/loop.vue :::

## Auto Hide Toolbar
By default, the toolbar will automatically hide after 3 seconds of no operation. You can disable this behavior.
:::demo components/Viewer/autohide.vue :::

## Legend
Legend is a label on the image. You can configure multiple legends for an image. Legends with `handler` set are clickable.  
Only images support legends, videos do not.
:::demo components/Viewer/legend.vue :::

## Custom Buttons
You can recombine the built-in buttons you want, or add completely custom buttons.
:::demo components/Viewer/tools.vue :::

## Click Image to Trigger
To trigger the gallery by clicking an image that already exists on the page, a little extra work is needed.
:::demo components/Viewer/imgclick.vue :::

## Keyboard Support
<kbd>Esc</kbd> Close viewer  
<kbd>←</kbd> Previous image  
<kbd>→</kbd> Next image  
<kbd>↑</kbd> Zoom in image  
<kbd>↓</kbd> Zoom out image  
<kbd>Double Click Mouse</kbd> Toggle between original size and adaptive size  
<kbd>Mouse Wheel or Two-finger Scroll</kbd> Pan an image beyond the viewport<br>
<kbd>Trackpad Pinch or Ctrl + Mouse Wheel</kbd> Zoom around the pointer

Tall images are displayed at a readable width and start at the top of the image.
