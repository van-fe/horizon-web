## Basic Usage
:::demo vue/components/Link/base.vue :::

## Different Sizes
Control size by setting `size`
:::demo vue/components/Link/size.vue :::

## Different Types
Use `type` to set different states of `link`
:::demo vue/components/Link/type.vue :::

## Different States
Text link different states
:::demo vue/components/Link/status.vue :::

## Jump Method
Text link jump method, same as the `target` of the `a` tag
:::demo vue/components/Link/jump-reaction.vue :::

## Underline
Text link underline
:::demo vue/components/Link/underline.vue :::

## ICON
You can set `icon`
:::demo vue/components/Link/icon.vue :::

## Annotation
Links with annotation effect. Text links do not provide popups, please use `h-popover` to wrap
:::demo vue/components/Link/attribute.vue :::

## Anchor
With anchor, you can also set `anchor-offset` to scroll to px from the top

Because the content of this document is placed in `h-main`, you need to set `scroll-target`

Note:
- If `anchor`, `to` or `href` are passed in at the same time, `to` and `href` will be ignored
- Must use history routing form, hash routing form will affect the use of anchors
:::demo vue/components/Link/anchor.vue :::

## Use with `vue-router`
You can use `to` `replace` parameters with `vue-router`

> *Note that `to` has higher priority than `href`*
:::demo vue/components/Link/vue-router.vue :::

## Prefix/Suffix
Links with prefix and suffix, you can use `icon`
:::demo vue/components/Link/prefix-suffix.vue :::
