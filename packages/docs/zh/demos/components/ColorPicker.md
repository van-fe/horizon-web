## 基础用法与透明度

ColorPicker 默认编辑单色。设置 `alpha` 后可以调整透明度；把结果放在真实背景上预览，更容易判断最终效果。

:::demo components/ColorPicker/alpha.vue :::

## 触发器类型与状态

`trigger-type="square"` 提供色块触发器，配合 `square-text` 显示当前色值。触发器支持禁用和清空状态。

:::demo components/ColorPicker/trigger.vue :::

## 自定义触发器

使用 `trigger` 插槽将取色能力组合进已有操作。插槽参数的 `resultsValue.value` 是当前格式化后的色值。

:::demo components/ColorPicker/custom-trigger.vue :::

## 触发器尺寸

`size` 支持 `small`、`medium` 和 `large`，只影响触发器，不会改变弹出面板尺寸。`squareText` 插槽可替换色值文字。

:::demo components/ColorPicker/size.vue :::

## 高级能力

渐变、预设色板、最近使用、自定义颜色、确认流程和屏幕取色可按任务组合。最近使用与自定义颜色保存在当前浏览器。

屏幕取色依赖 [EyeDropper API](https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper)，属于渐进增强能力；不支持时仍应保留常规色板和输入方式。

:::demo components/ColorPicker/examples.vue :::
