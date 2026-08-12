import { describe, expect, it } from 'vitest';
import { APPLICATION_DEFAULTS, isApplicationShowTimeZone, isApplicationSize } from '..';

describe('Application Core', () => {
  it('defines stable defaults', () => {
    expect(APPLICATION_DEFAULTS).toEqual({ size: 'medium', showTimeZone: false });
  });

  it('validates sizes and time-zone scopes', () => {
    expect(isApplicationSize('small')).toBe(true);
    expect(isApplicationSize('huge')).toBe(false);
    expect(isApplicationShowTimeZone(true)).toBe(true);
    expect(isApplicationShowTimeZone(['date-picker', 'timeline'])).toBe(true);
    expect(isApplicationShowTimeZone(['calendar'])).toBe(false);
  });
});
