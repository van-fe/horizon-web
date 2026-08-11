import { describe, expect, it } from 'vitest';
import { getRadioChecked, resolveRadioSelection } from '../contract';

describe('Radio contract', () => {
  it('compares option values by identity', () => {
    expect(getRadioChecked('one', 'one')).toBe(true);
    expect(getRadioChecked(1, '1')).toBe(false);
  });

  it('selects a different option', () => {
    expect(resolveRadioSelection('one', 'two')).toEqual({
      accepted: true,
      value: 'two',
      reason: 'select',
    });
  });

  it('rejects disabled, readonly and already selected changes', () => {
    expect(resolveRadioSelection('one', 'two', true)).toEqual({
      accepted: false,
      value: 'one',
      reason: 'disabled',
    });
    expect(resolveRadioSelection('one', 'two', false, true).reason).toBe('readonly');
    expect(resolveRadioSelection('one', 'one').reason).toBe('already-selected');
  });
});
