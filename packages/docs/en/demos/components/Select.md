## Basic Usage

`h-select` supports single and multiple selection, filtering, disabled states, and the `normal`, `emphasize`, and `no-border` input styles.

:::demo components/Select/basic.vue :::

## Sizes

Use `size` with `small`, `medium`, or `large`. The example compares single and multiple selection together with input styles and disabled states.

:::demo components/Select/size.vue :::

## Single-selection Indicator

Enable `show-selected-icon` to display a selection indicator, or replace it with `selected-icon`.

:::demo components/Select/single.vue :::

## Custom Single-selection Rendering

Use `tagRender` to customize the selected value, or `pickerInner` to take over the complete input area. `pickerInner` is the better fit for editable pickers.

:::demo components/Select/single-render.vue :::

## Multiple Selection and Collapse

Set `multiple` for multiple selection. `collapse-tags` folds selected tags, `collapse-tags-tooltip` reveals the complete selection on hover, and `max-collapse-tags` keeps a fixed number visible.

:::demo components/Select/multiple.vue :::

## Custom Multiple-selection Rendering

Multiple selection also supports `tagRender` and `pickerInner`. When creation is enabled, provide a fallback because newly created options may not have custom attributes.

:::demo components/Select/multiple-render.vue :::

## Folding Long Tags

Tags collapse according to available width, while `collapse-tags-fill-up` uses remaining space where possible. Consider the width-calculation cost for very large selections.

:::demo components/Select/tag-fold.vue :::

## Custom Dropdown Icon

Use `dropdown-icon` to provide a dropdown icon, or pass `false` to hide it.

:::demo components/Select/icon-style.vue :::

## Groups

Organize options with `h-option-group`. Groups may be labeled and can be mixed with ungrouped options.

:::demo components/Select/group.vue :::

## Disabled States

`h-select`, `h-option`, and `h-option-group` all support `disabled`. Disabling a group makes every option in that group unavailable.

:::demo components/Select/disabled.vue :::

## Hide Selected Candidates

With `selected-visible="false"`, selected options disappear from the dropdown panel while the model value and picker tags remain unchanged.

:::demo components/Select/hide-selected.vue :::

## Supporting Descriptions

Add context with `h-option.description`, and use `description-position` to place it on the right or below the label.

:::demo components/Select/description.vue :::

## Filtering

Enable input filtering with `filterable` and customize matching with `filter-method`. Panel filtering can use the built-in input or a custom `panelHeaderRender`.

:::demo components/Select/filter.vue :::

## Filter Keyword Retention

For filtered multiple selection, `reserve-keyword` supports four strategies: `true`, `false`, `reserve-deselect`, and `reserve-special`.

:::demo components/Select/reserve-keyword.vue :::

## Remote Search

Set `show-search` and handle `search` to update remote results and loading state. Use `hide-panel-when-show-search-and-empty-list="false"` to keep the panel visible with no results.

:::demo components/Select/remote-search.vue :::

## Create Options

`allow-create` lets users create options, while `before-create` can reject empty values, duplicates, or reserved names.

:::demo components/Select/creatable.vue :::

## Confirm Before Committing

With `need-confirm`, panel changes are committed on confirmation. Button labels and the `dropConfirmRender` action area can both be customized.

:::demo components/Select/confirm.vue :::

## Select All

Enable select-all behavior with `use-check-all`. Customize its summary through `check-all-text` or `check-all-text-render`.

:::demo components/Select/check-all.vue :::

## Option Statistics

Enable selection statistics with `use-statistic` and customize the copy with `statistic-text`. Statistics take precedence over select-all mode.

:::demo components/Select/statistic.vue :::

## Dynamic Tag Collapse

`collapse-tags` can change at runtime. A common pattern expands tags on focus and restores the compact view on blur.

:::demo components/Select/dynamic-collapse.vue :::

## Move Selected Options to the Top

`selected-option-order-to-top` moves selected options forward after the panel closes. With groups, only the order inside each group changes.

:::demo components/Select/selected-option-order-to-top.vue :::

## Value Formatting

`value-format` can transform option metadata into a business object. New code can also use object values directly on `h-option.value` to avoid an extra conversion.

:::demo components/Select/format-value.vue :::

## Custom Options

Use `optionRender` for a shared option layout or override an individual `h-option` slot. `external-panel-style` customizes the dropdown panel itself.

:::demo components/Select/option.vue :::

## Long Options

Long labels are truncated to one line by default. Set `h-option.max-lines` to allow more lines, and combine multiple selection with collapsed tags to keep the picker stable.

:::demo components/Select/overflow.vue :::

## Panel Width

`fit-input-width=true` matches the picker width, `false` allows natural expansion, and `fit-content` sizes the panel from its content.

:::demo components/Select/fit-width.vue :::

## Initial Empty Value

`initial-value` determines the normalized and cleared model value, such as `null` or `[]`. An empty string is still treated as a valid value.

:::demo components/Select/initial-value.vue :::

## Events

The example renders `focus`, `blur`, `change`, `clear`, `deselect`, and `dropdownVisibleChange` in the page so immediate and confirmed commits are easy to compare.

:::demo components/Select/events.vue :::

## Custom Empty State

Change the default copy with `empty-text`, or use the `empty` slot for a compact message or a complete `h-empty` state.

:::demo components/Select/empty.vue :::

## Load on Reach Bottom

Handle `option-list-reach-bottom` for incremental loading. Set `loading` during a request, prevent duplicate loads, and stop when no more data is available.

:::demo components/Select/reach-bottom.vue :::

## Virtual Scrolling

Pass `options` to enable the virtual list. This ignores options in the default slot and disables option-level slot customization. The example uses 120 deterministic records.

:::demo components/Select/virtual-scroller.vue :::

## Custom Selection Tags

Use `tagRender` to render status-aware tags, customize panel rows with `option.label`, and compose the full input area with `pickerInner`.

:::demo components/Select/custom-tag-render.vue :::

## Async Multiple Selection in a Drawer

When Select is used in a drawer form, keep draft and committed values separate and cancel unfinished asynchronous searches when the component closes.

:::demo components/Select/test.vue :::
