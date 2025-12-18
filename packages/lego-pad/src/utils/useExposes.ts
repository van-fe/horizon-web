import type { LegoComponentInstance, LegoSetupContext } from '@aurora/utils';
import type { Ref } from 'vue';

export default function useExposes<T extends Record<string, any>, Key extends keyof T & string>(
  exposesOptions: T,
  exposes: LegoSetupContext<{}, {}, T>['expose'],
  domRef: Ref<LegoComponentInstance<any, T>>,
) {
  const res = {} as Record<Key, any>;

  Object.entries(exposesOptions).forEach(([key, value]) => {
    res[key as Key] =
      typeof value === 'function'
        ? (...args: Parameters<T[Key]>) => {
            domRef.value?.[key](...args);
          }
        : domRef.value?.value;
  });

  exposes(res);
}
