### 基本用法
抽屉支持从屏幕的任意一侧滑出，默认位置是从右边，默认尺寸 `medium`。
:::demo ./demos/basic.vue :::

### 抽屉位置
自定义位置，点击触发按钮抽屉从相应的位置滑出。
:::demo ./demos/position.vue :::


### 抽屉尺寸
通过 `size` 可以自由控制抽屉的尺寸，支持预定义的枚举: `small`/`medium`/`large`，也支持类似数字百分比，如 `300`, `500px`, `75%`。
:::demo ./demos/size.vue :::


### 自定义节点
你可以设置模块是否显示或通过插槽完全自定义底部。请注意这里设置 `v2` 采用新版本逻辑
:::demo ./demos/customize.vue :::

### 嵌套抽屉
在抽屉内打开新的抽屉
:::demo ./demos/nest.vue :::

### 可自由拖拽抽屉尺寸
可以通过 `size-draggable` 启用拖拽抽屉尺寸
:::demo ./demos/draggable-size.vue :::

### 嵌套可拖拽尺寸抽屉
可以同时启用 `size-draggable` 和 `push`
:::demo ./demos/draggable-size-nest.vue :::

### 关闭确认
在抽屉关闭时候，返回 `Promise<false>` 来阻止关闭抽屉
:::demo ./demos/confirm.vue :::


### 挂载位置
通过 `to` 可以设置弹出层节点的挂载位置
:::demo ./demos/to.vue :::

### 关闭后不销毁
通过设置 `destroyOnClose` 为 `false`，避免组件抽屉内组件销毁
:::demo ./demos/destroy-oh-close.vue :::

### 透明底色
可以通过css 变量，设置透明mask
:::demo ./demos/customize-mask.vue :::

### v1.x 兼容性逻辑
为了业务更顺滑迁移，针对 `v1.x` 版本做了部分兼容，通过 `v2` 可以设置使用 `v2.x` 逻辑。<br />
1.抽屉顶部展示逻辑。默认采用 `v1.x` 逻辑，`title` 或者 `slot.title` 设置为 `Falsy`，抽屉不展示顶部内容<br />
2.抽屉底部展示逻辑。默认采用 `v1.x` 逻辑，`slot.footer` 或者 `primaryButton(deprecated) | secondaryButton(deprecated)` 为 `Falsy`，不展示底部的值。<br />
3.抽屉teleport逻辑。默认采用`v1.x`，设置 `toBody=false`，则直接渲染抽屉到特定的位置，开启 `v2` 后，则根据 `to` 判断

当 `v2=true` 时候，抽屉顶部和底部逻辑分别被 `header` 和 `footer` 控制。
:::demo ./demos/compatible.vue :::

### Design Token
```scss
:root {
  // font-size
  --h-drawer-font-size--title: var(--h-text-lg);

  // font-weight
  --h-drawer-font-weight--title: var(--h-weight-strong);

  // line-height
  --h-drawer-line-height--title: 24px;

  // background
  --h-drawer-bg--container: var(--h-bg-default);
  --h-drawer-bg--mask: var(--h-bg-overlay-default);

  // @deprecated: NOTE: 下个版本移除，本版本生效
  // border-radius
  --h-drawer-border-radius--container: 0;
  --h-drawer-border-radius--left: 0 var(--h-drawer-border-radius--container) var(--h-drawer-border-radius--container) 0;
  --h-drawer-border-radius--right: var(--h-drawer-border-radius--container) 0 0 var(--h-drawer-border-radius--container);
  --h-drawer-border-radius--top: 0 0 var(--h-drawer-border-radius--container) var(--h-drawer-border-radius--container);
  --h-drawer-border-radius--bottom: var(--h-drawer-border-radius--container) var(--h-drawer-border-radius--container) 0 0;

  // padding
  --h-drawer-top-padding--container: var(--h-spacing-7) var(--h-spacing-7) var(--h-spacing-5);
  --h-drawer-bottom-padding--container: var(--h-spacing-5) var(--h-spacing-7) var(--h-spacing-7);
  --h-drawer-padding--body: var(--h-spacing-7);

  // margin
  --h-drawer-margih-right--icon: var(--h-spacing-5);

  // divider line color
  --h-drawer-divider-color: var(--h-divider-default, #E6E7EC);
}
```