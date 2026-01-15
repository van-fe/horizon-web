## Single Line Text Watermark
Through the `content` attribute, you can set: single line text watermark content, the value is a string.

:::demo directives/v-watermark/demo1.vue :::

## Multi-line Text Watermark
Through the `content` attribute, you can set: multi-line text watermark content, the value is a string array.

:::demo directives/v-watermark/demo2.vue :::

## Image Watermark
Through the `image` attribute, you can set: image watermark content. When the image fails to load, the value of the `content` attribute will be used as a fallback display.

:::demo directives/v-watermark/demo3.vue :::

## Additional Usage Scenarios
You can listen to the component's `tampered` event to perform some additional operations.

:::demo directives/v-watermark/demo4.vue :::
