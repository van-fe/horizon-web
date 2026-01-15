## Basic Usage
Affix is fixed at the top of the page by default

Affix uses `div` to wrap elements, so if you need to modify styles, you can directly set `style.display` to `inline-block` or other values

:::demo components/Affix/basic.vue :::

## Set offset
If you want the affix to have a distance from the scroll container, you can specify `offset`

:::demo components/Affix/offset.vue :::

## Specify Container
Affix listens to the scroll event of `document.body` by default. If you need to specify another one, you can set `target`

:::demo components/Affix/target.vue :::

## Nested Scroll Container
If the parent of the container where the affix is located can also scroll, without special settings, it cannot accurately ensure that the element is within the container

At this time, it is necessary to listen to the parent scroll event

:::demo components/Affix/multiple-scroll-container.vue :::

## Fixed Bottom
You can set `position = 'bottom'` to fix the affix at the bottom

:::demo components/Affix/bottom.vue :::
