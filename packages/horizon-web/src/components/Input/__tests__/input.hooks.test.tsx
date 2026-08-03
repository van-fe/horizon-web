import { mount } from '@vue/test-utils';
import { defineComponent, nextTick, ref } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import HInput from '../src/Input';
import type { InputExposes } from '../src/composables/useExposes';

describe('Input hook boundaries', () => {
  test('buffers IME input until composition ends', async () => {
    const modelValue = ref('');
    const onInput = vi.fn();
    const wrapper = mount(() => <HInput v-model={modelValue.value} onInput={onInput} />);
    const input = wrapper.find('input');

    await input.trigger('compositionstart');
    await input.setValue('拼');
    expect(modelValue.value).toBe('');
    expect(onInput).not.toHaveBeenCalled();

    await input.trigger('compositionend');
    expect(modelValue.value).toBe('拼');
    expect(onInput).toHaveBeenCalledOnce();
  });

  test('preserves native input event timing during IME composition', async () => {
    const embeddedInputHandler = vi.fn();
    const legacyInputHandler = vi.fn();
    const LegacyInput = defineComponent({
      setup() {
        const value = ref('');
        return () => <input v-model={value.value} onInput={legacyInputHandler} />;
      },
    });
    const wrapper = mount(() => <HInput embedded embeddedInputHandler={embeddedInputHandler} />);
    const legacyWrapper = mount(LegacyInput);
    const input = wrapper.find('input');
    const legacyInput = legacyWrapper.find('input');

    await input.trigger('compositionstart');
    await legacyInput.trigger('compositionstart');
    await input.setValue('拼');
    await legacyInput.setValue('拼');

    expect(embeddedInputHandler).toHaveBeenCalledTimes(legacyInputHandler.mock.calls.length);
    expect(embeddedInputHandler).toHaveBeenCalledWith(expect.any(Event));
  });

  test('external model synchronization does not emit a user change', async () => {
    const modelValue = ref('before');
    const onChange = vi.fn();
    const wrapper = mount(() => <HInput v-model={modelValue.value} onChange={onChange} />);

    modelValue.value = 'after';
    await nextTick();

    expect(wrapper.find('input').element.value).toBe('after');
    expect(onChange).not.toHaveBeenCalled();
  });

  test('preserves native element and control exposes', async () => {
    const componentRef = ref<(typeof HInput & InputExposes) | null>(null);
    mount(() => <HInput ref={componentRef} modelValue="select me" />);
    await nextTick();

    expect(componentRef.value?.input).toBeInstanceOf(HTMLInputElement);
    expect(componentRef.value?.focus).toBeTypeOf('function');
    expect(componentRef.value?.blur).toBeTypeOf('function');
    expect(componentRef.value?.select).toBeTypeOf('function');
  });
});
