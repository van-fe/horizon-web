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

      expect(element.classes('h-button--primary')).toBe(true);

      type.value = 'normal';

      await nextTick();

      expect(element.classes('h-button--normal')).toBe(true);
    });

    test('type controls custom color variables for child buttons', async () => {
      const type = ref<ButtonGroupProps['type']>('danger');
      const wrapper = mount(() => (
        <HButtonGroup type={type.value}>
          <HButton color="#476582">1</HButton>
        </HButtonGroup>
      ));
      const element = wrapper.findComponent(HButton);

      expect(element.attributes('style')).toContain('--h-button-background-danger:');
      expect(element.attributes('style')).not.toContain('--h-button-background-primary:');

      type.value = 'normal';
      await nextTick();

      expect(element.attributes('style')).toContain('--h-button-background-normal:');
      expect(element.attributes('style')).not.toContain('--h-button-background-danger:');
    });

    test('size', async () => {
      const size = ref<ButtonGroupProps['size']>();
      const wrapper = mount(() => (
        <HButtonGroup size={size.value}>
          <HButton>1</HButton>
        </HButtonGroup>
      ));
      const element = wrapper.findComponent(HButton);

      expect(element.classes('h-button--medium')).toBe(true);

      size.value = 'huge';

      await nextTick();

      expect(element.classes('h-button--huge')).toBe(true);
    });
  });
});
