# LicensePlateInput

Use this component for mainland China license plates. It renders seven standard character cells plus an optional eighth new-energy cell. Focusing the field or clicking a cell opens a plate-specific keyboard: provinces for the first position, legal letters for the second, and position-aware letters, digits, and suffixes after that. The complete plate is returned through `v-model`.

## Basic usage

:::demo components/LicensePlateInput/basic.vue :::

## New-energy, validation, and non-editable states

Both seven-character standard plates and eight-character new-energy plates are supported. Enable `new-energy` to keep the eighth position active, or click the dashed “New energy” cell to expand it temporarily. The panel provides backspace, clear, and done actions. Physical keyboards support letters, digits, arrows, Backspace, Delete, and Escape, and complete plates can be pasted. With `validate-on-blur` enabled (the default), a non-empty incomplete or invalid value enters the error state when the panel closes or focus leaves the field.

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
| new-energy | Keep the eighth new-energy position enabled | `boolean` | `false` |
| clearable | Allow clearing | `boolean` | `true` |
| placeholder | Number-field placeholder | `string` | Localized text |
| default-province | Province used while empty | `string` | `'京'` |
| provinces | Available province abbreviations | `string[]` | 31 mainland province-level abbreviations |
| validate-on-blur | Show format errors after blur | `boolean` | `true` |
| status | Manual error state | `'error'` | — |
| aria-label | Accessible component name | `string` | Localized text |
| province-aria-label | Accessible province-keyboard name | `string` | Localized text |
| keyboard-aria-label | Accessible keyboard-panel name | `string` | Localized text |
| placement | Keyboard-panel placement | `'top-start' \| 'top' \| 'top-end' \| 'bottom-start' \| 'bottom' \| 'bottom-end'` | `'bottom-start'` |
| flip | Allow the panel to flip above when bottom space is insufficient | `boolean` | `false` |
| to-body | Teleport the keyboard panel to body | `boolean` | `true` |

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
| input | `HTMLInputElement` | Hidden native input for keyboards and assistive technology |
| focus / blur / select | `() => void` | Control the number field |
| open / close | `() => void` | Open or close the plate keyboard panel |
| validate | `() => { valid, type, value }` | Validate immediately and return the result |
