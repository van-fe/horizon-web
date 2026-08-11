import { describe, expect, it } from 'vitest';
import {
  getInputNativeType,
  inputApiContract,
  isInputAutoSize,
  isInputValueOverflow,
  normalizeInputType,
  shouldEmitInputChange,
} from '../contract';

describe('Input Core', () => {
  it('normalizes types and password visibility', () => {
    expect(normalizeInputType('textarea')).toBe('textarea');
    expect(normalizeInputType('email')).toBe('text');
    expect(getInputNativeType('password', false)).toBe('password');
    expect(getInputNativeType('password', true)).toBe('text');
    expect(getInputNativeType('textarea', false)).toBe('text');
  });

  it('validates auto-size options and limits', () => {
    expect(isInputAutoSize(true)).toBe(true);
    expect(isInputAutoSize({ minRows: 2, maxRows: 5 })).toBe(true);
    expect(isInputAutoSize({ minRows: 0 })).toBe(false);
    expect(isInputAutoSize(null)).toBe(false);
    expect(isInputValueOverflow('1234', 3)).toBe(true);
    expect(isInputValueOverflow('123', 3)).toBe(false);
  });

  it('tracks committed changes and exposes shared defaults', () => {
    expect(shouldEmitInputChange('before', 'after')).toBe(true);
    expect(shouldEmitInputChange('same', 'same')).toBe(false);
    expect(inputApiContract.defaults).toMatchObject({ type: 'text', rows: 2, variant: 'normal' });
  });
});
