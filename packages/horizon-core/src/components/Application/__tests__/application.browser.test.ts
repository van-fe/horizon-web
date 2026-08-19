import { describe, expect, it, vi } from 'vitest';
import { resolveApplicationPopupContainer } from '..';

describe('Application Web Core', () => {
  it('resolves a configured target and falls back to body', () => {
    const target = document.createElement('div');
    const trigger = document.createElement('button');
    const getter = vi.fn(() => target);
    expect(resolveApplicationPopupContainer(getter, trigger, document)).toBe(target);
    expect(getter).toHaveBeenCalledWith(trigger);
    expect(resolveApplicationPopupContainer(() => null, trigger, document)).toBe(document.body);
    expect(resolveApplicationPopupContainer(undefined, trigger, document)).toBe(document.body);
  });
});
