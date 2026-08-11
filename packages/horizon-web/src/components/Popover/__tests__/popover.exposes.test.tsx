import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { nextTick, ref } from 'vue';

const popperMocks = vi.hoisted(() => ({
  update: vi.fn().mockResolvedValue({}),
  destroy: vi.fn(),
  forceUpdate: vi.fn(),
  setOptions: vi.fn(),
}));

vi.mock('~/utils/popper', () => ({
  usePopper: vi.fn(() => ({
    state: {},
    ...popperMocks,
  })),
}));

import HPopover from '../src/Popover';
import { usePopper } from '~/utils/popper';

afterEach(() => {
  vi.useRealTimers();
  Object.values(popperMocks).forEach(mock => mock.mockClear());
});

describe('Popover exposes', () => {
  test('updates an existing popper position on demand', async () => {
    vi.useFakeTimers();
    const popover = ref<{
      updatePosition: () => void;
      switchVisible: (visible: boolean) => void;
    }>();
    const wrapper = mount(() => (
      <HPopover ref={popover} toBody={false} trigger="manual" visible>
        {{
          reference: () => <span>reference</span>,
          popper: () => <span>content</span>,
        }}
      </HPopover>
    ));

    await vi.advanceTimersByTimeAsync(2);
    popover.value?.updatePosition();

    expect(popperMocks.update).toHaveBeenCalled();
    const transition = wrapper.findComponent({ name: 'HTransition' });
    const popperElement = wrapper.get('.h-popover__popper').element;
    popover.value?.switchVisible(false);
    await nextTick();
    transition.vm.$emit('afterLeave', popperElement);
    expect(popperMocks.destroy).toHaveBeenCalledOnce();
    wrapper.unmount();
  });

  test('forwards every positioning option to the real popper boundary', async () => {
    vi.useFakeTimers();
    const root = document.createElement('div');
    const wrapper = mount(HPopover, {
      attachTo: root,
      props: {
        toBody: false,
        trigger: 'manual',
        visible: true,
        placement: 'bottom-end',
        skidding: 6,
        distance: 14,
        flip: false,
        arrowOptions: { size: 12 },
        resizeObserve: true,
        referenceOverflowObserve: true,
        referenceOverflowRoot: root,
        sameWidth: true,
        setMinWidth: true,
        sameHeight: true,
        fallbackPlacements: ['top', 'left'],
        preventOverflow: true,
        mainAxisCheck: false,
        strategy: 'absolute',
      },
      slots: {
        reference: () => <button>Reference</button>,
        popper: () => <span>Popup</span>,
      },
    });

    await vi.advanceTimersByTimeAsync(2);
    expect(usePopper).toHaveBeenCalled();
    expect(vi.mocked(usePopper).mock.calls.at(-1)?.[2]).toMatchObject({
      placement: 'bottom-end',
      skidding: 6,
      distance: 14,
      flip: false,
      arrowOptions: { size: 12 },
      resizeObserve: true,
      referenceOverflowObserve: true,
      referenceOverflowRoot: root,
      sameWidth: true,
      setMinWidth: true,
      sameHeight: true,
      fallbackPlacements: ['top', 'left'],
      preventOverflow: true,
      mainAxisCheck: false,
      strategy: 'absolute',
      findChild: true,
    });

    popperMocks.setOptions.mockClear();
    popperMocks.update.mockClear();
    await wrapper.setProps({ distance: 18, placement: 'left-start' });
    expect(popperMocks.setOptions).toHaveBeenCalledWith(
      expect.objectContaining({ distance: 18, placement: 'left-start' }),
    );
    expect(popperMocks.update).toHaveBeenCalled();
    wrapper.unmount();
    expect(popperMocks.destroy).toHaveBeenCalledOnce();
  });
});
