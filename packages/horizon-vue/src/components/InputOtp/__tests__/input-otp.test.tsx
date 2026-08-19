import { mount } from '@vue/test-utils';
import { defineComponent, nextTick, provide, ref } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import { HInputOtp as PublicInputOtp } from '~/components';
import HInputOtp from '../src/InputOtp';
import { GlobalSizeInjectedKey } from '~/components/Application/src/utils/injectedKeys';
import {
  HFormDisabledInjectedKey,
  HFormItemErrorInjectedKey,
  HFormItemTriggerInjectedKey,
} from '~/components/Form/src/utils/injectedKeys';
import { useInputOtpEmits } from '../src/composables/useEmits';
import type { InputOtpExposes } from '../src/composables/useExposes';
import { useInputOtpProps } from '../src/composables/useProps';

function createPasteEvent(text: string) {
  const event = new Event('paste', { bubbles: true, cancelable: true }) as ClipboardEvent;
  Object.defineProperty(event, 'clipboardData', {
    value: { getData: () => text },
  });
  return event;
}

describe('InputOtp.tsx', () => {
  test('is exported as an installable public component', () => {
    expect(PublicInputOtp.name).toBe('HInputOtp');
    expect(PublicInputOtp.install).toBeTypeOf('function');
  });

  test('prop and emit validators accept every public valid payload and reject invalid ones', () => {
    expect(useInputOtpProps.length.validator(1)).toBe(true);
    expect(useInputOtpProps.length.validator(12)).toBe(true);
    expect(useInputOtpProps.length.validator(0)).toBe(false);
    expect(useInputOtpProps.length.validator(1.5)).toBe(false);
    expect(useInputOtpProps.type.validator('numeric')).toBe(true);
    expect(useInputOtpProps.type.validator('alphanumeric')).toBe(true);
    expect(useInputOtpProps.type.validator('letters')).toBe(false);

    const event = new Event('input');
    const focusEvent = new FocusEvent('focus');
    expect(useInputOtpEmits['update:modelValue']('12')).toBe(true);
    expect(useInputOtpEmits['update:modelValue'](12 as never)).toBe(false);
    expect(useInputOtpEmits.input('12', event)).toBe(true);
    expect(useInputOtpEmits.input('12', {} as Event)).toBe(false);
    expect(useInputOtpEmits.change('12')).toBe(true);
    expect(useInputOtpEmits.complete('12')).toBe(true);
    expect(useInputOtpEmits.paste('12', createPasteEvent('12'))).toBe(true);
    expect(useInputOtpEmits.focus(focusEvent)).toBe(true);
    expect(useInputOtpEmits.focus(event as FocusEvent)).toBe(false);
    expect(useInputOtpEmits.blur(new FocusEvent('blur'))).toBe(true);
  });

  test('renders a native one-time-code input and visual cells', () => {
    const wrapper = mount(() => <HInputOtp aria-label="Verification code" />);
    const input = wrapper.find('input');

    expect(wrapper.findAll('.h-input-otp__cell')).toHaveLength(6);
    expect(input.attributes('autocomplete')).toBe('one-time-code');
    expect(input.attributes('inputmode')).toBe('numeric');
    expect(input.attributes('pattern')).toBe('[0-9]*');
    expect(input.attributes('aria-label')).toBe('Verification code');
    expect(input.attributes()).toHaveProperty('data-focus-visible-proxy');
    expect((input.element as HTMLInputElement).tabIndex).toBe(0);
    expect(wrapper.find('.h-input-otp__cells').attributes('aria-hidden')).toBe('true');
  });

  test('size class and update:modelValue payload follow real native input', async () => {
    const onUpdateModelValue = vi.fn();
    const wrapper = mount(HInputOtp, {
      props: { size: 'large', 'onUpdate:modelValue': onUpdateModelValue },
    });

    expect(wrapper.classes()).toContain('h-input-otp--large');
    await wrapper.get('input').setValue('12a34');
    expect(onUpdateModelValue).toHaveBeenCalledOnce();
    expect(onUpdateModelValue).toHaveBeenCalledWith('1234');
  });

  test('filters native input, updates the model, and emits complete once per completion', async () => {
    const onUpdate = vi.fn();
    const onComplete = vi.fn();
    const wrapper = mount(() => (
      <HInputOtp onUpdate:modelValue={onUpdate} onComplete={onComplete} />
    ));
    const input = wrapper.find('input');

    await input.setValue('12a34567');
    expect((input.element as HTMLInputElement).value).toBe('123456');
    expect(onUpdate).toHaveBeenLastCalledWith('123456');
    expect(onComplete).toHaveBeenCalledOnce();
    expect(onComplete).toHaveBeenLastCalledWith('123456');

    await input.setValue('123456');
    expect(onComplete).toHaveBeenCalledOnce();

    await input.setValue('12345');
    await input.setValue('123456');
    expect(onComplete).toHaveBeenCalledTimes(2);
  });

  test('pastes a full code into the native input', async () => {
    const onPaste = vi.fn();
    const onComplete = vi.fn();
    const wrapper = mount(() => <HInputOtp onPaste={onPaste} onComplete={onComplete} />);
    const input = wrapper.find('input');

    (input.element as HTMLInputElement).setSelectionRange(0, 0);
    input.element.dispatchEvent(createPasteEvent('12 34-56'));
    await nextTick();

    expect((input.element as HTMLInputElement).value).toBe('123456');
    expect(
      wrapper
        .findAll('.h-input-otp__cell')
        .map(cell => cell.text())
        .join(''),
    ).toBe('123456');
    expect(onPaste).toHaveBeenCalledOnce();
    expect(onPaste.mock.calls[0][0]).toBe('123456');
    expect(onComplete).toHaveBeenCalledWith('123456');
  });

  test('readonly, disabled and clipboard-less native paste events leave the code unchanged', async () => {
    const onPaste = vi.fn();
    const wrapper = mount(HInputOtp, { props: { modelValue: '12', readonly: true, onPaste } });
    const input = wrapper.get('input');

    input.element.dispatchEvent(createPasteEvent('34'));
    await wrapper.setProps({ readonly: false, disabled: true });
    input.element.dispatchEvent(createPasteEvent('34'));
    await wrapper.setProps({ disabled: false });
    input.element.dispatchEvent(new Event('paste', { bubbles: true, cancelable: true }));
    await nextTick();

    expect((input.element as HTMLInputElement).value).toBe('12');
    expect(onPaste).not.toHaveBeenCalled();
  });

  test('supports alphanumeric and masked codes', async () => {
    const wrapper = mount(() => <HInputOtp type="alphanumeric" mask />);
    const input = wrapper.find('input');

    await input.setValue('aB-12');

    expect((input.element as HTMLInputElement).value).toBe('aB12');
    expect(
      wrapper
        .findAll('.h-input-otp__cell')
        .slice(0, 4)
        .every(cell => cell.text() === '•'),
    ).toBe(true);
    expect(input.attributes('inputmode')).toBe('text');
    expect(input.attributes('pattern')).toBeUndefined();
  });

  test('stays synchronized with controlled values and length changes', async () => {
    const value = ref('12');
    const length = ref(4);
    const wrapper = mount(() => <HInputOtp modelValue={value.value} length={length.value} />);

    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('12');
    value.value = '9876';
    await nextTick();
    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('9876');

    value.value = '9';
    await nextTick();
    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('9');

    value.value = '9876';
    await nextTick();
    length.value = 3;
    await nextTick();
    expect(wrapper.findAll('.h-input-otp__cell')).toHaveLength(3);
    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('987');
  });

  test('supports focus styling, disabled, readonly, and error states', async () => {
    const wrapper = mount(HInputOtp, {
      props: { disabled: true, readonly: true, status: 'error' },
    });
    const input = wrapper.find('input');

    expect(input.attributes('disabled')).toBeDefined();
    expect(input.attributes('readonly')).toBeDefined();
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['is-disabled', 'is-readonly', 'is-error']),
    );

    await wrapper.setProps({ disabled: false, readonly: false });
    await input.trigger('focus');
    expect(wrapper.classes()).toContain('is-focused');
    expect(wrapper.find('.h-input-otp__cell--active').exists()).toBe(true);
  });

  test('character slot receives all scoped state and focus, blur and change emit native paths', async () => {
    const slotCalls = vi.fn();
    const onFocus = vi.fn();
    const onBlur = vi.fn();
    const onChange = vi.fn();
    const wrapper = mount(HInputOtp, {
      props: { modelValue: '12', length: 3, onFocus, onBlur, onChange },
      slots: {
        character: (scope?: { character: string; index: number; filled: boolean; active: boolean }) => {
          if (!scope) return null;
          slotCalls(scope);
          return <span data-test={`otp-${scope.index}`}>{scope.character || '_'}</span>;
        },
      },
    });
    const input = wrapper.get('input');

    expect(wrapper.get('[data-test="otp-0"]').text()).toBe('1');
    expect(wrapper.get('[data-test="otp-2"]').text()).toBe('_');
    expect(slotCalls.mock.calls.map(call => call[0])).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ index: 0, character: '1', filled: true, active: false }),
        expect.objectContaining({ index: 2, character: '', filled: false, active: false }),
      ]),
    );

    await input.trigger('focus');
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onFocus.mock.calls[0][0]).toBeInstanceOf(FocusEvent);
    expect(wrapper.find('.h-input-otp__cell--active [data-test="otp-2"]').exists()).toBe(true);

    await input.trigger('change');
    expect(onChange).toHaveBeenCalledWith('12');
    await input.trigger('blur');
    expect(onBlur).toHaveBeenCalledTimes(1);
    expect(onBlur.mock.calls[0][0]).toBeInstanceOf(FocusEvent);
  });

  test('injected form state and every exposed control operate the real native input', async () => {
    const globalSize = ref<'small' | 'medium' | 'large'>('small');
    const disabled = ref<boolean | undefined>(true);
    const error = ref<string | undefined>('Invalid code');
    const formTrigger = vi.fn();
    const onUpdate = vi.fn();
    const otp = ref<InputOtpExposes | null>(null);
    const Harness = defineComponent({
      setup() {
        provide(GlobalSizeInjectedKey, globalSize);
        provide(HFormDisabledInjectedKey, disabled);
        provide(HFormItemErrorInjectedKey, error);
        provide(HFormItemTriggerInjectedKey, formTrigger);
        return () => <HInputOtp ref={otp} modelValue="12" onUpdate:modelValue={onUpdate} />;
      },
    });
    const wrapper = mount(Harness, { attachTo: document.body });
    const component = wrapper.getComponent(HInputOtp);
    const input = component.get('input').element as HTMLInputElement;

    expect(component.classes()).toEqual(
      expect.arrayContaining(['h-input-otp--small', 'is-disabled', 'is-error']),
    );
    disabled.value = false;
    error.value = undefined;
    await nextTick();
    expect(component.classes()).not.toContain('is-disabled');
    expect(component.classes()).not.toContain('is-error');

    otp.value!.focus();
    await nextTick();
    expect(document.activeElement).toBe(input);
    otp.value!.select();
    expect([input.selectionStart, input.selectionEnd]).toEqual([0, 2]);
    otp.value!.clear();
    await nextTick();
    expect(onUpdate).toHaveBeenLastCalledWith('');
    expect(formTrigger).toHaveBeenCalledWith('change');
    otp.value!.blur();
    await nextTick();
    expect(document.activeElement).not.toBe(input);
    expect(formTrigger).toHaveBeenCalledWith('blur');
    wrapper.unmount();
  });
});
