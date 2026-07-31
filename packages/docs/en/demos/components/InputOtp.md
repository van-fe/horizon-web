## Basic usage

The value is synchronized through `v-model`, and `complete` fires when every cell is filled. A single native input owns the interaction, so users can paste a complete code directly.

:::demo components/InputOtp/basic.vue :::

## System code AutoFill

The component defaults to `autocomplete="one-time-code"` and uses `inputmode="numeric"` for numeric codes. Safari can offer the macOS/iOS system code suggestion when the message format, Apple-device continuity, and system settings allow it. Browsers and the OS control this feature; a web page cannot force it to appear. Use a stable `name` and format server messages according to the target platform.

:::demo components/InputOtp/autofill.vue :::

## Masked, alphanumeric, and disabled modes

Use `mask` to hide visual characters. Set `type` to `alphanumeric` to accept ASCII letters and digits.

:::demo components/InputOtp/modes.vue :::

## Accessibility

The cells are visual only; assistive technology interacts with the single native input. Provide an accessible name with `<label for>`, `aria-label`, or `aria-labelledby`, just as you would for any other input.
