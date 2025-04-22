import type { MaybeRef } from '@vueuse/core';
import { unref } from 'vue';
import { isDefined } from './validate';

const AvailableSize = ['mini', 'small', 'medium', 'large', 'huge'] as const;
export type AvailableSize = typeof AvailableSize;

export function sizeAdapter<T = AvailableSize[number]>(
  size: MaybeRef<string> | undefined,
  mapping: Record<string, T>,
): AvailableSize[number] | undefined | T | string {
  const curr = unref(size) as string | undefined;
  if (isDefined(curr)) {
    if (mapping[curr]) {
      return mapping[curr];
    } else {
      return curr;
    }
  }

  return undefined;
}
