## 指令说明

`v-loading` 用于在页面或局部内容等待异步数据时展示加载反馈。向指令传入配置对象，即可控制动画类型、尺寸、图文排列、遮罩背景以及延迟时间；对象中的响应式值更新后，加载状态会同步变化。

## 基本样式

内置 `circle` 与 `dots` 两种动画，并提供小、中、大三种尺寸。切换右上角开关可以查看内容加载前后的状态。

:::demo directives/v-loading/demo1.vue :::

## 局部与全屏加载

加载指令可以覆盖任意内容容器，也可以通过 `fullscreen` 展示页面级等待状态。全屏示例会在 2 秒后自动关闭。

:::demo directives/v-loading/demo2.vue :::

## 动态配置

组合配置项可以即时调整加载动画，适合根据不同业务场景统一加载反馈。

:::demo directives/v-loading/demo3.vue :::

## 延迟显示

当请求很快完成时，立即展示 loading 可能产生闪屏。通过 `delay` 设置延迟时间，可以让短于该时间的请求不显示加载遮罩。

:::demo directives/v-loading/delay.vue :::

## 与其他组件库共存

当项目中的其他组件库注册了同名 `v-loading` 指令时，可以为 Horizon Web 的 loading 指令重新注册一个名称：

```javascript
import { loading } from '@aurora/horizon-web';

app.directive('my-loading', loading);
```

```vue
<div
  v-my-loading="{ isShow, loadingType: 'circle', textOrient: 'column', size: 'medium' }"
>
  内容区域
</div>
```

## 全局方法

可以引入 `LoadingService`，使用函数形式调用 loading：

```ts
import { LoadingService } from '@aurora/horizon-web';

const { close } = LoadingService(document.body, {
  fullscreen: true,
});

// 手动关闭 loading
function closeLoading() {
  close();
}
```
