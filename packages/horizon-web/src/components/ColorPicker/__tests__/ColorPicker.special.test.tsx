import { describe, expect, test, vi } from 'vitest';
import ColorPickerHelper from './ColorPickerHelper';
import { nextTick } from 'vue';
import type { DOMWrapper } from '@vue/test-utils';
import HPicker from '~/components/Picker/src/Picker';

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

  test('clear resets the value and emits change exactly once', async () => {
    const onChange = vi.fn();
    const instance = new ColorPickerHelper({
      triggerType: 'square',
      onChange,
    });
    instance.modelValue.value = '#336699';
    await nextTick();
    onChange.mockClear();

    instance.element.findComponent(HPicker).vm.$emit('clear', new MouseEvent('click'));
    await nextTick();

    expect(instance.modelValue.value).toBe('');
    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenLastCalledWith('');
  });

  test('need-confirm keeps a swatch change pending until confirmation', async () => {
    const onActiveChange = vi.fn();
    const onChange = vi.fn();
    const instance = new ColorPickerHelper({
      triggerType: 'square',
      needConfirm: true,
      showSwatch: true,
      swatches: ['#00FF00'],
      onActiveChange,
      onChange,
    });
    instance.modelValue.value = '#FF0000';
    await nextTick();
    onChange.mockClear();

    const panel = await instance.open();
    await panel.find('.h-color-picker-panel__swatches--item').trigger('click');
    await nextTick();

    expect(onActiveChange).toHaveBeenLastCalledWith('#00FF00');
    expect(instance.modelValue.value).toBe('#FF0000');
    expect(onChange).not.toHaveBeenCalled();

    instance.element.findComponent(HPicker).vm.$emit('confirm');
    await nextTick();

    expect(instance.modelValue.value).toBe('#00FF00');
    expect(onChange).toHaveBeenLastCalledWith('#00FF00');
  });

  test('cancel discards a pending swatch selection', async () => {
    const onChange = vi.fn();
    const instance = new ColorPickerHelper({
      triggerType: 'square',
      needConfirm: true,
      editable: true,
      showSwatch: true,
      swatches: ['#00FF00'],
      onChange,
    });
    instance.modelValue.value = '#FF0000';
    await nextTick();
    onChange.mockClear();

    const panel = await instance.open();
    await panel.find('.h-color-picker-panel__swatches--item').trigger('click');
    instance.element.findComponent(HPicker).vm.$emit('cancel');
    await nextTick();

    expect(instance.modelValue.value).toBe('#FF0000');
    expect(onChange).not.toHaveBeenCalled();
  });

  test('updates immediately from a swatch when confirmation is disabled', async () => {
    const onActiveChange = vi.fn();
    const onChange = vi.fn();
    const instance = new ColorPickerHelper({
      triggerType: 'square',
      needConfirm: false,
      showSwatch: true,
      swatches: [{ name: 'success', value: '#00FF00' }],
      onActiveChange,
      onChange,
    });
    instance.modelValue.value = '#FF0000';
    await nextTick();

    const panel = await instance.open();
    await panel.find('.h-color-picker-panel__swatches--item').trigger('click');
    await nextTick();

    expect(instance.modelValue.value).toBe('#00FF00');
    expect(onActiveChange).toHaveBeenLastCalledWith('#00FF00');
    expect(onChange).toHaveBeenLastCalledWith('#00FF00');
  });

  test('normalizes an alpha color to the configured output format', async () => {
    const instance = new ColorPickerHelper({
      triggerType: 'square',
      alpha: true,
      format: 'rgb',
      needConfirm: false,
    });

    instance.modelValue.value = '#33669980';
    await nextTick();

    expect(instance.element.findComponent(HPicker).props('modelValue')).toBe(
      'rgba(51, 102, 153, 0.5)',
    );
  });
});
