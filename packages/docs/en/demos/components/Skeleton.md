## Usage

Skeleton previews the structure of content while it loads, making the wait feel more stable and easier to understand. It works well for repeated lists, information cards, and long-form content with a predictable layout.

Keep each placeholder close to the size and hierarchy of the final content to avoid noticeable layout shifts or mismatched expectations.

## Basic Usage

Without slots, Skeleton renders a default three-line text placeholder. Use `animated` to control the loading animation.

:::demo components/Skeleton/demo1.vue :::

## Custom Content

Use `loadingTemplate` for the loading structure and the default slot for the final content. Matching the two layouts closely creates a smoother transition.

:::demo components/Skeleton/demo2.vue :::

## Skeleton Items

SkeletonItem provides five building blocks: `avatar`, `text`, `operate`, `image`, and `picture`. Combine them to mirror the content in your product.

:::demo components/Skeleton/demo3.vue :::
