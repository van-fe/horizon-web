## Set Size
Through the `size` attribute, you can set the size of the component, supporting `'medium' | 'small'`.
:::demo components/Anchor/demo1.vue :::

## Whether to Change Hash
Through the `changeHash` attribute, you can set: clicking the anchor point without changing the hash value of the current URL, that is, preventing the browser from generating corresponding history records.
:::demo components/Anchor/demo2.vue :::

## Custom Scroll Container
Through the `scrollContainer` attribute, you can set: the scroll container. If a nested child scroll container in the page is specified and the container does not have fixed positioning set, it needs to be used with `:changeHash="false"`.

Through the `showTitleSuffix` attribute, you can set: whether to display a numeric suffix at the end of the first-level navigation's "title" (indicating the total number of second-level navigations below it).
:::demo components/Anchor/demo3.vue :::

## Set Offset
Through the `scrollOffset` attribute, you can set: the scroll offset. That is, the distance from the anchor point to the top of the "scroll container" when the document scrolling ends.

Through the `boundsOffset` attribute, you can set: the offset of the anchor area boundary. That is, when the scroll content reaches the specified offset from the top of the "scroll container", the "currently highlighted Link" change is triggered.
:::demo components/Anchor/demo4.vue :::

## Whether to Enable Collapse Mode
Through the `useCollapse` attribute, you can set whether to enable "collapse mode"; through the `collapse` attribute, you can set the default "collapse state"; you can also listen to the component's `update:collapse` event to perform some additional operations.
:::demo components/Anchor/demo9.vue :::

## Whether to Display Side Line
Through the `showLine` attribute, you can set: whether to display the side line.
:::demo components/Anchor/demo5.vue :::

## Listen to Custom Events
You can listen to the component's `click` and `change` events to perform some additional operations.
:::demo components/Anchor/demo6.vue :::

## Additional Usage Scenarios
Dynamic changes: `size` | `maxHeight` | `showTitleSuffix` attributes in AnchorProps, `title` attribute in AnchorLinkProps.
:::demo components/Anchor/demo7.vue :::

## Auto Render
Through the `autoRender` attribute, you can enable "auto render" mode: after enabling, it will automatically traverse the elements inside the `scrollContainer` container and generate elevator navigation. The generation rules are detailed in the `autoRenderRules` attribute.
:::demo components/Anchor/demo8.vue :::
