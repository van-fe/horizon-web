## 基本用法
最简单的用法，适用于简短的警告提示。
:::demo components/Alert/basic.vue :::
## 大小
:::demo components/Alert/size.vue :::
## 四种样式
共有四种样式 success、info、warning、error。
:::demo components/Alert/demo1.vue :::
## 拓展样式


:::demo components/Alert/demo2.vue :::

## 不同布局
- 水平布局：描述文案内容较少时使用
- 垂直布局：描述文字内容较多时使用
- 辅助性文字只能存放单行文本，会自动换行显示。
- 如果文本换行，自动隐藏关闭按钮，需要手动传入，`primary-button-text` 或 `default-button-text`，定义按钮文本传入 `onPrimary` 或 `onDefault` 对应按钮回调事件，回调函数的第一个参数提供关闭 `alert` 组件的 `close` 方法
  :::demo components/Alert/demo3.vue :::
