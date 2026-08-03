VideoPlayer 提供播放、进度、音量、倍速、清晰度、画中画和全屏控制。

## 基础播放

通过 `sources` 传入视频源，`poster` 设置加载前封面。播放器获得焦点后支持空格或 `K` 播放/暂停、方向键快退或快进、`M` 静音和 `F` 全屏。

:::demo components/VideoPlayer/basic.vue :::

## 旋转

`rotate` 支持 `0`、`90`、`180` 和 `270` 度，适合修正设备方向。

:::demo components/VideoPlayer/rotate.vue :::

## 清晰度

为多个 source 设置 `label` 后，控制栏会提供清晰度菜单，并在切换时尽量保持播放位置和状态。

:::demo components/VideoPlayer/quality.vue :::

## 外部控制

组件实例提供 `play`、`pause` 和 `seek`，可与页面上的业务控件组合。

:::demo components/VideoPlayer/action.vue :::

## 错误恢复

视频无法解码时会触发 `error`；应保留清晰的故障信息和重试入口。

:::demo components/VideoPlayer/error.vue :::
