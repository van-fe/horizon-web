import { describe, expect, it } from 'vitest';
import {
  isSpaceAlign,
  isSpaceDirection,
  isSpacePresetSize,
  isSpaceSize,
  resolveSpaceAlign,
  SPACE_DEFAULTS,
  spaceApiContract,
} from '..';

describe('Space contract', () => {
  it('resolves the renderer-neutral default alignment', () => {
    expect(resolveSpaceAlign('horizontal')).toBe('center');
    expect(resolveSpaceAlign('vertical')).toBeUndefined();
    expect(resolveSpaceAlign('vertical', 'baseline')).toBe('baseline');
  });

  it('owns defaults and runtime validators for both renderers', () => {
    expect(spaceApiContract.defaults).toBe(SPACE_DEFAULTS);
    expect(isSpacePresetSize('large')).toBe(true);
    expect(isSpacePresetSize('huge')).toBe(false);
    expect(isSpaceDirection('horizontal')).toBe(true);
    expect(isSpaceDirection('diagonal')).toBe(false);
    expect(isSpaceAlign('baseline')).toBe(true);
    expect(isSpaceAlign('stretch')).toBe(false);
    expect(isSpaceSize(12)).toBe(true);
    expect(isSpaceSize('1rem')).toBe(true);
    expect(isSpaceSize([8, '1rem'])).toBe(true);
    expect(isSpaceSize([8])).toBe(false);
    expect(isSpaceSize({ row: 8 })).toBe(false);
  });
});
