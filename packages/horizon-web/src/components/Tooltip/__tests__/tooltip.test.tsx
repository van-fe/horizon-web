import { mount, shallowMount } from '@vue/test-utils';
import HTooltip from '../src/Tooltip';
import { describe, expect, test } from 'vitest';
import { Transition } from 'vue';

describe('Tooltip.tsx', () => {
  test('basic', async () => {
    const wrapper = shallowMount(() => <HTooltip>Something...</HTooltip>);
    const element = wrapper.findComponent(HTooltip);

    expect(element.exists()).toBe(true);
  });

  test('tooltip should turn invisible when props.disabled is updated to true', async () => {
    const wrapper = mount(HTooltip, {
      propsData: {
        trigger: 'manual',
        visible: true,
        disabled: false,
      },
      slots: {
        default: () => <span>Something...</span>,
      },
    });
    expect(wrapper.findComponent(Transition).exists()).toBe(true);
    await wrapper.setProps({ disabled: true });
    expect(wrapper.find('.n-tooltip').exists()).toBe(false);
  });
});
