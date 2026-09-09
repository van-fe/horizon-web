import { describe, expect, test, vi } from 'vitest';
import {
  canActivateTag,
  createTagMutationController,
  normalizeTagVisibleCount,
  tagGroupManifest,
  tagManifest,
  toggleTagActive,
} from '..';

describe('Tag core', () => {
  test('keeps controlled activation pure', () => {
    expect(canActivateTag({ active: false, clickable: false })).toBe(true);
    expect(canActivateTag({ clickable: false })).toBe(false);
    expect(canActivateTag({ active: true, disabled: true })).toBe(false);
    expect(toggleTagActive(false)).toBe(true);
    expect(toggleTagActive(undefined)).toBeUndefined();
  });

  test('normalizes visible counts', () => {
    expect(normalizeTagVisibleCount(4.8, 3)).toBe(3);
    expect(normalizeTagVisibleCount(-1, 3)).toBe(0);
    expect(normalizeTagVisibleCount(Number.POSITIVE_INFINITY, 3)).toBe(3);
    expect(normalizeTagVisibleCount(1, 0)).toBe(0);
  });

  test('runs guards once and reports rejection', async () => {
    const gate = Promise.withResolvers<boolean>();
    const beforeCreate = vi.fn(() => gate.promise);
    const controller = createTagMutationController({ beforeCreate });
    const revisions: number[] = [];
    const unsubscribe = controller.subscribe(() => revisions.push(controller.getState().revision));
    const first = controller.create('New');
    expect(await controller.create('Duplicate')).toEqual({ status: 'ignored' });
    gate.resolve(true);
    expect(await first).toEqual({ status: 'accepted' });
    controller.update({ beforeClose: () => false, beforeEdit: () => Promise.reject('blocked') });
    expect(await controller.close('id')).toEqual({ status: 'rejected' });
    expect(await controller.edit('new', 'old')).toEqual({ status: 'rejected', error: 'blocked' });
    expect(revisions.length).toBeGreaterThanOrEqual(6);
    unsubscribe();
    controller.destroy();
    controller.destroy();
    expect(await controller.create('late')).toEqual({ status: 'destroyed' });
  });

  test('invalidates late results after destroy', async () => {
    const gate = Promise.withResolvers<boolean>();
    const controller = createTagMutationController({ beforeCreate: () => gate.promise });
    const result = controller.create('late');
    controller.destroy();
    gate.resolve(true);
    expect(await result).toEqual({ status: 'destroyed' });
  });

  test('accepts unguarded mutations without entering pending state', async () => {
    const controller = createTagMutationController();
    const listener = vi.fn();
    controller.subscribe(listener);
    expect(await controller.close('plain')).toEqual({ status: 'accepted' });
    expect(controller.getState().pending).toBe(false);
    expect(listener).not.toHaveBeenCalled();
  });

  test('derives manifests from the contracts', () => {
    expect(tagManifest.contract.props.find(field => field.name === 'size')).toMatchObject({
      defaultValue: 'medium',
    });
    expect(tagGroupManifest.contract.props.find(field => field.name === 'maxTags')).toMatchObject({
      defaultValue: 'Infinity',
    });
    expect(tagManifest.contract.exposes.map(field => field.name)).toEqual(['edit']);
  });
});
