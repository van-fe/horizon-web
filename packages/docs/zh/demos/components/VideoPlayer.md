## 基础示例
通过 `sources` 传入视频源，`poster` 传入封面图。播放器提供自定义的播放、进度、缓冲、音量、倍速、清晰度、画中画和全屏控制。
:::demo components/VideoPlayer/basic.vue :::

播放器获得焦点后支持以下快捷键：空格或 `K` 播放/暂停、左右方向键快退/快进 5 秒、`M` 静音、`F` 切换全屏。

## 旋转视频
通过 `rotate` 控制视频的旋转，支持 `0`, `90`, `180`, `270` 四个角度。
:::demo components/VideoPlayer/rotate.vue :::

## 清晰度选择
为多个视频源设置 `label`（或 `quality`）后，控制栏会展示清晰度选择列表。切换视频源时会尽量保持当前播放时间和播放状态。
:::demo components/VideoPlayer/quality.vue :::

## 播放器控制
你可以通过 `ready` 事件的回调参数获取原生 `HTMLVideoElement`，直接调用 `play()`、`pause()` 等标准方法。
:::demo components/VideoPlayer/action.vue :::

## 错误提示
视频源缺失、网络失败或浏览器不支持当前编码时，播放器会显示错误提示和刷新按钮。画中画、全屏以及具体可播放格式取决于浏览器能力；可选能力不可用时不会影响基础播放。
:::demo components/VideoPlayer/error.vue :::
