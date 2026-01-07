import { describe, expect, test } from 'vitest';
import ColorPickerHelper from './ColorPickerHelper';
import { nextTick, ref } from 'vue';
import type { ColorPickerProps } from '~/components/ColorPicker/src/composables/useProps';
import { sleep } from '~/utils/tools';

describe('ColorPicker.tsx props', () => {
  test('disabled', async () => {
    const disabled = ref(false);

    const instance = new ColorPickerHelper({
      triggerType: 'square',
      disabled,
    });

    const board = await instance.open();

    expect(board.exists()).eq(true);

    await instance.close();

    disabled.value = true;

    await nextTick();

    const board2 = await instance.open();

    expect(board2.exists()).eq(false);
  });

  test('edit-mode', async () => {
    const editMode = ref<ColorPickerProps['editMode']>('rgb');

    const instance = new ColorPickerHelper({
      triggerType: 'square',
      editable: true,
      editMode,
      'onUpdate:editMode': val => (editMode.value = val),
    });

    const board = await instance.open();

    expect(board.find('.h-color-picker-edit-form__combine-input').classes('is-rgb')).toBeTruthy();

    editMode.value = 'hsl';

    await sleep(10);

    expect(board.find('.h-color-picker-edit-form__combine-input').classes('is-hsl')).toBeTruthy();
  });
});
