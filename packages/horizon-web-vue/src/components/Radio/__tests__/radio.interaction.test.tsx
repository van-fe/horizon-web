import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import { HRadio, HRadioButton, HRadioGroup } from '..';
import type { RadioLabelRegionContext } from '@aurora/core';
import { useRadioEmits } from '../src/composables/useEmits';
import {
  useRadioButtonProps,
  useRadioGroupProps,
  useRadioProps,
} from '../src/composables/useProps';

describe('Radio interaction', () => {
  test('forwards viewable/name/fill/default slot and preserves group update/blur contracts', async () => {
    const standalone = mount(HRadio, {
      props: { modelValue: 'a', value: 'a', viewable: true, name: 'standalone' },
      slots: { default: () => <span data-test="radio-label">Readable radio</span> },
    });
    expect(standalone.get('[data-test="radio-label"]').text()).toBe('Readable radio');
    expect(standalone.get('label').attributes('style')).toContain('inline-block');

    const button = mount(HRadioButton, {
      props: {
        modelValue: 'button',
        value: 'button',
        viewable: false,
        fill: 'brand[5]',
        name: 'button-name',
      },
      slots: { default: () => 'Button label' },
    });
    expect(button.get('input').attributes('name')).toBe('button-name');
    expect(button.get('.h-radio-button').attributes('style')).toContain('background-color');

    const value = ref('one');
    const onUpdateModelValue = vi.fn((next: string | number | boolean) => {
      value.value = String(next);
    });
    const onBlur = vi.fn();
    const group = mount(() => (
      <HRadioGroup
        modelValue={value.value}
        viewable={false}
        name="group-name"
        onUpdate:modelValue={onUpdateModelValue}
        onBlur={onBlur}
      >
        {{
          default: () => [
            <HRadio value="one">One</HRadio>,
            <HRadioButton value="two">Two</HRadioButton>,
          ],
        }}
      </HRadioGroup>
    ));
    const inputs = group.findAll<HTMLInputElement>('input[type="radio"]');
    expect(inputs.map(input => input.attributes('name'))).toEqual(['group-name', 'group-name']);
    await inputs[1].setValue(true);
    await nextTick();
    expect(onUpdateModelValue).toHaveBeenCalledWith('two');
    await inputs[1].trigger('blur');
    expect(onBlur.mock.calls[0][0]).toBeInstanceOf(FocusEvent);
  });

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

  test('covers metadata defaults and defensive event validators', () => {
    expect(useRadioProps.modelValue.default).toBe('');
    expect(useRadioProps.value.default).toBe('');
    expect(useRadioProps.border.default).toBe(false);
    expect(useRadioButtonProps.fill.default).toBe('');
    expect(useRadioGroupProps.viewable.default).toBe(false);

    expect(useRadioEmits.change('value')).toBe(true);
    expect(useRadioEmits.change(1)).toBe(true);
    expect(useRadioEmits.change(false)).toBe(true);
    expect(useRadioEmits.change({} as never)).toBe(false);
    expect(useRadioEmits['update:modelValue'](true)).toBe(true);
    expect(useRadioEmits['update:modelValue'](null as never)).toBe(false);
    expect(useRadioEmits.blur(new FocusEvent('blur'))).toBe(true);
    expect(useRadioEmits.blur(new Event('blur') as FocusEvent)).toBe(false);
  });

  test('default slot receives shared checked/value context and focus is exposed', () => {
    const wrapper = mount(HRadio, {
      attachTo: document.body,
      props: { modelValue: 'selected', value: 'selected' },
      slots: {
        default: (context?: RadioLabelRegionContext) => `${context?.value}:${context?.checked}`,
      },
    });

    wrapper.getCurrentComponent().exposed?.focus();
    expect(wrapper.text()).toContain('selected:true');
    expect(document.activeElement).toBe(wrapper.get('input').element);
    wrapper.unmount();
  });
});
