import { mount, shallowMount } from '@vue/test-utils';
import NTooltip from '../src/Tooltip';
import { describe, expect, test } from 'vitest';
import { Transition } from 'vue';

describe('Tooltip.tsx', () => {
  test('basic', async () => {
    const wrapper = shallowMount(() => <NTooltip>Something...</NTooltip>);
    const element = wrapper.findComponent(NTooltip);

    expect(element.exists()).toBe(true);
  });

  test('tooltip should turn invisible when props.disabled is updated to true', async () => {
    const wrapper = mount(NTooltip, {
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
