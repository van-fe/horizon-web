### 维护提示
此组件已停止维护，仅提供解答。请升级使用 upload-v2 组件

### 说明

Upload 是个相对复杂的组件，除了 NUpload 以外，还提供了 NUploadArea、NUploadButton、NUploadImg、NUploadPreviewFileItem、NUploadPreviewImgItem。

其中 NUpload 提供了完整的选择文件、上传文件、展示文件列表功能

NUploadButton、NUploadImg 提供选择文件和展示文件列表的功能，但不提供上传功能，需要自己处理上传操作

NUploadArea 只提供选择文件的功能

NUploadPreviewFileItem、NUploadPreviewImgItem 只提供展示文件的功能

NUpload 的上传通过 UploadHelper 实现，UploadHelper 的功能可参考 <https://nio.feishu.cn/docs/doccnUCcgTXQRiFDmhjTcAtxLjc>

NUpload 和 UploadHelper 使用helpName作为文件的唯一标识，如果helpName相同，视为同一个文件；给modelValue（v-model）赋值时，helpName可以不传，NUpload会自动添加一个uuid（1.4.2-beta.11版本）

### NUpload 基本使用

此例主要展示 Upload 最基础的使用，场景主要是文件选择时的单选多选，文件上传数量限制，uploadOptions 的对象形式和函数形式等

:::demo ./demos/upload-base.vue :::

### NUpload 一个完整的使用示例

此例主要展示了 modelValue、beforeUpload、operators 等属性的用法，场景包括：有预置的文件列表和上传的文件共同展示，上传前对文件进行过滤（此例中过滤大于 5M 的文件），文件的缩略图设置，上传的文件展示为图片形式还是文件形式（此例中图片展示为图片形式，其他类型展示为文件形式），已上传文件的预览和下载等

在 file 上挂载 thumbnail 属性可以让文件展示缩略图，有时服务端无法返回文件缩略图，可以使用如下代码自行生成

```
thumbnail = window.URL.createObjectURL(v.file)
```

在 file 上挂载 displayType 属性可以在图片墙（Upload 的 type 属性为 img）形式下，控制文件展示为图片形式（缩略图）还是文件形式（文件名、文件大小等信息）

上述两个属性可以重点关注示例中的 onUpdate 函数

UploadHelper 会在上传时尝试获取上传接口返回的 response（上传成功）和 error（上传失败），可以在 update:modelValue 事件上监听并在 file 上挂载自己需要的任何属性，file 上预设的属性可参考 UploadHelper 的文档 <https://nio.feishu.cn/docs/doccnUCcgTXQRiFDmhjTcAtxLjc>

:::demo ./demos/upload-complete.vue :::

### NUpload 使用 customRequest

uploadOptions 中有两个用于自定义上传行为的参数，requestOptions 和 customRequest，其中 requestOptions 主要定义一些简单的参数（比如 url、method 等），使用的是 NUpload 内置的上传行为；customRequest 用于完全自定义上传行为，customRequest 会接收 requestOptions 中的全部参数

:::demo ./demos/upload-customrequest.vue :::

### NUpload 各种展示属性

NUpload 预置了很多展示用的属性，主要包含 type、size、proportion、mimeIcons、progressNumberVisible、operators 等，此例中主要展示了文件列表形式（type 为 list）和图片墙形式（type 为 img），自定义操作按钮，其他属性可以在后续示例中查看

:::demo ./demos/upload-display.vue :::

### NUploadButton

NUploadButton 可以用于选择文件，也可以和文件列表一起展示，但 NUploadButton 不内置上传功能和上传文件列表的状态管理

NUploadButton 的单选、多选（multiple）、文件夹选择（directory）、可选择的文件类型（accept）、禁用等属性，都和 NUpload 对应，后续不再赘述

此例中还展示了如何使用 NUploadButton 搭配 UploadHelper 实现一个上传组件，对 NUpload 的实现有兴趣的可以看一下

:::demo ./demos/button.vue :::

### NUploadImg

NUploadImg 和 NUploadButton 提供的功能相似，只是展示形式上有所区别，NUploadImg 不内置上传功能和上传文件列表的状态管理

:::demo ./demos/image.vue :::

### NUploadArea

NUploadArea 只提供选择文件的功能

:::demo ./demos/area.vue :::

### NUploadPreviewFileItem 和 NUploadPreviewImgItem

NUploadPreviewFileItem 和 NUploadPreviewImgItem 只提供展示文件的功能

### 自定义图标

各种文件类型本身的 type 非常繁多，upload 内部只维护了一部分图标和文件类型的映射，更多的图标和类型需要使用者自己维护

在 file 上挂载 类型，specialFileType 属性可以指定的文件类型，区别于 fileType，fileType 是通过 File 对象获取到的默认 MIME 类型，specialFileType 则是指定的文件种类，一般用来指定展示图标，预置的种类有 pic、excel、video、word、excel、ppt、audio、pdf、zip、unknown

:::demo ./demos/icon.vue :::

### UploadHelper

NUpload 的上传逻辑使用的是 @nio-fe/upload-helper，NUploadStatusMap 类型对应 UploadHelper 的 UploadStatusMap 类型， NUploadHelperOptions 类型对应 UploadHelper 的构造函数参数（其中 NUpload 实现了 onChange 函数 ，映射了 customRequest），可参考 UploadHelper 的文档 <https://nio.feishu.cn/docs/doccnUCcgTXQRiFDmhjTcAtxLjc>

### NMIMEIconType

| 属性 | 说明 | 类型 | 是否必须 |
| --- | --- | --- | --- |
| [key: string] | 文件类型名称，例如: pdf\pic 等 | (fileType: string,fileName: string) => {name: string;color: string;} | 否 |

### 默认图标支持类型及使用说明

目前组件内部支持几种类型文件的图标展示，你也可以自定义图标展示方式

- 默认的图标内容

| 文件类型名称 | 对应的默认图标 |
| ------------ | -------------- |
| pic          | picture_filled |
| excel        | excel_filled   |
| video        | video_filled   |
| word         | word_filled    |
| ppt          | ppt_filled     |
| audio        | mp3_filled     |
| pdf          | pdf_filled     |
| zip          | zip_filled     |
| unknown      | unknown_filled |

- 默认文件类型对应的 MIME Type

| pic | excel | video | word | ppt | audio | pdf | zip | unknown |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| image/bmp | application/vnd.ms-excel | video/quicktime | application/msword | application/vnd.ms-powerpoint | audio/mpeg | application/pdf | application/zip | -- |
| image/jpeg | application/vnd.openxmlformats-officedocument.spreadsheetml.sheet | video/x-msvideo | application/vnd.openxmlformats-officedocument.wordprocessingml.document | application/vnd.openxmlformats-officedocument.presentationml.presentation | audio/midi | -- | application/x-7z-compressed | -- |
| image/png | -- | video/mpeg | -- | -- | audio/x-midi | -- | -- | -- |
| image/svg+xml | -- | video/ogg | -- | -- | audio/ogg | -- | -- | -- |
| image/tiff | -- | video/webm | -- | -- | audio/wav | -- | -- | -- |
| image/webp | -- | video/3gpp | -- | -- | audio/webm | -- | -- | -- |
| image/gif | -- | video/3gpp2 | -- | -- | audio/3gpp | -- | -- | -- |
| image/vnd.microsoft.icon | -- | video/mp4 | -- | -- | audio/3gpp2 | -- | -- | -- |
| -- | -- | video/vnd.sealedmedia.softseal.mov | -- | -- | audio/aac | -- | -- | -- |
