
## Component Instructions
Video player component based on the native HTML5 Video API, with custom controls.

## Basic Example
Pass video sources through `sources` and a cover image through `poster`. The custom controls include playback, progress, buffering, volume, speed, quality, picture-in-picture, and fullscreen.
:::demo components/VideoPlayer/basic.vue :::

When focused, the player supports Space or `K` to play/pause, the arrow keys to seek by five seconds, `M` to mute, and `F` to toggle fullscreen.

## Rotate Video
Control video rotation through `rotate`, supporting four angles: `0`, `90`, `180`, `270`.
:::demo components/VideoPlayer/rotate.vue :::

## Quality Selection
Give multiple sources a `label` (or `quality`) to display the quality selector. The player preserves playback time and state when possible.
:::demo components/VideoPlayer/quality.vue :::

## Player Control
The `ready` event returns the native `HTMLVideoElement`, so standard methods such as `play()` and `pause()` can be called directly.
:::demo components/VideoPlayer/action.vue :::

## Error Prompt
Missing sources, network failures, and unsupported codecs display an error state with a retry action. Picture-in-picture, fullscreen, and playable formats depend on browser support; unavailable optional features do not disable basic playback.
:::demo components/VideoPlayer/error.vue :::
