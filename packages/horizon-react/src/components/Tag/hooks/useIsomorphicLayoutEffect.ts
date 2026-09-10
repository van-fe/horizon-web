import type { DependencyList, EffectCallback } from 'react';
import { useEffect, useLayoutEffect } from 'react';

export function useIsomorphicLayoutEffect(
  effect: EffectCallback,
  dependencies: DependencyList,
): void {
  // React does not run effects during SSR; useEffect avoids the server layout-effect warning.
  const useEffectHook = typeof document === 'undefined' ? useEffect : useLayoutEffect;
  useEffectHook(effect, dependencies);
}
