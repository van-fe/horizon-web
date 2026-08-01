import { mount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import { nextTick } from 'vue';
import HInput from '~/components/Input/src/Input';
import HSelect from '~/components/Select/src/Select';
import { dictionaries } from '~/locales';
import LicensePlateInput from '../src/LicensePlateInput';
import { getLicensePlateType, isValidLicensePlate, normalizeLicensePlate } from '../src/utils';

describe('LicensePlateInput', () => {
  test('recognizes standard and new-energy license plates', () => {
    expect(getLicensePlateType('京A12345')).toBe('standard');
    expect(getLicensePlateType('粤BD12345')).toBe('new-energy');
    expect(getLicensePlateType('粤B12345D')).toBe('new-energy');
    expect(getLicensePlateType('京A12')).toBe('incomplete');
    expect(getLicensePlateType('京I12345')).toBe('invalid');
    expect(isValidLicensePlate('沪A12345')).toBe(true);
    expect(normalizeLicensePlate(' 沪 a·12-345 ')).toBe('沪A12345');
  });

  test('reuses Horizon Web Select and Input controls', () => {
    const wrapper = mount(LicensePlateInput);

    expect(wrapper.findComponent(HSelect).exists()).toBe(true);
    expect(wrapper.findComponent(HInput).exists()).toBe(true);
    expect(wrapper.findComponent(HSelect).props('options')).toHaveLength(31);
  });

  test('normalizes input and emits the complete controlled value', async () => {
    const wrapper = mount(LicensePlateInput, { props: { modelValue: '' } });
    const input = wrapper.findAllComponents(HInput).at(-1)!;

    input.vm.$emit('update:modelValue', 'a·12-345');
    await nextTick();

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['京A12345']);
    expect(wrapper.emitted('input')?.at(-1)).toEqual(['京A12345', 'standard']);
  });

  test('changes the province while retaining the number', async () => {
    const wrapper = mount(LicensePlateInput, { props: { modelValue: '京A12345' } });

    wrapper.findComponent(HSelect).vm.$emit('update:modelValue', '沪');
    await nextTick();

    expect(wrapper.emitted('provinceChange')?.at(-1)).toEqual(['沪']);
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['沪A12345']);
    expect(wrapper.emitted('change')?.at(-1)).toEqual(['沪A12345', 'standard']);
  });

  test('shows validation state after blur and exposes validation', async () => {
    const wrapper = mount(LicensePlateInput, { props: { modelValue: '京A12' } });
    const input = wrapper.findAllComponents(HInput).at(-1)!;

    input.vm.$emit('blur', new FocusEvent('blur'));
    await nextTick();

    expect(wrapper.classes()).toContain('is-error');
    expect(input.props('status')).toBe('error');
    expect((wrapper.vm as unknown as { validate: () => unknown }).validate()).toEqual({
      valid: false,
      type: 'incomplete',
      value: '京A12',
    });
  });

  test('supports clear, disabled, readonly and custom provinces', async () => {
    const onClear = vi.fn();
    const wrapper = mount(LicensePlateInput, {
      props: {
        modelValue: '沪A12345',
        disabled: true,
        provinces: ['京', '沪'],
        onClear,
      },
    });

    expect(wrapper.findComponent(HSelect).props('disabled')).toBe(true);
    expect(wrapper.findAllComponents(HInput).at(-1)!.props('disabled')).toBe(true);
    expect(wrapper.findComponent(HSelect).props('options')).toHaveLength(2);

    wrapper.findAllComponents(HInput).at(-1)!.vm.$emit('clear');
    await nextTick();
    expect(onClear).toHaveBeenCalledOnce();

    await wrapper.setProps({ disabled: false, readonly: true });
    expect(wrapper.findComponent(HSelect).props('disabled')).toBe(true);
    expect(wrapper.findAllComponents(HInput).at(-1)!.props('readonly')).toBe(true);
  });

  test('ships labels in every supported locale', () => {
    expect(
      Object.values(dictionaries).every(
        dictionary =>
          dictionary.horizonWeb.licensePlateInput?.label &&
          dictionary.horizonWeb.licensePlateInput?.provinceLabel &&
          dictionary.horizonWeb.licensePlateInput?.placeholder,
      ),
    ).toBe(true);
  });
});
