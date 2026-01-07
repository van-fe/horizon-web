import { describe, expect, test } from 'vitest';
import ColorPickerHelper from './ColorPickerHelper';
import { nextTick } from 'vue';
import type { DOMWrapper } from '@vue/test-utils';

describe('ColorPicker.tsx special', () => {
  test('modify model-value and the edit form value will be changed correctly', async () => {
    const instance = new ColorPickerHelper({
      editable: true,
      alpha: true,
      needConfirm: false,
      clearable: false,
    });

    const panel = await instance.open();

    instance.modelValue.value = '#000000FF';

    await nextTick();

    expect(
      (panel.find('.h-color-picker-edit-form__input input') as DOMWrapper<HTMLInputElement>).element
        .value,
    ).toBe('000000');

    expect(
      (panel.find('.h-color-picker-edit-form__input--alpha input') as DOMWrapper<HTMLInputElement>)
        .element.value,
    ).toBe('100%');

    instance.modelValue.value = '#ffffff00';

    await nextTick();

    expect(
      (panel.find('.h-color-picker-edit-form__input input') as DOMWrapper<HTMLInputElement>).element
        .value,
    ).toBe('FFFFFF');

    expect(
      (panel.find('.h-color-picker-edit-form__input--alpha input') as DOMWrapper<HTMLInputElement>)
        .element.value,
    ).toBe('0%');
  });
});
