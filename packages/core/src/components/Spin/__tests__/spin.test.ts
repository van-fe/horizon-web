import { describe, expect, it } from 'vitest';
import { isSpinDelay, isSpinSize, SPIN_DEFAULTS, spinApiContract, spinManifest } from '..';

describe('Spin contract', () => {
  it('owns defaults and validators', () => {
    expect(spinApiContract.defaults).toBe(SPIN_DEFAULTS);
    expect(SPIN_DEFAULTS).toEqual({
      spinning: true,
      size: 'medium',
      delay: 0,
      mask: true,
      fullscreen: false,
    });
    expect(isSpinSize('small')).toBe(true);
    expect(isSpinSize('huge')).toBe(false);
    expect(isSpinDelay(0)).toBe(true);
    expect(isSpinDelay(-1)).toBe(false);
    expect(isSpinDelay(Number.NaN)).toBe(false);
  });

  it('describes renderer-neutral regions', () => {
    expect(spinManifest.contract.slots.map(slot => slot.name)).toEqual([
      'content',
      'indicator',
      'tip',
    ]);
  });
});
