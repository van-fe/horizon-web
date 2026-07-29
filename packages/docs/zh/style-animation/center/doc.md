# Center
元素居中是实际开发中很常见的需求，这里总结了相关的工具类供使用。

## 文本居中
使用 [Typography](../typography/doc) 中的 `text-center` 工具类实现水平居中，通过设置 `line-height` 实现垂直居中。
|Class|Properties|
|-|-|
|text-center|text-align: center;|

## Demo
:::demo ./demos/textcenter.vue :::

## 自动边距居中
如果元素具有固定的 `width`，可以使用 [Spacing](../spacing/doc) 中的 `mx-auto` 工具类实现水平居中。
|Class|Properties|
|-|-|
|mx-auto|margin-left: auto;<br>margin-right: auto;|

## Demo
:::demo ./demos/margin.vue :::

## 定位居中
如果元素是 `absolute` 或 `fixed` 定位，可以使用 [Position](../position/doc) 中的工具类实现水平或垂直居中。
|Class|Properties|
|-|-|
|position-x-center|left: 50%;<br>transform: translateX(-50%);|
|position-y-center|top: 50%;<br>transform: translateY(-50%);|
|position-center|top: 50%;<br>left: 50%;<br>transform: translate(-50%, -50%);|

## Demo
:::demo ./demos/position.vue :::

## Flex 居中
如果元素是 `flex` 或 `inline-flex` 模型，可以使用 [Flex](../flex/doc) 中的工具类实现水平或垂直居中。
|Class|Properties|
|-|-|
|justify-center|justify-content: center;|
|align-center|align-items: center;|

## Demo
:::demo ./demos/flex.vue :::
