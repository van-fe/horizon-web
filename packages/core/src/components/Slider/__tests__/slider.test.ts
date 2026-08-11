import { describe, expect, it } from 'vitest';
import {
  correctSliderValue,
  getClosestSliderThumb,
  getSliderKeyboardValue,
  getSliderProgress,
  getSliderSeparatorPercents,
  getSliderValueFromPosition,
  normalizeSliderBounds,
  normalizeSliderValue,
} from '../contract';

describe('Slider contract', () => {
  it('normalizes scalar, range and reversed bounds', () => {
    expect(normalizeSliderBounds(100, 0)).toEqual([0, 100]);
    expect(normalizeSliderValue(8, false, 0, 100, 10)).toEqual({ first: 10, second: 0, value: 10 });
    expect(normalizeSliderValue([90, 10], true, 20, 80, 10)).toEqual({
      first: 80,
      second: 20,
      value: [20, 80],
    });
    expect(normalizeSliderValue([20], true, 0, 100, 10).value).toEqual([20, 100]);
  });

  it('corrects decimal steps and clamps bounds', () => {
    expect(correctSliderValue(1.13, 1, 2, 0.25, true)).toBe(1.25);
    expect(correctSliderValue(1.12, 1, 2, 0.25, true)).toBe(1);
    expect(correctSliderValue(120, 0, 100, 10, true)).toBe(100);
  });

  it('calculates progress correctly for non-zero minima', () => {
    expect(getSliderProgress(50, 0, 20, 80, false)).toEqual({ left: 0, width: 50 });
    expect(getSliderProgress(20, 80, 20, 80, true)).toEqual({ left: 0, width: 100 });
  });

  it('resolves separators, pointer positions and the closest thumb', () => {
    expect(getSliderSeparatorPercents(20, 80, 20)).toEqual([33.33333333333333, 66.66666666666666]);
    expect(getSliderValueFromPosition(75, 25, 100, 0, 100, 10)).toBe(50);
    expect(getSliderValueFromPosition(75, 25, 0, 10, 20, 1)).toBe(10);
    expect(getClosestSliderThumb(50, 20, 80)).toBe(0);
    expect(getClosestSliderThumb(70, 20, 80)).toBe(1);
  });

  it('handles keyboard intent', () => {
    expect(getSliderKeyboardValue(50, 'ArrowRight', 0, 100, 10)).toBe(60);
    expect(getSliderKeyboardValue(50, 'ArrowDown', 0, 100, 10)).toBe(40);
    expect(getSliderKeyboardValue(50, 'Home', 0, 100, 10)).toBe(0);
    expect(getSliderKeyboardValue(50, 'End', 0, 100, 10)).toBe(100);
    expect(getSliderKeyboardValue(50, 'Enter', 0, 100, 10)).toBeUndefined();
  });
});
