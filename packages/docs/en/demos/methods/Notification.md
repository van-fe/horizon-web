## Basic

You can set the title and body content of the notification by setting the `title` and `content` attributes.

By default, the component will automatically close. You can set the closing time interval through the `duration` attribute, which accepts the `Number` type. When `duration > 0` is set, it is considered to automatically close after the corresponding time; when `duration <= 0` is set, it is considered not to automatically close, and users need to click x or the `close` method to manually close.

:::demo methods/Notification/basic.vue :::

## Content

`content` supports passing in HTML strings as body content. Set the `useHTML` attribute to true, and the `content` attribute will be treated as an HTML fragment.

Of course, you can also pass a `render` function to `content` to achieve dynamic updating of content display.

:::demo methods/Notification/content.vue :::

## Types
We provide five different types of alert boxes: normal, success, warning, info and error.

Use the `type` attribute to set its type, supporting five options: `normal`, `success`, `warning`, `info` and `error`, default is `normal`.

:::demo methods/Notification/different-types.vue :::

## Placement
Notification can pop up from any of the four corners of the screen

Use the `placement` attribute to set its popup position, supporting four options: `top-right`, `top-left`, `bottom-right` and `bottom-left`, default is `top-right`.

:::demo methods/Notification/placement.vue :::

## Offset

Use `offset` to set the offset, the offset relative to the top or bottom of the screen, and use `gap` to set the spacing between adjacent Notification instances.

:::demo methods/Notification/offset.vue :::

## Width

Use `width` to set a custom width.

:::demo methods/Notification/width.vue :::

## Buttons

Action buttons can provide users with buttons to handle notifications

Use `show-confirm-button`, `show-cancel-button` to set the display of OK button and Cancel button respectively, and use `confirmButtonProps` to set button-related attributes, such as debounce operations.

:::demo methods/Notification/operation.vue :::

## Show close

You can set whether the close button is displayed through the `show-close` attribute.

:::demo methods/Notification/close.vue :::

## Close/CloseAll

Asynchronously calling `$notify` will return the current Notification instance. If you need to manually close the instance, you can call its `close` method, or you can call the `closeAll` method to close all instances.

:::demo methods/Notification/methods.vue :::

## $notify Overload
`$notify` contains 5 overload methods, `resolve, reject` will pass in the operation type.
```ts
function $notify (content: string): Promise<string>;
function $notify (content: string, options: OptionsType): Promise<string>;
function $notify (content: string, title: string): Promise<string>;
function $notify (content: string, title: string, options: OptionsType): Promise<string>;
function $notify (options: OptionsType): Promise<string>;
