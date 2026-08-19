import { computed, inject } from 'vue';
import type { CascaderProps } from '../composables/useProps';
import { HFormDisabledInjectedKey } from '~/components/Form/src/utils/injectedKeys';

export default function useConfig(props: CascaderProps) {
  const formDisabled = inject(HFormDisabledInjectedKey, undefined);

  return {
    useCollapse: computed(() => props.collapseTags),
    isDisabled: computed(() => props.disabled ?? formDisabled?.value ?? false),
    needConfirm: computed(() => props.needConfirm),
    confirmButtonText: computed(() => props.confirmButtonText),
    cancelButtonText: computed(() => props.cancelButtonText),
    inputStyle: computed(() => props.inputStyle),
  };
}
