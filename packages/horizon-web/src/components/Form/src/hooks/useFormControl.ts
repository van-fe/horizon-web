import { computed, inject, nextTick, toValue } from 'vue';
import type { MaybeRefOrGetter } from 'vue';
import {
  HFormDisabledInjectedKey,
  HFormItemErrorInjectedKey,
  HFormItemTriggerInjectedKey,
} from '../utils/injectedKeys';

export type FormControlEvent = 'blur' | 'change';

/** Shared form context for field-like components. */
export function useFormControl(disabled?: MaybeRefOrGetter<boolean | undefined>) {
  const formDisabled = inject(HFormDisabledInjectedKey, undefined);
  const formError = inject(HFormItemErrorInjectedKey, undefined);
  const formItemTrigger = inject(HFormItemTriggerInjectedKey, undefined);
  const isDisabled = computed(() => toValue(disabled) ?? formDisabled?.value ?? false);

  function notifyFormItem(event: FormControlEvent) {
    return nextTick(() => formItemTrigger?.(event));
  }

  return {
    formError,
    isDisabled,
    notifyFormItem,
  };
}
