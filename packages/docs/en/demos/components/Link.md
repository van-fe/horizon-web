## Basic Usage
:::demo components/Link/base.vue :::

## Different Sizes
Control size by setting `size`
:::demo components/Link/size.vue :::

## Different Types
Use `type` to set different states of `link`
:::demo components/Link/type.vue :::

## Different States
Text link different states
:::demo components/Link/status.vue :::

## Jump Method
Text link jump method, same as the `target` of the `a` tag
:::demo components/Link/jump-reaction.vue :::

## Underline
Text link underline
:::demo components/Link/underline.vue :::

## ICON
You can set `icon`
:::demo components/Link/icon.vue :::

## Annotation
Links with annotation effect. Text links do not provide popups, please use `h-popover` to wrap
:::demo components/Link/attribute.vue :::

## Anchor
With anchor, you can also set `anchor-offset` to scroll to px from the top

Because the content of this document is placed in `h-main`, you need to set `scroll-target`

Note:
- If `anchor`, `to` or `href` are passed in at the same time, `to` and `href` will be ignored
- Must use history routing form, hash routing form will affect the use of anchors
:::demo components/Link/anchor.vue :::

## Use with `vue-router`
You can use `to` `replace` parameters with `vue-router`

> *Note that `to` has higher priority than `href`*
:::demo components/Link/vue-router.vue :::

## Prefix/Suffix
Links with prefix and suffix, you can use `icon`
:::demo components/Link/prefix-suffix.vue :::
