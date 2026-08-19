import { afterEach, describe, expect, it } from 'vitest';
import { applyTimelineFoldVisibility } from '..';

afterEach(() => document.body.replaceChildren());

describe('Timeline browser primitives', () => {
  it('applies and restores only the owning fold marker', () => {
    const items = Array.from({ length: 4 }, () => document.createElement('li'));
    document.body.append(...items);

    applyTimelineFoldVisibility({ hidden: true, indexes: [1, 2], items, ownerId: 'first' });
    applyTimelineFoldVisibility({ hidden: true, indexes: [2, 3], items, ownerId: 'second' });
    expect(items.map(item => item.classList.contains('hidden'))).toEqual([false, true, true, true]);
    expect(items[2]?.dataset.hiddenUid).toBe('first');

    applyTimelineFoldVisibility({ hidden: false, indexes: [1, 2], items, ownerId: 'second' });
    expect(items[1]?.classList.contains('hidden')).toBe(true);
    expect(items[2]?.classList.contains('hidden')).toBe(true);

    applyTimelineFoldVisibility({ hidden: false, indexes: [1, 2], items, ownerId: 'first' });
    expect(items[1]?.classList.contains('hidden')).toBe(false);
    expect(items[2]?.classList.contains('hidden')).toBe(false);
    expect(items[3]?.classList.contains('hidden')).toBe(true);
  });
});
