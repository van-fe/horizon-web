import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import HButton from '~/components/Button/src/Button';
import HPopover from '~/components/Popover/src/Popover';
import LicensePlateInput from '../src/LicensePlateInput';
import { useLicensePlateInputEmits } from '../src/composables/useEmits';
import type { LicensePlateInputExposes } from '../src/composables/useExposes';

function buttonWithText(wrapper: ReturnType<typeof mount>, text: string) {
  return wrapper.findAllComponents(HButton).find(button => button.text() === text);
}

describe('LicensePlateInput public API contracts', () => {
  test('visual, accessibility, keyboard and suffix props have observable output', async () => {
    const wrapper = mount(LicensePlateInput, {
      props: {
        size: 'small',
        inputStyle: 'emphasize',
        status: 'error',
        clearable: false,
        placeholder: 'Plate placeholder',
        ariaLabel: 'Vehicle plate',
        provinceAriaLabel: 'Choose province',
        keyboardAriaLabel: 'Choose plate character',
        provinces: ['京', '沪'],
        defaultProvince: '沪',
        placement: 'top-end',
        flip: true,
        toBody: false,
      },
      attrs: { 'aria-describedby': 'plate-help' },
      slots: { suffix: () => <span data-test="plate-suffix">Suffix</span> },
    });
    const root = wrapper.get('.h-license-plate-input');
    const input = wrapper.get('input');

    expect(root.classes()).toEqual(
      expect.arrayContaining([
        'h-license-plate-input--small',
        'h-license-plate-input--emphasize',
        'is-error',
      ]),
    );
    expect(input.attributes()).toMatchObject({
      'aria-label': 'Vehicle plate',
      'aria-valuetext': 'Plate placeholder',
      'aria-invalid': 'true',
      'aria-describedby': 'plate-help',
    });
    expect(wrapper.get('[data-test="plate-suffix"]').text()).toBe('Suffix');
    expect(wrapper.findComponent(HPopover).props()).toMatchObject({
      placement: 'top-end',
      flip: true,
      toBody: false,
    });

    await input.trigger('focus');
    expect(wrapper.get('[role="group"]').attributes('aria-label')).toBe('Choose province');
    expect(buttonWithText(wrapper, '沪')?.props('active')).toBe(true);
    expect(buttonWithText(wrapper, '粤')).toBeUndefined();
    expect(buttonWithText(wrapper, 'Clear')).toBeUndefined();

    await buttonWithText(wrapper, '京')?.trigger('click');
    expect(wrapper.get('[role="group"]').attributes('aria-label')).toBe(
      'Choose plate character',
    );
  });

  test('validateOnBlur controls automatic error state while focus and blur keep native payloads', async () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();
    const wrapper = mount(LicensePlateInput, {
      attachTo: document.body,
      props: {
        modelValue: '京A1',
        validateOnBlur: false,
        toBody: false,
        onFocus,
        onBlur,
      },
    });
    const input = wrapper.get('input');

    input.element.focus();
    await nextTick();
    expect(onFocus).toHaveBeenCalledOnce();
    expect(onFocus.mock.calls[0][0]).toBeInstanceOf(FocusEvent);
    input.element.blur();
    await new Promise(resolve => window.setTimeout(resolve));
    expect(onBlur).toHaveBeenCalledOnce();
    expect(onBlur.mock.calls[0][0]).toBeInstanceOf(FocusEvent);
    expect(input.attributes('aria-invalid')).toBeUndefined();

    await wrapper.setProps({ validateOnBlur: true });
    input.element.focus();
    input.element.blur();
    await new Promise(resolve => window.setTimeout(resolve));
    expect(input.attributes('aria-invalid')).toBe('true');
    wrapper.unmount();
  });

  test('real keyboard editing emits input, validity, change and clear contracts', async () => {
    const wrapper = mount(LicensePlateInput, {
      props: { modelValue: '京A1234', toBody: false },
    });
    const input = wrapper.get('input');
    await input.trigger('focus');
    await buttonWithText(wrapper, '5')?.trigger('click');
    await nextTick();

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['京A12345']);
    expect(wrapper.emitted('input')?.at(-1)).toEqual(['京A12345', 'standard']);
    expect(wrapper.emitted('validityChange')?.at(-1)).toEqual([true, 'standard']);

    await buttonWithText(wrapper, 'Done')?.trigger('click');
    expect(wrapper.emitted('change')?.at(-1)).toEqual(['京A12345', 'standard']);
    await input.trigger('focus');
    await buttonWithText(wrapper, 'Clear')?.trigger('click');
    expect(wrapper.emitted('clear')).toHaveLength(1);
  });

  test('all exposed controls operate the native input and panel', async () => {
    const component = ref<LicensePlateInputExposes>();
    const wrapper = mount(
      () => <LicensePlateInput ref={component} modelValue="沪A12345" toBody={false} />,
      { attachTo: document.body },
    );
    await nextTick();

    expect(component.value?.input).toBeInstanceOf(HTMLInputElement);
    component.value?.focus();
    expect(document.activeElement).toBe(component.value?.input);
    component.value?.open();
    await nextTick();
    expect(wrapper.findComponent(HPopover).props('visible')).toBe(true);
    component.value?.select();
    expect(component.value?.input?.selectionStart).toBe(0);
    expect(component.value?.input?.selectionEnd).toBe(7);
    component.value?.close();
    await nextTick();
    expect(wrapper.findComponent(HPopover).props('visible')).toBe(false);
    component.value?.blur();
    expect(document.activeElement).not.toBe(component.value?.input);
    expect(component.value?.validate()).toEqual({
      valid: true,
      type: 'standard',
      value: '沪A12345',
    });
    wrapper.unmount();
  });

  test('emit validators reject invalid payload shapes', () => {
    const focusEvent = new FocusEvent('focus');
    expect(useLicensePlateInputEmits['update:modelValue']('京A12345')).toBe(true);
    expect(useLicensePlateInputEmits['update:modelValue'](1 as never)).toBe(false);
    expect(useLicensePlateInputEmits.input('京A12345', 'standard')).toBe(true);
    expect(useLicensePlateInputEmits.input('京A12345', 'unknown' as never)).toBe(false);
    expect(useLicensePlateInputEmits.input(1 as never, 'standard')).toBe(false);
    expect(useLicensePlateInputEmits.change('粤BD12345', 'new-energy')).toBe(true);
    expect(useLicensePlateInputEmits.change('plate', 'unknown' as never)).toBe(false);
    expect(useLicensePlateInputEmits.provinceChange('沪')).toBe(true);
    expect(useLicensePlateInputEmits.provinceChange(1 as never)).toBe(false);
    expect(useLicensePlateInputEmits.validityChange(true, 'standard')).toBe(true);
    expect(useLicensePlateInputEmits.validityChange(false, 'unknown' as never)).toBe(false);
    expect(useLicensePlateInputEmits.validityChange(1 as never, 'standard')).toBe(false);
    expect(useLicensePlateInputEmits.focus(focusEvent)).toBe(true);
    expect(useLicensePlateInputEmits.focus(new Event('focus') as FocusEvent)).toBe(false);
    expect(useLicensePlateInputEmits.blur(focusEvent)).toBe(true);
    expect(useLicensePlateInputEmits.blur({} as FocusEvent)).toBe(false);
    expect(useLicensePlateInputEmits.clear()).toBe(true);
  });
});
