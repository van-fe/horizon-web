import { isNumber } from '../utils/validate';
import { useSessionStorage } from '@vueuse/core';

const index = useSessionStorage<number>('lego-z-index', 2000);

export function useZIndex(current?: number) {
  if (isNumber(current) && current > index.value) {
    index.value = current;
  }

  return {
    current: index.value,
    set: (zIndex: number) => {
      index.value = zIndex;
      return index.value;
    },
    next: () => {
      index.value++;
      return index.value;
    },
  };
}
