import { mount, shallowMount } from '@vue/test-utils';
import HTooltip from '../src/Tooltip';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { Transition } from 'vue';

afterEach(() => {
  vi.useRealTimers();
});

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
    expect(wrapper.find('.h-tooltip').exists()).toBe(false);
  });

  test('renders content slot, theme, size and arrow in manual mode', () => {
    const wrapper = mount(HTooltip, {
      props: { trigger: 'manual', visible: true, toBody: false, theme: 'light', size: 'small' },
      slots: {
        default: () => <button>Reference</button>,
        content: () => <strong>Slot content</strong>,
      },
    });
    const tooltip = wrapper.get('.h-tooltip');

    expect(tooltip.classes()).toContain('h-tooltip--light');
    expect(tooltip.classes()).toContain('h-tooltip--small');
    expect(wrapper.get('.h-tooltip__content').text()).toBe('Slot content');
    expect(wrapper.find('.h-tooltip__arrow').exists()).toBe(true);
  });

  test('click trigger toggles visibility after configured delays and emits lifecycle events', async () => {
    vi.useFakeTimers();
    const wrapper = mount(HTooltip, {
      props: { trigger: 'click', showAfter: 20, hideAfter: 30, toBody: false, content: 'Help' },
      slots: { default: () => <button>Reference</button> },
    });

    await wrapper.get('button').trigger('click');
    expect(wrapper.find('.h-tooltip').exists()).toBe(false);
    await vi.advanceTimersByTimeAsync(20);
    expect(wrapper.find('.h-tooltip').exists()).toBe(true);
    expect(wrapper.emitted('show')).toHaveLength(1);

    await wrapper.get('button').trigger('click');
    await vi.advanceTimersByTimeAsync(30);
    expect(wrapper.find('.h-tooltip').exists()).toBe(false);
    expect(wrapper.emitted('hide')).toHaveLength(1);
  });

  test('disabled tooltip ignores interaction', async () => {
    vi.useFakeTimers();
    const wrapper = mount(HTooltip, {
      props: { disabled: true, showAfter: 0, toBody: false, content: 'Hidden' },
      slots: { default: () => <button>Reference</button> },
    });

    await wrapper.get('button').trigger('mouseenter');
    await vi.runAllTimersAsync();
    expect(wrapper.find('.h-tooltip').exists()).toBe(false);
    expect(wrapper.emitted('show')).toBeUndefined();
  });

  test('context menu prevents the browser menu and opens the tooltip', async () => {
    vi.useFakeTimers();
    const wrapper = mount(HTooltip, {
      props: { trigger: 'contextmenu', showAfter: 0, toBody: false, content: 'Actions' },
      slots: { default: () => <button>Reference</button> },
    });
    const event = new MouseEvent('contextmenu', { bubbles: true, cancelable: true });

    wrapper.get('button').element.dispatchEvent(event);
    await vi.runAllTimersAsync();
    expect(event.defaultPrevented).toBe(true);
    expect(wrapper.get('.h-tooltip__content').text()).toBe('Actions');
  });
});
