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
    expect(
      (wrapper.element as HTMLElement).style.getPropertyValue('--h-typography-size-lines'),
    ).toBe('3');
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

  test('maps every text presentation prop to semantic classes and attributes', () => {
    const wrapper = mount(HTypography, {
      props: {
        tag: 'article',
        type: 'success',
        size: 'large',
        weight: 'bold',
        block: true,
        italic: true,
        underline: true,
        deleted: true,
        code: true,
      },
      attrs: { id: 'contract-copy' },
      slots: { default: 'Styled text' },
    });

    expect(wrapper.element.tagName).toBe('ARTICLE');
    expect(wrapper.attributes('id')).toBe('contract-copy');
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining([
        'h-typography--success',
        'h-typography--large',
        'h-typography--bold',
        'is-block',
        'is-italic',
        'is-underline',
        'is-deleted',
        'is-code',
      ]),
    );
  });

  test('renders prefix and suffix slots around controlled content', () => {
    const wrapper = mount(HTypography, {
      props: { modelValue: '42' },
      slots: {
        prefix: '<span data-prefix>$</span>',
        default: '<span data-unused>unused</span>',
        suffix: '<span data-suffix>USD</span>',
      },
    });

    expect(wrapper.get('[data-prefix]').text()).toBe('$');
    expect(wrapper.get('.h-typography__content').text()).toBe('42');
    expect(wrapper.find('[data-unused]').exists()).toBe(false);
    expect(wrapper.get('[data-suffix]').text()).toBe('USD');
  });

  test('commits editing on Enter and emits update and change payloads once', async () => {
    const onUpdate = vi.fn();
    const onChange = vi.fn();
    const wrapper = mount(HTypography, {
      props: {
        modelValue: 'before',
        editable: true,
        'onUpdate:modelValue': onUpdate,
        onChange,
      },
    });

    await wrapper.findComponent(HButton).trigger('click');
    await wrapper.get('input').setValue('after');
    await wrapper.get('input').trigger('keydown', { key: 'Enter' });

    expect(onUpdate).toHaveBeenCalledOnce();
    expect(onUpdate).toHaveBeenCalledWith('after');
    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith('after');
    expect(wrapper.findComponent(HInput).exists()).toBe(false);
  });

  test('supports the JSX update:modelValue listener contract', async () => {
    const onUpdateModelValue = vi.fn();
    const wrapper = mount(() => (
      <HTypography
        modelValue="before"
        editable
        onUpdate:modelValue={onUpdateModelValue}
      />
    ));
    await wrapper.findComponent(HButton).trigger('click');
    await wrapper.get('input').setValue('after');
    await wrapper.get('input').trigger('keydown', { key: 'Enter' });
    expect(onUpdateModelValue).toHaveBeenCalledWith('after');
  });

  test('uses the legacy clipboard fallback and reports native clipboard rejection', async () => {
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: undefined });
    const execCommand = vi.fn(() => true);
    Object.defineProperty(document, 'execCommand', { configurable: true, value: execCommand });
    const legacy = mount(HTypography, { props: { modelValue: 'legacy copy', copyable: true } });
    await legacy.findComponent(HButton).trigger('click');
    expect(execCommand).toHaveBeenCalledWith('copy');
    expect(legacy.emitted('copy')?.[0]).toEqual(['legacy copy', true]);
    expect(document.querySelector('textarea')).toBeNull();

    const writeText = vi.fn().mockRejectedValue(new Error('permission denied'));
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
    const rejected = mount(HTypography, { props: { modelValue: 'native copy', copyable: true } });
    await rejected.findComponent(HButton).trigger('click');
    expect(rejected.emitted('copy')?.[0]).toEqual(['native copy', false]);
  });

  test('keeps an active draft isolated, commits on blur, and renders single-line ellipsis', async () => {
    const wrapper = mount(HTypography, {
      props: { modelValue: 'before', editable: true, ellipsis: true },
    });
    expect(wrapper.classes()).toContain('is-ellipsis');
    expect((wrapper.element as HTMLElement).style.webkitLineClamp).toBe('');

    await wrapper.findComponent(HButton).trigger('click');
    await wrapper.get('input').setValue('draft');
    await wrapper.setProps({ modelValue: 'external' });
    expect((wrapper.get('input').element as HTMLInputElement).value).toBe('draft');
    await wrapper.get('input').trigger('keydown', { key: 'Enter', isComposing: true });
    expect(wrapper.findComponent(HInput).exists()).toBe(true);
    await wrapper.get('input').trigger('blur');
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['draft']);
    expect(wrapper.emitted('change')?.at(-1)).toEqual(['draft']);

    await wrapper.setProps({ modelValue: undefined });
    await nextTick();
    expect(wrapper.get('.h-typography__content').text()).toBe('');
  });

  test('covers exposed action guards and empty uncontrolled copy content', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
    const plain = mount(HTypography, { props: { copyable: true } });
    const plainApi = plain.getCurrentComponent().exposed!;

    plainApi.edit();
    expect(plain.findComponent(HInput).exists()).toBe(false);
    plainApi.cancelEdit();
    await expect(plainApi.copy()).resolves.toBe(true);
    expect(writeText).toHaveBeenCalledWith('');

    const disabled = mount(HTypography, {
      props: { modelValue: undefined, editable: true, copyable: true, disabled: true },
    });
    const disabledApi = disabled.getCurrentComponent().exposed!;
    disabledApi.edit();
    disabledApi.cancelEdit();
    await expect(disabledApi.copy()).resolves.toBe(false);
    expect(disabled.findComponent(HInput).exists()).toBe(false);
  });
});
