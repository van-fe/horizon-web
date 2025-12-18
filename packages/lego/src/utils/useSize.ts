import type { AvailableSize } from '@nio-fe/shared';
import type { ComputedRef, PropType, Ref } from 'vue';
import { computed, inject, ref } from 'vue';
import { GlobalSizeInjectedKey } from '~/components/Application/src/utils/injectedKeys';
import { isDefined, isString, sizeAdapter } from '@nio-fe/shared';
import useInject from '~/utils/useInject';

export const sizeProp = String as PropType<'mini' | 'small' | 'medium' | 'large'>;

export default function <T = unknown>(
  sizeProp: Ref<T | undefined> | undefined,
  defValue: AvailableSize[number],
  adapterSet: Record<string, AvailableSize[number]> = {},
  customProvides?: Record<PropertyKey, any>,
) {
  const globalSize = computed(() =>
    isDefined(customProvides)
      ? useInject(GlobalSizeInjectedKey, ref(defValue), customProvides)
      : inject(GlobalSizeInjectedKey, ref(defValue)),
  );

  return computed(
    () =>
      (isString(sizeProp?.value) && sizeAdapter(sizeProp?.value, adapterSet)) ||
      sizeProp?.value ||
      globalSize.value.value,
  ) as ComputedRef<Exclude<T, undefined>>;
}
