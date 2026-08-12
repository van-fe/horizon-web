import { describe, expect, it } from 'vitest';
import {
  isMaskColor,
  isMaskOpacity,
  isMaskVariant,
  isMaskZIndex,
  MASK_DEFAULTS,
  maskApiContract,
  maskManifest,
} from '..';

describe('Mask contract', () => {
  it('defines stable defaults and manifest metadata', () => {
    expect(MASK_DEFAULTS).toEqual({
      variant: 'default',
      visible: true,
      absolute: false,
      opacity: 1,
      zIndex: 1,
      fuzzified: false,
      contentFullSize: false,
    });
    expect(maskApiContract.defaults).toBe(MASK_DEFAULTS);
    expect(maskManifest.name).toBe('Mask');
  });

  it('validates variants and visual values', () => {
    expect(isMaskVariant('transparent')).toBe(true);
    expect(isMaskVariant('dim')).toBe(false);
    expect(isMaskOpacity(0.4)).toBe(true);
    expect(isMaskOpacity('var(--mask-opacity)')).toBe(true);
    expect(isMaskOpacity(Number.NaN)).toBe(false);
    expect(isMaskColor('rgb(1, 2, 3)')).toBe(true);
    expect(isMaskColor('')).toBe(true);
    expect(isMaskZIndex(8)).toBe(true);
    expect(isMaskZIndex(Number.POSITIVE_INFINITY)).toBe(false);
  });
});
