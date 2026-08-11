import { computed, nextTick, provide, ref, watch } from 'vue';
import type { HorizonWebSetupContext } from '@aurora/utils';
import type { CascaderProps } from '../composables/useProps';
import type { CascaderEmits } from '../composables/useEmits';
import type { CascaderSlots } from '../composables/useSlots';
import type { CascaderExposes } from '../composables/useExposes';
import type {
  HCascaderExtendOption,
  HCascaderOption,
  HCascaderUuidType,
  ModelValueSingleType,
  ModelValueType,
} from '../utils/types';
import {
  HCascaderChosenOptionListInjectKey,
  HCascaderIsOutOfLimitInjectKey,
  HCascaderModelValueInjectKey,
  HCascaderPresetModelValueInjectKey,
} from '../utils/injectKeys';
import { transformModelValue } from '../utils/useOptions';
import { isEqualLoose } from '../utils/utils';
import { isEmpty } from '~/components/Select/src/utils/utils';
import type Tree from '~/utils/useTree';

export default function useModelValue(
  props: CascaderProps,
  context: HorizonWebSetupContext<CascaderEmits, CascaderSlots, CascaderExposes>,
  options: {
    tree: Tree<HCascaderOption, HCascaderExtendOption>;
    optionListMap: Readonly<{
      value: Map<HCascaderUuidType, HCascaderExtendOption>;
    }>;
    optionsVersion: Readonly<{ value: number }>;
    triggerFormChange?: () => void;
  },
) {
  const modelValue = ref<ModelValueType>();
  const modelValueSet = ref(new Set<HCascaderUuidType>());
  const presetModelValueSet = ref(new Set<HCascaderUuidType>());
  const unmatchedValuePathByUuid = new Map<HCascaderUuidType, ModelValueSingleType>();
  const unmatchedUuidByValuePath = new Map<string, HCascaderUuidType>();
  let nextUnmatchedUuid = -1;
  let modifiedType: boolean | undefined;
  let modifiedOption: HCascaderExtendOption | undefined;

  function getUuidByValuePath(valuePath: ModelValueSingleType) {
    const target = options.tree.getInfoByPath(valuePath);

    if (target) return target._uuid;

    const pathKey = JSON.stringify(valuePath);
    const cachedUuid = unmatchedUuidByValuePath.get(pathKey);

    if (cachedUuid !== undefined) return cachedUuid;

    const uuid = nextUnmatchedUuid--;
    unmatchedUuidByValuePath.set(pathKey, uuid);
    unmatchedValuePathByUuid.set(uuid, valuePath.slice());
    return uuid;
  }

  function getValuePathByUuid(uuid: HCascaderUuidType) {
    return options.optionListMap.value.get(uuid)?.path ?? unmatchedValuePathByUuid.get(uuid);
  }

  function transformUuidsToModelValue(uuids: HCascaderUuidType[], multiple = props.multiple) {
    const valuePaths = uuids
      .map(getValuePathByUuid)
      .filter((valuePath): valuePath is ModelValueSingleType => !!valuePath);

    return multiple ? valuePaths : valuePaths[0];
  }

  function syncSelectedValuesFromProps() {
    modelValueSet.value = new Set(transformModelValue(props.modelValue).map(getUuidByValuePath));
  }

  function resolveLoadedSelectedValues() {
    for (const selectedValues of [modelValueSet.value, presetModelValueSet.value]) {
      for (const uuid of selectedValues) {
        const valuePath = unmatchedValuePathByUuid.get(uuid);
        const target = valuePath ? options.tree.getInfoByPath(valuePath) : undefined;

        if (target) {
          selectedValues.delete(uuid);
          selectedValues.add(target._uuid);
        }
      }
    }
  }

  function updateModelValue() {
    const value = transformUuidsToModelValue(Array.from(modelValueSet.value));
    modelValue.value = isEmpty(value)
      ? (props.initialValue as Exclude<CascaderProps['initialValue'], symbol>)
      : value;
  }

  function reserveNumberOfModelValues(reserveAmount = 1) {
    if (reserveAmount === Infinity || reserveAmount >= modelValueSet.value.size) {
      return false;
    }

    if (reserveAmount <= 0) {
      modelValueSet.value.clear();
      return false;
    }

    let count = 0;

    for (const item of modelValueSet.value.values()) {
      if (count < reserveAmount) {
        count++;
        continue;
      }
      modelValueSet.value.delete(item);
      count++;
    }

    return true;
  }

  function setModified(option: HCascaderExtendOption | undefined, type?: boolean) {
    if (type !== undefined) {
      modifiedType = type;
    }
    modifiedOption = option;
  }

  function emitSelectOrDeselect() {
    modifiedType
      ? context.emit('select', modifiedOption?.path, modifiedOption)
      : context.emit('deselect', modifiedOption?.path, modifiedOption);
  }

  function getShowLabel(uuid: HCascaderUuidType) {
    const option = options.optionListMap.value.get(uuid);
    const unmatchedValuePath = unmatchedValuePathByUuid.get(uuid);

    if (props.showCheckedStrategy === 'fullPath') {
      return (
        option?.uuidPath
          .map(pathUuid => {
            const target = options.optionListMap.value.get(pathUuid);
            return target?.stringLabel ?? (target?.label as string) ?? '';
          })
          .join(` ${props.pathSeparator} `) ??
        unmatchedValuePath?.join(` ${props.pathSeparator} `) ??
        uuid
      );
    }

    return option?.stringLabel ?? (option?.label as string) ?? unmatchedValuePath?.at(-1) ?? '';
  }

  const isOutOfLimit = computed(() =>
    props.multiple ? props.multipleLimit <= presetModelValueSet.value.size : false,
  );
  const chosenOptionList = computed(() =>
    Array.from(presetModelValueSet.value.values())
      .map(uuid => options.optionListMap.value.get(uuid))
      .filter((option): option is HCascaderExtendOption => !!option),
  );

  watch(
    modelValue,
    value => {
      if (!isEqualLoose(value, props.modelValue)) {
        context.emit('update:modelValue', value);
        context.emit('modify', value, modifiedType, modifiedOption);
        if (options.triggerFormChange) {
          void nextTick(options.triggerFormChange);
        }
      }
    },
    { deep: true },
  );
  watch(
    modelValueSet,
    value => {
      presetModelValueSet.value = new Set(value);
      updateModelValue();
    },
    { deep: true },
  );
  watch(
    () => props.multiple,
    value => {
      if (!value) {
        if (!reserveNumberOfModelValues()) {
          updateModelValue();
        }
      } else {
        updateModelValue();
      }
    },
  );
  watch(
    () => props.multipleLimit,
    value => reserveNumberOfModelValues(value),
    { immediate: true },
  );
  watch(() => props.modelValue, syncSelectedValuesFromProps, {
    immediate: true,
    deep: true,
  });
  watch(
    () => options.optionsVersion.value,
    () => {
      resolveLoadedSelectedValues();
      syncSelectedValuesFromProps();
    },
  );

  provide(HCascaderModelValueInjectKey, modelValueSet);
  provide(HCascaderPresetModelValueInjectKey, presetModelValueSet);
  provide(HCascaderIsOutOfLimitInjectKey, isOutOfLimit);
  provide(HCascaderChosenOptionListInjectKey, chosenOptionList);

  return {
    modelValue,
    modelValueSet,
    presetModelValueSet,
    isOutOfLimit,
    chosenOptionList,
    getShowLabel,
    getValuePathByUuid,
    transformUuidsToModelValue,
    reserveNumberOfModelValues,
    setModified,
    emitSelectOrDeselect,
    updateModelValue,
  };
}
