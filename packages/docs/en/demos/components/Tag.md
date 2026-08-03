## Basic usage

Tags come in `small`, `medium`, and `large` sizes. Use `bold` when the text needs more emphasis, and keep the chosen size consistent within one interface.

:::demo components/Tag/basic.vue :::

## Semantic types

Use `type` to communicate success, information, warning, and error states. The example places each type in a release workflow so their hierarchy is easy to compare.

:::demo components/Tag/type.vue :::

## Low-emphasis style

Enable `plain` to reduce background emphasis for supporting metadata such as environments and sources while preserving semantic color.

:::demo components/Tag/plain.vue :::

## Shapes

Use `round` for categories and filters, and `equally` when short status labels need equal-width alignment.

:::demo components/Tag/shape.vue :::

## Automatic colors

With `auto-color`, the component derives a stable color from the tag content. Toggle the regular, plain, and disabled states to check legibility across contexts.

:::demo components/Tag/colorful.vue :::

## Icons

Add an icon through the `icon` prop or slot to reinforce a state. Keep a text label so the icon is never the only cue.

:::demo components/Tag/icon.vue :::

## Avatars

Use `avatar` to combine a person's image and name in a compact assignee tag, or provide custom avatar content through the slot.

:::demo components/Tag/avatar.vue :::

## Activatable tags

Control selection with `v-model:active` to build multi-select filters and surface the active result immediately.

:::demo components/Tag/active.vue :::

## Closable tags

Enable `closable` and handle the close event to maintain the tag list. The example includes result feedback and a reset action for the complete flow.

:::demo components/Tag/closable.vue :::

## Disabled tags

Use `disabled` for labels that must remain visible but cannot be changed. Explain the reason close to the disabled item.

:::demo components/Tag/disabled.vue :::

## Loading state

Use `loading` while a tag is briefly syncing or awaiting confirmation. The example provides clear feedback when the operation completes.

:::demo components/Tag/loading.vue :::

## Create and edit

Combine `use-create`, `editable`, and `closable` on `h-tag-group` for a complete management flow. `before-create`, `before-edit`, and `before-close` can run asynchronous validation.

:::demo components/Tag/create-update.vue :::

## Collapsible tag group

With `collapse`, overflowing tags are collected according to the available width. Combine it with `expand`, tooltip modes, and a minimum visible count for containers of different densities.

:::demo components/Tag/collapse.vue :::
