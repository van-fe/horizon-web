## Basic Usage
:::demo vue/components/Drawer/basic.vue :::

## Drawer Position
Custom position, click the trigger button and the drawer slides out from the corresponding position.
:::demo vue/components/Drawer/position.vue :::


## Drawer Size
You can freely control the drawer size through `size`, supporting predefined enums: `small`/`medium`/`large`, and also supporting numeric percentages like `300`, `500px`, `75%`.
:::demo vue/components/Drawer/size.vue :::


## Custom Nodes
You can set whether each module is displayed or customize the footer through slots.
:::demo vue/components/Drawer/customize.vue :::

## Nested Drawers
Open a new drawer inside the drawer
:::demo vue/components/Drawer/nest.vue :::

## Close Confirmation
When the drawer closes, return `Promise<false>` to prevent the drawer from closing
:::demo vue/components/Drawer/confirm.vue :::


## Mount Position
You can set the mount position of the popup layer node through `to`
:::demo vue/components/Drawer/to.vue :::

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
