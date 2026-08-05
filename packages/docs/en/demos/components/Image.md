## Basic Usage

Use `src` for the image resource and `width` or `max-width` to constrain its responsive container. Without an explicit height, the image keeps its intrinsic aspect ratio. Always provide meaningful `alt` text.

:::demo components/Image/basic.vue :::

## Height

`height` and `max-height` establish a stable content box for aligned banners and card covers. Pair them with `object-fit="cover"` when the image should continue filling the box at each height.

:::demo components/Image/height.vue :::

## Aspect Ratio

When the container width changes with the viewport, `aspect-ratio` preserves the intended shape. Square, editorial, and widescreen presets can serve different publishing surfaces. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio) for the underlying CSS behavior.

:::demo components/Image/aspect.vue :::

## Object Fit

When the source and content-box ratios differ, `object-fit` determines whether the image stretches, stays fully visible, or crops. Choose a mode that respects the artwork's safe area. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) for details.

:::demo components/Image/fit.vue :::

## Title Tooltip

Set both `title` and `show-tooltip` to reveal the full title on hover. A title can recover a truncated asset name, but it does not replace descriptive `alt` text.

:::demo components/Image/title.vue :::

## Rounded Corners

Use `rounded` with a number, a unit-bearing string, or a percentage to adapt the same image behavior to content cards, feature tiles, and profile crops.

:::demo components/Image/rounded.vue :::

## Placeholder

The default placeholder appears while the source is unavailable or loading. A `placeholder` slot can explain an approval, generation, or upload state; make the eventual load result visible as well.

:::demo components/Image/placeholder.vue :::

## Error Recovery

The component shows a default error state when loading fails, while the `error` slot can offer a clearer recovery path. This example simulates a decode failure with an invalid local data URI and retries with a repository asset, so it does not depend on the network.

:::demo components/Image/error.vue :::

## Lazy Loading

With `lazyload`, a resource is requested only when it first enters the viewport. For long lists, keep the scroll container keyboard-focusable and use the `load` event to expose progress.

:::demo components/Image/lazyload.vue :::

## Image Viewer

Enable `show-viewer` to open the viewer when the image is clicked. `viewer-src` can provide a separate full-size asset for a thumbnail, while `title` or `alt` identifies the content in the viewer.

:::demo components/Image/viewer.vue :::

## Actions

Enable `show-actions` and provide `actions-list` for preview, export, or archive commands on hover. The default `auto` type and placement switch between icons and a dropdown according to image size. Surface action results in the page instead of only logging them.

:::demo components/Image/actions.vue :::

## Content Slots

The default slot stays above a successfully loaded image; the `hover` slot appears only on hover. Maintain readable contrast and avoid covering the image's important subject.

:::demo components/Image/slot.vue :::

## Image List

`h-image-list` uses `margin` for thumbnail spacing and `limit` for the visible count. When child images enable `show-viewer`, any visible item can open the complete list.

:::demo components/Image/list.vue :::

## Custom Overflow

When the item count exceeds `limit`, the last visible position displays the overflow count. Use the `limit` slot for domain-specific wording and `limit-text-size` to tune its typography.

:::demo components/Image/listCustom.vue :::
