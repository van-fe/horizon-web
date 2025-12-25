import { mount, shallowMount } from '@vue/test-utils';
import HLink from '..';
import { describe, expect, test, vi } from 'vitest';
import { nextTick, ref } from 'vue';
import type { LinkProps } from '../src/composables/useProps';

describe('Link.tsx', () => {
  test('basic', async () => {
    const wrapper = shallowMount(() => <HLink>Default</HLink>);
    const element = wrapper.findComponent(HLink);

    expect(element.exists()).toBe(true);
  });

  describe('props', () => {
    test('type', async () => {
      const type = ref<LinkProps['type']>();
      const wrapper = mount(() => <HLink type={type.value}>Default</HLink>);
      const element = wrapper.findComponent(HLink);

      expect(element.classes('n-link--positive')).toBe(true);

      type.value = 'neutral';
      await nextTick();
      expect(element.classes('n-link--neutral')).toBe(true);

      type.value = 'negative';
      await nextTick();
      expect(element.classes('n-link--negative')).toBe(true);
    });

    test('size', async () => {
      const size = ref<LinkProps['size']>();
      const wrapper = mount(() => <HLink size={size.value}>Default</HLink>);
      const element = wrapper.findComponent(HLink);

      expect(element.classes('n-link--medium')).toBe(true);

      size.value = 'small';
      await nextTick();
      expect(element.classes('n-link--small')).toBe(true);

      size.value = 'large';
      await nextTick();
      expect(element.classes('n-link--large')).toBe(true);
    });

    test('underline', async () => {
      const wrapper = mount(() => <HLink underline>Default</HLink>);
      const element = wrapper.findComponent(HLink);

      expect(element.classes('has-underline')).toBe(true);
    });

    test('disabled', async () => {
      const onClick = vi.fn();
      const wrapper = mount(() => (
        <HLink disabled onClick={onClick}>
          Default
        </HLink>
      ));
      const element = wrapper.findComponent(HLink);

      await element.trigger('click');

      expect(element.classes('is-disabled')).toBe(true);
      expect(onClick).toHaveBeenCalledTimes(0);
    });

    test('attribute', async () => {
      const wrapper = mount(() => <HLink attribute>Default</HLink>);
      const element = wrapper.findComponent(HLink);

      expect(element.classes('has-attribute')).toBe(true);
    });

    test('anchor', async () => {
      const wrapper = mount(() => <HLink anchor="id">Default</HLink>);
      const element = wrapper.findComponent(HLink);

      expect(element.classes('has-anchor')).toBe(true);
      expect(wrapper.find('.n-link__anchor').exists()).toBe(true);
    });

    test('icon', async () => {
      const wrapper = mount(() => (
        <HLink icon="close" iconSize={20}>
          Default
        </HLink>
      ));
      const icon = wrapper.find('.a-icon');

      expect(icon.exists()).toBe(true);

      expect(/font-size: 20px;/.test(icon.attributes('style') || '')).toBe(true);
    });

    test('loading', async () => {
      const isLoading = ref(false);
      const wrapper = mount(() => <HLink loading={isLoading.value}>Default</HLink>);

      let icon = wrapper.find('.a-icon');

      expect(icon.exists()).toBe(false);

      isLoading.value = true;
      await nextTick();

      icon = wrapper.find('.a-icon');

      expect(icon.exists()).toBe(true);
    });
  });
});
