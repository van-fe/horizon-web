## 基础用法

CommandPalette 提供键盘优先的全局操作入口。用户可以点击触发器，或按 Command/Ctrl + K 打开面板；输入关键词后使用方向键移动，按 Enter 执行。

通过 `commands` 提供标签、说明、关键词、快捷键和禁用状态。监听 `search` 展示查询状态，监听 `select` 获取最终执行的命令。

:::demo components/CommandPalette/basic.vue :::
