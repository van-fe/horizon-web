import type { PickerNativeInputAttrs } from '../composables/useProps';

const protectedInputAttrs = new Set([
  'autocomplete',
  'checked',
  'class',
  'disabled',
  'placeholder',
  'readonly',
  'style',
  'tabindex',
  'type',
  'unselectable',
  'value',
]);

/** Keep native ARIA, data, form, and naming attributes without exposing Picker-owned behavior. */
export function sanitizePickerNativeInputAttrs(
  attrs?: PickerNativeInputAttrs,
): Record<string, unknown> {
  if (!attrs) return {};
  return Object.fromEntries(
    Object.entries(attrs).filter(
      ([name]) => !protectedInputAttrs.has(name) && !/^on[A-Z]/.test(name),
    ),
  );
}
