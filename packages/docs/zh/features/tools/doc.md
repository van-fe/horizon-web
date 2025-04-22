# 其他的一些全局工具类

## useZIndex

`lego` 对外暴露了 `useZIndex` 方法，用来帮助开发者可以感知组件中的 `z-index` 数值，并且也可以控制其值

`useZIndex` 有个特殊的点：如果在调用 `useZIndex` 时传入的值比当前 `z-index` 小，则不会被设置为传入的值

这是为了避免有些组件动态生成且 `z-index` 是固定值，导致每次生成该组件时，`z-index` 都会被重置的问题

如果你需要更改 `z-index`，可以调用 `set` 方法

:::demo ./demos/useZIndex.vue :::
