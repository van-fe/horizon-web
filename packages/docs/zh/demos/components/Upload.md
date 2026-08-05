Upload 提供文件选择、校验、列表管理与上传状态。以下示例使用本地模拟请求，不会把文件发送到外部服务。

## 单文件上传

默认选择新文件时会替换当前文件；可通过 `accept` 限定可选格式。

:::demo components/Upload/basic.vue :::

## 多文件上传

设置 `multiple` 允许多选，`limit` 限制数量，`auto-slice-exceed-files` 决定超限时是否保留可用文件。

:::demo components/Upload/multiple.vue :::

## 上传前校验

`accept-strict` 会直接拒绝不匹配 `accept` 的文件；`before-upload` 适合补充业务校验。

:::demo components/Upload/before-upload.vue :::

## 文件大小

`file-size-limit` 自动过滤超限文件，并触发 `file-size-exceed`。

:::demo components/Upload/file-size-exceed.vue :::

## 头像上传

`type="gallery"` 配合单文件模式，可用于头像或封面编辑。

:::demo components/Upload/avatar.vue :::

## 照片墙

Gallery 模式以缩略图展示文件，适合管理一组图片。

:::demo components/Upload/gallery.vue :::

## 拖拽上传

`type="drop"` 同时支持拖放和文件选择，并沿用格式、数量与大小校验。

:::demo components/Upload/drop.vue :::

## 禁用状态

`disabled` 会禁用文件选择、拖放和列表操作，同时保留已有文件。

:::demo components/Upload/disabled.vue :::

## 后台上传

`use-background` 将任务交给共享后台队列；`show-file-list` 可独立控制当前页面的文件列表。

:::demo components/Upload/background.vue :::

## 分片与断点续传

传入 `multipart` 后，文件会按 `multipart-chunk-size` 切分，并受 `multipart-max-amount-uploading-at-same-time` 控制并发。`getUploadedChunkIndexes` 用于恢复已完成分片，`handleMerge` 在全部分片成功后合并结果。

:::demo components/Upload/multipart.vue :::

云存储厂商预设与交互沙箱见 [Upload Adapters 扩展](/extensions/upload-adapters)。生产环境可使用默认 XHR，也可通过 `uploadPart` 接入自定义服务或云存储 SDK。

## 类型定义

:::code ./demos/type-defined.ts :::
