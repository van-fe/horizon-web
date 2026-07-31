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
You can set whether the module is displayed or completely customize the bottom through slots. Please note that setting `v2` here adopts the new version logic
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

## v1.x Compatibility Logic
For smoother business migration, partial compatibility has been made for the `v1.x` version. You can set to use `v2.x` logic through `v2`.<br />
1. Drawer top display logic. By default, `v1.x` logic is used. When `title` or `slot.title` is set to `Falsy`, the drawer does not display top content<br />
2. Drawer bottom display logic. By default, `v1.x` logic is used. When `slot.footer` or `primaryButton(deprecated) | secondaryButton(deprecated)` is `Falsy`, the bottom value is not displayed.<br />
3. Drawer teleport logic. By default, `v1.x` is used. When `toBody=false` is set, the drawer is directly rendered to a specific position. After enabling `v2`, it is judged according to `to`

When `v2=true`, the drawer top and bottom logic are controlled by `header` and `footer` respectively.
:::demo components/Drawer/compatible.vue :::

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

  // @deprecated: NOTE: Removed in next version, effective in this version
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
