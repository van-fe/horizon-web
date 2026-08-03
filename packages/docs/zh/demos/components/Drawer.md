## 基本用法
抽屉支持从屏幕的任意一侧滑出，默认位置是从右边，默认尺寸 `medium`。
:::demo components/Drawer/basic.vue :::

## 抽屉位置
自定义位置，点击触发按钮抽屉从相应的位置滑出。
:::demo components/Drawer/position.vue :::


## 抽屉尺寸
通过 `size` 可以自由控制抽屉的尺寸，支持预定义的枚举: `small`/`medium`/`large`，也支持类似数字百分比，如 `300`, `500px`, `75%`。
:::demo components/Drawer/size.vue :::


## 自定义节点
你可以设置模块是否显示或通过插槽完全自定义底部。
:::demo components/Drawer/customize.vue :::

## 嵌套抽屉
在抽屉内打开新的抽屉
:::demo components/Drawer/nest.vue :::

## 关闭确认
在抽屉关闭时候，返回 `Promise<false>` 来阻止关闭抽屉
:::demo components/Drawer/confirm.vue :::


## 挂载位置
通过 `to` 可以设置弹出层节点的挂载位置
:::demo components/Drawer/to.vue :::

## Design Token
```scss
:root {
  // font-size
  --h-drawer-font-size-title: var(--h-text-lg);

  // font-weight
  --h-drawer-font-weight-title: var(--h-weight-strong);

  // line-height
  --h-drawer-line-height-title: 24px;

  // background
  --h-drawer-background-container: var(--h-bg-default);
  --h-drawer-background-mask: var(--h-bg-overlay-default);

  // border-radius
  --h-drawer-border-radius-container: 0;
  --h-drawer-border-radius-left: 0 var(--h-drawer-border-radius-container) var(--h-drawer-border-radius-container) 0;
  --h-drawer-border-radius-right: var(--h-drawer-border-radius-container) 0 0 var(--h-drawer-border-radius-container);
  --h-drawer-border-radius-top: 0 0 var(--h-drawer-border-radius-container) var(--h-drawer-border-radius-container);
  --h-drawer-border-radius-bottom: var(--h-drawer-border-radius-container) var(--h-drawer-border-radius-container) 0 0;

  // padding
  --h-drawer-spacing-container-padding-top: var(--h-spacing-7) var(--h-spacing-7) var(--h-spacing-5);
  --h-drawer-spacing-container-padding-bottom: var(--h-spacing-5) var(--h-spacing-7) var(--h-spacing-7);
  --h-drawer-spacing-body-padding: var(--h-spacing-7);

  // margin
  --h-drawer-spacing-icon-margin-right: var(--h-spacing-5);

  // divider line color
  --h-drawer-border-color-divider: var(--h-divider-default, #E6E7EC);
}
```
