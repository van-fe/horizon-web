import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import { HInputOtp as PublicInputOtp } from '~/components';
import HInputOtp from '../src/InputOtp';

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

  test('renders a native one-time-code input and visual cells', () => {
    const wrapper = mount(() => <HInputOtp aria-label="Verification code" />);
    const input = wrapper.find('input');

    expect(wrapper.findAll('.h-input-otp__cell')).toHaveLength(6);
    expect(input.attributes('autocomplete')).toBe('one-time-code');
    expect(input.attributes('inputmode')).toBe('numeric');
    expect(input.attributes('pattern')).toBe('[0-9]*');
    expect(input.attributes('aria-label')).toBe('Verification code');
    expect(wrapper.find('.h-input-otp__cells').attributes('aria-hidden')).toBe('true');
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
});
