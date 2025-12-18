import { mount } from '@vue/test-utils';
import NButtonGroup from '../src/ButtonGroup';
import NButton from '../src/Button';
import { describe, expect, test } from 'vitest';
import { nextTick, ref } from 'vue';
import type { ButtonGroupProps } from '../src/composables/useProps';

describe('ButtonGroup.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(() => <NButtonGroup>OK</NButtonGroup>);
    const element = wrapper.findComponent(NButtonGroup);

    expect(element.exists()).toBe(true);
  });

  describe('props', () => {
    test('type', async () => {
      const type = ref<ButtonGroupProps['type']>();
      const wrapper = mount(() => (
        <NButtonGroup type={type.value}>
          <NButton>1</NButton>
        </NButtonGroup>
      ));
      const element = wrapper.findComponent(NButton);

      expect(element.classes('n-button--primary')).toBe(true);

      type.value = 'normal';

      await nextTick();

      expect(element.classes('n-button--normal')).toBe(true);
    });

    test('size', async () => {
      const size = ref<ButtonGroupProps['size']>();
      const wrapper = mount(() => (
        <NButtonGroup size={size.value}>
          <NButton>1</NButton>
        </NButtonGroup>
      ));
      const element = wrapper.findComponent(NButton);

      expect(element.classes('n-button--medium')).toBe(true);

      size.value = 'huge';

      await nextTick();

      expect(element.classes('n-button--huge')).toBe(true);
    });
  });
});
