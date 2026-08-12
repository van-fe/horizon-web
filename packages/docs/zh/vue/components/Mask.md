## 基本用法

在应用程序上添加一个暗淡的层（type:五种类型，默认为default）。
:::demo vue/components/Mask/demo1.vue :::

## 绝对定位

注意：需要给父元素设置相对定位才可以进行盒子撑大。
:::demo vue/components/Mask/demo2.vue :::

## 透明度

可以通过 `opacity` 调整遮罩层透明度，取值范围为 0 到 1。
:::demo vue/components/Mask/demo3.vue :::

## 层级

设置遮罩层的层叠性的权重
:::demo vue/components/Mask/demo4.vue :::

## 高斯模糊

设置特定的模糊程度，以及透明度，以及遮罩层颜色 
:::demo vue/components/Mask/demo5.vue :::

## Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `type` | `'default' \| 'weak' \| 'strong' \| 'inverse' \| 'transparent' \| 'customize'` | `'default'` | 遮罩视觉类型 |
| `value` | `boolean` | `true` | 是否显示遮罩 |
| `absolute` | `boolean` | `false` | 覆盖最近的定位容器 |
| `opacity` | `number \| string` | `1` | 遮罩透明度 |
| `color` | `string` | — | 自定义遮罩颜色 |
| `zIndex` | `number` | `1` | 根层级 |
| `scrimClass` | `string` | — | 遮罩背景 class |
| `scrimStyle` | `CSSProperties` | — | 遮罩背景样式 |
| `isFuzzification` | `boolean` | `false` | 使用半透明模糊效果 |
| `contentFullSize` | `boolean` | `false` | 内容区域占满遮罩 |

## Events

| 事件 | 说明 |
| --- | --- |
| `clickMask` | 仅点击遮罩背景时触发 |

## Slots

| 插槽 | 说明 |
| --- | --- |
| `default` | 遮罩上方内容 |
