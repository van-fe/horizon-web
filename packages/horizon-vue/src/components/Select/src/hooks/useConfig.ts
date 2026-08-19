import { computed, inject } from 'vue';
import type { SelectProps } from '../composables/useProps';
import { HFormDisabledInjectedKey } from '~/components/Form/src/utils/injectedKeys';

export default function useConfig(props: SelectProps) {
  const formDisabled = inject(HFormDisabledInjectedKey, undefined);

  const needConfirm = computed(() => props.needConfirm);
  const useCollapse = computed(() => props.collapseTags);
  const isDisabled = computed(() => props.disabled ?? formDisabled?.value ?? false);
  const isFilterable = computed(() => props.filterable);
  const isInputable = computed(
    () =>
      (isFilterable.value || props.showSearch || props.allowCreate) && !props.useBuildInPanelFilter,
  );

  return {
    needConfirm,
    useCollapse,
    isDisabled,
    isFilterable,
    isInputable,
    confirmButtonText: computed(() => props.confirmButtonText),
    cancelButtonText: computed(() => props.cancelButtonText),
    emptyText: computed(() => props.emptyText),
    inputStyle: computed(() => props.inputStyle),
    panelStyle: computed(() => props.externalPanelStyle),
    panelClass: computed(() => props.externalPanelClass ?? ''),
    dropdownIcon: computed(() => props.dropdownIcon),
    loading: computed(() => props.loading),
  };
}
