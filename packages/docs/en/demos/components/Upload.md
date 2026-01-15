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

## Type Definition
:::code ./demos/type-defined.ts :::
