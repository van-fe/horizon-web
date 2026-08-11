import { describe, expect, it, vi } from 'vitest';
import { tooltipStateTestVectors } from '../../../testing';
import { resolveTooltipState, TooltipOpenController } from '..';

describe('Tooltip state protocol', () => {
  it.each(tooltipStateTestVectors)('$name', ({ state, action, expectedOpen }) => {
    expect(resolveTooltipState(state, action).state.open).toBe(expectedOpen);
  });

  it('orders delayed open and close requests without leaking stale timers', async () => {
    vi.useFakeTimers();
    const onOpenChange = vi.fn();
    const controller = new TooltipOpenController({
      showDelay: 20,
      hideDelay: 30,
      onOpenChange,
    });

    controller.requestOpen('hover');
    controller.requestClose('hover');
    await vi.advanceTimersByTimeAsync(30);
    expect(onOpenChange).not.toHaveBeenCalled();

    controller.requestOpen('focus');
    await vi.advanceTimersByTimeAsync(20);
    expect(onOpenChange).toHaveBeenLastCalledWith(true, { reason: 'focus' });

    controller.requestClose('escape');
    controller.requestOpen('hover');
    await vi.advanceTimersByTimeAsync(20);
    expect(controller.snapshot.open).toBe(true);
    expect(onOpenChange).toHaveBeenCalledTimes(1);

    controller.setDisabled(true);
    expect(onOpenChange).toHaveBeenLastCalledWith(false, { reason: 'disabled' });
    controller.destroy();
    vi.useRealTimers();
  });
});
