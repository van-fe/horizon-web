import { describe, expect, it } from 'vitest';
import { BodyScrollLock } from './scrollLock';

describe('BodyScrollLock', () => {
  it('locks until every visible overlay has released its claim', () => {
    const target = { body: { dataset: {} as Record<string, string | undefined> } };
    const lock = new BodyScrollLock();

    lock.update(true, target);
    lock.update(true, target);
    lock.update(false, target);
    expect(target.body.dataset.popupParentHidden).toBe('');

    lock.update(false, target);
    expect('popupParentHidden' in target.body.dataset).toBe(false);
    expect(lock.current).toBe(0);
  });

  it('is safe when rendered without a browser document', () => {
    const lock = new BodyScrollLock();

    expect(() => lock.update(true, undefined)).not.toThrow();
    lock.reset(undefined);
    expect(lock.current).toBe(0);
  });
});
