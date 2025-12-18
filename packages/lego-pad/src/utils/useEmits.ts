import { upperFirst } from '@aurora/utils';
import type { SetupContext } from 'vue';

type UpperFirst<T extends string> = T extends `${infer L}${infer R}` ? `${Uppercase<L>}${R}` : T;

export default function useEmits<
  T extends Record<string, (...args: any[]) => any>,
  Key extends keyof T & string,
  EmitKey extends `on${UpperFirst<Key>}`,
>(emitsOptions: T, emit: SetupContext<T>['emit']) {
  const res: Record<EmitKey, (...args: Parameters<T[Key]>) => void> = {} as any;

  Object.entries(emitsOptions).forEach(([key, value]) => {
    res[`on${upperFirst(key)}` as EmitKey] = (...args: Parameters<T[Key]>) => {
      emit(key, ...args);
    };
  });

  return res;
}
