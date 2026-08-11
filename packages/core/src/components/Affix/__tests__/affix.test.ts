import { describe, expect, it } from 'vitest';
import {
  AFFIX_DEFAULTS,
  affixManifest,
  isAffixOffset,
  isAffixPosition,
  resolveAffixGeometry,
} from '..';

describe('Affix contract and geometry', () => {
  it('defines stable defaults, validators and commands', () => {
    expect(AFFIX_DEFAULTS).toEqual({ offset: 0, position: 'top' });
    expect(isAffixPosition('bottom')).toBe(true);
    expect(isAffixPosition('left')).toBe(false);
    expect(isAffixOffset(0)).toBe(true);
    expect(isAffixOffset(-1)).toBe(true);
    expect(isAffixOffset(Number.NaN)).toBe(false);
    expect(affixManifest.contract.exposes.map(field => field.name)).toEqual(['updatePosition']);
  });

  it('resolves top, bottom and natural geometry', () => {
    const rect = { top: -10, bottom: 30, left: 20, width: 200, height: 40 };
    expect(
      resolveAffixGeometry({ rect, boundary: { top: 0, bottom: 800 }, position: 'top', offset: 8 }),
    ).toEqual({ affixed: true, left: 20, top: 8, width: 200 });
    expect(
      resolveAffixGeometry({
        rect: { ...rect, top: 780, bottom: 820 },
        boundary: { top: 0, bottom: 800 },
        position: 'bottom',
        offset: 12,
        marginLeft: 2,
        marginTop: 3,
      }),
    ).toEqual({ affixed: true, left: 18, top: 745, width: 200 });
    expect(
      resolveAffixGeometry({
        rect: { ...rect, top: 20 },
        boundary: { top: 0, bottom: 800 },
        position: 'top',
        offset: 0,
      }).affixed,
    ).toBe(false);
    expect(
      resolveAffixGeometry({
        rect,
        boundary: { top: 0, bottom: 800 },
        position: 'top',
        offset: -12,
      }).top,
    ).toBe(-12);
  });
});
