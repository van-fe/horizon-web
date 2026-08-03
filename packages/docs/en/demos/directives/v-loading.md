## Directive Instructions

Use `v-loading` to provide feedback while a page or content region is waiting for asynchronous data. Pass a configuration object to control the animation type, size, text orientation, mask background, and delay. Changes to reactive values update the loading state immediately.

## Basic Styles

Choose between the built-in `circle` and `dots` animations in small, medium, or large sizes. Use the switch in the demo to compare loading and ready states.

:::demo directives/v-loading/demo1.vue :::

## Local and Fullscreen Loading

The directive can cover any content container or create a page-level state with `fullscreen`. The fullscreen demo closes automatically after two seconds.

:::demo directives/v-loading/demo2.vue :::

## Dynamic Configuration

Combine the available options and preview the result immediately for different product scenarios.

:::demo directives/v-loading/demo3.vue :::

## Delayed Display

Showing a loading mask immediately for a fast request can cause a distracting flash. Set `delay` so requests that finish before the threshold never display the mask.

:::demo directives/v-loading/delay.vue :::

## Coexisting with Other Component Libraries

If another component library registers a directive named `v-loading`, register Horizon Web's loading directive under a different name:

```javascript
import { loading } from '@aurora/horizon-web';

app.directive('my-loading', loading);
```

```vue
<div
  v-my-loading="{ isShow, loadingType: 'circle', textOrient: 'column', size: 'medium' }"
>
  Content area
</div>
```

## Global Method

Import `LoadingService` to create a loading state programmatically:

```ts
import { LoadingService } from '@aurora/horizon-web';

const { close } = LoadingService(document.body, {
  fullscreen: true,
});

// Manually close loading
function closeLoading() {
  close();
}
```
