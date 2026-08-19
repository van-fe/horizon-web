import { describe, expect, it, vi } from 'vitest';
import { createCalendarPointerSelection, createCalendarTimelineScroller } from '../index';

function pointer(type: string, init: PointerEventInit = {}): PointerEvent {
  return new PointerEvent(type, {
    bubbles: true,
    button: 0,
    isPrimary: true,
    pointerId: 7,
    ...init,
  });
}

describe('Calendar browser hooks', () => {
  it('owns one pointer selection lifecycle and commits the latest value', () => {
    const owner = document.createElement('div');
    document.body.append(owner);
    const moves: number[] = [];
    const commits: number[] = [];
    const controller = createCalendarPointerSelection({
      owner,
      resolveValue: event => event.clientY,
      onMove: value => moves.push(value),
      onCommit: value => commits.push(value),
    });
    owner.dispatchEvent(pointer('pointerdown', { clientY: 10 }));
    expect(controller.selecting).toBe(true);
    document.dispatchEvent(pointer('pointermove', { clientY: 30 }));
    document.dispatchEvent(pointer('pointerup', { clientY: 40 }));
    expect(moves).toEqual([30]);
    expect(commits).toEqual([40]);
    expect(controller.selecting).toBe(false);
    controller.destroy();
    owner.remove();
  });

  it('rejects ineligible pointers and cleans active listeners on destroy', () => {
    const owner = document.createElement('div');
    document.body.append(owner);
    const cancel = vi.fn();
    const move = vi.fn();
    const controller = createCalendarPointerSelection({
      owner,
      autoStart: false,
      resolveValue: event => event.clientY,
      onMove: move,
      onCancel: cancel,
    });
    expect(controller.start(pointer('pointerdown', { button: 1 }))).toBe(false);
    expect(controller.start(pointer('pointerdown', { isPrimary: false }))).toBe(false);
    expect(controller.start(pointer('pointerdown', { clientY: 12 }))).toBe(true);
    controller.destroy();
    document.dispatchEvent(pointer('pointermove', { clientY: 20 }));
    expect(move).not.toHaveBeenCalled();
    expect(cancel).toHaveBeenCalledOnce();
    owner.remove();
  });

  it('scrolls a timeline by hour and stops after destroy', () => {
    const scroller = document.createElement('div');
    const scrollTo = vi.fn();
    scroller.scrollTo = scrollTo;
    const timeline = createCalendarTimelineScroller({
      getScroller: () => scroller,
      getHourHeight: () => 48,
    });
    expect(timeline.scrollToHour(8)).toBe(true);
    expect(scrollTo).toHaveBeenCalledWith({ top: 384 });
    timeline.destroy();
    expect(timeline.scrollToHour(9)).toBe(false);
  });
});
