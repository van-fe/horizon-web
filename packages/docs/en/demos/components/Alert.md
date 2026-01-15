## Basic Usage
The simplest usage, suitable for short warning prompts.
:::demo components/Alert/basic.vue :::
## Size
:::demo components/Alert/size.vue :::
## Four Styles
There are four styles: success, info, warning, error.
:::demo components/Alert/demo1.vue :::
## Extended Styles


:::demo components/Alert/demo2.vue :::

## Different Layouts
- Horizontal layout: Used when the description text content is less
- Vertical layout: Used when the description text content is more
- Auxiliary text can only store single-line text and will automatically wrap
- If the text wraps, the close button is automatically hidden. You need to manually pass in `primary-button-text` or `default-button-text`, define the button text, pass in `onPrimary` or `onDefault` corresponding button callback events. The first parameter of the callback function provides the `close` method to close the `alert` component
  :::demo components/Alert/demo3.vue :::
