## Single File Upload
After selecting different files, the previous files will be replaced
:::demo components/Upload/basic.vue :::

## Multiple File Upload
Set `multiple = true` to select and upload multiple files

Use `limit` to limit the number of files selected
:::demo components/Upload/multiple.vue :::

## Intercept Files
Set `accept` to control the file types selected

Strict file type control is enabled by default, which will intercept all files not allowed by `accept`, and throw an `accept-error` event

If you want to control manually, you can set `accept-strict = false` and intercept with a custom `before-upload`

:::demo components/Upload/before-upload.vue :::

## File Size Check
Set `file-size-limit` to automatically check the file size

If exceeded, it will be automatically filtered and throw a `file-size-exceed` event

:::demo components/Upload/file-size-exceed.vue :::

## Avatar Upload
Set `type = 'gallery'` and configure some data to achieve functions similar to avatar upload
:::demo components/Upload/avatar.vue :::

## Photo Wall
Set `type = 'gallery'` to enable photo wall upload mode

In photo wall mode, the image list is forced to be displayed, and cannot be controlled whether to display the list through `show-file-list`
:::demo components/Upload/gallery.vue :::

## Drag Upload
Set `type = 'drop'` to enable drag upload function

Will display `tips` according to the settings of `props.accept`, `props.fileSizeLimit`, `props.multiple`+`props.limit`

If the automatically generated `tips` cannot meet your needs, you can customize the content through the `tips` slot

Files placed by dragging will also be judged whether they can be put into the upload list according to `props.accept`

:::demo components/Upload/drop.vue :::

## Disabled State
You can configure `disabled = true` to disable upload
:::demo components/Upload/disabled.vue :::

## Background Upload
You can enable background upload by setting `use-background = true`

There is only one instance of background upload globally, which can continue uploading after the user destroys a page component

After enabling, copies of selected files will also be sent to background upload. But if `use-background = false` is set, copies will not be sent

You can also configure `background-standalone = true` to indicate that this instance is independent and does not share an upload list with other existing instances
:::demo components/Upload/background.vue :::

## Resumable Multipart Upload

Pass a `multipart` configuration to split a file by `multipart-chunk-size` (MB). Upload sends at
most `multipart-max-amount-uploading-at-same-time` chunk requests concurrently. Chunk requests use
the regular `action`, `method`, `header`, and `data` props. Completed chunks are not uploaded again
after pausing or retrying a failed upload.

When a file produces many chunks, Upload creates its `Blob` slices in a Web Worker so that the
slicing loop does not block page interactions. Small files stay on the main thread to avoid Worker
startup overhead. If Worker support is unavailable or the site's CSP blocks `blob:` workers, Upload
automatically falls back to batched slicing that yields between batches; no extra configuration is
required.

The demo below simulates a slow server entirely in the browser and does not require an external
endpoint. Pause with the control beside the file and watch the green stored chunks remain intact.
Resume to send only unfinished chunks, or choose “重新加入同一文件” after pausing to verify that
`getUploadedChunkIndexes` restores the server-side checkpoint.

:::demo components/Upload/multipart.vue :::

Use the following configuration shape when connecting a real backend:

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
    // The server should use a stable file fingerprint to find or create an upload.
    return { uploadId: await createUpload(file) };
  },
  async getUploadedChunkIndexes(file, chunks, { uploadId }) {
    // Return zero-based indexes already stored by the server when the same file is selected again.
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

Data returned by `initUpload` is appended to every chunk request. `getUploadedChunkIndexes` enables
recovery across component instances: every valid returned index starts in the successful state.
Within the same instance, pause and resume preserve successful chunks automatically. The return
value of `handleMerge` becomes the `uploaded` event response and is passed through `handle-success`.
Set `multipart.maxAmountUploadingAtSameTime` to override concurrency for one configuration.
The demo uses `uploadPart` to simulate requests. Omit it to use the default `XMLHttpRequest`, or
provide it to integrate a cloud-storage SDK.

## Type Definition
:::code ./demos/type-defined.ts :::
