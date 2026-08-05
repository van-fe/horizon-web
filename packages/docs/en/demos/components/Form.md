## Basic form

`h-form-item` owns labels, supporting text, and control layout. It can sit directly inside an `h-grid-item`: Grid controls the responsive columns while every FormItem fills its track without pushing the label beyond it.

:::demo components/Form/basic.vue :::

## Size

The form-level `size` propagates to child controls and overrides the global size from `h-application`.

:::demo components/Form/size.vue :::

## Helpers

`helper` provides popover guidance. `helper-placement` positions it before the label, after the label, or at the right of the field; the form can set a shared theme.

:::demo components/Form/tips-helper.vue :::

## Label layout

`label-position` switches between top and left labels. Left labels also support horizontal and vertical alignment. An individual `h-form-item` can override the form-level `label-position`.

:::demo components/Form/label-position.vue :::

## Inline form

`inline` suits a small number of compact filters and wraps naturally in a narrow viewport.

:::demo components/Form/inline.vue :::

## Validation

Provide `model` to `h-form`, then connect each field through its item `prop` and `rules`. Rules follow async-validator syntax.

:::demo components/Form/validate.vue :::

## Clear validation and reset

`clearValidate` removes validation messages while preserving values. `resetFields` restores both initial values and validation state.

:::demo components/Form/clear-validate.vue :::

## Submit from validation state

Listen to `validate` to aggregate field state and enable submission only after every required field is valid.

:::demo components/Form/validate-with-submit.vue :::

## Dynamic fields

Dynamic lists need stable render keys and an indexed `prop` such as `reviewers[0].email`.

:::demo components/Form/dynamic-change-item-amount.vue :::

## Validation trigger

Form-level `validate-trigger` supplies the default. Individual items can override it with `change`, `blur`, or both.

:::demo components/Form/validate-trigger.vue :::

## Render-only mode

`only-render` suits workflows validated by an external form framework. Pass external errors through item `error` without triggering Form validation events.

:::demo components/Form/only-render.vue :::

## Custom controls

A custom control can inject `HFormItemTriggerInjectedKey` and notify Form on change and blur. Read `HFormItemErrorInjectedKey` to render its error state.

:::demo components/Form/custom-form.vue :::

## Built-in required validation

Item `required` uses the current locale. With `required-use-label`, the default message refers to the visible field label.

:::demo components/Form/build-in-required.vue :::

## Global disabled state

Form `disabled` overrides its child controls, making it useful for submitted or read-only workflows.

:::demo components/Form/disabled.vue :::

## Compact spacing

`spacing="compact"` reduces item spacing and intentionally hides tip and error rows. Return to default spacing to inspect messages.

:::demo components/Form/compact.vue :::

## Label append content

With top-positioned labels, use `labelAppend` for lightweight actions that directly affect the field.

:::demo components/Form/label-append.vue :::
