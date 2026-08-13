## Basic usage

`TreeSelect` combines a picker with most tree behaviors. Pass `tree-data` and keep every `value` unique across the tree.

:::demo vue/components/TreeSelect/basic.vue :::

## Clearable

Set `clearable = true` so users can remove the current selection.

:::demo vue/components/TreeSelect/clearable.vue :::

## Single selection

In single mode, enable `show-radio` to make the selection control explicit.

:::demo vue/components/TreeSelect/single.vue :::

## Multiple selection

Set `multiple = true` for multiple selection. Use `collapse-tags`, `collapse-tags-tooltip`, and `max-collapse-tags` to control tag display.

:::demo vue/components/TreeSelect/multiple.vue :::

## Multiple-selection limit

Use `multiple-limit` to cap the number of selected nodes.

:::demo vue/components/TreeSelect/multiple-limit.vue :::

## Parent-child association

`check-strictly` controls whether parent and child selections are linked. In strict mode, every node is independent.

:::demo vue/components/TreeSelect/check-strictly.vue :::

## Expansion and selection

`expand-on-click-node` controls row expansion. In multiple mode, `check-on-click-node` controls row selection.

:::demo vue/components/TreeSelect/expand-and-check.vue :::

## Leaf-node selection

`check-on-click-leaf` controls whether clicking a leaf row selects it. When disabled, use the selection control directly.

:::demo vue/components/TreeSelect/check-on-leaf.vue :::

## Controlled expansion

Use `expand-values` or `v-model:expand-values` to control and observe expanded panel nodes.

:::demo vue/components/TreeSelect/expand-values.vue :::

## Expand all by default

`is-default-expand-all` is read when the tree instance is created. For asynchronous data, create the component after the data is ready.

:::demo vue/components/TreeSelect/default-expand-all.vue :::

## Disabled states

A node-level `disabled` flag affects one item; the component `disabled` prop disables the entire picker.

:::demo vue/components/TreeSelect/disabled.vue :::

## Custom expansion icons

With only `fold-icon`, the icon rotates when expanded. Set both `fold-icon` and `expand-icon` for separate state icons.

:::demo vue/components/TreeSelect/expand-icon.vue :::

## Selection statistics

In multiple mode, set `use-statistic = true` for a count summary and customize its label with `statistic-text`.

:::demo vue/components/TreeSelect/statistic.vue :::

## Filtering

Set `filterable = true` for trigger search, and use `filter-method` for custom matching.

:::demo vue/components/TreeSelect/filter.vue :::

## Search keyword retention

During multiple filtering, `reserve-keyword` supports always keeping, always clearing, keeping only on deselection, or maintaining a special persistent filter.

:::demo vue/components/TreeSelect/reserve-keyword.vue :::

## Panel filtering

After enabling `panel-filterable`, use the `use-build-in-panel-filter` input or provide `panelHeaderRender` and `panel-filter-input-value` for a custom panel header.

:::demo vue/components/TreeSelect/filter-in-panel.vue :::

## Custom highlighting

Use `highlight-method` to customize filtered-result highlighting. Returning a VNode avoids constructing HTML strings.

:::demo vue/components/TreeSelect/highlight-filter.vue :::

## Dynamic loading

Set `isLeaf = false` on nodes that load on demand, then return their children from `dynamic-load`.

:::demo vue/components/TreeSelect/dynamic-load.vue :::

## Custom nodes

Use the `treeNodeRender` slot for every tree node, or a `label` render function to override an individual item.

:::demo vue/components/TreeSelect/custom-render.vue :::

## Field mapping

`field-map` maps external fields to `value`, `label`, and `children`. Do not reuse one source field for multiple built-in meanings.

:::demo vue/components/TreeSelect/field-map.vue :::

## Virtual scrolling

For large data sets, set `use-virtual-scroll = true` and provide `height` or `max-height` for the panel viewport.

:::demo vue/components/TreeSelect/virtual-scroll.vue :::

## Non-selectable nodes

`selectable = false` prevents direct selection but still allows expansion and selectable descendants. `disabled` also blocks interaction with that node.

:::demo vue/components/TreeSelect/selectable.vue :::

## Prefix icons

Use `prefix-icon` to add a shared node icon that clarifies the option type.

:::demo vue/components/TreeSelect/prefix-icon.vue :::

## Emphasized selection

Set `stress = true` to highlight the current tree selection with the brand color.

:::demo vue/components/TreeSelect/stress.vue :::

## Props

### Value, trigger, and popup

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `model-value` | `HTreeSelectModelValueType` | — | Selected value; supports `v-model`. |
| `initial-value` | `HTreeSelectModelValueType` | `[]` | Fallback value used when clearing. |
| `trigger` | `'click' \| 'hover'` | `'click'` | Popup trigger mode. |
| `disabled` | `boolean` | inherited | Disables trigger and tree interaction. |
| `clearable` | `boolean` | `false` | Shows the clear action for a non-empty selection. |
| `placeholder` | `string` | locale value | Trigger placeholder. |
| `size` / `tree-size` | `'small' \| 'medium' \| 'large'` / `TreeSize` | inherited | Trigger and tree-row sizes. |
| `input-style` | `'normal' \| 'emphasize' \| 'no-border'` | `'normal'` | Trigger visual style. |
| `input-status` | `PickerInputStatusType` | `'normal'` | Trigger validation state. |
| `input-attrs` | `PickerNativeInputAttrs` | — | Native accessibility and data attributes for the trigger input. |
| `dropdown-icon` | `Icon \| false` | default icon | Dropdown suffix icon. |
| `to-body` | `boolean` | `true` | Teleports the popup to `body`. |
| `placement` | `PopoverPlacement` | `'bottom-start'` | Preferred popup placement. |
| `flip` | `boolean` | `true` | Allows placement to flip when space is limited. |
| `hover-show-delay` / `hover-hide-delay` | `number` | `0` / `200` | Hover trigger delays in milliseconds. |
| `popover-options` | `Partial<PopoverProps>` | — | Additional Popover properties. |
| `popper-class-name` | `string` | — | Popup class name. |
| `tree-width` | `string` | — | Tree panel width. |
| `search-panel-width` | `string \| number` | `''` | Search result panel width. |
| `fit-input-width` | `boolean \| 'fit-content'` | `true` | Popup width strategy. |
| `fit-content-input-min-width` | `string \| number` | `1` | Minimum width of a fit-content trigger. |

### Selection presentation and confirmation

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `multiple` | `boolean` | `false` | Enables multiple selection. |
| `multiple-limit` | `number` | `Infinity` | Maximum selection count. |
| `collapse-tags` | `boolean` | `false` | Collapses multiple-selection tags. |
| `collapse-tags-tooltip` | `boolean` | `false` | Shows hidden labels when hovering the summary tag. |
| `max-collapse-tags` | `number` | — | Maximum visible tags before the summary. |
| `collapse-tags-fill-up` | `boolean` | `true` | Lets tags fill available trigger space. |
| `collapsed-tags-props` | `Partial<TagProps>` | — | Props for the collapsed `+N` tag. |
| `use-statistic` | `boolean` | `false` | Replaces tags with a selection-count summary. |
| `statistic-text` | `string` | locale value | Summary leading text. |
| `need-confirm` | `boolean` | `false` | Stages changes until confirmation. |
| `confirm-button-text` / `cancel-button-text` | `string` | locale value | Confirmation action labels. |

### Filtering

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `filterable` | `boolean` | `false` | Enables trigger filtering. |
| `filter-method` | `HTreeFilterMethodType` | default label match | Custom node matching method. |
| `filter-to-hide-children` | `boolean` | `true` | Hides unmatched children while filtering. |
| `expand-filtered-tree` | `boolean` | `true` | Expands branches containing matches. |
| `reserve-keyword` | `boolean \| 'reserve-deselect' \| 'reserve-special'` | `true` | Keyword retention policy after selection. |
| `input-emit-frequency` | `number` | `200` | Input emission interval in milliseconds. |
| `search-icon` | `Icon \| false` | search icon | Trigger search icon. |
| `panel-filterable` | `boolean` | `false` | Enables filtering from the panel. |
| `panel-filter-input-value` | `string` | `''` | External panel filter text. |
| `use-build-in-panel-filter` | `boolean` | `false` | Shows the built-in panel filter input. |
| `panel-input-placeholder` | `string` | locale value | Panel filter input placeholder. |
| `highlight-method` | `HTreeHighlightMethod` | — | Renders highlighted text matches. |
| `search-input-placeholder` | `string` | locale value | Tree search input placeholder. |
| `empty-text` | `string` | locale value | Empty-result text. |

### Tree data, expansion, and selection

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `tree-data` | `HTreeData[]` | `[]` | Hierarchical source data with globally unique values. |
| `field-map` | `HTreeFieldMap` | — | Maps source fields to tree fields. |
| `expand-values` | `HTreeUuidType[]` | — | Expanded values; supports `v-model:expand-values`. |
| `selected-values` | `HTreeUuidType[]` | `[]` | Tree selection-state input. |
| `is-default-expand-all` | `boolean` | `false` | Expands all initial branches. |
| `is-default-expand-parent` | `boolean` | `true` | Includes ancestors when resolving expansion. |
| `expand-on-click-node` | `boolean` | `true` | Toggles a branch from its row. |
| `fold-icon` / `expand-icon` | `Icon` | triangle / — | Collapsed and expanded branch icons. |
| `prefix-icon` | `Icon` | — | Shared node prefix icon. |
| `check-strictly` | `boolean` | `false` | Makes parent and child selection independent. |
| `check-on-click-node` | `boolean` | `false` | Selects a branch from its row in multiple mode. |
| `check-on-click-leaf` | `boolean` | `true` | Selects a leaf from its row. |
| `show-checkbox` / `show-radio` | `boolean` | `true` / `false` | Shows explicit selection controls. |
| `parent-effect-disabled-child` | `boolean` | `false` | Lets parent selection affect disabled descendants. |
| `stress` | `boolean` | `false` | Emphasizes selected rows. |
| `dynamic-load` | `HTreeDynamicLoadMethod` | — | Loads children of an expanded `isLeaf: false` branch. |

### Layout, tooltips, and dragging

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `height` / `max-height` | `number` / `string \| number` | — / `256` | Tree viewport dimensions. |
| `use-virtual-scroll` | `boolean` | `false` | Enables virtual scrolling. |
| `expand-panel-by-children` | `boolean` | `false` | Lets children expand the virtual-scroll wrapper. |
| `root-class-name` / `root-style` | `string` / `CSSProperties` | — | Tree root class and inline style. |
| `indent` | `number` | `24` | Indentation in pixels per level. |
| `tooltip` | `boolean` | `true` | Enables node text tooltips. |
| `tooltip-show-after` / `tooltip-hide-after` | `number` | `100` / `200` | Tooltip delays in milliseconds. |
| `show-line` | `boolean` | `false` | Shows connector lines. |
| `draggable` | `boolean` | `false` | Enables drag sorting. |
| `drag-on-handler` | `boolean` | `true` | Starts dragging only from the handle. |
| `drag-to-leaf` | `boolean` | `true` | Allows dropping into a leaf node. |
| `before-drop` | `TreeBeforeDrop` | — | Guards a drop before it is committed. |
| `draggable-icon` / `undraggable-icon` | `Icon \| false` | drag icon / `false` | Drag handles for movable and fixed rows. |
| `draggable-icon-always-visible` | `boolean` | `false` | Keeps drag handles visible. |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `update:model-value` | `(value)` | Updates `v-model`. |
| `change` | `(value)` | Emits after the committed value changes. |
| `update:expand-values` | `(values)` | Updates expanded values. |
| `update:tree-data` | `(data)` | Emits data produced by dynamic loading or node commands. |
| `visible-change` | `(visible)` | Emits after popup visibility changes. |
| `input` | `(value?)` | Emits trigger input text. |
| `focus` / `blur` | `()` | Emit for trigger focus changes. |
| `clear` | `()` | Emits after clearing. |
| `select` | `(values, value, details)` | Emits after a node selection interaction. |
| `expand` | `(values, value, details)` | Emits after a branch expansion interaction. |
| `click` / `contextmenu` | `(event, value, node, vnode?)` | Emit for node click or context-menu interaction. |
| `confirm` / `cancel` | `()` | Emit after accepting or discarding a staged selection. |

## Slots

| Slot | Scope | Description |
| --- | --- | --- |
| `default` | `{ visible, treeDataMap }` | Renders the complete trigger content. |
| `tagRender` | selected tag data | Renders one selected tag. |
| `selectRender` | selected display data | Renders the complete selected-value area. |
| `treeNodeRender` | `{ data, vnode }` | Renders one tree row. |
| `panelHeaderRender` / `panelFooterRender` | — | Render popup header and footer content. |
| `empty` | — | Renders the empty state. |
| `confirmRender` | `{ cancelHandle, confirmHandle }` | Renders staged-selection actions. |

## Exposes

The component ref exposes `confirmHandle()`, `cancelHandle()`, `changePanelVisible(visible)`, `getSelectedNodes()`, `getPartSelectedNodes()`, `getUnSelectedNodes()`, `setSelectedStatus(values, selected)`, `clearSelectedValues()`, `getExpandNodes()`, `setCollapseStatusByValue(values, isExpand)`, `setAllCollapseStatus(isExpand)`, `getNodeByValues(values)`, `setNodeByValue(treeData, value?)`, `addNodeChildrenByValue(treeDataArray, value?)`, `delNodeByValue(value?)`, `getVisibleItems()`, and `scrollTo(value?)`.

## Accessibility

The focusable trigger exposes combobox semantics and owns the popup tree. Tree rows provide hierarchy, expanded, selected, checked, and disabled state. Arrow keys move through enabled rows, `ArrowRight` and `ArrowLeft` navigate branches, and `Enter` or `Space` selects the active node. Custom trigger and row content should preserve the supplied focus and labelling relationships.
