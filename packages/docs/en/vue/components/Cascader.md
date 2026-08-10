## Basic usage

Combine `size`, `input-style`, `disabled`, and `check-strictly` while comparing single and multiple selection. Focus and selection events are shown directly in the demo.

:::demo vue/components/Cascader/basic.vue :::

## Single selection

`show-radio` makes single selection explicit. With `check-strictly`, non-leaf nodes can also be selected.

:::demo vue/components/Cascader/single.vue :::

## Multiple-selection tags

Use `collapse-tags`, `collapse-tags-tooltip`, and `max-collapse-tags` to summarize dense selections.

:::demo vue/components/Cascader/multiple.vue :::

## Select-all summary

`use-check-all-summary` shows a concise summary after every option is selected. Replace its workflow copy with `check-all-summary-text`.

:::demo vue/components/Cascader/check-all-summary.vue :::

## Parent–child relationship

`check-strictly` controls whether parent and child nodes are selected independently or as a hierarchy.

:::demo vue/components/Cascader/check-strictly.vue :::

## Parent expansion behavior

When `check-strictly` is enabled, `expand-strictly` decides whether selecting a parent also opens its next level.

:::demo vue/components/Cascader/expand-strictly.vue :::

## Selection statistics

`use-statistic` summarizes multiple selections as a count. Use `statistic-text` for a domain-specific noun.

:::demo vue/components/Cascader/statistic.vue :::

## Selected-value strategy

`show-checked-strategy="fullPath"` preserves hierarchy context, while `leaf` shows only the destination.

:::demo vue/components/Cascader/display-way.vue :::

## Open on hover

`trigger="hover"` controls panel visibility. `hover-show-delay` and `hover-hide-delay` help prevent accidental toggles.

:::demo vue/components/Cascader/trigger-hover.vue :::

## Expand child panels

`expand-trigger` supports `click` and `hover`. Click works well for touch and keyboard use; hover favors fast pointer exploration.

:::demo vue/components/Cascader/panel-trigger.vue :::

## Confirm a selection

`need-confirm` keeps staged choices separate from the committed value and reports the result through `confirm` and `cancel`.

:::demo vue/components/Cascader/confirm.vue :::

## Custom confirmation area

Change built-in action copy, compose a footer with `confirmRender`, or call the exposed `confirmHandle` and `cancelHandle` methods.

:::demo vue/components/Cascader/custom-confirm.vue :::

## Panel groups

An option containing only `groupLabel` acts as a non-selectable heading for otherwise independent hierarchies.

:::demo vue/components/Cascader/panel-grouped.vue :::

## Dynamic loading

Dynamic loading requires `v-model:options` and `isLeaf: false` on nodes that still need children. Values must remain unique within each level.

:::demo vue/components/Cascader/dynamic-load.vue :::

## Filtering

`filterable` searches from the trigger. `panel-filter-option` filters inside the open panel. The demo compares built-in and custom panel search fields.

:::demo vue/components/Cascader/filterable.vue :::

## Select all filtered results

Enable `use-filter-check-all` in multiple mode to select every selectable node in the current result set.

:::demo vue/components/Cascader/filter-check-all.vue :::

## Filter configuration

`filter-method` defines matching, `filter-max-result` limits output, and `filter-result-sort` controls ranking.

:::demo vue/components/Cascader/filterable-config.vue :::

## Custom search results

Use `searchPanelRender` to reorganize each result while retaining readable hierarchy context.

:::demo vue/components/Cascader/filter-render-slot.vue :::

## Filter and confirm

Combine `filterable` with `need-confirm` when users should search a large dataset and commit choices together.

:::demo vue/components/Cascader/common-search-confirm.vue :::

## Preserve the search keyword

`reserve-keyword` can always preserve, always clear, or preserve only after deselection.

:::demo vue/components/Cascader/filter-reserve-keyword.vue :::

## Empty child list

When a node is explicitly non-leaf but has no children, use `empty-text` or the `empty` slot to explain the empty branch.

:::demo vue/components/Cascader/empty-list.vue :::

## Empty dataset

An empty `options` array shows an empty state. Supply workflow copy or a complete custom empty treatment.

:::demo vue/components/Cascader/empty.vue :::

## Field mapping

`field-map` maps `value`, `label`, `stringLabel`, and `children` to an existing data shape without rewriting it first.

Projects can augment `HCascaderOption` for custom TypeScript fields:

```ts
declare module '@aurora/horizon-web' {
  interface HCascaderOption {
    id?: HCascaderOption['value'];
    tag?: HCascaderOption['label'];
    tagString?: HCascaderOption['stringLabel'];
    nodes?: HCascaderOption[];
  }
}
```

:::demo vue/components/Cascader/field-map.vue :::

## Custom trigger content

Use `selectRender` to turn a selected path into compact workflow language.

:::demo vue/components/Cascader/custom-trigger-inner.vue :::

## Custom selected tags

In multiple mode, `tagRender` customizes the content of each selected tag.

:::demo vue/components/Cascader/custom-selected-item.vue :::

## Custom icons

`expand-icon` controls hierarchy navigation, while `selected-icon` marks a selected leaf.

:::demo vue/components/Cascader/custom-icon.vue :::

## Custom option rendering

Use `itemRender` to customize option rows. When `label` is a render function, also provide `stringLabel` so filtering and summaries remain readable.

:::demo vue/components/Cascader/custom-option-render.vue :::

## Custom complete trigger

The default slot replaces the full trigger. Use the exposed `inputChange` method to send custom input into filtering.

:::demo vue/components/Cascader/custom-trigger.vue :::

## Unmatched values

When a saved value no longer exists in `options`, Cascader preserves the raw value. Full-path and leaf-only strategies still apply.

:::demo vue/components/Cascader/unmatched-value.vue :::

## Virtual scrolling

`use-virtual-scroll` renders only visible options. This demo uses 40 × 40 × 4, or 6,400 leaf destinations, to exercise search and multiple selection.

:::demo vue/components/Cascader/virtual-scroll.vue :::

## Unselectable and disabled nodes

`selectable: false` prevents selecting only that node while keeping descendants available. `disabled: true` disables the node and its interaction.

:::demo vue/components/Cascader/selectable.vue :::
