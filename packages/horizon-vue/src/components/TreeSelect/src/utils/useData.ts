import type { Ref, ToRefs } from 'vue';
import { computed, inject, nextTick, onBeforeUnmount, ref, watch } from 'vue';
import { TreeSelectController, type TreeSelectModelValue, type TreeValue } from '@aurora/core';
import type { TreeSelectProps } from '../composables/useProps';
import type { HTreeSelectContext } from './types';
import type { HTreeData, HTreeExtendsData, HTreeUuidType } from '~/components/Tree/src/utils/types';
import {
  HFormDisabledInjectedKey,
  HFormItemTriggerInjectedKey,
} from '~/components/Form/src/utils/injectedKeys';
import type TreeHelper from '~/utils/useTree/index';

/**
 * 将 Vue 的响应式 props/事件投影到共享 TreeSelect 会话控制器。
 * @en Projects Vue reactive props and events onto the shared TreeSelect session controller.
 */
export default function useData(
  props: ToRefs<TreeSelectProps>,
  context: HTreeSelectContext,
  treeHelper: TreeHelper<HTreeData, HTreeExtendsData>,
  emitChange: (value: TreeSelectModelValue) => void,
) {
  const modelValue = ref<TreeSelectModelValue>();
  const modelValueSet = ref(new Set<HTreeUuidType>());
  const presetModelValueSet = ref(new Set<HTreeUuidType>());
  const visibleNodes = ref<HTreeExtendsData[]>([]);
  const stateVersion = ref(0);

  const formItemTrigger = inject(HFormItemTriggerInjectedKey, undefined);
  const formDisabled = inject(HFormDisabledInjectedKey, undefined);
  const isDisabled = computed(() => props.disabled?.value ?? formDisabled?.value ?? false);

  const sourceValue = () =>
    (props.modelValue?.value === undefined
      ? props.selectedValues.value
      : props.modelValue.value) as TreeSelectModelValue;
  const initialValue = () =>
    typeof props.initialValue.value === 'symbol'
      ? undefined
      : (props.initialValue.value as TreeSelectModelValue);

  const controller = new TreeSelectController<HTreeData>({
    value: sourceValue(),
    initialValue: initialValue(),
    treeData: props.treeData.value,
    fieldMap: props.fieldMap?.value as Record<string, string> | undefined,
    disabled: isDisabled.value,
    multiple: props.multiple.value,
    multipleLimit: props.multipleLimit.value,
    checkStrictly: props.checkStrictly.value,
    parentEffectDisabledChild: props.parentEffectDisabledChild.value,
    needConfirm: props.needConfirm.value,
    controlledPolicy: 'optimistic',
    dismissBehavior: 'reset-on-open',
    clearBehavior: 'commit',
    removeBehavior: 'commit',
    onValueChange: value => {
      syncSnapshot();
      context.emit('update:modelValue', value);
      emitChange(value);
      void nextTick(() => formItemTrigger?.('change'));
    },
    onPendingValueChange: () => syncSnapshot(),
  });

  function syncSnapshot() {
    const snapshot = controller.snapshot;
    modelValue.value = snapshot.value;
    modelValueSet.value = new Set(snapshot.values);
    presetModelValueSet.value = new Set(snapshot.pendingValues);
    stateVersion.value++;
  }

  syncSnapshot();

  watch(
    () => [props.modelValue?.value, props.selectedValues.value] as const,
    () => {
      const next = sourceValue();
      controller.syncValue(next);
      syncSnapshot();
    },
    { deep: true },
  );

  watch(
    () => [props.treeData.value, props.fieldMap?.value] as const,
    ([value, fieldMap]) => {
      // HTree owns the legacy Vue projection while Core owns normalization and behavior.
      treeHelper.dealFieldMapping(fieldMap ?? {});
      treeHelper.setTreeData(value);
      try {
        controller.setTreeData(value, fieldMap as Record<string, string> | undefined);
      } catch {
        // Tree data and its mapping can arrive in separate controlled updates. Keep the last
        // valid Core projection until the matching pair is available.
        return;
      }
      syncSnapshot();
    },
    { deep: true },
  );

  watch(
    [
      props.multiple,
      props.multipleLimit,
      props.checkStrictly,
      props.parentEffectDisabledChild,
      props.needConfirm,
      isDisabled,
      props.initialValue,
    ],
    () => {
      controller.setOptions({
        multiple: props.multiple.value,
        multipleLimit: props.multipleLimit.value,
        checkStrictly: props.checkStrictly.value,
        parentEffectDisabledChild: props.parentEffectDisabledChild.value,
        needConfirm: props.needConfirm.value,
        disabled: isDisabled.value,
        initialValue: initialValue(),
      });
      syncSnapshot();
    },
  );

  onBeforeUnmount(() => controller.destroy());

  function stageValues(values: readonly TreeValue[]) {
    const result = controller.stageValues(values);
    syncSnapshot();
    return result;
  }

  function clearValue() {
    const result = controller.clear();
    syncSnapshot();
    return result;
  }

  function removeValue(value: TreeValue) {
    const result = controller.removeValue(value);
    syncSnapshot();
    return result;
  }

  function syncOpen(open: boolean) {
    controller.syncOpen(open);
    if (open) controller.begin();
    syncSnapshot();
  }

  function setFilterValue(value: string) {
    const changed = controller.setFilterValue(value);
    syncSnapshot();
    return changed;
  }

  return {
    visibleNodes: visibleNodes as Ref<HTreeExtendsData[]>,
    modelValue,
    modelValueSet,
    presetModelValueSet,
    isDisabled,
    stateVersion,
    controller,
    stageValues,
    clearValue,
    removeValue,
    syncOpen,
    syncSnapshot,
    setFilterValue,
  };
}
