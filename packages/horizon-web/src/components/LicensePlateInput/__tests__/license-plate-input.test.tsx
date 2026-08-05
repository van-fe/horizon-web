import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import { nextTick, ref } from 'vue';
import HButton from '~/components/Button/src/Button';
import HPopover from '~/components/Popover/src/Popover';
import { dictionaries } from '~/locales';
import LicensePlateInput from '../src/LicensePlateInput';
import { getLicensePlateType, isValidLicensePlate, normalizeLicensePlate } from '../src/utils';

function mountInput(props: Record<string, unknown> = {}) {
  return mount(LicensePlateInput, { props: { toBody: false, ...props } });
}

function findButton(wrapper: ReturnType<typeof mountInput>, label: string) {
  return wrapper.findAllComponents(HButton).find(button => button.text() === label)!;
}

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

  test('opens a clickable province panel when focused', async () => {
    const wrapper = mountInput();
    const input = wrapper.find('input');

    await input.trigger('focus');

    expect(wrapper.findComponent(HPopover).props('visible')).toBe(true);
    expect(wrapper.findAll('.h-license-plate-input__cell')).toHaveLength(8);
    expect(findButton(wrapper, '京').exists()).toBe(true);
    expect(findButton(wrapper, '沪').exists()).toBe(true);
  });

  test('reuses Horizon Web Popover and Button controls', async () => {
    const wrapper = mountInput();
    await wrapper.find('input').trigger('focus');

    expect(wrapper.findComponent(HPopover).exists()).toBe(true);
    expect(wrapper.findComponent(HPopover).props('placement')).toBe('bottom-start');
    expect(wrapper.findComponent(HPopover).props('flip')).toBe(false);
    expect(wrapper.findAllComponents(HButton).length).toBeGreaterThan(31);
    expect(wrapper.find('.h-license-plate-input__keyboard').exists()).toBe(true);
  });

  test('renders a persistent inline panel without creating a Popover', async () => {
    const modelValue = ref('');
    const wrapper = mount(() => (
      <LicensePlateInput v-model={modelValue.value} inlinePanel toBody={false} />
    ));

    expect(wrapper.findComponent(HPopover).exists()).toBe(false);
    expect(wrapper.find('.h-license-plate-input__inline-panel').exists()).toBe(true);

    await wrapper
      .findAllComponents(HButton)
      .find(button => button.text() === '京')!
      .trigger('click');
    expect(modelValue.value).toBe('京');

    await wrapper
      .findAllComponents(HButton)
      .find(button => button.text() === 'Done')!
      .trigger('click');
    expect(wrapper.find('.h-license-plate-input__inline-panel').exists()).toBe(true);
  });

  test('switches keyboard layouts and emits a complete plate', async () => {
    const wrapper = mountInput();
    await wrapper.find('input').trigger('focus');

    await findButton(wrapper, '沪').trigger('click');
    expect(wrapper.emitted('provinceChange')?.at(-1)).toEqual(['沪']);
    expect(findButton(wrapper, 'A').exists()).toBe(true);
    expect(findButton(wrapper, '0')).toBeUndefined();

    for (const character of ['A', '1', '2', '3', '4', '5']) {
      await findButton(wrapper, character).trigger('click');
    }

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['沪A12345']);
    expect(wrapper.emitted('input')?.at(-1)).toEqual(['沪A12345', 'standard']);
  });

  test('supports physical keyboard, paste and backspace', async () => {
    const wrapper = mountInput({ modelValue: '京A12' });
    const input = wrapper.find('input');
    await input.trigger('focus');

    await input.trigger('keydown', { key: '3' });
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['京A123']);

    await findButton(wrapper, 'Backspace').trigger('click');
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['京A12']);

    const paste = new Event('paste', { bubbles: true, cancelable: true });
    Object.defineProperty(paste, 'clipboardData', {
      value: { getData: () => ' 粤 b·d12-345 ' },
    });
    input.element.dispatchEvent(paste);
    await nextTick();
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['粤BD12345']);
  });

  test('clears v-model when backspacing the selected province cell', async () => {
    const modelValue = ref('京A12345');
    const wrapper = mount(() => <LicensePlateInput v-model={modelValue.value} toBody={false} />);
    const cells = wrapper.findAll('.h-license-plate-input__cell');

    await cells[0].trigger('click');
    await wrapper
      .findAllComponents(HButton)
      .find(button => button.text() === 'Backspace')!
      .trigger('click');

    expect(modelValue.value).toBe('');
    expect(wrapper.find('input').element.value).toBe('');
    expect(cells.slice(1, 7).every(cell => cell.text() === '')).toBe(true);
  });

  test('activates the eighth new-energy position and validates on completion', async () => {
    const wrapper = mountInput({ modelValue: '粤BD1234', newEnergy: true });
    await wrapper.find('input').trigger('focus');
    await findButton(wrapper, '5').trigger('click');

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['粤BD12345']);
    expect((wrapper.vm as unknown as { validate: () => unknown }).validate()).toEqual({
      valid: true,
      type: 'new-energy',
      value: '粤BD12345',
    });
  });

  test('supports clear, disabled and readonly states', async () => {
    const wrapper = mountInput({ modelValue: '沪A12345', disabled: true });
    const input = wrapper.find('input');

    expect(input.attributes('disabled')).toBeDefined();
    await wrapper.find('.h-license-plate-input__cell').trigger('click');
    expect(wrapper.findComponent(HPopover).props('visible')).toBe(false);

    await wrapper.setProps({ disabled: false, readonly: true });
    expect(input.attributes('readonly')).toBeDefined();

    await wrapper.setProps({ readonly: false });
    await input.trigger('focus');
    await findButton(wrapper, 'Clear').trigger('click');
    expect(wrapper.emitted('clear')).toHaveLength(1);
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['']);
  });

  test('ships keyboard labels in every supported locale', () => {
    expect(
      Object.values(dictionaries).every(
        dictionary =>
          dictionary.horizonWeb.licensePlateInput?.label &&
          dictionary.horizonWeb.licensePlateInput?.keyboardLabel &&
          dictionary.horizonWeb.licensePlateInput?.provincePlaceholder &&
          dictionary.horizonWeb.licensePlateInput?.backspace &&
          dictionary.horizonWeb.licensePlateInput?.done,
      ),
    ).toBe(true);
  });
});
