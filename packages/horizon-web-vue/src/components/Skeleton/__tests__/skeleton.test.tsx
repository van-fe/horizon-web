import { mount, shallowMount } from '@vue/test-utils';
import { HSkeleton, HSkeletonItem } from '..';
import { describe, expect, test } from 'vitest';
import { nextTick, ref } from 'vue';

describe('Skeleton.tsx', () => {
  test('basic', async () => {
    const wrapper = shallowMount(() => <HSkeleton />);
    const element = wrapper.findComponent(HSkeleton);

    expect(element.exists()).toBe(true);
  });

  test('renders the default placeholder recipe while loading', () => {
    const wrapper = mount(() => <HSkeleton />);

    expect(wrapper.findAll('.h-skeleton__item__text')).toHaveLength(3);
    expect(wrapper.find('.h-skeleton__content').exists()).toBe(false);
    expect(wrapper.find('.h-skeleton__animated').exists()).toBe(true);
  });

  test('uses the loading template and supports disabling animation', () => {
    const wrapper = mount(HSkeleton, {
      props: { loading: true, animated: false },
      slots: {
        default: () => <article>Loaded content</article>,
        loadingTemplate: () => <HSkeletonItem shape="avatar" data-test="avatar" />,
      },
    });

    expect(wrapper.find('[data-test="avatar"]').exists()).toBe(true);
    expect(wrapper.find('.h-skeleton__item__avatar').exists()).toBe(true);
    expect(wrapper.text()).not.toContain('Loaded content');
    expect(wrapper.find('.h-skeleton__animated').exists()).toBe(false);
  });

  test('switches from placeholders to content when loading completes', async () => {
    const loading = ref(true);
    const wrapper = mount(() => (
      <HSkeleton loading={loading.value}>
        <article>Loaded content</article>
      </HSkeleton>
    ));

    loading.value = false;
    await nextTick();
    expect(wrapper.get('.h-skeleton__content').text()).toBe('Loaded content');
    expect(wrapper.find('.h-skeleton__item').exists()).toBe(false);
  });

  test.each(['avatar', 'text', 'operate', 'image', 'picture'] as const)(
    'renders the %s item shape',
    shape => {
      const wrapper = mount(() => <HSkeletonItem shape={shape} />);
      expect(wrapper.find(`.h-skeleton__item__${shape}`).exists()).toBe(true);
    },
  );
});
