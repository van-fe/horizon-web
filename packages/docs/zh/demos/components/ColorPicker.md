## 基础用法
基础样式进包含单色的调节，设置 `alpha = true`，开启设置透明度
:::demo components/ColorPicker/alpha.vue :::

## 触发器类型
可以通过配置 `square-text = true` 开启带色号的样式
:::demo components/ColorPicker/trigger.vue :::

## 自定义 trigger
某些情况下可能需要自己设定触发 `trigger`，使用 `slots.trigger` 可以配置

返回参数中可以使用 `resultsValue.value` 得到设置的值
:::demo components/ColorPicker/custom-trigger.vue :::

## 触发器尺寸
触发器尺寸分为S、M、L三种，通过 `size` 控制大小
:::demo components/ColorPicker/size.vue :::

## 拓展样式
拓展的功能分别有：带渐变设置、带系统预设颜色、带最近使用颜色、带自定义颜色、带网页取色、只有一种渐变、带取消/确认按钮、带清空按钮、带取消/确认+清空按钮；

注：网页取色使用了 [EyeDropper API](https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper)，但具体的浏览器支持情况需要查看：[Can I Use](https://caniuse.com/?search=EyeDropper)，在实际生产场景时，请谨慎使用此能力，此 `API` 并不精准，可能会有细微差距
:::demo components/ColorPicker/examples.vue :::
