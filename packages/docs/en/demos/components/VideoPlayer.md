VideoPlayer provides playback, progress, volume, speed, quality, picture-in-picture, and fullscreen controls.

## Basic Playback

Pass media through `sources` and use `poster` for the pre-playback cover. When focused, the player supports Space or `K` for play/pause, arrow keys for seeking, `M` for mute, and `F` for fullscreen.

:::demo components/VideoPlayer/basic.vue :::

## Rotation

`rotate` accepts `0`, `90`, `180`, and `270` degrees to correct device orientation.

:::demo components/VideoPlayer/rotate.vue :::

## Quality

Add a `label` to multiple sources to expose a quality menu. Switching attempts to preserve playback position and state.

:::demo components/VideoPlayer/quality.vue :::

## External Controls

The component instance exposes `play`, `pause`, and `seek` for task-specific controls outside the player.

:::demo components/VideoPlayer/action.vue :::

## Error Recovery

An undecodable source emits `error`. Keep the failure message clear and provide an explicit retry path.

:::demo components/VideoPlayer/error.vue :::
