## Basic Usage
Drawer supports sliding out from any side of the screen. The default position is from the right, and the default size is `medium`.
:::demo components/Drawer/basic.vue :::

## Drawer Position
Custom position, click the trigger button and the drawer slides out from the corresponding position.
:::demo components/Drawer/position.vue :::


## Drawer Size
You can freely control the drawer size through `size`, supporting predefined enums: `small`/`medium`/`large`, and also supporting numeric percentages like `300`, `500px`, `75%`.
:::demo components/Drawer/size.vue :::


## Custom Nodes
You can set whether each module is displayed or customize the footer through slots.
:::demo components/Drawer/customize.vue :::

## Nested Drawers
Open a new drawer inside the drawer
:::demo components/Drawer/nest.vue :::

## Close Confirmation
When the drawer closes, return `Promise<false>` to prevent the drawer from closing
:::demo components/Drawer/confirm.vue :::


## Mount Position
You can set the mount position of the popup layer node through `to`
:::demo components/Drawer/to.vue :::

## Design Token
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
  --h-drawer-margin-right--icon: var(--h-spacing-5);

  // divider line color
  --h-drawer-divider-color: var(--h-divider-default, #E6E7EC);
}
```
