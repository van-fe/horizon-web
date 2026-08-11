export * from './contract';

import type { SpaceAlign, SpaceDirection } from './contract';

export function resolveSpaceAlign(
  direction: SpaceDirection,
  align?: SpaceAlign,
): SpaceAlign | undefined {
  return align ?? (direction === 'horizontal' ? 'center' : undefined);
}

export { spaceManifest } from './manifest';
