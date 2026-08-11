import { describe, expect, it } from 'vitest';
import {
  isResultIconType,
  isResultType,
  normalizeResultHttpType,
  RESULT_DEFAULTS,
  resultApiContract,
} from '..';

describe('Result contract', () => {
  it('owns defaults and type semantics', () => {
    expect(resultApiContract.defaults).toBe(RESULT_DEFAULTS);
    expect(isResultType('success')).toBe(true);
    expect(isResultType('404')).toBe(true);
    expect(isResultType(401)).toBe(false);
    expect(isResultIconType('warning')).toBe(true);
  });
  it('normalizes numeric status aliases', () => {
    expect(normalizeResultHttpType('403')).toBe(403);
    expect(normalizeResultHttpType(500)).toBe(500);
  });
});
