import type { ApplicationProps } from '~/components/Application/src/composables/useProps';
import { isBoolean } from '@aurora/utils';
import { HApplicationShowTimeZoneInjectedKey } from '~/components/Application/src/utils/injectedKeys';
import { computed, inject } from 'vue';

export default function useShowTimeZone(
  component: Exclude<ApplicationProps['showTimeZone'], boolean>[number],
) {
  const showTimeZoneInject = inject(HApplicationShowTimeZoneInjectedKey, undefined);

  return computed<boolean>(() => {
    if (isBoolean(showTimeZoneInject?.value)) {
      return showTimeZoneInject.value;
    } else if (Array.isArray(showTimeZoneInject?.value)) {
      return showTimeZoneInject?.value.includes(component);
    } else {
      return false;
    }
  });
}
