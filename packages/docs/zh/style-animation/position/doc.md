# Position
样式工具类，用来设置元素的 CSS `position` 属性。

|Class|Properties|
|-|-|
|static|position: static;|
|relative|position: relative;|
|absolute|position: absolute;|
|fixed|position: fixed;|
|sticky|position: sticky;|

我们还提供了快速将元素居中的能力，需要结合 `absolute` 或 `fixed` 工具类一起使用。
|Class|Properties|
|-|-|
|position-x-center|left: 50%;<br>transform: translateX(-50%);|
|position-y-center|top: 50%;<br>transform: translateY(-50%);|
|position-center|top: 50%;<br>left: 50%;<br>transform: translate(-50%, -50%);|

## Demo
:::demo ./demos/demo1.vue :::
