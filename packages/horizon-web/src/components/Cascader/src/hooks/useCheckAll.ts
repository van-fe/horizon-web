import type { ComputedRef, Ref } from 'vue';
import { computed } from 'vue';
import type { NCascaderExtendOption, NCascaderUuidType } from '../utils/types';
import type { HorizonWebSetupContext } from '@aurora/utils';
import type { CascaderSearchPanelEmits } from '../composables/useEmits';
import type { CascaderProps } from '../composables/useProps';

export default function (
  props: CascaderProps,
  visibleOptions: ComputedRef<NCascaderExtendOption[]>,
  presetModelValueSet: Ref<Set<NCascaderUuidType>>,
  pickOption: (
    value: NCascaderUuidType,
    singleChooseHide?: boolean,
    forcePick?: boolean,
    emitChange?: boolean,
  ) => void,
  searchPanelEmit: HorizonWebSetupContext<CascaderSearchPanelEmits>['emit'],
) {
  const canBeCheckedOptions = computed(() =>
    visibleOptions.value.filter(
      curr =>
        !(props.checkStrictly ? curr.disabled : curr.passingDisabled) && curr.selectable !== false,
    ),
  );
  const isCheckAll = computed(
    () =>
      visibleOptions.value.length > 0 &&
      visibleOptions.value.every(curr => presetModelValueSet.value.has(curr._uuid)),
  );
  const isIndeterminate = computed(
    () =>
      !isCheckAll.value &&
      visibleOptions.value.some(curr => presetModelValueSet.value.has(curr._uuid)),
  );

  function toggleCheckAll() {
    if (
      canBeCheckedOptions.value.length > 0 &&
      canBeCheckedOptions.value.every(curr => presetModelValueSet.value.has(curr._uuid))
    ) {
      canBeCheckedOptions.value.forEach(optionValue => {
        presetModelValueSet.value.has(optionValue._uuid) && pickOption(optionValue._uuid);
      });
    } else {
      canBeCheckedOptions.value.forEach(optionValue => {
        !presetModelValueSet.value.has(optionValue._uuid) && pickOption(optionValue._uuid);
      });
    }

    if (!props.needConfirm) {
      searchPanelEmit('confirm');
    }
  }

  return {
    isCheckAll,
    isIndeterminate,
    toggleCheckAll,
  };
}
