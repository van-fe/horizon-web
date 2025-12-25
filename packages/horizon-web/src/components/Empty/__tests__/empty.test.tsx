import { mount, shallowMount } from '@vue/test-utils';
import HEmpty from '../index';
import { describe, expect, test } from 'vitest';
import { nextTick, ref } from 'vue';
import type { EmptyProps } from '../src/composables/useProps';

describe('Empty.tsx', () => {
  test('basic', async () => {
    const wrapper = shallowMount(() => <HEmpty />);
    const element = wrapper.findComponent(HEmpty);

    expect(element.exists()).toBe(true);
  });

  describe('props', () => {
    test('description', async () => {
      const wrapper = mount(() => <HEmpty description="No Data." />);
      const element = wrapper.findComponent(HEmpty);

      await nextTick();
      expect(element.find('.n-empty__description').text()).toEqual('No Data.');
    });

    test('image', async () => {
      const wrapper = mount(() => <HEmpty image={HEmpty.PRESEHTED_IMAGES.EMPTY_ADDRESS} />);
      const element = wrapper.findComponent(HEmpty);

      await nextTick();
      expect(element.find('.n-empty__image').html()).toEqual(
        expect.stringMatching(/src=".*48efb02f7b3d.svg"/),
      );
    });

    test('size', async () => {
      const size = ref<EmptyProps['size']>();
      const wrapper = mount(() => (
        <HEmpty size={size.value} description="No task for now, take a coffee break">
          Default
        </HEmpty>
      ));
      const element = wrapper.findComponent(HEmpty);

      expect(element.classes('n-empty--medium')).toBe(true);

      size.value = 'small';
      await nextTick();
      expect(element.classes('n-empty--small')).toBe(true);

      size.value = 'large';
      await nextTick();
      expect(element.classes('n-empty--large')).toBe(true);

      size.value = 160;
      await nextTick();
      expect(element.find('.n-empty__image').attributes('style')).toContain('width: 160px');
    });
  });
});
