import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { ref } from 'vue';

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

afterEach(() => {
  vi.useRealTimers();
  Object.values(popperMocks).forEach(mock => mock.mockClear());
});

describe('Popover exposes', () => {
  test('updates an existing popper position on demand', async () => {
    vi.useFakeTimers();
    const popover = ref<{ updatePosition: () => void }>();
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
    wrapper.unmount();
  });
});
