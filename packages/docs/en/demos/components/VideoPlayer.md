
## Component Instructions
Video player component, encapsulates [videojs](https://videojs.com/).

## Basic Example
Pass video source through `sources`, and cover image through `poster`.
:::demo components/VideoPlayer/basic.vue :::

## Rotate Video
Control video rotation through `rotate`, supporting four angles: `0`, `90`, `180`, `270`.
:::demo components/VideoPlayer/rotate.vue :::

## Quality Selection
If the passed video source is [HTTP Live Streaming](https://developer.apple.com/streaming/) (HLS) and contains multiple qualities, a quality selection list will be displayed.
:::demo components/VideoPlayer/quality.vue :::

## Player Control
You can get the player instance [player](https://docs.videojs.com/player) through the callback parameter of the `ready` event.
:::demo components/VideoPlayer/action.vue :::

## Error Prompt
:::demo components/VideoPlayer/error.vue :::
