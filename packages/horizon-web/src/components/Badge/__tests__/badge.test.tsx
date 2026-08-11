import { mount } from '@vue/test-utils';
import HBadge from '../src/Badge';
import { describe, expect, test } from 'vitest';
import { nextTick, ref } from 'vue';

describe('Badge.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(() => (
      <HBadge>
        <div style="background: gray; width: 50px; height: 50px;"></div>
      </HBadge>
    ));
    const element = wrapper.findComponent(HBadge);

    expect(element.exists()).toBe(true);
  });

  test('caps numeric content at numMax and reacts to content changes', async () => {
    const content = ref(100);
    const wrapper = mount(() => <HBadge type="num" content={content.value} numMax={99} />);

    expect(wrapper.find('.h-badge__content').text()).toBe('99+');

    content.value = 8;
    await nextTick();

    expect(wrapper.find('.h-badge__content').text()).toBe('8');
  });

  test('hides only the marker and preserves default slot content', async () => {
    const hidden = ref(true);
    const wrapper = mount(() => (
      <HBadge hidden={hidden.value}>
        <span class="target">Inbox</span>
      </HBadge>
    ));

    expect(wrapper.find('.target').text()).toBe('Inbox');
    expect(wrapper.find('.h-badge__content').exists()).toBe(false);

    hidden.value = false;
    await nextTick();

    expect(wrapper.find('.h-badge__content').exists()).toBe(true);
  });

  test('applies placement, color and offset to the marker', () => {
    const wrapper = mount(() => (
      <HBadge
        type="num"
        content={2}
        bottom
        align="inner"
        color="rgb(1, 2, 3)"
        offset={{ right: '4px', top: '6px' }}
      />
    ));

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['h-badge--num', 'h-badge--bottom', 'h-badge--inner']),
    );
    expect(wrapper.find('.h-badge__content').attributes('style')).toContain(
      'background-color: rgb(1, 2, 3)',
    );
    expect(wrapper.find('.h-badge__content').attributes('style')).toContain('right: 4px');
    expect(wrapper.find('.h-badge__content').attributes('style')).toContain('top: 6px');
  });

  test('renders icon content with its public size and color props', () => {
    const wrapper = mount(() => (
      <HBadge type="icon" content="success_filled" iconSize={22} iconColor="#123456">
        <span>Target</span>
      </HBadge>
    ));

    const icon = wrapper.get('.h-badge__content svg');
    expect(wrapper.get('.h-badge').classes()).toContain('h-badge--icon');
    expect(icon.attributes('style')).toContain('width: 22px');
    expect(icon.html()).toContain('#123456');
  });
});
