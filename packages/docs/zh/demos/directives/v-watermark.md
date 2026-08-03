## 单行文本水印
通过`content`属性可以设置：单行文本水印内容，值为字符串。

:::demo directives/v-watermark/demo1.vue :::

## 多行文本水印
通过`content`属性可以设置：多行文本水印内容，值为字符串数组。

:::demo directives/v-watermark/demo2.vue :::

## 图片水印
通过`image`属性可以设置：图片水印内容。当图片加载异常时，会将`content`属性的值用以兜底展示。

:::demo directives/v-watermark/demo3.vue :::

## 额外的使用场景
可以监听组件的`tampered`事件，从而做一些额外的操作。

:::demo directives/v-watermark/demo4.vue :::
