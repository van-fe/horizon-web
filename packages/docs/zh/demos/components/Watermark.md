Watermark 在内容上方生成不影响交互的重复水印。

## 单行文本

将字符串传给 `content`，并通过间距、旋转和透明度适配内容。

:::demo components/Watermark/demo1.vue :::

## 多行文本

将字符串数组传给 `content` 可生成多行水印。

:::demo components/Watermark/demo2.vue :::

## 图片水印

`image` 使用图片作为水印；加载失败时可回退到 `content`。

:::demo components/Watermark/demo3.vue :::

## 防篡改反馈

组件检测到水印节点被修改时会触发 `tampered`，业务可据此记录或提示。

:::demo components/Watermark/demo4.vue :::
