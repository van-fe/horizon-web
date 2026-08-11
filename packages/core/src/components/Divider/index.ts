export * from './contract';

import type { DividerVariant } from './contract';

export function normalizeDividerVariant(variant: DividerVariant): 'default' | 'strong' {
  return variant === 'primary' ? 'default' : variant === 'secondary' ? 'strong' : variant;
}

export { dividerManifest } from './manifest';
