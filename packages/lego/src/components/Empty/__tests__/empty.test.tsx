import { mount, shallowMount } from '@vue/test-utils';
import NEmpty from '../index';
import { describe, expect, test } from 'vitest';
import { nextTick, ref } from 'vue';
import type { EmptyProps } from '../src/composables/useProps';

describe('Empty.tsx', () => {
  test('basic', async () => {
    const wrapper = shallowMount(() => <NEmpty />);
    const element = wrapper.findComponent(NEmpty);

    expect(element.exists()).toBe(true);
  });

  describe('props', () => {
    test('description', async () => {
      const wrapper = mount(() => <NEmpty description="No Data." />);
      const element = wrapper.findComponent(NEmpty);

      await nextTick();
      expect(element.find('.n-empty__description').text()).toEqual('No Data.');
    });

    test('image', async () => {
      const wrapper = mount(() => <NEmpty image={NEmpty.PRESENTED_IMAGES.EMPTY_ADDRESS} />);
      const element = wrapper.findComponent(NEmpty);

      await nextTick();
      expect(element.find('.n-empty__image').html()).toEqual(
        expect.stringMatching(/src=".*48efb02f7b3d.svg"/),
      );
    });

    test('size', async () => {
      const size = ref<EmptyProps['size']>();
      const wrapper = mount(() => (
        <NEmpty size={size.value} description="No task for now, take a coffee break">
          Default
        </NEmpty>
      ));
      const element = wrapper.findComponent(NEmpty);

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
