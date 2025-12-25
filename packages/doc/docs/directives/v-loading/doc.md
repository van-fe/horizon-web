### 指令说明
在需要的时候展示加载动画，防止页面失去响应提高用户体验（例如在请求数据后生产的图表）。horizonweb组件库通过自定义指令的方式使用loading。 对于自定义指令 v-loading，传入一个对象，且这个对象的各个value值为响应式数据，如demo1/demo2中的示例所示。

### loading加载
:::demo ./demos/demo1.vue :::

### 与horizonweb其他组件同用
:::demo ./demos/demo2.vue :::

### 动态配置
:::demo ./demos/demo3.vue :::

### 延迟显示
当访问请求详情非常快的时候，如果直接使用 loading 会导致闪屏，所以可以通过设置 `delay` 来控制延迟显示时间
:::demo ./demos/delay.vue :::

### horizonweb与其他组件库共用时可能的情况
当项目中同时使用horizonweb与其它组件库时，其它组件库中存在v-loading同名的vue指令时，可能会造成horizonweb的v-loading指令失效，此时，horizonweb用户可以重新注册v-loading指令，如下
```javascript
import { loading } from '@aurora/horizon-web';
app.directive('my-loading', loading);
// 在组件中使用时
 <div v-my-loading="{isShow,loadingType:'circle',textOrient:'column',size:'medium',}" class="loadingContainer">测试</div>

```

### 全局方法
可以引入 `LoadingService`，使用函数形式调用 `Loading`

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
