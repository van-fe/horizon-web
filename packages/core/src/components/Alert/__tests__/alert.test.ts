import { describe, expect, it } from 'vitest';
import { ALERT_DEFAULTS, alertApiContract, isAlertSize, isAlertType, isAssertiveAlert } from '..';

describe('Alert contract', () => {
  it('owns defaults and validators', () => {
    expect(alertApiContract.defaults).toBe(ALERT_DEFAULTS);
    expect(isAlertType('warning')).toBe(true);
    expect(isAlertType('danger')).toBe(false);
    expect(isAlertSize('small')).toBe(true);
  });

  it('resolves live-region urgency', () => {
    expect(isAssertiveAlert('error')).toBe(true);
    expect(isAssertiveAlert('warning')).toBe(true);
    expect(isAssertiveAlert('info')).toBe(false);
  });
});
