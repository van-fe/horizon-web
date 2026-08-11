import { describe, expect, test } from 'vitest';
import { useColorPickerEmits } from '../src/composables/useEmits';

describe('ColorPicker emit validators', () => {
  test.each(['update:modelValue', 'change', 'activeChange'] as const)(
    '%s accepts colors and rejects non-string payloads',
    event => {
      expect(useColorPickerEmits[event]('#336699')).toBe(true);
      expect(useColorPickerEmits[event](42 as never)).toBe(false);
    },
  );

  test('validates edit mode and the payload-free blur event', () => {
    for (const mode of ['hex', 'rgb', 'hsl', 'hsv'] as const) {
      expect(useColorPickerEmits['update:editMode'](mode)).toBe(true);
    }
    expect(useColorPickerEmits['update:editMode'](null as never)).toBe(false);
    expect(useColorPickerEmits.blur()).toBe(true);
  });
});
