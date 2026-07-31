# LicensePlateInput

Use this component for mainland China license plates. It separates the province abbreviation from the remaining number and returns the complete plate through `v-model`. Latin letters are uppercased automatically, while spaces and common separators are removed.

## Basic usage

:::demo components/LicensePlateInput/basic.vue :::

## New-energy, validation, and non-editable states

Both seven-character standard plates and eight-character new-energy plates are supported. With `validate-on-blur` enabled (the default), a non-empty incomplete or invalid value enters the error state after blur.

:::demo components/LicensePlateInput/states.vue :::

## API

### Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| model-value | Complete license plate | `string` | `''` |
| size | Component size | `'small' \| 'medium' \| 'large'` | Global size |
| input-style | Input control style | `'normal' \| 'emphasize' \| 'no-border'` | `'normal'` |
| disabled | Disable all controls | `boolean` | `false` |
| readonly | Prevent editing | `boolean` | `false` |
| clearable | Allow clearing | `boolean` | `true` |
| placeholder | Number-field placeholder | `string` | Localized text |
| default-province | Province used while empty | `string` | `'京'` |
| provinces | Available province abbreviations | `string[]` | 31 mainland province-level abbreviations |
| validate-on-blur | Show format errors after blur | `boolean` | `true` |
| status | Manual error state | `'error'` | — |
| aria-label | Accessible component name | `string` | Localized text |
| province-aria-label | Accessible province-selector name | `string` | Localized text |

### Events

| Event | Parameters | Description |
| --- | --- | --- |
| update:model-value | `(value)` | Update the complete plate |
| input / change | `(value, type)` | Input or committed change; `type` is `empty`, `incomplete`, `standard`, `new-energy`, or `invalid` |
| province-change | `(province)` | Province abbreviation changed |
| validity-change | `(valid, type)` | Validity changed |
| focus / blur | `(event)` | Number-field focus changed |
| clear | — | Clear action clicked |

### Slots

| Name | Description |
| --- | --- |
| suffix | Content at the end of the number field |

### Exposes

| Name | Type | Description |
| --- | --- | --- |
| input | `HTMLInputElement` | Native number input element |
| focus / blur / select | `() => void` | Control the number field |
| validate | `() => { valid, type, value }` | Validate immediately and return the result |
