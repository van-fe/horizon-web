### 单文件上传
选择不同文件后会替换掉之前的文件
:::demo components/Upload/basic.vue :::

### 多文件上传
设置 `multiple = true`，可以选择、上传多个文件

配合 `limit` 限制选择的文件数量
:::demo components/Upload/multiple.vue :::

### 拦截文件
设置 `accept` 可以控制选择的文件类型

默认开启严格控制文件类型，会对所有非 `accept` 允许的文件进行拦截，且对外抛出 `accept-error` 事件

如果希望手动控制，则可以设置 `accept-strict = false`，由自定义的 `before-upload` 拦截

:::demo components/Upload/before-upload.vue :::

### 文件大小检查
设置 `file-size-limit`，即可自动对文件的大小进行检查

如果超出，会自动过滤，并且抛出 `file-size-exceed` 事件

:::demo components/Upload/file-size-exceed.vue :::

### 头像上传
设置 `type = 'gallery'`，并配置一些数据，可以实现类似于头像上传的功能
:::demo components/Upload/avatar.vue :::

### 照片墙
设置 `type = 'gallery'`，可以开启照片墙上传模式

照片墙模式下，强制展示图片列表，无法通过 `show-file-list` 控制是否展示列表
:::demo components/Upload/gallery.vue :::

### 拖拽上传
设置 `type = 'drop'`，可以开启拖拽上传功能

会根据 `props.accept`、`props.fileSizeLimit`、`props.multiple`+`props.limit` 的设置展示 `tips`

如果自动生成的 `tips` 无法满足你的需求，可以通过插槽 `tips` 来自定义内容

拖拽放置的文件也会根据 `props.accept` 判断是否可以放入上传列表中

:::demo components/Upload/drop.vue :::

### 禁用状态
可以配置 `disabled = true`，禁用上传
:::demo components/Upload/disabled.vue :::

### 后台上传
可以通过设置 `use-background = true` 来开启后台上传

后台上传全局只有一个实例，可以在用户将某一页面组件销毁后继续上传

启用后会将选择的文件的副本也发送到后台上传中。但如果设置 `use-background = false`，则不会发送副本过去

也可以通过配置 `background-standalone = true`，表示此实例独立，不和其他已存在的实例共用一个上传列表
:::demo components/Upload/background.vue :::

### 类型定义
:::code ./demos/type-defined.ts :::