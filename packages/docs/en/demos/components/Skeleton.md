## Usage Instructions
In essence, Skeleton and loading are no different. They are both used to give users feedback that they are in a waiting loading stage. However, from an experience perspective, skeleton screens are more guiding than loading and can better help users focus.
So which loading processes are more suitable for using skeleton screens?
1. When there are many repetitive contents on the page
2. Large paragraphs of text
3. Lists and tables

## Usage Situations
The use of skeleton screens is still a minority overall. In addition to technical reasons, when the style of the skeleton screen differs too much from the actual content, there will be serious expectation gaps, and the effect will be counterproductive. So when you want to use skeleton screens, you need to first consider whether the content itself is suitable for using skeleton screens.

## Basic Usage
Skeleton provides default skeleton screen and two slots loadingTemplate and default. When no slots are used, the default skeleton screen style will be displayed. Toggle the animated state to whether to display the skeleton screen animation
:::demo components/Skeleton/demo1.vue :::

## Slots
Users can display the skeleton screen style when `loading` in the slot `loadingTemplate`, and display the default style in the `default` slot
:::demo components/Skeleton/demo2.vue :::

## Atomic Skeleton Screen
The following atomic skeleton screens are provided. Users can configure their own business skeleton screens through these atomic skeleton screens based on the default display style
:::demo components/Skeleton/demo3.vue :::
