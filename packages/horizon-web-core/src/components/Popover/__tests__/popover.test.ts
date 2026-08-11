import { describe, expect, it } from 'vitest';
import { resolvePopoverPlacement } from '..';

describe('Popover primitives', () => {
  it('resolves automatic placements using the roomiest side', () => {
    const reference = { top: 80, right: 140, bottom: 120, left: 100 } as DOMRect;
    const viewport = { innerWidth: 800, innerHeight: 600 } as Window;
    expect(resolvePopoverPlacement(reference, 'auto', viewport)).toBe('right');
    expect(resolvePopoverPlacement(reference, 'auto-end', viewport)).toBe('right-end');
    expect(resolvePopoverPlacement(reference, 'bottom-start', viewport)).toBe('bottom-start');
  });
});
