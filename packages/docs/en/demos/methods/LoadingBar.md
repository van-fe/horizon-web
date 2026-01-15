## Basic Usage
LoadingBar will only create one globally, so methods called from any location will control this same component. LoadingBar has multiple methods: start(), finish(), error(), update(), destroy().

When the start method is called, LoadingBar will simulate the loading progress and extend to 80% of the screen width; calling the finish method means the loading is successful, LoadingBar will extend to the full screen width and disappear; calling the error method means the loading failed, LoadingBar will turn error color and extend to the full screen width and disappear; after calling the update method, you can accurately load to the specified progress; after calling the destroy method, you can destroy the loadingBar instance.
:::demo methods/LoadingBar/demo1.vue :::

## LoadingBar Configuration Height

You can configure custom height through the config({
  height:xx
}) method

:::demo methods/LoadingBar/demo2.vue :::
