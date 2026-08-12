import { describe, expect, it, vi } from 'vitest';
import { HoverController, HOVER_DEFAULTS, isHoverDelay } from '..';

describe('Hover Core', () => {
  it('defines stable defaults and delay validation', () => {
    expect(HOVER_DEFAULTS).toEqual({ disabled: false, showDelay: 0, hideDelay: 0 });
    expect(isHoverDelay(0)).toBe(true);
    expect(isHoverDelay(50)).toBe(true);
    expect(isHoverDelay(-1)).toBe(false);
    expect(isHoverDelay(Number.NaN)).toBe(false);
  });

  it('switches immediately and suppresses duplicate changes', () => {
    const onVisibleChange = vi.fn();
    const controller = new HoverController({ onVisibleChange });
    controller.requestVisible(true, 'mouse-enter');
    controller.show();
    controller.requestVisible(false, 'mouse-leave');
    expect(onVisibleChange.mock.calls).toEqual([
      [true, 'mouse-enter'],
      [false, 'mouse-leave'],
    ]);
  });

  it('applies delays and cancels opposite pending transitions', () => {
    vi.useFakeTimers();
    const onVisibleChange = vi.fn();
    const controller = new HoverController({ showDelay: 50, hideDelay: 30, onVisibleChange });
    controller.show();
    expect(controller.snapshot()).toEqual({ visible: false, pending: true });
    controller.hide();
    vi.advanceTimersByTime(30);
    expect(onVisibleChange).not.toHaveBeenCalled();
    controller.show();
    vi.advanceTimersByTime(50);
    expect(onVisibleChange).toHaveBeenLastCalledWith(true, 'show');
    controller.hide();
    vi.advanceTimersByTime(30);
    expect(onVisibleChange).toHaveBeenLastCalledWith(false, 'hide');
    vi.useRealTimers();
  });

  it('clears pending work when disabled or destroyed', () => {
    vi.useFakeTimers();
    const onVisibleChange = vi.fn();
    const controller = new HoverController({ showDelay: 50, onVisibleChange });
    controller.requestVisible(true, 'mouse-enter');
    controller.setOptions({ disabled: true, showDelay: 50, onVisibleChange });
    vi.runAllTimers();
    expect(onVisibleChange).not.toHaveBeenCalled();
    controller.setOptions({ disabled: false, showDelay: 50, onVisibleChange });
    controller.requestVisible(true, 'mouse-enter');
    controller.destroy();
    vi.runAllTimers();
    expect(onVisibleChange).not.toHaveBeenCalled();
    vi.useRealTimers();
  });

  it('allows explicit commands while pointer transitions are disabled', () => {
    const onVisibleChange = vi.fn();
    const controller = new HoverController({ disabled: true, onVisibleChange });
    controller.requestVisible(true, 'mouse-enter');
    expect(onVisibleChange).not.toHaveBeenCalled();
    controller.show();
    controller.hide();
    expect(onVisibleChange.mock.calls).toEqual([
      [true, 'show'],
      [false, 'hide'],
    ]);
  });

  it('uses the latest options without losing current visibility', () => {
    const firstChange = vi.fn();
    const nextChange = vi.fn();
    const controller = new HoverController({ onVisibleChange: firstChange });
    controller.show();
    controller.setOptions({ hideDelay: 0, onVisibleChange: nextChange });
    controller.hide();
    expect(firstChange).toHaveBeenCalledWith(true, 'show');
    expect(nextChange).toHaveBeenCalledWith(false, 'hide');
    expect(controller.snapshot()).toEqual({ visible: false, pending: false });
  });
});
