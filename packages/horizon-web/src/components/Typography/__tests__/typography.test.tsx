import { mount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import { nextTick, ref } from 'vue';
import HButton from '../../Button/src/Button';
import HInput from '../../Input/src/Input';
import { dictionaries } from '../../../locales';
import HTypography from '../src/Typography';

describe('Typography', () => {
  test('renders semantic heading and multi-line ellipsis', () => {
    const wrapper = mount(() => (
      <HTypography level={2} ellipsis={3} type="secondary">
        Horizon Web
      </HTypography>
    ));

    expect(wrapper.element.tagName).toBe('H2');
    expect(wrapper.classes()).toContain('h-typography--heading-2');
    expect(wrapper.classes()).toContain('is-ellipsis');
    expect((wrapper.element as HTMLElement).style.getPropertyValue('--h-typography-lines')).toBe(
      '3',
    );
  });

  test('copies controlled text and emits result', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
    const wrapper = mount(HTypography, { props: { modelValue: 'copy me', copyable: true } });

    await wrapper.findComponent(HButton).trigger('click');

    expect(writeText).toHaveBeenCalledWith('copy me');
    expect(wrapper.emitted('copy')?.[0]).toEqual(['copy me', true]);
  });

  test('copies rendered slot text', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
    const wrapper = mount(HTypography, {
      props: { copyable: true },
      slots: { default: '<strong>slot text</strong>' },
    });

    await wrapper.findComponent(HButton).trigger('click');
    expect(writeText).toHaveBeenCalledWith('slot text');
  });

  test('edits through Horizon Input and supports escape cancellation', async () => {
    const value = ref('before');
    const wrapper = mount(() => (
      <HTypography
        editable
        modelValue={value.value}
        onUpdate:modelValue={(next: string) => (value.value = next)}
      />
    ));

    await wrapper.findComponent(HButton).trigger('click');
    expect(wrapper.findComponent(HInput).exists()).toBe(true);
    await wrapper.find('input').setValue('after');
    await wrapper.find('input').trigger('keydown', { key: 'Escape' });
    await nextTick();

    expect(wrapper.findComponent(HInput).exists()).toBe(false);
    expect(value.value).toBe('before');
  });

  test('disabled actions cannot be activated', async () => {
    const wrapper = mount(HTypography, {
      props: { modelValue: 'locked', editable: true, copyable: true, disabled: true },
    });

    for (const button of wrapper.findAllComponents(HButton)) await button.trigger('click');
    expect(wrapper.findComponent(HInput).exists()).toBe(false);
    expect(wrapper.emitted('copy')).toBeUndefined();
  });

  test('provides action labels in every supported locale', () => {
    Object.values(dictionaries).forEach(dictionary => {
      expect(dictionary.horizonWeb.typography.copy).toBeTruthy();
      expect(dictionary.horizonWeb.typography.edit).toBeTruthy();
    });
  });
});
