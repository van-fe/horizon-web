import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import { HRadio } from '..';

describe('Radio interaction', () => {
  test('updates the bound value when the native input changes', async () => {
    const modelValue = ref<number>();
    const onChange = vi.fn();
    const wrapper = mount(() => (
      <HRadio
        modelValue={modelValue.value}
        value={1}
        onChange={onChange}
        onUpdate:modelValue={value => {
          modelValue.value = value as number;
        }}
      >
        Option 1
      </HRadio>
    ));

    const input = wrapper.find('input[type="radio"]');
    await input.setValue(true);
    await nextTick();

    expect(modelValue.value).toBe(1);
    expect(onChange).toHaveBeenCalledWith(1);
    expect((input.element as HTMLInputElement).checked).toBe(true);
  });

  test('does not update when disabled', async () => {
    const onUpdate = vi.fn();
    const wrapper = mount(() => (
      <HRadio modelValue={false} value={true} disabled onUpdate:modelValue={onUpdate} />
    ));

    await wrapper.find('input[type="radio"]').setValue(true);

    expect(onUpdate).not.toHaveBeenCalled();
  });
});
