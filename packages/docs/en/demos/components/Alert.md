## Basic usage


:::demo components/Alert/basic.vue :::

## Sizes

Use `small` in compact surfaces and `medium` for standard notices with a title, description, or actions.

:::demo components/Alert/size.vue :::

## Semantic types

Use `type` to distinguish information, success, warning, and error states. Pair color with a clear title and `show-icon` so meaning does not depend on color alone.

:::demo components/Alert/demo1.vue :::

## Actions and dismissal

After setting `primary-button-text` or `default-button-text`, use `on-primary` and `on-default` to receive the close function. The demo keeps the result visible and can be reset for another run.

:::demo components/Alert/demo2.vue :::

## Content layouts

Short messages remain compact. When the description wraps, the action area moves below the content automatically. Give longer notices an explicit next step.

:::demo components/Alert/demo3.vue :::
