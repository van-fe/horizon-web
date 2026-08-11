import { describe, expect, it } from 'vitest';
import {
  isSkeletonShape,
  SKELETON_DEFAULTS,
  SKELETON_ITEM_DEFAULTS,
  skeletonApiContract,
  skeletonItemApiContract,
} from '..';

describe('Skeleton contract', () => {
  it('owns container and item defaults', () => {
    expect(skeletonApiContract.defaults).toBe(SKELETON_DEFAULTS);
    expect(skeletonItemApiContract.defaults).toBe(SKELETON_ITEM_DEFAULTS);
  });

  it('validates renderer-neutral item shapes', () => {
    expect(isSkeletonShape('picture')).toBe(true);
    expect(isSkeletonShape('circle')).toBe(false);
  });
});
