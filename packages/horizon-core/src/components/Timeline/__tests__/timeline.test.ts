import { describe, expect, it } from 'vitest';
import { formatTimelineTimestamp } from '..';

describe('Timeline web formatting', () => {
  it('formats normalized timestamps with locale-aware Day.js tokens', () => {
    expect(
      formatTimelineTimestamp('2025-03-08 12:34:00', {
        format: 'YYYY/MM/DD HH:mm',
        locale: 'en-US',
      }),
    ).toBe('2025/03/08 12:34');
    expect(formatTimelineTimestamp('', { format: 'YYYY-MM-DD' })).toBe('Invalid Date');
    expect(formatTimelineTimestamp({}, { format: 'YYYY-MM-DD' })).toBeUndefined();
  });
});
