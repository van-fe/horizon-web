### 基础用法
LoadingBar 只会在全局创建一个，因此在任何位置调用的方法都会控制这同一个组件，LoadingBar上拥有多个个方法，start()，finish()，error()，update()，destroy()。

调用start方法时，LoadingBar会模拟加载进度开始延伸至屏幕百分之八十的宽度；调用finish方法，代表加载成功，LoadingBar会延伸至全部屏幕宽度，并消失；调用error方法，代表加载失败，LoadingBar会变error色并延伸至全部屏幕宽度，并消失;update方法调用后可以精确加载到指定的进度;destroy方法调用后可以销毁loadingBar的实例。
:::demo methods/LoadingBar/demo1.vue :::

### LoadingBar配置高度

可以通过 config({
  height:xx
})方法来配置自定义高度

:::demo methods/LoadingBar/demo2.vue :::
