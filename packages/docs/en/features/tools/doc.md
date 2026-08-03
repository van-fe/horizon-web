# Other Global Utility Classes

## useZIndex

`horizon-web` exposes the `useZIndex` method to help developers perceive the `z-index` value in components and also control its value

`useZIndex` has a special point: if the value passed when calling `useZIndex` is smaller than the current `z-index`, it will not be set to the passed value

This is to avoid the problem that some components are dynamically generated and `z-index` is a fixed value, causing `z-index` to be reset every time the component is generated

If you need to change `z-index`, you can call the `set` method

:::demo ./demos/useZIndex.vue :::
