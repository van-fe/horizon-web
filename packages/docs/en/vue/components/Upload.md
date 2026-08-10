
## Single File

By default, selecting another file replaces the current one. Use `accept` to limit selectable formats.

:::demo vue/components/Upload/basic.vue :::

## Multiple Files

Set `multiple` to allow multi-selection, `limit` to cap the list, and `auto-slice-exceed-files` to keep valid files when a selection exceeds the limit.

:::demo vue/components/Upload/multiple.vue :::

## Before Upload

`accept-strict` rejects files that do not match `accept`. Use `before-upload` for additional business validation.

:::demo vue/components/Upload/before-upload.vue :::

## File Size

`file-size-limit` filters oversized files and emits `file-size-exceed`.

:::demo vue/components/Upload/file-size-exceed.vue :::

## Avatar

Combine `type="gallery"` with single-file behavior for avatar or cover editing.

:::demo vue/components/Upload/avatar.vue :::

## Gallery

Gallery mode presents files as thumbnails and works well for a small image collection.

:::demo vue/components/Upload/gallery.vue :::

## Drop Zone

`type="drop"` supports both drag-and-drop and file picking while sharing the same format, count, and size validation.

:::demo vue/components/Upload/drop.vue :::

## Disabled

`disabled` prevents picking, dropping, and list operations while preserving existing files.

:::demo vue/components/Upload/disabled.vue :::

## Background Upload

`use-background` hands work to the shared background queue. `show-file-list` independently controls the list on the current page.

:::demo vue/components/Upload/background.vue :::

## Multipart and Resume

With `multipart`, files are split by `multipart-chunk-size`, while `multipart-max-amount-uploading-at-same-time` limits concurrency. `getUploadedChunkIndexes` restores completed parts and `handleMerge` combines the result after every part succeeds.

:::demo vue/components/Upload/multipart.vue :::

See the [Upload Adapters extension](/en/extensions/upload-adapters) for cloud-provider presets and an interactive sandbox. Production integrations can use the default XHR transport or provide `uploadPart` for a custom service or storage SDK.

## Type Definitions

:::code ./demos/type-defined.ts :::
