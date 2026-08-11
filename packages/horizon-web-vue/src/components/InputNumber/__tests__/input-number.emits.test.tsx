import { mount } from '@vue/test-utils';
import HInputNumber from '../src/InputNumber';
import { describe, expect, test, vi } from 'vitest';
import { ref } from 'vue';
import type { InputNumberExposes } from '../src/composables/useExposes';

describe('InputNumber.tsx emits', () => {
  test('input', async () => {
    const modelValue = ref();
    const onInput = vi.fn();
    const wrapper = mount(() => <HInputNumber v-model={modelValue.value} onInput={onInput} />);
    const input = wrapper.find('input');

    await input.trigger('input');
    expect(onInput).toHaveBeenCalledOnce();
  });

  test('change & blur', async () => {
    const modelValue = ref();
    const onChange = vi.fn();
    const wrapper = mount(() => <HInputNumber v-model={modelValue.value} onChange={onChange} />);
    const input = wrapper.find('input');

    await input.setValue('12');

    await input.trigger('blur');

    expect(onChange).toHaveBeenCalledOnce();
  });

  test('focus', async () => {
    const onFocus = vi.fn();
    const wrapper = mount(() => <HInputNumber onFocus={onFocus} />);
    const input = wrapper.find('input');

    await input.trigger('focus');

    expect(onFocus).toHaveBeenCalledOnce();
  });

  test('clear', async () => {
    const modelValue = ref(12);
    const onClear = vi.fn();
    const wrapper = mount(() => (
      <HInputNumber v-model={modelValue.value} clearable={true} onClear={onClear} />
    ));

    const clear = wrapper.find('.h-input-number__clear');

    await clear.trigger('click');

    expect(modelValue.value).toBeNull();
    expect(onClear).toHaveBeenCalledOnce();
  });

  test('keyDown keyPress keyUp', async () => {
    const onKeyDown = vi.fn();
    const onKeyPress = vi.fn();
    const onKeyUp = vi.fn();

    const wrapper = mount(() => (
      <HInputNumber onKeydown={onKeyDown} onKeypress={onKeyPress} onKeyup={onKeyUp} />
    ));

    const input = wrapper.find('input');

    await input.trigger('keydown', {
      code: 'Enter',
    });

    expect(onKeyDown).toHaveBeenCalledOnce();

    await input.trigger('keypress', {
      code: 'Enter',
    });

    expect(onKeyPress).toHaveBeenCalledOnce();

    await input.trigger('keyup', {
      code: 'Enter',
    });

    expect(onKeyUp).toHaveBeenCalledOnce();
  });

  test('wheel', async () => {
    const onWheel = vi.fn();

    const wrapper = mount(() => <HInputNumber onWheel={onWheel} />);

    const input = wrapper.find('input');

    await input.trigger('focus');
    await input.trigger('wheel');

    expect(onWheel).toHaveBeenCalledOnce();
  });

  test('formatter and parser', async () => {
    const value = ref();
    const domRef = ref<(HTMLElement & InputNumberExposes) | null>(null);

    const wrapper = mount(() => (
      <HInputNumber
        ref={domRef}
        v-model={value.value}
        // @ts-ignore
        formatter={(value: string) => `${value}%`}
        parser={(value: string) => value.replace(/%/g, '')}
      />
    ));

    await wrapper.find('input').setValue('100');

    expect(value.value).toBe(100);
    expect(domRef.value?.inputNumber.value).toBe('100%');
  });
});
