## Basic Form
Set the label of the form item on the `label` attribute of `h-form-item`. By default, the label is displayed above.
:::demo components/Form/basic.vue :::

## Size
You can control the component size through `h-form`

`size` can override the `size` set through `h-application`
:::demo components/Form/size.vue :::

## Tips Helper
Generally, a `popover` tip can be set at the end of the form. You only need to configure a `helper` for `form-item`

The tip helper is placed on the far right of the form (`'right'`) by default. You can also pass `'after-label'` `'before-label'` to `helper-placement` to control the position
:::demo components/Form/tips-helper.vue :::

## Label Configuration
You can control the position of the label through `label-position`. When the label is on the left, you can also control the horizontal alignment of the label through `label-justify-align`, and control the vertical alignment of the label through `label-vertical-align`.
:::demo components/Form/label-position.vue :::

## Inline Form
If there are fewer form items and they are all simple components with small height like `h-input`, you can enable inline forms by setting `inline` to `true`.
:::demo components/Form/inline.vue :::

## Add Validation Rules
You can add validation rules to the form to determine whether the bound value of the form item meets expectations.  
First, set the `model` attribute for the `h-form` component, which is a collection of all bound fields in the entire form domain.
Then add the `prop` attribute to the `h-form-item` that needs validation. It should be the field name in `model`, and pass validation rules to the `rules` attribute. For detailed usage, see [async-validator#rules](https://github.com/yiminghe/async-validator#rules).
:::demo components/Form/validate.vue :::

## Clear Validation Results After Validation
After validating a form, if you want to clear the validation results, you can use `clearValidate` on `h-form` to clear the validation results, or use `clearValidate` on `h-form-item` to clear the validation results

:::demo components/Form/clear-validate.vue :::

## Control Submit Button with Validation Status
You can control whether the submit button can be clicked by listening to `validate`
:::demo components/Form/validate-with-submit.vue :::

## Dynamically Add or Remove Form Items
For dynamic forms, the focus is on the definition of `prop` and `rule`
:::demo components/Form/dynamic-change-item-amount.vue :::

## Validation Trigger Method
You can configure `validateTrigger` to validate only when a form element triggers a certain event:

- `change`: Validate when `update:modelValue` is triggered (default)
- `blur`: Validate when the form component loses focus

Currently supported components:
- Cascader
- Checkbox
- ColorPicker
- DatePicker
- Input
- InputNumber
- Radio
- Rate
- Select
- Slider
- Switch
- Tabs
- TimePicker
- Transfer
- TreeSelect
- Upload (excluding UploadArea)

:::demo components/Form/validate-trigger.vue :::

## Render-only Component
When used together with some form components (such as `formily`), they have their own validation rules. At this time, `h-form` does not need to do validation, so you can configure `only-render` to set whether it is only used as a rendering component

When `form.only-render` is set to `true` and `form-item.error` changes, it will immediately mark the form element as an error state based on whether `form-item.error` is empty

Note that `emit.validateChange` will not be triggered at this time

:::demo components/Form/only-render.vue :::

## Use Custom Form Components
If you use form components outside of `horizon-web`, but also need to use the validation function of `h-form` `h-form-item`, just use the provided `provide` value

You only need to `inject('HFormItemTriggerInjectedKey')` and call it when the form has `change` or `blur` events

:::demo components/Form/custom-form.vue :::

## Built-in required Validation

By default, internationalization configuration is used to display required information

**Because the internationalization string will be passed to the `async-validator` method, it cannot be dynamically changed**

:::demo components/Form/build-in-required.vue :::

## Global disabled
Configure disabled to disable form elements in the form

:::demo components/Form/disabled.vue :::

## Compact Layout
Use `compact` to control whether to enable compact layout

**Note: At this time, error prompts will be hidden**

:::demo components/Form/compact.vue :::

## label Tail Slot
When `label-position = 'top'`, you can use the `label-append` slot to place custom content
:::demo components/Form/label-append.vue :::
