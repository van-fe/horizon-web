## Directive Instructions
Display loading animation when needed to prevent the page from losing responsiveness and improve user experience (for example, charts generated after requesting data). The horizonweb component library uses loading through custom directives. For the custom directive v-loading, pass in an object, and each value of this object is reactive data, as shown in the examples in demo1/demo2.

## Loading
:::demo directives/v-loading/demo1.vue :::

## Used Together with Other horizonweb Components
:::demo directives/v-loading/demo2.vue :::

## Dynamic Configuration
:::demo directives/v-loading/demo3.vue :::

## Delayed Display
When accessing request details is very fast, if loading is used directly, it will cause screen flicker, so you can control the delayed display time by setting `delay`
:::demo directives/v-loading/delay.vue :::

## Possible Situations When horizonweb is Used Together with Other Component Libraries
When horizonweb and other component libraries are used together in a project, and there is a vue directive with the same name as v-loading in other component libraries, it may cause the horizonweb v-loading directive to fail. At this time, horizonweb users can re-register the v-loading directive as follows:
```javascript
import { loading } from '@aurora/horizon-web';
app.directive('my-loading', loading);
// When using in components
 <div v-my-loading="{isShow,loadingType:'circle',textOrient:'column',size:'medium',}" class="loadingContainer">Test</div>

```

## Global Method
You can import `LoadingService` and use the function form to call `Loading`

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
