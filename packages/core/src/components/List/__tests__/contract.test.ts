import { describe, expect, it } from 'vitest';
import {
  isListMaxHeight,
  isListSize,
  LIST_DEFAULTS,
  LIST_ITEM_DEFAULTS,
  listApiContract,
  listItemApiContract,
  resolveListMaxHeight,
} from '..';

describe('List contract', () => {
  it('defines stable defaults and validators', () => {
    expect(LIST_DEFAULTS).toEqual({ zebra: false, border: false, split: true, maxHeight: 0 });
    expect(LIST_ITEM_DEFAULTS).toEqual({ titleBold: true });
    expect(listApiContract.validators.size?.('small')).toBe(true);
    expect(listItemApiContract.validators.titleSize?.('large')).toBe(false);
  });

  it('validates sizes and finite non-negative max heights', () => {
    expect(isListSize('medium')).toBe(true);
    expect(isListSize('large')).toBe(false);
    expect(isListMaxHeight(0)).toBe(true);
    expect(isListMaxHeight(180)).toBe(true);
    expect(isListMaxHeight(-1)).toBe(false);
    expect(isListMaxHeight(Number.POSITIVE_INFINITY)).toBe(false);
  });

  it('resolves positive max heights only', () => {
    expect(resolveListMaxHeight(undefined)).toBeUndefined();
    expect(resolveListMaxHeight(0)).toBeUndefined();
    expect(resolveListMaxHeight(-1)).toBeUndefined();
    expect(resolveListMaxHeight(180)).toBe(180);
  });
});
