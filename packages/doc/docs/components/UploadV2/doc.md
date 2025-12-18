### 单文件上传
选择不同文件后会替换掉之前的文件
:::demo ./demos/basic.vue :::

### 多文件上传
设置 `multiple = true`，可以选择、上传多个文件

配合 `limit` 限制选择的文件数量
:::demo ./demos/multiple.vue :::

### 拦截文件
设置 `accept` 可以控制选择的文件类型

默认开启严格控制文件类型，会对所有非 `accept` 允许的文件进行拦截，且对外抛出 `accept-error` 事件

如果希望手动控制，则可以设置 `accept-strict = false`，由自定义的 `before-upload` 拦截

:::demo ./demos/before-upload.vue :::

### 文件大小检查
设置 `file-size-limit`，即可自动对文件的大小进行检查

如果超出，会自动过滤，并且抛出 `file-size-exceed` 事件

:::demo ./demos/file-size-exceed.vue :::

### 拦截预览
一般情况下，只允许图片和视频进行预览，其余文件格式将会以新开窗口进行预览

但如果你的业务提供了自定义预览的能力，可以使用 `before-preview` 拦截预览事件

如果传入 `Promisable<true | void>` 则继续使用内置的预览逻辑进行预览，并抛出 `preview` 事件

如果返回 `Promisable<false> ｜ Reject` 则不处理任何逻辑，也不会抛出 `preview` 事件

另外，因为 `Viewer` 组件可以批量预览文件，如果有些图片或视频不希望被 `Viewer` 组件载入到缩略列表中，则可以通过 `before-viewer-preview` 拦截

因为 `before-viewer-preview` 会在 `fileList` 变动时调用，所以不能传入异步函数

:::demo ./demos/before-preview.vue :::

### 展示文件缩略图
默认情况下，图片和视频只展示对应的 `icon`，如果希望展示其缩略图，可以配置 `show-file-thumbnail = true` 可以展示其缩略图
:::demo ./demos/show-file-thumbnail.vue :::

### 头像上传
设置 `type = 'gallery'`，并配置一些数据，可以实现类似于头像上传的功能
:::demo ./demos/avatar.vue :::

### 照片墙
设置 `type = 'gallery'`，可以开启照片墙上传模式

照片墙模式下，强制展示图片列表，无法通过 `show-file-list` 控制是否展示列表
:::demo ./demos/gallery.vue :::

### 照片墙+文件混合
设置 `type = 'gallery-mixed'`，可以展示混合照片墙模式

只有图片和视频会使用照片墙样式，其余文件都是普通文件样式

:::demo ./demos/gallery-mixed.vue :::

### 拖拽上传
设置 `type = 'drop'`，可以开启拖拽上传功能

会根据 `props.accept`、`props.fileSizeLimit`、`props.multiple`+`props.limit` 的设置展示 `tips`

如果自动生成的 `tips` 无法满足你的需求，可以通过插槽 `tips` 来自定义内容

拖拽放置的文件也会根据 `props.accept` 判断是否可以放入上传列表中

:::demo ./demos/drop.vue :::

### 粘贴上传
通过设置 `use-clipboard = true` 开启监听剪切板粘贴事件继而上传

对于粘贴文件，你也可以通过 `before-paste` 钩子拦截用户粘贴的文件

:::demo ./demos/clipboard.vue :::

### 禁用状态
可以配置 `disabled = true`，禁用上传
:::demo ./demos/disabled.vue :::

### 后台上传
可以通过设置 `use-background = true` 来开启后台上传

后台上传全局只有一个实例，可以在用户将某一页面组件销毁后继续上传

启用后会将选择的文件的副本也发送到后台上传中。但如果设置 `use-background = false`，则不会发送副本过去

也可以通过配置 `background-standalone = true`，表示此实例独立，不和其他已存在的实例共用一个上传列表

如果希望自控组件，可以使用 `Upload` 的 `createBackgroundUploadInstance` 静态方法自己创建实例，传入 `uploadProps` 即可

销毁时可以使用 `Upload` 的 `destroyBackgroundUploadInstance` 静态方法

此时对于 `upload` 组件只需开启 `use-background`，就可以直接将上传文件同步到你初始化的后台上传组件中。（需要在开启了 `use-background` 的 `upload` 挂载之前初始化好，否则会创建多份后台上传组件）

对于在后台上传组件中操作文件的一些事件，需要自己创建实例，然后监听事件

:::demo ./demos/background.vue :::

### 自定义上传
如果内置的上传功能无法满足业务需求，则可以自定义 `http-request`
:::demo ./demos/http-request.vue :::

### 控制器展现方式
自 `2.12.14` 开始，默认情况下，文件列表子项的操作控制器会在鼠标悬浮时展示，但如果希望其始终展示，则需要设置 `controls-always-visible = true`
:::demo ./demos/controls-always-visible.vue :::

### 类型定义
:::code ./demos/type-defined.ts :::
