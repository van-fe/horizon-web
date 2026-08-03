## 单文件上传
选择不同文件后会替换掉之前的文件
:::demo components/Upload/basic.vue :::

## 多文件上传
设置 `multiple = true`，可以选择、上传多个文件

配合 `limit` 限制选择的文件数量
:::demo components/Upload/multiple.vue :::

## 拦截文件
设置 `accept` 可以控制选择的文件类型

默认开启严格控制文件类型，会对所有非 `accept` 允许的文件进行拦截，且对外抛出 `accept-error` 事件

如果希望手动控制，则可以设置 `accept-strict = false`，由自定义的 `before-upload` 拦截

:::demo components/Upload/before-upload.vue :::

## 文件大小检查
设置 `file-size-limit`，即可自动对文件的大小进行检查

如果超出，会自动过滤，并且抛出 `file-size-exceed` 事件

:::demo components/Upload/file-size-exceed.vue :::

## 头像上传
设置 `type = 'gallery'`，并配置一些数据，可以实现类似于头像上传的功能
:::demo components/Upload/avatar.vue :::

## 照片墙
设置 `type = 'gallery'`，可以开启照片墙上传模式

照片墙模式下，强制展示图片列表，无法通过 `show-file-list` 控制是否展示列表
:::demo components/Upload/gallery.vue :::

## 拖拽上传
设置 `type = 'drop'`，可以开启拖拽上传功能

会根据 `props.accept`、`props.fileSizeLimit`、`props.multiple`+`props.limit` 的设置展示 `tips`

如果自动生成的 `tips` 无法满足你的需求，可以通过插槽 `tips` 来自定义内容

拖拽放置的文件也会根据 `props.accept` 判断是否可以放入上传列表中

:::demo components/Upload/drop.vue :::

## 禁用状态
可以配置 `disabled = true`，禁用上传
:::demo components/Upload/disabled.vue :::

## 后台上传
可以通过设置 `use-background = true` 来开启后台上传

后台上传全局只有一个实例，可以在用户将某一页面组件销毁后继续上传

启用后会将选择的文件的副本也发送到后台上传中。但如果设置 `use-background = false`，则不会发送副本过去

也可以通过配置 `background-standalone = true`，表示此实例独立，不和其他已存在的实例共用一个上传列表
:::demo components/Upload/background.vue :::

## 分片断点续传

传入 `multipart` 配置后，Upload 会按照 `multipart-chunk-size`（MB）切分文件，并最多同时发送
`multipart-max-amount-uploading-at-same-time` 个分片请求。每个请求仍使用 `action`、`method`、`header`
和 `data`，成功分片在暂停或失败重试后不会重复上传。

切片数量较多时，Upload 会自动在 Web Worker 中生成 `Blob` 分片，避免连续切片循环阻塞页面交互；
小文件仍直接切片，避免 Worker 启动开销。如果浏览器不支持 Worker，或站点 CSP 禁止 `blob:` Worker，
则自动退化为分批切片并在批次间让出主线程，无需额外配置。

下面的示例完全在浏览器中模拟慢速服务端，不依赖外部接口。上传时点击文件右侧的暂停按钮，观察绿色的
“已保存”分片；继续上传时只有未完成分片会再次开始。也可以暂停后点击“重新加入同一文件”，验证
`getUploadedChunkIndexes` 从模拟服务端恢复断点。

:::demo components/Upload/multipart.vue :::

实际接入服务端时，可参考下面的配置结构：

```vue
<h-upload
  action="/api/uploads/chunks"
  :multipart="multipart"
  :multipart-chunk-size="5"
  :multipart-max-amount-uploading-at-same-time="3"
  :controls="['upload', 'delete']"
/>

<script setup lang="ts">
import type { HUploadMultipartSetting } from '@aurora/horizon-web';

const multipart: HUploadMultipartSetting = {
  async initUpload(file) {
    // 后端应使用稳定的文件指纹查找或创建上传任务。
    return { uploadId: await createUpload(file) };
  },
  async getUploadedChunkIndexes(file, chunks, { uploadId }) {
    // 重新选择同一文件时，返回服务端已经保存的、从 0 开始的分片下标。
    return queryUploadedChunkIndexes(uploadId);
  },
  beforePartUpload(file, index) {
    return { index };
  },
  async handleMerge(file, chunks) {
    return mergeUpload(file, chunks);
  },
};
</script>
```

`initUpload` 返回的数据会附加到每个分片请求中。`getUploadedChunkIndexes` 是跨组件实例恢复上传的关键：
返回的有效下标会直接标记为成功；页面内点击暂停/继续时，组件本身也会保留这些成功分片。
`handleMerge` 的返回值会作为 `uploaded` 事件的响应，并继续经过 `handle-success` 处理。
如需针对单个配置覆盖并发数，可设置 `multipart.maxAmountUploadingAtSameTime`。
示例通过 `uploadPart` 模拟请求；生产环境不设置它时，组件默认使用 `XMLHttpRequest`，也可以通过它接入云存储 SDK。

## 类型定义
:::code ./demos/type-defined.ts :::
