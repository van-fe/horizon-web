import { onBeforeUnmount, provide, watch } from 'vue';
import { CascaderSelectionController } from '@aurora/core';
import type { HorizonWebSetupContext } from '@aurora/utils';
import type { CascaderProps } from '../composables/useProps';
import type { CascaderEmits } from '../composables/useEmits';
import type { CascaderSlots } from '../composables/useSlots';
import type { CascaderExposes } from '../composables/useExposes';
import type {
  CascaderDomRefs,
  HCascaderExtendOption,
  HCascaderUuidType,
  ModelValueSingleType,
} from '../utils/types';
import { HCascaderPickOptionInjectKey } from '../utils/injectKeys';
import { toCoreCascaderOption } from '../utils/coreAdapter';

export default function useOption(
  props: CascaderProps,
  context: HorizonWebSetupContext<CascaderEmits, CascaderSlots, CascaderExposes>,
  options: {
    domRefs: CascaderDomRefs;
    optionListMap: Readonly<{
      value: Map<HCascaderUuidType, HCascaderExtendOption>;
    }>;
    modelValueSet: { value: Set<HCascaderUuidType> };
    presetModelValueSet: { value: Set<HCascaderUuidType> };
    isOutOfLimit: Readonly<{ value: boolean }>;
    delInput: (value: string, controlPopperVisible?: boolean) => void;
    manualControlPopperVisible: (visible: boolean) => void;
    judgeWhetherInputCanFocus: () => void;
    setModified: (option: HCascaderExtendOption | undefined, type?: boolean) => void;
    emitSelectOrDeselect: () => void;
    transformUuidsToModelValue: (
      uuids: HCascaderUuidType[],
      multiple?: boolean,
    ) => ModelValueSingleType | ModelValueSingleType[] | undefined;
  },
) {
  const collapseTimers = new Set<ReturnType<typeof setTimeout>>();
  const selectionController = new CascaderSelectionController();
  function pickOption(
    uuid: HCascaderUuidType,
    singleChooseHide = true,
    forcePick = false,
    emitChange = true,
    singlePickToClear = false,
  ) {
    let hasChangedValue = false;
    const optionData = options.optionListMap.value.get(uuid);

    options.setModified(optionData);

    if (optionData && !singlePickToClear) {
      selectionController.setOptions({
        value: options.transformUuidsToModelValue(
          Array.from(options.presetModelValueSet.value),
          props.multiple,
        ),
        multiple: props.multiple,
        multipleLimit: props.multipleLimit,
        checkStrictly: props.checkStrictly,
        needConfirm: props.needConfirm,
      });
      const status = selectionController.select(toCoreCascaderOption(optionData)).status;
      if (['disabled', 'unselectable', 'branch', 'limit', 'unchanged'].includes(status)) return;
    }

    if (optionData?.disabled || (!props.checkStrictly && optionData?.passingDisabled)) return;
    if (optionData?.selectable === false) return;

    // With linked parent/child selection, parent state can only be changed through its children.
    if (optionData && !optionData.isLeaf && !props.checkStrictly) return;

    if (props.multiple) {
      if (options.presetModelValueSet.value.has(uuid)) {
        options.presetModelValueSet.value.delete(uuid);
        options.setModified(optionData, false);
        hasChangedValue = true;

        if (!props.reserveKeyword) {
          options.delInput('');
        }
      } else {
        if (options.isOutOfLimit.value) return;

        options.presetModelValueSet.value.add(uuid);
        options.setModified(optionData, true);
        hasChangedValue = true;

        if (!props.reserveKeyword || props.reserveKeyword === 'reserve-deselect') {
          options.delInput('');
        }
      }
    } else if (singlePickToClear) {
      hasChangedValue = true;
      if (options.presetModelValueSet.value.has(uuid)) {
        options.setModified(optionData, false);
        options.presetModelValueSet.value.delete(uuid);
      } else {
        options.setModified(optionData, true);
        options.presetModelValueSet.value.add(uuid);
      }
    } else {
      options.setModified(optionData, true);
      if (!options.presetModelValueSet.value.has(uuid)) {
        hasChangedValue = true;
        options.presetModelValueSet.value = new Set([uuid]);
      }
    }

    if (!props.needConfirm || forcePick) {
      confirmHandle(props.multiple ? false : singleChooseHide);
    }

    options.judgeWhetherInputCanFocus();

    if (emitChange && hasChangedValue) {
      context.emit('change', options.presetModelValueSet.value.has(uuid), optionData);
    }

    const collapseTimer = setTimeout(() => {
      collapseTimers.delete(collapseTimer);
      options.domRefs.tagGroupDomRef.value?.doCollapseCalculate();
    }, 500);
    collapseTimers.add(collapseTimer);
  }

  function confirmHandle(hidePopper = true, isTriggerByConfirmClick = false) {
    options.modelValueSet.value = new Set(options.presetModelValueSet.value);

    if (hidePopper) {
      options.manualControlPopperVisible(false);
    } else {
      options.judgeWhetherInputCanFocus();
    }

    options.emitSelectOrDeselect();

    if (isTriggerByConfirmClick) {
      const value = options.transformUuidsToModelValue(
        Array.from(options.presetModelValueSet.value),
      );
      context.emit('confirm', value);
    }
  }

  function cancelHandle() {
    options.manualControlPopperVisible(false);
    const value = options.transformUuidsToModelValue(Array.from(options.presetModelValueSet.value));
    context.emit('cancel', value);
  }

  watch(
    () => props.checkStrictly,
    value => {
      if (!value) {
        options.modelValueSet.value.forEach((uuid, _, set) => {
          const option = options.optionListMap.value.get(uuid);

          if (option && !option.isLeaf) {
            set.delete(option._uuid);
          }
        });
      }
    },
  );

  provide(HCascaderPickOptionInjectKey, pickOption);

  onBeforeUnmount(() => {
    for (const timer of collapseTimers) clearTimeout(timer);
    collapseTimers.clear();
  });

  return {
    pickOption,
    confirmHandle,
    cancelHandle,
  };
}
