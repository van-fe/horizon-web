import { describe, expect, it } from 'vitest';
import {
  DIVIDER_DEFAULTS,
  dividerApiContract,
  isDividerDirection,
  isDividerLineStyle,
  isDividerTitlePlacement,
  isDividerVariant,
  normalizeDividerVariant,
} from '..';

describe('Divider contract', () => {
  it('normalizes aliases', () => {
    expect(normalizeDividerVariant('primary')).toBe('default');
    expect(normalizeDividerVariant('secondary')).toBe('strong');
  });

  it('owns defaults and runtime validators for both renderers', () => {
    expect(dividerApiContract.defaults).toBe(DIVIDER_DEFAULTS);
    expect(isDividerVariant('primary')).toBe(true);
    expect(isDividerVariant('danger')).toBe(false);
    expect(isDividerDirection('vertical')).toBe(true);
    expect(isDividerDirection('diagonal')).toBe(false);
    expect(isDividerLineStyle('dotted')).toBe(true);
    expect(isDividerLineStyle('double')).toBe(false);
    expect(isDividerTitlePlacement('right')).toBe(true);
    expect(isDividerTitlePlacement('bottom')).toBe(false);
  });
});
