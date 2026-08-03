# Position
Style utility classes for setting element CSS `position` property.

|Class|Properties|
|-|-|
|static|position: static;|
|relative|position: relative;|
|absolute|position: absolute;|
|fixed|position: fixed;|
|sticky|position: sticky;|

We also provide the ability to quickly center elements, which needs to be used together with `absolute` or `fixed` utility classes.
|Class|Properties|
|-|-|
|position-x-center|left: 50%;<br>transform: translateX(-50%);|
|position-y-center|top: 50%;<br>transform: translateY(-50%);|
|position-center|top: 50%;<br>left: 50%;<br>transform: translate(-50%, -50%);|

## Demo
:::demo ./demos/demo1.vue :::
