
## Basic Dot

The default dot indicates new content. Set `bottom` to move it to the lower corner.

:::demo vue/components/Badge/basic.vue :::

## Number and Maximum

Set `type="num"` and `content` for a count. Values above `num-max` use the capped display.

:::demo vue/components/Badge/num.vue :::

## Semantic Color

`color` accepts theme variables or custom colors. Prefer semantic product tokens so light and dark themes stay consistent.

:::demo vue/components/Badge/color.vue :::

## Icon Badge

Combine `type="icon"`, `content`, and `icon-size` for compact identity markers on avatars or objects.

:::demo vue/components/Badge/icon.vue :::

## Show and Hide

`hidden` controls visibility completely. Numeric zero remains visible by default, distinguishing “nothing pending” from “not loaded.”

:::demo vue/components/Badge/hidden.vue :::

## Alignment and Offset

Use `align` for center, inner, outer, and fixed-left placement. Reserve `offset` for necessary fine adjustment.

:::demo vue/components/Badge/align.vue :::
