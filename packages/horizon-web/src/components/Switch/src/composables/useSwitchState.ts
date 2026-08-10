import { computed, getCurrentScope, nextTick, onScopeDispose, ref } from 'vue';
import type { Ref } from 'vue';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { getSwitchState, resolveSwitchChange } from '@aurora/core';
import type { SwitchChangeResult } from '@aurora/core';
import type { SwitchEmits } from './useEmits';
import type { SwitchProps } from './useProps';

export function useSwitchState(
  props: SwitchProps,
  formDisabled: Readonly<Ref<boolean | undefined>> | undefined,
  formItemTrigger: ((trigger: 'blur' | 'change') => void) | undefined,
  emit: HorizonWebSetupContext<SwitchEmits>['emit'],
) {
  const pending = ref(false);
  let active = true;
  let transitionId = 0;
  const disabled = computed(() => props.disabled ?? formDisabled?.value ?? false);
  const state = computed(() =>
    getSwitchState({
      value: props.modelValue,
      disabled: disabled.value,
      readonly: props.readonly,
      pending: pending.value,
    }),
  );

  function applyChange(result: SwitchChangeResult): void {
    if (!result.accepted) return;
    emit('update:modelValue', result.value);
    emit('change', result.value);
    void nextTick().then(() => formItemTrigger?.('change'));
  }

  function onChange(): void {
    const sourceValue = state.value.value;
    const resolution = resolveSwitchChange({
      ...state.value,
      beforeChange: props.beforeChange,
    });

    if (resolution instanceof Promise) {
      const requestId = ++transitionId;
      pending.value = true;
      void resolution
        .then(result => {
          if (active && requestId === transitionId && props.modelValue === sourceValue) {
            applyChange(result);
          }
        })
        .finally(() => {
          if (active && requestId === transitionId) pending.value = false;
        });
    } else {
      applyChange(resolution);
    }
  }

  function onBlur(event: FocusEvent): void {
    emit('blur', event);
    void nextTick().then(() => formItemTrigger?.('blur'));
  }

  if (getCurrentScope()) {
    onScopeDispose(() => {
      active = false;
      transitionId += 1;
    });
  }

  return { disabled, onBlur, onChange, pending, state };
}
