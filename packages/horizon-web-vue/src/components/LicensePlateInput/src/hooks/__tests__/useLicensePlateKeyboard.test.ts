import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import {
  getLicensePlateKeyboardKeys,
  removeLicensePlateCharacter,
  sanitizeLicensePlateInput,
  useLicensePlateKeyboard,
} from '../useLicensePlateKeyboard';

describe('useLicensePlateKeyboard helpers', () => {
  const provinces = ['京', '沪', '粤'];

  test('sanitizes pasted values by plate position', () => {
    expect(sanitizeLicensePlateInput(' 沪 iA·12-3O45 ', provinces)).toBe('沪A12345');
    expect(sanitizeLicensePlateInput('粤bd12345extra', provinces)).toBe('粤BD12345');
    expect(sanitizeLicensePlateInput('浙A12345', provinces)).toBe('');
  });

  test('returns position-specific keyboard layouts', () => {
    expect(getLicensePlateKeyboardKeys(0, provinces)).toEqual(provinces);
    expect(getLicensePlateKeyboardKeys(1, provinces)).toContain('A');
    expect(getLicensePlateKeyboardKeys(1, provinces)).not.toContain('0');
    expect(getLicensePlateKeyboardKeys(2, provinces)).toContain('0');
    expect(getLicensePlateKeyboardKeys(2, provinces)).not.toContain('挂');
    expect(getLicensePlateKeyboardKeys(6, provinces)).toContain('挂');
  });

  test('clears the whole plate when removing the province', () => {
    expect(removeLicensePlateCharacter('京A12345', 0)).toEqual({
      value: '',
      activeIndex: 0,
      provinceRemoved: true,
    });
    expect(removeLicensePlateCharacter('京A12345', 6)).toEqual({
      value: '京A1234',
      activeIndex: 6,
      provinceRemoved: false,
    });
  });

  test('keeps an inline panel visible when changes are committed', async () => {
    const inlinePanel = ref(true);
    const onChange = vi.fn();
    let keyboard!: ReturnType<typeof useLicensePlateKeyboard>;
    const wrapper = mount({
      setup() {
        keyboard = useLicensePlateKeyboard({
          modelValue: () => '',
          provinces: () => provinces,
          newEnergy: () => false,
          inlinePanel: () => inlinePanel.value,
          disabled: () => false,
          readonly: () => false,
          rootRef: ref(),
          inlinePanelRef: ref(),
          popoverRef: ref(),
          onInput: vi.fn(),
          onChange,
          onProvinceChange: vi.fn(),
          onClear: vi.fn(),
          onTouched: vi.fn(),
        });
        return () => null;
      },
    });

    expect(keyboard.panelVisible.value).toBe(true);
    keyboard.choose('京');
    keyboard.close();
    expect(keyboard.panelVisible.value).toBe(true);
    expect(onChange).toHaveBeenCalledWith('京');

    inlinePanel.value = false;
    await nextTick();
    expect(keyboard.panelVisible.value).toBe(false);
    wrapper.unmount();
  });
});
