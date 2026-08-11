import { mount } from '@vue/test-utils';
import HPicker from '../src/Picker';
import PickerFitContentInput from '../src/components/PickerFitContentInput';
import PickerPureInput from '../src/components/PickerPureInput';
import { describe, expect, test, vi } from 'vitest';
import { nextTick, ref } from 'vue';
import HInput from '../../Input/src/Input';
import type { HorizonWebComponentInstance } from '@aurora/utils';
import type { PickerFitContentInputExposes } from '../src/composables/useExposes';
import type { PickerPureInputExposes } from '../src/composables/useExposes';
import { HPickerPopperVisibleInjectKey } from '../src/utils/InjectKeys';

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
    expect(wrapper.find('input').attributes()).toHaveProperty('data-focus-visible-proxy');
  });

  test('fit-content compatibility keeps legacy DOM, styles and IME input timing', async () => {
    const componentRef = ref<HorizonWebComponentInstance<
      typeof PickerFitContentInput,
      PickerFitContentInputExposes
    > | null>(null);
    const onInput = vi.fn();
    const onFocus = vi.fn();
    const onBlur = vi.fn();
    const onKeydown = vi.fn();
    const onCompositionStart = vi.fn();
    const onCompositionUpdate = vi.fn();
    const onCompositionEnd = vi.fn();
    const wrapper = mount(
      () => (
        <PickerFitContentInput
          ref={componentRef}
          class="is-main"
          modelValue="Horizon"
          minWidth={24}
          style={{ width: '120px' }}
          onInput={onInput}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeydown={onKeydown}
          onCompositionStart={onCompositionStart}
          onCompositionUpdate={onCompositionUpdate}
          onCompositionEnd={onCompositionEnd}
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
    expect(onFocus.mock.calls[0][0]).toBeInstanceOf(FocusEvent);
    component.blur();
    expect(document.activeElement).not.toBe(nativeInput.element);
    expect(onBlur.mock.calls[0][0]).toBeInstanceOf(FocusEvent);
    component.focus();
    component.forceBlur();
    expect(document.activeElement).not.toBe(nativeInput.element);
    expect(component.resetInputString()).toBeUndefined();

    await nativeInput.trigger('compositionstart');
    await nativeInput.setValue('拼');
    await nativeInput.trigger('compositionupdate');
    await nativeInput.trigger('compositionend');
    await nativeInput.trigger('keydown', { key: 'Enter' });
    expect(onInput).toHaveBeenCalled();
    expect(onInput.mock.calls.every(([event]) => event.type === 'input')).toBe(true);
    expect(onCompositionStart.mock.calls[0][0]).toBeInstanceOf(CompositionEvent);
    expect(onCompositionUpdate.mock.calls[0][0]).toBeInstanceOf(CompositionEvent);
    expect(onCompositionEnd.mock.calls[0][0]).toBeInstanceOf(CompositionEvent);
    expect(onKeydown.mock.calls[0][0]).toBeInstanceOf(KeyboardEvent);

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

  test('pure input forwards every native event and supports its complete expose contract', async () => {
    const componentRef = ref<HorizonWebComponentInstance<
      typeof PickerPureInput,
      PickerPureInputExposes
    > | null>(null);
    const onUpdate = vi.fn();
    const onInput = vi.fn();
    const onFocus = vi.fn();
    const onBlur = vi.fn();
    const onKeydown = vi.fn();
    const onCompositionStart = vi.fn();
    const onCompositionUpdate = vi.fn();
    const onCompositionEnd = vi.fn();
    const wrapper = mount(
      () => (
        <PickerPureInput
          ref={componentRef}
          modelValue={12}
          placeholder="Value"
          tabindex={3}
          autocomplete="off"
          unselectable="on"
          onUpdate:modelValue={onUpdate}
          onInput={onInput}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeydown={onKeydown}
          onCompositionStart={onCompositionStart}
          onCompositionUpdate={onCompositionUpdate}
          onCompositionEnd={onCompositionEnd}
        />
      ),
      { attachTo: document.body },
    );
    const input = wrapper.get('input');

    expect((input.element as HTMLInputElement).value).toBe('12');
    expect(input.attributes()).toMatchObject({
      placeholder: 'Value',
      tabindex: '3',
      autocomplete: 'off',
      unselectable: 'on',
    });
    await input.trigger('focus');
    await input.setValue('34');
    await input.trigger('keydown', { key: 'Enter' });
    await input.trigger('compositionstart');
    await input.trigger('compositionupdate');
    await input.trigger('compositionend');
    await input.trigger('blur');

    expect(onUpdate).toHaveBeenCalledWith('34');
    expect(onInput.mock.calls[0][0]).toBeInstanceOf(Event);
    expect(onFocus.mock.calls[0][0]).toBeInstanceOf(FocusEvent);
    expect(onBlur.mock.calls[0][0]).toBeInstanceOf(FocusEvent);
    expect(onKeydown.mock.calls[0][0]).toBeInstanceOf(KeyboardEvent);
    expect(onCompositionStart.mock.calls[0][0]).toBeInstanceOf(CompositionEvent);
    expect(onCompositionUpdate.mock.calls[0][0]).toBeInstanceOf(CompositionEvent);
    expect(onCompositionEnd.mock.calls[0][0]).toBeInstanceOf(CompositionEvent);

    componentRef.value?.focus();
    expect(document.activeElement).toBe(input.element);
    componentRef.value?.blur();
    expect(document.activeElement).not.toBe(input.element);
    componentRef.value?.resetInputString(56);
    await nextTick();
    expect((input.element as HTMLInputElement).value).toBe('56');
    componentRef.value?.resetInputString();
    await nextTick();
    expect((input.element as HTMLInputElement).value).toBe('12');
  });

  test('pure and fit-content inputs reflect controlled disabled/read-only changes', async () => {
    const disabled = ref(false);
    const readonly = ref(false);
    const wrapper = mount(() => (
      <div>
        <PickerPureInput modelValue="pure" disabled={disabled.value} readonly={readonly.value} />
        <PickerFitContentInput
          modelValue="fit"
          disabled={disabled.value}
          readonly={readonly.value}
          minWidth={36}
        />
      </div>
    ));
    const inputs = wrapper.findAll('input');

    expect(inputs.every(input => input.attributes('disabled') === undefined)).toBe(true);
    disabled.value = true;
    readonly.value = true;
    await nextTick();
    expect(inputs.every(input => input.attributes('disabled') !== undefined)).toBe(true);
    expect(inputs.every(input => input.attributes('readonly') !== undefined)).toBe(true);
    expect(wrapper.findAllComponents(HInput)[1].props('fitContentMinWidth')).toBe(36);
  });

  test('compatibility inputs stop click bubbling only while the picker popper is visible', async () => {
    const visible = ref(true);
    const parentClick = vi.fn();
    const wrapper = mount(
      () => (
        <div onClick={parentClick}>
          <PickerPureInput modelValue="pure" />
          <PickerFitContentInput modelValue="fit" />
        </div>
      ),
      {
        global: {
          provide: { [HPickerPopperVisibleInjectKey as symbol]: visible },
        },
      },
    );
    const inputs = wrapper.findAll('input');

    await inputs[0].trigger('click');
    await inputs[1].trigger('click');
    expect(parentClick).not.toHaveBeenCalled();

    visible.value = false;
    await nextTick();
    await inputs[0].trigger('click');
    await inputs[1].trigger('click');
    expect(parentClick).toHaveBeenCalledTimes(2);
  });
});
