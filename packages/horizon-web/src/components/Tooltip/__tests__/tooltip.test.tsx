import { mount, shallowMount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import HTooltip from '../src/Tooltip';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { KeepAlive, nextTick, ref, Transition } from 'vue';
import { generateGetBoundingClientRect } from '../src/composables/useProps';
import { $message } from '~/methods';

afterEach(() => {
  vi.useRealTimers();
});

describe('Tooltip.tsx', () => {
  test('builds default and explicit browser rectangles for virtual references', () => {
    expect(generateGetBoundingClientRect()()).toEqual({
      width: 0,
      height: 0,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    });
    expect(generateGetBoundingClientRect(20, 10, 1, 21, 11, 1)()).toEqual({
      width: 20,
      height: 10,
      top: 1,
      right: 21,
      bottom: 11,
      left: 1,
    });
  });

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

  test('applies the full popper/copy contract in a custom teleport target', async () => {
    vi.useFakeTimers();
    const writeText = vi.fn().mockResolvedValue(undefined);
    const success = vi.spyOn($message, 'success').mockImplementation(() => undefined as never);
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });
    const teleportTo = document.createElement('div');
    teleportTo.id = 'tooltip-contract-target';
    document.body.append(teleportTo);
    const wrapper = mount(HTooltip, {
      props: {
        trigger: 'click',
        placement: 'bottom-end',
        distance: 12,
        popperClass: 'tooltip-contract-popper',
        skidding: 7,
        overflow: false,
        enterable: false,
        flip: false,
        fallbackPlacements: ['top'],
        clickToCopy: true,
        copyTarget: 'content',
        copySuccessText: 'Copied contract',
        copyFailText: 'Copy failed contract',
        referenceHiddenObserve: false,
        teleportTo,
        popperReferenceHidden: true,
        zIndex: 4321,
        referenceScale: 1.25,
        preventOverflow: false,
        strategy: 'fixed',
        showAfter: 0,
        hideAfter: 0,
      },
      slots: {
        default: () => <button data-test="tooltip-reference">Reference</button>,
        content: () => <strong>Copy contract content</strong>,
      },
      attachTo: document.body,
    });

    await wrapper.get('[data-test="tooltip-reference"]').trigger('click');
    await vi.runAllTimersAsync();
    await nextTick();
    const tooltip = teleportTo.querySelector<HTMLElement>('.h-tooltip')!;
    expect(tooltip).toBeTruthy();
    expect(tooltip.classList).toContain('tooltip-contract-popper');
    expect(tooltip.classList).toContain('is-popper-reference-hidden');
    expect(tooltip.style.zIndex).toBe('4321');
    expect(tooltip.getAttribute('data-popper-placement')).toBe('bottom-end');

    tooltip.click();
    await vi.waitFor(() => expect(success).toHaveBeenCalledWith('Copied contract'));
    expect(writeText).toHaveBeenCalledWith('Copy contract content');
    tooltip.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    await vi.runAllTimersAsync();
    expect(teleportTo.querySelector('.h-tooltip')).toBeNull();
    wrapper.unmount();
    teleportTo.remove();
    success.mockRestore();
  });

  test('uses the copy failure message path when clipboard rejects', async () => {
    const writeText = vi.fn().mockRejectedValue(new Error('denied'));
    const error = vi.spyOn($message, 'error').mockImplementation(() => undefined as never);
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });
    const wrapper = mount(HTooltip, {
      props: {
        trigger: 'manual',
        visible: true,
        toBody: false,
        clickToCopy: true,
        copyTarget: 'reference',
        copyFailText: 'Copy denied',
      },
      slots: {
        default: () => <button>Reference text</button>,
        content: () => 'Content text',
      },
    });
    await wrapper.get('.h-tooltip__content').trigger('click');
    await vi.waitFor(() => expect(writeText).toHaveBeenCalledWith('Reference text'));
    await vi.waitFor(() => expect(error).toHaveBeenCalledWith('Copy denied'));
    error.mockRestore();
  });

  test('updates popper geometry after size/content changes and destroys it after leave', async () => {
    const wrapper = mount(HTooltip, {
      props: {
        trigger: 'manual',
        visible: true,
        toBody: false,
        content: 'Initial geometry',
      },
      slots: { default: () => <button>Geometry reference</button> },
      attachTo: document.body,
    });
    await nextTick();
    const exposed = wrapper.getCurrentComponent().exposed as unknown as {
      updateTooltip: () => void;
    };
    exposed.updateTooltip();
    await wrapper.setProps({ size: 'small', content: 'Updated geometry' });
    await nextTick();
    expect(wrapper.get('.h-tooltip').classes()).toContain('h-tooltip--small');
    expect(wrapper.get('.h-tooltip__content').text()).toBe('Updated geometry');

    const transition = wrapper.findComponent(Transition) as unknown as VueWrapper<any>;
    const afterLeave = transition.vm.$.vnode.props?.onAfterLeave as
      | ((element: HTMLElement) => void)
      | undefined;
    afterLeave?.(document.createElement('div'));
    exposed.updateTooltip();
    wrapper.unmount();
  });

  test('keeps an enterable hover tooltip open until the pointer leaves its content', async () => {
    vi.useFakeTimers();
    const wrapper = mount(HTooltip, {
      props: {
        trigger: 'hover',
        enterable: true,
        showAfter: 10,
        hideAfter: 15,
        toBody: false,
        content: 'Hover details',
      },
      slots: { default: () => <button>Hover reference</button> },
    });

    await wrapper.get('button').trigger('mouseenter');
    await vi.advanceTimersByTimeAsync(10);
    const tooltip = wrapper.get('.h-tooltip');
    await tooltip.trigger('mouseenter');
    await wrapper.get('button').trigger('mouseleave');
    await vi.advanceTimersByTimeAsync(15);
    expect(wrapper.find('.h-tooltip').exists()).toBe(true);

    await tooltip.trigger('mouseleave');
    await vi.advanceTimersByTimeAsync(15);
    expect(wrapper.find('.h-tooltip').exists()).toBe(false);
    expect(wrapper.emitted('show')).toHaveLength(1);
    expect(wrapper.emitted('hide')).toHaveLength(1);
  });

  test('opens and closes through native focus-trigger pointer events', async () => {
    vi.useFakeTimers();
    const wrapper = mount(HTooltip, {
      props: {
        trigger: 'focus',
        showAfter: 0,
        hideAfter: 0,
        toBody: false,
        content: 'Focus details',
      },
      slots: { default: () => <button>Focus reference</button> },
    });

    await wrapper.get('button').trigger('mousedown');
    await vi.runAllTimersAsync();
    expect(wrapper.get('.h-tooltip__content').text()).toBe('Focus details');
    await wrapper.get('button').trigger('mouseup');
    await vi.runAllTimersAsync();
    expect(wrapper.find('.h-tooltip').exists()).toBe(false);
  });

  test('reacts only to manual visible updates and supports the exposed visibility guard', async () => {
    const wrapper = mount(HTooltip, {
      props: { trigger: 'manual', visible: false, toBody: false, content: 'Manual' },
      slots: { default: () => <button>Manual reference</button> },
    });
    const exposed = wrapper.getCurrentComponent().exposed as unknown as {
      switchVisible: (visible: boolean) => void;
      updateTooltip: () => void;
    };

    exposed.updateTooltip();
    exposed.switchVisible(false);
    await nextTick();
    expect(wrapper.find('.h-tooltip').exists()).toBe(false);
    exposed.switchVisible(true);
    await nextTick();
    expect(wrapper.get('.h-tooltip__content').text()).toBe('Manual');
    exposed.switchVisible(true);
    await wrapper.setProps({ visible: true });
    await wrapper.setProps({ visible: false });
    expect(wrapper.find('.h-tooltip').exists()).toBe(false);

    await wrapper.setProps({ trigger: 'click', visible: true });
    expect(wrapper.find('.h-tooltip').exists()).toBe(false);
  });

  test('overflow mode suppresses a non-overflowing reference and respects scale arrays', async () => {
    vi.useFakeTimers();
    const wrapper = mount(HTooltip, {
      props: {
        trigger: 'hover',
        overflow: true,
        referenceScale: [1.5],
        showAfter: 0,
        toBody: false,
        content: 'Only when clipped',
      },
      slots: { default: () => <button>Short label</button> },
    });
    const button = wrapper.get('button').element;
    Object.defineProperties(button, {
      scrollWidth: { configurable: true, value: 20 },
      scrollHeight: { configurable: true, value: 10 },
      getBoundingClientRect: {
        configurable: true,
        value: () => ({ width: 100, height: 30, top: 0, right: 100, bottom: 30, left: 0 }),
      },
    });

    button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    await vi.runAllTimersAsync();
    expect(wrapper.find('.h-tooltip').exists()).toBe(false);
  });

  test('context menu trigger toggles closed and ignores unrelated trigger events', async () => {
    vi.useFakeTimers();
    const wrapper = mount(HTooltip, {
      props: {
        trigger: 'contextmenu',
        showAfter: 0,
        hideAfter: 0,
        toBody: false,
        content: 'Menu',
      },
      slots: { default: () => <button>Context reference</button> },
    });
    const button = wrapper.get('button');

    await button.trigger('mouseenter');
    await button.trigger('mousedown');
    await button.trigger('mouseup');
    await vi.runAllTimersAsync();
    expect(wrapper.find('.h-tooltip').exists()).toBe(false);
    await button.trigger('contextmenu');
    await vi.runAllTimersAsync();
    expect(wrapper.find('.h-tooltip').exists()).toBe(true);
    await button.trigger('contextmenu');
    await vi.runAllTimersAsync();
    expect(wrapper.find('.h-tooltip').exists()).toBe(false);
  });

  test('covers manual content guards, disabled context menus and repeated leave timers', async () => {
    vi.useFakeTimers();
    const manual = mount(HTooltip, {
      props: { trigger: 'manual', visible: true, toBody: false, content: 'Manual guards' },
      slots: { default: () => <button>Manual reference</button> },
    });
    await manual.get('.h-tooltip').trigger('mouseenter');
    await manual.get('.h-tooltip').trigger('mouseleave');
    expect(manual.find('.h-tooltip').exists()).toBe(true);
    manual.unmount();

    const disabledContext = mount(HTooltip, {
      props: {
        trigger: 'contextmenu',
        disabled: true,
        showAfter: 0,
        toBody: false,
        content: 'Disabled menu',
      },
      slots: { default: () => <button>Disabled context</button> },
    });
    await disabledContext.get('button').trigger('contextmenu');
    await vi.runAllTimersAsync();
    expect(disabledContext.find('.h-tooltip').exists()).toBe(false);
    disabledContext.unmount();

    const hover = mount(HTooltip, {
      props: {
        trigger: 'hover',
        showAfter: 0,
        hideAfter: 50,
        toBody: false,
        content: 'Repeated leave',
      },
      slots: { default: () => <button>Hover twice</button> },
    });
    await hover.get('button').trigger('mouseenter');
    await vi.advanceTimersByTimeAsync(0);
    await hover.get('button').trigger('mouseleave');
    await hover.get('button').trigger('mouseenter');
    await hover.get('button').trigger('mouseleave');
    await vi.advanceTimersByTimeAsync(50);
    expect(hover.find('.h-tooltip').exists()).toBe(false);
    hover.unmount();
  });

  test('observes a visible overflowing reference and uses locale copy messages', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    const success = vi.spyOn($message, 'success').mockImplementation(() => undefined as never);
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });
    const wrapper = mount(HTooltip, {
      props: {
        trigger: 'manual',
        visible: true,
        overflow: true,
        toBody: false,
        clickToCopy: true,
        copyTarget: 'content',
      },
      slots: {
        default: () => <button>Long overflowing reference</button>,
        content: () => <span>Locale copy content</span>,
      },
      attachTo: document.body,
    });
    const reference = wrapper.get('button').element;
    Object.defineProperties(reference, {
      scrollWidth: { configurable: true, value: 200 },
      scrollHeight: { configurable: true, value: 40 },
      getBoundingClientRect: {
        configurable: true,
        value: () => ({ width: 40, height: 20, top: 0, right: 40, bottom: 20, left: 0 }),
      },
    });
    await wrapper.setProps({ visible: false });
    await wrapper.setProps({ visible: true });
    await nextTick();
    await wrapper.get('.h-tooltip__content').trigger('click');
    await vi.waitFor(() => expect(writeText).toHaveBeenCalledWith('Locale copy content'));
    await vi.waitFor(() => expect(success).toHaveBeenCalled());
    success.mockRestore();
    wrapper.unmount();
  });

  test('uses the localized copy failure, legacy clipboard and deactivation paths', async () => {
    const error = vi.spyOn($message, 'error').mockImplementation(() => undefined as never);
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: vi.fn().mockRejectedValue(new Error('denied')) },
    });
    const failed = mount(HTooltip, {
      props: { trigger: 'manual', visible: true, toBody: false, clickToCopy: true },
      slots: {
        default: () => <button>Reference</button>,
        content: () => 'Localized failure',
      },
    });
    await failed.get('.h-tooltip__content').trigger('click');
    await vi.waitFor(() => expect(error).toHaveBeenCalled());
    error.mockRestore();
    failed.unmount();

    const execCommand = vi.spyOn(document, 'execCommand').mockReturnValue(true);
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: undefined });
    const legacy = mount(HTooltip, {
      props: {
        trigger: 'manual',
        visible: true,
        toBody: false,
        clickToCopy: true,
        copySuccessText: '',
      },
      slots: {
        default: () => <button>Legacy reference</button>,
        content: () => 'Legacy content',
      },
    });
    await legacy.get('.h-tooltip__content').trigger('click');
    await vi.waitFor(() => expect(execCommand).toHaveBeenCalled());
    execCommand.mockRestore();
    legacy.unmount();

    const active = ref(true);
    const cached = mount(() => (
      <KeepAlive>
        {active.value ? (
          <HTooltip trigger="manual" visible toBody={false} content="Cached">
            <button>Cached reference</button>
          </HTooltip>
        ) : null}
      </KeepAlive>
    ));
    active.value = false;
    await nextTick();
    expect(cached.find('.h-tooltip').exists()).toBe(false);
    cached.unmount();
  });

  test('ignores a tooltip-content leave before an enterable hover was recorded', async () => {
    const wrapper = mount(HTooltip, {
      props: { trigger: 'hover', toBody: false, content: 'Direct leave' },
      slots: { default: () => <button>Direct leave reference</button> },
    });
    const exposed = wrapper.getCurrentComponent().exposed as unknown as {
      switchVisible: (visible: boolean) => void;
    };
    exposed.switchVisible(true);
    await nextTick();
    await wrapper.get('.h-tooltip').trigger('mouseleave');
    expect(wrapper.find('.h-tooltip').exists()).toBe(true);
    wrapper.unmount();
  });
});
