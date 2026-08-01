import { mount } from '@vue/test-utils';
import HPicker from '../src/Picker';
import PickerFitContentInput from '../src/components/PickerFitContentInput';
import PickerPureInput from '../src/components/PickerPureInput';
import { describe, expect, test, vi } from 'vitest';
import { nextTick, ref } from 'vue';
import HInput from '../../Input/src/Input';
import type { HorizonWebComponentInstance } from '@aurora/utils';
import type { PickerFitContentInputExposes } from '../src/composables/useExposes';

describe('Picker.tsx', () => {
  test('basic', async () => {
    const modelValue = ref();
    const wrapper = mount(() => <HPicker modelValue={modelValue.value} />);
    const element = wrapper.findComponent(HPicker);

    expect(element.exists()).toBe(true);
  });

  test('fit-content field reuses Input', () => {
    const wrapper = mount(() => <HPicker inputable useFitContentInput modelValue="Horizon" />);
    const input = wrapper.findComponent(HInput);

    expect(input.exists()).toBe(true);
    expect(input.props('embedded')).toBe(true);
    expect(input.props('fitContent')).toBe(true);
  });

  test('fit-content compatibility keeps legacy DOM, styles and IME input timing', async () => {
    const componentRef = ref<HorizonWebComponentInstance<
      typeof PickerFitContentInput,
      PickerFitContentInputExposes
    > | null>(null);
    const onInput = vi.fn();
    const wrapper = mount(
      () => (
        <PickerFitContentInput
          ref={componentRef}
          class="is-main"
          modelValue="Horizon"
          minWidth={24}
          style={{ width: '120px' }}
          onInput={onInput}
        />
      ),
      { attachTo: document.body },
    );
    const nativeInput = wrapper.find('input');
    const component = componentRef.value!;

    expect(wrapper.element.tagName).toBe('SPAN');
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['h-picker-fit-content-input__wrapper', 'is-main']),
    );
    expect(wrapper.find('.h-picker-fit-content-input__opacity-content').exists()).toBe(true);
    expect(nativeInput.classes()).toEqual(
      expect.arrayContaining(['h-picker-fit-content-input__input', 'is-main']),
    );
    expect(nativeInput.classes().filter(name => name === 'is-main')).toHaveLength(1);
    expect(nativeInput.classes().some(name => name.startsWith('h-input'))).toBe(false);
    expect(nativeInput.attributes('style')).toContain('width: 120px');
    expect(component.input).toBe(nativeInput.element);

    component.focus();
    expect(document.activeElement).toBe(nativeInput.element);
    component.blur();
    expect(document.activeElement).not.toBe(nativeInput.element);

    await nativeInput.trigger('compositionstart');
    await nativeInput.setValue('拼');
    expect(onInput).toHaveBeenCalled();
    expect(onInput.mock.calls.every(([event]) => event.type === 'input')).toBe(true);

    wrapper.unmount();
  });

  test('pure input compatibility keeps a wrapperless native input', () => {
    const wrapper = mount(() => (
      <PickerPureInput class="is-main" modelValue="Horizon" style={{ width: '120px' }} />
    ));

    expect(wrapper.element.tagName).toBe('INPUT');
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['h-picker__input--inner', 'is-pure-input', 'is-main']),
    );
    expect(wrapper.classes().filter(name => name === 'is-main')).toHaveLength(1);
    expect(wrapper.classes().some(name => name.startsWith('h-input'))).toBe(false);
    expect(wrapper.attributes('style')).toContain('width: 120px');
  });

  test('compatibility input keeps legacy controlled update notifications', async () => {
    const modelValue = ref('before');
    const onUpdate = vi.fn();
    const wrapper = mount(() => (
      <PickerFitContentInput modelValue={modelValue.value} onUpdate:modelValue={onUpdate} />
    ));

    modelValue.value = 'external';
    await nextTick();
    expect(onUpdate).toHaveBeenLastCalledWith('external');

    onUpdate.mockClear();
    await wrapper.find('input').setValue('typed');
    expect(onUpdate).toHaveBeenCalledOnce();
    expect(onUpdate).toHaveBeenCalledWith('typed');
  });
});
