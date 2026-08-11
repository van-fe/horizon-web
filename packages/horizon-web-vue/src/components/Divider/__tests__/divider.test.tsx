import { mount, shallowMount } from '@vue/test-utils';
import HDivider from '../src/Divider';
import { describe, expect, test } from 'vitest';
import { nextTick, ref } from 'vue';

describe('Divider.tsx', () => {
  test('basic', async () => {
    const wrapper = shallowMount(() => <HDivider />);
    const element = wrapper.findComponent(HDivider);

    expect(element.exists()).toBe(true);
  });

  test('maps legacy semantic types to the current style classes', () => {
    expect(mount(() => <HDivider type="primary" />).classes()).toContain('h-divider--default');
    expect(mount(() => <HDivider type="secondary" />).classes()).toContain('h-divider--strong');
  });

  test('renders a title between two styled lines', () => {
    const wrapper = mount(() => (
      <HDivider lineStyle="dashed" titlePlacement="left">
        Section
      </HDivider>
    ));

    expect(wrapper.classes()).toContain('h-divider--title-left');
    expect(wrapper.find('.h-divider__title').text()).toBe('Section');
    expect(wrapper.findAll('[style*="border-top-style: dashed"]')).toHaveLength(2);
  });

  test('switches direction and margin reactively', async () => {
    const direction = ref<'horizontal' | 'vertical'>('horizontal');
    const wrapper = mount(() => (
      <HDivider
        direction={direction.value}
        horizontalMargin={12}
        verticalMargin="8px"
        lineStyle="dotted"
      />
    ));

    expect(wrapper.attributes('style')).toContain('margin: 12px 0px');
    expect(wrapper.find('.h-divider__line-left').attributes('style')).toContain(
      'border-top-style: dotted',
    );

    direction.value = 'vertical';
    await nextTick();

    expect(wrapper.classes()).toContain('h-divider--vertical');
    expect(wrapper.attributes('style')).toContain('margin: 0px 8px');
    expect(wrapper.find('.h-divider__line-left').attributes('style')).toContain(
      'border-right-style: dotted',
    );
  });
});
