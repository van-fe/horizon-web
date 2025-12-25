import { mount } from '@vue/test-utils';
import HButtonGroup from '../src/ButtonGroup';
import HButton from '../src/Button';
import { describe, expect, test } from 'vitest';
import { nextTick, ref } from 'vue';
import type { ButtonGroupProps } from '../src/composables/useProps';

describe('ButtonGroup.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(() => <HButtonGroup>OK</HButtonGroup>);
    const element = wrapper.findComponent(HButtonGroup);

    expect(element.exists()).toBe(true);
  });

  describe('props', () => {
    test('type', async () => {
      const type = ref<ButtonGroupProps['type']>();
      const wrapper = mount(() => (
        <HButtonGroup type={type.value}>
          <HButton>1</HButton>
        </HButtonGroup>
      ));
      const element = wrapper.findComponent(HButton);

      expect(element.classes('n-button--primary')).toBe(true);

      type.value = 'normal';

      await nextTick();

      expect(element.classes('n-button--normal')).toBe(true);
    });

    test('size', async () => {
      const size = ref<ButtonGroupProps['size']>();
      const wrapper = mount(() => (
        <HButtonGroup size={size.value}>
          <HButton>1</HButton>
        </HButtonGroup>
      ));
      const element = wrapper.findComponent(HButton);

      expect(element.classes('n-button--medium')).toBe(true);

      size.value = 'huge';

      await nextTick();

      expect(element.classes('n-button--huge')).toBe(true);
    });
  });
});
