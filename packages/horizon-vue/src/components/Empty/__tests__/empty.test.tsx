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
      expect(element.find('.h-empty__description').text()).toEqual('No Data.');
    });

    test('image', async () => {
      const wrapper = mount(() => <HEmpty image={HEmpty.PRESENTED_IMAGES.EMPTY_ADDRESS} />);
      const element = wrapper.findComponent(HEmpty);

      await nextTick();
      expect(element.find('.h-empty__image img').attributes('src')).toBe(
        HEmpty.PRESENTED_IMAGES.EMPTY_ADDRESS,
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

      expect(element.classes('h-empty--medium')).toBe(true);

      size.value = 'small';
      await nextTick();
      expect(element.classes('h-empty--small')).toBe(true);

      size.value = 'large';
      await nextTick();
      expect(element.classes('h-empty--large')).toBe(true);

      size.value = 160;
      await nextTick();
      expect(element.find('.h-empty__image').attributes('style')).toContain('width: 160px');
    });
  });

  test('renders each public slot and lets slots override fallback content', () => {
    const wrapper = mount(HEmpty, {
      props: { image: 'fallback.png', description: 'Fallback description' },
      slots: {
        image: () => <svg data-test="empty-image" aria-label="Custom empty image" />,
        description: () => <span data-test="empty-description">Custom description</span>,
        default: () => <button data-test="empty-action">Retry</button>,
      },
    });

    expect(wrapper.get('[data-test="empty-image"]').attributes('aria-label')).toBe(
      'Custom empty image',
    );
    // The description prop intentionally takes precedence over the description slot.
    expect(wrapper.find('[data-test="empty-description"]').exists()).toBe(false);
    expect(wrapper.get('.h-empty__description').text()).toBe('Fallback description');
    expect(wrapper.get('[data-test="empty-action"]').text()).toBe('Retry');

    return wrapper.setProps({ description: undefined }).then(() => {
      expect(wrapper.get('[data-test="empty-description"]').text()).toBe('Custom description');
    });
  });
});
