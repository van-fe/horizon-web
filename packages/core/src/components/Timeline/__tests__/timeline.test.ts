import { describe, expect, it } from 'vitest';
import {
  getTimelineFoldIndexes,
  normalizeTimelineTimestamp,
  resolveTimelineDot,
  resolveTimelineEndpointDot,
  sortTimelineItems,
  timelineApiContract,
  timelineItemApiContract,
  TIMELINE_DEFAULTS,
  TIMELINE_ITEM_DEFAULTS,
  toTimelineOffsetCss,
} from '..';

describe('Timeline contract', () => {
  it('owns renderer-neutral defaults and timestamp normalization', () => {
    expect(timelineApiContract.defaults).toBe(TIMELINE_DEFAULTS);
    expect(timelineItemApiContract.defaults).toBe(TIMELINE_ITEM_DEFAULTS);
    expect(normalizeTimelineTimestamp(new Date(2025, 0, 2))?.getFullYear()).toBe(2025);
    expect(normalizeTimelineTimestamp(1_735_776_000)?.getFullYear()).toBe(2025);
    expect(normalizeTimelineTimestamp('1735776000000')?.getFullYear()).toBe(2025);
    expect(normalizeTimelineTimestamp({})).toBeUndefined();
  });

  it('sorts valid timestamps stably and leaves invalid values at the end', () => {
    const items = [
      { id: 'late', timestamp: '2025-03-01' },
      { id: 'invalid', timestamp: 'unknown' },
      { id: 'early', timestamp: '2025-01-01' },
      { id: 'middle', timestamp: '2025-02-01' },
    ];

    expect(sortTimelineItems(items, 'order', item => item.timestamp).map(item => item.id)).toEqual([
      'early',
      'middle',
      'late',
      'invalid',
    ]);
    expect(
      sortTimelineItems(items, 'reverse', item => item.timestamp).map(item => item.id),
    ).toEqual(['late', 'middle', 'early', 'invalid']);
    expect(sortTimelineItems(items, '', item => item.timestamp)).toEqual(items);
  });

  it('calculates fold ranges, folded dot overrides and CSS offsets', () => {
    expect(getTimelineFoldIndexes(0, 2, 4)).toEqual([1, 2]);
    expect(getTimelineFoldIndexes(2, 5, 4)).toEqual([3]);
    expect(getTimelineFoldIndexes(0, -1, 4)).toEqual([]);
    expect(
      resolveTimelineDot(
        { type: 'disc', size: 'medium' },
        { number: 1, content: 'hidden', dot: { type: 'circle', size: 'large' } },
        true,
      ),
    ).toEqual({ type: 'circle', size: 'large' });
    expect(
      resolveTimelineEndpointDot(
        { type: 'disc' },
        2,
        3,
        { size: 'small' },
        { type: 'circle', size: 'large' },
      ),
    ).toEqual({ type: 'circle', size: 'large' });
    expect(toTimelineOffsetCss(4)).toBe('4px');
    expect(toTimelineOffsetCss('1rem')).toBe('1rem');
  });
});
