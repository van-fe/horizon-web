# Tag

Tag labels an object's category, state, or attribute. TagGroup adds creation, editing, removal, and overflow collapse. The React renderer uses native semantic elements and reports activation as a controlled proposal.

## Basic usage

:::react-demo react/components/Tag/basic.tsx :::

## Semantic variants

:::react-demo react/components/Tag/type.tsx :::

## Plain treatment

:::react-demo react/components/Tag/plain.tsx :::

## Shapes

:::react-demo react/components/Tag/shape.tsx :::

## Custom colors

`color` derives the full interactive palette and can be combined with an explicit `background`.

:::react-demo react/components/Tag/colorful.tsx :::

## Icons

:::react-demo react/components/Tag/icon.tsx :::

## Avatars

:::react-demo react/components/Tag/avatar.tsx :::

## Controlled activation

Tag never mutates `active` internally. Accept or reject the proposal in `onActiveChange`.

:::react-demo react/components/Tag/active.tsx :::

## Closable tags

:::react-demo react/components/Tag/closable.tsx :::

## Disabled

:::react-demo react/components/Tag/disabled.tsx :::

## Loading

:::react-demo react/components/Tag/loading.tsx :::

## Create and edit

TagGroup's `beforeCreate`, `beforeEdit`, and `beforeClose` guards may be synchronous or asynchronous. Duplicate submissions are blocked while a guard is pending.

:::react-demo react/components/Tag/create-update.tsx :::

## Collapsed groups

:::react-demo react/components/Tag/collapse.tsx :::

## Main API

Tag supports `active`, `variant`, `size`, `clickable`, `closable`, `editable`, `disabled`, `plain`, `round`, `equally`, `color`, `background`, `loading`, and Tooltip options. `onActiveChange`, `onClick`, and `onClose` report selection, primary action, and removal; `TagHandle.edit()` enters edit mode.

TagGroup supports `collapse`, `expand`, `minDisplayed`, `useCreate`, `maxTags`, and the three guards. It reports results through `onCreated`, `onEdited`, `onClosed`, `onToggled`, and `onExceeded`. `TagGroupHandle` exposes `toggle()` and `calculate()`.

## Accessibility and provider

Tags with `active` use checkbox semantics, and actionable tags support Enter and Space. Removal is a separate native button; disabled and pending states are exposed through ARIA. Configure create, close, expand, and collapse labels with `HorizonWebProvider.tagLabels`.
