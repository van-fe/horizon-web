# Form

Form organizes fields, runs asynchronous validation, and provides commands for validating, resetting, clearing, and locating fields.

## Basic usage

:::react-demo react/components/Form/basic.tsx :::

## Validation and commands

Rules support the `async-validator` rule shape. Input fields inside FormItem receive disabled, invalid, error-description, and validation-trigger state automatically.

:::react-demo react/components/Form/validation.tsx :::

## Responsive layout

Setting `cols` enables responsive grid layout. FormItem `span` and `offset` use the same breakpoint values as Grid.

:::react-demo react/components/Form/layout.tsx :::

## Form props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `model` | `Record<string, unknown>` | `{}` | Mutable data model read by field paths |
| `rules` | `FormRules` | — | Rules keyed by field path |
| `inline` | `boolean` | `false` | Uses inline layout when grid is disabled |
| `cols` / `gap` / `columnGap` / `rowGap` | `GridValue` | — | Responsive grid layout |
| `size` | `'small' \| 'medium' \| 'large'` | Provider size | Field-control size |
| `labelPosition` | `'top' \| 'left'` | `'top'` | Label position |
| `labelWidth` | `'auto' \| string \| number` | `'auto'` | Width of left-positioned labels |
| `showRequireMark` | `boolean` | `true` | Shows required marks |
| `requireMarkPosition` | `'left' \| 'right'` | `'right'` | Required-mark position |
| `scrollToError` | `boolean` | `false` | Scrolls to the first invalid field |
| `validateTrigger` | `'change' \| 'blur' \| Array \| false` | `'change'` | Automatic validation trigger |
| `validateOnRuleChange` | `boolean` | `true` | Revalidates after rules change |
| `disabled` | `boolean` | — | Disables compatible field controls |
| `spacing` | `'default' \| 'static' \| 'compact' \| 'dynamic'` | `'default'` | Validation-message spacing strategy |
| `preventSubmitDefault` | `boolean` | `true` | Prevents native form submission |

## FormItem props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `field` | `string` | — | Dot or bracket path in `model` |
| `label` | `ReactNode` | — | Field label |
| `rules` | `FormRule \| FormRule[]` | Form rules | Field-level rules |
| `required` | `boolean` | `false` | Adds a required rule when no explicit rule exists |
| `validateTrigger` | `FormValidateTrigger` | Form trigger | Field trigger override |
| `tip` | `ReactNode` | — | Supporting text |
| `helper` | `ReactNode` | — | Help content |
| `error` | `string` | `''` | External error, especially for `onlyRender` forms |
| `span` / `offset` | `GridValue` | `1` / `0` | Grid placement |
| `children` | `ReactNode \| (state) => ReactNode` | — | Field control or state-aware renderer |

## Callbacks and refs

`onSubmit(event)` receives the native submit event. `onValidate(field, valid, message)` reports each field result.

Form ref: `validate()`, `validateField(fields)`, `resetFields(fields?)`, `clearValidate(fields?)`, `scrollToField(field)`, and `form`.

FormItem ref: `validate()`, `resetFields()`, `clearValidate()`, and `element`.

Every field needs an accessible name. FormItem labels are associated with compatible Horizon fields, and validation errors are exposed with `aria-invalid`, `aria-describedby`, and an alert region.
