import { describe, expect, it } from 'vitest';
import { isContainerDimension, resolveContainerDimension, resolveContainerDirection } from '..';

describe('Container Core', () => {
  it('infers direction from direct layout regions', () => {
    expect(resolveContainerDirection(undefined, ['aside', 'main'])).toBe('horizontal');
    expect(resolveContainerDirection(undefined, ['header', 'main'])).toBe('vertical');
    expect(resolveContainerDirection(undefined, ['main', 'footer'])).toBe('vertical');
    expect(resolveContainerDirection('horizontal', ['header'])).toBe('horizontal');
  });

  it('normalizes numeric dimensions and preserves CSS dimensions', () => {
    expect(resolveContainerDimension(72)).toBe('72px');
    expect(resolveContainerDimension('18rem')).toBe('18rem');
    expect(resolveContainerDimension(undefined)).toBeUndefined();
  });

  it('validates finite numeric and string dimensions', () => {
    expect(isContainerDimension(300)).toBe(true);
    expect(isContainerDimension('40%')).toBe(true);
    expect(isContainerDimension(Number.NaN)).toBe(false);
    expect(isContainerDimension(null)).toBe(false);
  });
});
