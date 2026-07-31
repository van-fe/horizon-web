## Basic Usage
:::demo components/Breadcrumb/basic.vue :::

## Size Settings
You can configure `medium(default)` and `small` to control the size, or specifically set the size for `BreadcrumbItem`
:::demo components/Breadcrumb/size.vue :::

## Jump Link
You can allow jumping by configuring `to` or `replace`
:::demo components/Breadcrumb/link-mode.vue :::

## Collapse Mode
Configure `display-type` to control the collapse mode

`full`: Display all, if it exceeds the parent width, it will wrap

`ellipsis`: Ellipsis display, if it exceeds the parent width, elements starting from the second one will be collapsed until it does not exceed the parent width

**Note that when using the `ellipsis` display mode and rendering with `h-breadcrumb-item`, you must set a unique `key` for each `h-breadcrumb-item`, otherwise the rendered content may be incorrect**
:::demo components/Breadcrumb/collapse.vue :::

## Special Style
`Horizon-web` design specification defines the following style rules
:::demo components/Breadcrumb/special-style.vue :::

## Custom Divider
:::demo components/Breadcrumb/custom-divider.vue :::

## Custom Item Content
You can directly use the `BreadcrumbItem` component to define content
:::demo components/Breadcrumb/custom-item.vue :::
