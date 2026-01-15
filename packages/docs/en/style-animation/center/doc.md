# Center
Element centering is a very common requirement in actual development. Here are summarized related utility classes for use.

## Text Center
Use the `text-center` utility class in [Typography](./typography) to achieve horizontal centering, and set `line-height` to achieve vertical centering.
|Class|Properties|
|-|-|
|text-center|text-align: center;|

## Demo
:::demo ./demos/textcenter.vue :::

## Auto Margin Center
If the element has a fixed `width`, you can use the `mx-auto` utility class in [Spacing](./spacing) to achieve horizontal centering.
|Class|Properties|
|-|-|
|mx-auto|margin-left: auto;<br>margin-right: auto;|

## Demo
:::demo ./demos/margin.vue :::

## Position Center
If the element is `absolute` or `fixed` positioned, you can use utility classes in [Position](./position) to achieve horizontal or vertical centering.
|Class|Properties|
|-|-|
|position-x-center|left: 50%;<br>transform: translateX(-50%);|
|position-y-center|top: 50%;<br>transform: translateY(-50%);|
|position-center|top: 50%;<br>left: 50%;<br>transform: translate(-50%, -50%);|

## Demo
:::demo ./demos/position.vue :::

## Flex Center
If the element is `flex` or `inline-flex` model, you can use utility classes in [Flex](./flex) to achieve horizontal or vertical centering.
|Class|Properties|
|-|-|
|justify-center|justify-content: center;|
|align-center|align-items: center;|

## Demo
:::demo ./demos/flex.vue :::
