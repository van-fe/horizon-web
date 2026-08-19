import { describe, expect, it } from 'vitest';
import { syncCheckboxIndeterminate } from '..';

describe('Checkbox browser primitives', () => {
  it('synchronizes the native mixed state', () => {
    const input = document.createElement('input');
    input.type = 'checkbox';
    syncCheckboxIndeterminate(input, true);
    expect(input.indeterminate).toBe(true);
    syncCheckboxIndeterminate(input, false);
    expect(input.indeterminate).toBe(false);
  });

  it('allows a missing input during mount and cleanup', () => {
    expect(() => syncCheckboxIndeterminate(null, true)).not.toThrow();
  });
});
