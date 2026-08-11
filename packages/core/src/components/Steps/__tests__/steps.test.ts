import { describe, expect, it, vi } from 'vitest';
import {
  getStepDisplayNumber,
  getStepLayout,
  getStepNextStatus,
  getStepStatus,
  isStepClickable,
  isStepsStatus,
  resolveStepIndexes,
  resolveStepsBeforeChange,
  resolveStepsSelection,
  STEPS_DEFAULTS,
  stepsApiContract,
} from '..';

describe('Steps contract', () => {
  it('publishes defaults and all visual statuses', () => {
    expect(stepsApiContract.defaults).toBe(STEPS_DEFAULTS);
    expect(isStepsStatus('warning')).toBe(true);
    expect(isStepsStatus('disabled')).toBe(false);
  });

  it('assigns stable indexes around explicit dynamic indexes', () => {
    expect(resolveStepIndexes([{}, { index: 8 }, {}, {}], 3)).toEqual([3, 8, 9, 10]);
    expect(resolveStepIndexes([{}, {}], Number.NaN)).toEqual([0, 1]);
    expect(getStepDisplayNumber(10)).toBe(11);
  });

  it('resolves clickability and current, next, disabled statuses', () => {
    expect(isStepClickable(undefined, true)).toBe(true);
    expect(isStepClickable(false, true)).toBe(false);
    expect(isStepClickable(true, false, true)).toBe(false);
    expect(getStepStatus(0, 1, 'warning')).toBe('finish');
    expect(getStepStatus(1, 1, 'warning')).toBe('warning');
    expect(getStepStatus(2, 1, 'warning')).toBe('wait');
    expect(getStepStatus(1, 1, 'warning', true)).toBe('disabled');
    expect(getStepNextStatus(0, 1, 'error')).toBe('error');
  });

  it('calculates centered, trailing and vertical layout shares', () => {
    expect(getStepLayout(0, 4, 'horizontal', 'vertical', 'center', false)).toEqual({
      flex: '1 1 25%',
    });
    expect(getStepLayout(1, 3, 'horizontal', 'horizontal', 'left', false)).toEqual({
      flex: '1 1 50%',
    });
    expect(getStepLayout(2, 3, 'horizontal', 'horizontal', 'left', false)).toEqual({
      flex: 'auto 0 0',
      maxWidth: `${(1 / 3) * 100}%`,
    });
    expect(getStepLayout(0, 1, 'vertical', 'horizontal', 'left', false)).toEqual({
      flex: 'auto 0 0',
      maxHeight: '100%',
    });
  });

  it('returns explicit selection rejection reasons', () => {
    expect(resolveStepsSelection(0, 1, { clickable: false, controllable: true }).reason).toBe(
      'not-clickable',
    );
    expect(resolveStepsSelection(0, 1, { clickable: true, controllable: false }).reason).toBe(
      'not-controllable',
    );
    expect(
      resolveStepsSelection(0, 1, { clickable: true, controllable: true, disabled: true }).reason,
    ).toBe('disabled');
    expect(resolveStepsSelection(1, 1, { clickable: true, controllable: true }).reason).toBe(
      'same',
    );
    expect(resolveStepsSelection(0, 1, { clickable: true, controllable: true })).toEqual({
      accepted: true,
      value: 1,
      reason: 'change',
    });
  });

  it('normalizes sync, async and rejected change guards', async () => {
    const nextItem = { title: 'Next' };
    const currentItem = { title: 'Current' };
    const guard = vi.fn(async () => true);
    await expect(resolveStepsBeforeChange(guard, 2, 1, nextItem, currentItem)).resolves.toBe(true);
    expect(guard).toHaveBeenCalledWith(2, 1, nextItem, currentItem);
    await expect(resolveStepsBeforeChange(() => false, 2, 1, nextItem, currentItem)).resolves.toBe(
      false,
    );
    await expect(
      resolveStepsBeforeChange(
        () => Promise.reject(new Error('stop')),
        2,
        1,
        nextItem,
        currentItem,
      ),
    ).resolves.toBe(false);
    await expect(resolveStepsBeforeChange(undefined, 2, 1, nextItem, currentItem)).resolves.toBe(
      true,
    );
  });
});
