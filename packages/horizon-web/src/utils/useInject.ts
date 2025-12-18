import type { InjectionKey } from 'vue';
import { inject } from 'vue';
import { isPropertyKey } from '@aurora/shared';

function useInject<T>(key: InjectionKey<T> | string): T | undefined;
function useInject<T>(key: InjectionKey<T> | string, defaultValue: T): T;
function useInject<T>(
  key: InjectionKey<T> | string,
  defaultValue: T | (() => T),
  providesProps?: Record<string | symbol | keyof InjectionKey<T>, any>,
): T;
function useInject<T>(
  key: InjectionKey<T> | string,
  defaultValue?: any,
  providesProps?: Record<string | symbol, any>,
): T | undefined {
  let injectValue = inject(key, defaultValue);

  if (!injectValue && providesProps && isPropertyKey(key) && key in providesProps) {
    injectValue = providesProps[key];
  }

  return injectValue;
}

export default useInject;
