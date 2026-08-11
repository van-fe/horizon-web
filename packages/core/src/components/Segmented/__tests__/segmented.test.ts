import { describe, expect, it } from 'vitest';
import {
  isSegmentedSize,
  isSegmentedValue,
  nextSegmentedIndex,
  resolveSegmentedValue,
  SEGMENTED_DEFAULTS,
  segmentedApiContract,
} from '..';

describe('Segmented contract', () => {
  it('owns defaults and validators', () => {
    expect(segmentedApiContract.defaults).toBe(SEGMENTED_DEFAULTS);
    expect(isSegmentedValue('overview')).toBe(true);
    expect(isSegmentedValue(2)).toBe(true);
    expect(isSegmentedValue(Number.NaN)).toBe(false);
    expect(isSegmentedSize('huge')).toBe(true);
  });

  it('resolves controlled and initial values', () => {
    expect(resolveSegmentedValue('controlled', 'initial')).toBe('controlled');
    expect(resolveSegmentedValue(undefined, 'initial')).toBe('initial');
  });

  it('calculates roving keyboard indexes', () => {
    expect(nextSegmentedIndex(1, 3, 'ArrowRight')).toBe(2);
    expect(nextSegmentedIndex(2, 3, 'ArrowRight')).toBe(0);
    expect(nextSegmentedIndex(0, 3, 'ArrowLeft')).toBe(2);
    expect(nextSegmentedIndex(1, 3, 'Home')).toBe(0);
    expect(nextSegmentedIndex(1, 3, 'End')).toBe(2);
    expect(nextSegmentedIndex(1, 3, 'Enter')).toBeUndefined();
  });
});
