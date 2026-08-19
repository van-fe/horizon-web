import { describe, expect, it } from 'vitest';
import { computePositionSnapshot } from '../positioner';

const reference = { top: 40, right: 80, bottom: 60, left: 40, width: 40, height: 20 };
const floating = { width: 30, height: 10 };
const viewport = { width: 120, height: 100 };

describe('computePositionSnapshot', () => {
  it('applies distance, alignment, and cross-axis skidding', () => {
    expect(
      computePositionSnapshot(reference, floating, {
        placement: 'bottom-start',
        distance: 8,
        skidding: 3,
        shift: false,
      }, viewport),
    ).toMatchObject({ x: 43, y: 68, placement: 'bottom-start' });
  });

  it('flips and shifts into a narrow viewport', () => {
    const snapshot = computePositionSnapshot(
      { top: 2, right: 60, bottom: 12, left: 40, width: 20, height: 10 },
      { width: 50, height: 30 },
      { placement: 'top', distance: 4, padding: 8 },
      viewport,
    );

    expect(snapshot.placement).toBe('bottom');
    expect(snapshot.x).toBeGreaterThanOrEqual(8);
    expect(snapshot.y).toBeGreaterThanOrEqual(8);
  });

  it('reports hidden references and absolute scroll offsets', () => {
    expect(
      computePositionSnapshot(
        { top: -20, right: -1, bottom: -1, left: -20, width: 19, height: 19 },
        floating,
        { strategy: 'absolute' },
        { ...viewport, scrollX: 10, scrollY: 20 },
      ),
    ).toMatchObject({ referenceHidden: true, strategy: 'absolute' });
  });
});
