import { afterEach, describe, expect, it } from 'vitest';
import { focusRadioInput } from '..';

describe('Radio browser primitives', () => {
  afterEach(() => document.body.replaceChildren());

  it('focuses the native radio input', () => {
    const input = document.createElement('input');
    input.type = 'radio';
    document.body.append(input);
    focusRadioInput(input);
    expect(document.activeElement).toBe(input);
  });

  it('allows a missing input', () => {
    expect(() => focusRadioInput(null)).not.toThrow();
  });
});
