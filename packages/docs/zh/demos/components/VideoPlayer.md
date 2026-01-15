## 基础示例
通过 `sources` 传入视频源，`poster` 传入封面图。
:::demo components/VideoPlayer/basic.vue :::

## 旋转视频
通过 `rotate` 控制视频的旋转，支持 `0`, `90`, `180`, `270` 四个角度。
:::demo components/VideoPlayer/rotate.vue :::

## 清晰度选择
如果传入的视频源是 [HTTP Live Streaming](https://developer.apple.com/streaming/) (HLS) 且包含多个清晰度，则会展示清晰度选择列表。
:::demo components/VideoPlayer/quality.vue :::

## 播放器控制
你可以通过 `ready` 事件的回调参数获取到播放器实例 [player](https://docs.videojs.com/player)。
:::demo components/VideoPlayer/action.vue :::

## 错误提示
:::demo components/VideoPlayer/error.vue :::
