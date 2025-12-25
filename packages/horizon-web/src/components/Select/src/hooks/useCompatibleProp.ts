import { computed, inject } from 'vue';
import type { SelectProps } from '../composables/useProps';
import { HFormDisabledInjectedKey } from '~/components/Form/src/utils/injectedKeys';

export default function compatibleProp(props: SelectProps) {
  const needConfirm = computed(() => props.needDropdownConfirm ?? props.needConfirm);
  const useCollapse = computed(() => props.collapse ?? props.collapseTags);

  const confirmButtonText = computed(
    () => props.dropdownConfirmBtnText ?? props.confirmBtnText ?? props.confirmButtonText,
  );
  const cancelButtonText = computed(
    () => props.dropdownCancelBtnText ?? props.cancelBtnText ?? props.cancelButtonText,
  );
  const emptyText = computed(() => props.optionEmptyText ?? props.emptyText);

  const inputStyle = computed(() =>
    props.selectStyle
      ? props.selectStyle === 'noborder'
        ? 'no-border'
        : props.selectStyle
      : props.inputStyle,
  );

  const panelStyle = computed(() => props.externalOptionStyle ?? props.externalPanelStyle);

  const panelClass = computed(
    () => props.externalOptionClass ?? props.popperClassName ?? props.externalPanelClass ?? '',
  );

  const loading = computed(() => props.optionListLoading || props.loading);

  const dropdownIcon = computed(() => props.customSelectIcon ?? props.dropdownIcon);

  const isFilterable = computed(() => !!props.filterOption || props.filterable);
  const isInputable = computed(
    () =>
      (isFilterable.value || props.showSearch || props.allowCreate) && !props.useBuildInPanelFilter,
  );

  // form disabled inject
  const formDisabled = inject(HFormDisabledInjectedKey, undefined);
  const isDisabled = computed(() => props.disabled ?? formDisabled?.value ?? false);

  return {
    needConfirm,
    useCollapse,
    isDisabled,
    isFilterable,
    isInputable,
    confirmButtonText,
    cancelButtonText,
    emptyText,
    inputStyle,
    panelStyle,
    dropdownIcon,
    loading,
    panelClass,
  };
}
