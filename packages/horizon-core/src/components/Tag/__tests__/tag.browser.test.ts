import { describe, expect, test, vi } from 'vitest';
import { createTagCollapseController, createTagPressTracker } from '..';

describe('Tag Horizon browser primitives', () => {
  test('releases pressed state through the owner document and cleanup', () => {
    const owner = document.createElement('span');
    document.body.append(owner);
    const states: boolean[] = [];
    const tracker = createTagPressTracker(owner, pressed => states.push(pressed));
    document.dispatchEvent(new MouseEvent('mouseup'));
    tracker.destroy();
    tracker.destroy();
    expect(states).toEqual([true, false]);
    owner.remove();
  });

  test('iterates visible items against real element geometry', async () => {
    const container = document.createElement('div');
    let visible = 1;
    let width = 150;
    Object.defineProperties(container, {
      clientWidth: { get: () => width },
      clientHeight: { get: () => 48 },
      scrollWidth: { get: () => visible * 80 },
    });
    const overflow = vi.fn();
    const controller = createTagCollapseController({
      getContainer: () => container,
      getItemCount: () => 4,
      getVisibleCount: () => visible,
      setVisibleCount: value => {
        visible = value;
      },
      afterRender: () => undefined,
      onOverflowChange: overflow,
    });
    await controller.calculate();
    expect(visible).toBe(1);
    expect(overflow).toHaveBeenLastCalledWith(true);
    width = 400;
    await controller.calculate();
    expect(visible).toBe(4);
    expect(overflow).toHaveBeenLastCalledWith(false);
    controller.destroy();
    await controller.calculate();
  });
});
