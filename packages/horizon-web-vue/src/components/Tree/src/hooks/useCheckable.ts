import type { ToRefs, VNode } from 'vue';
import { computed, reactive, ref, watch } from 'vue';
import { normalizeTreeData, TreeSelectionController } from '@aurora/core';
import type { TreeStateReason } from '@aurora/core';
import type { TreeProps } from '../composables/useProps';
import type Tree from '~/utils/useTree/index';
import type { HTreeData, HTreeExtendsData, HTreeUuidType } from '../utils/types';
import type { HorizonWebSetupContext } from '@aurora/utils';
import type { TreeEmits } from '../composables/useEmits';

export default function (
  props: ToRefs<TreeProps>,
  tree: Tree<HTreeData, HTreeExtendsData>,
  emit: HorizonWebSetupContext<TreeEmits>['emit'],
) {
  const selectedValuesUuid = reactive<Set<HTreeUuidType>>(new Set());
  const stateVersion = ref(0);
  // Core controller synchronization acknowledges an externally controlled value. It must not be
  // reflected back as a new user selection (TreeSelect may intentionally pass parent path values).
  const selectionChangedByInteraction = ref(false);
  const controller = new TreeSelectionController<HTreeData>();
  const isCheckComponentVisible = computed(() => props.showRadio.value || props.showCheckbox.value);

  function syncLegacyValues(fromInteraction = false) {
    selectedValuesUuid.clear();
    controller.selectedValues.forEach(value => selectedValuesUuid.add(value));
    selectionChangedByInteraction.value = fromInteraction;
    stateVersion.value++;
  }

  function syncTree(values = props.selectedValues?.value) {
    controller.setOptions({
      multiple: props.multiple.value,
      multipleLimit: props.multipleLimit.value,
      checkStrictly: props.checkStrictly.value,
      parentEffectDisabledChild: props.parentEffectDisabledChild.value,
    });
    try {
      controller.setTree(
        normalizeTreeData(tree.originTreeData, tree.fieldMapping as Record<string, string>),
      );
      if (Array.isArray(values)) {
        // Vue historically gives an explicit descendant precedence over its selected parent.
        // Normalize that input before handing the actual linked-selection transition to Core.
        const normalized = normalizeTreeData(
          tree.originTreeData,
          tree.fieldMapping as Record<string, string>,
        );
        const requested = props.checkStrictly.value
          ? values
          : values.filter(value => {
              const node = normalized.byValue.get(value);
              return (
                !node ||
                node.isLeaf ||
                !normalized.flat.some(
                  candidate =>
                    candidate.value !== value &&
                    values.includes(candidate.value) &&
                    node.keyPath.every((part, index) => candidate.keyPath[index] === part),
                )
              );
            });
        controller.sync(requested);
      }
      syncLegacyValues();
    } catch {
      // Keep the legacy projection stable while callers hold temporary invalid option data.
    }
  }

  watch(
    [
      () => props.selectedValues?.value?.slice(),
      tree.flattenTreeData,
      props.multiple,
      props.multipleLimit,
      props.checkStrictly,
      props.parentEffectDisabledChild,
    ],
    () => syncTree(),
    { immediate: true },
  );

  const fullCheckedValues = computed(() => {
    stateVersion.value;
    const selected = controller.selectedValues;
    return props.checkStrictly.value
      ? selected
      : [...selected, ...controller.allCheckedValues.filter(value => !selected.includes(value))];
  });
  const halfCheckedValues = computed(() => {
    stateVersion.value;
    return controller.halfCheckedValues;
  });

  function switchNodeSelectedStatus(
    uuid: string | number,
    check: boolean,
    evt?: Event,
    vNode?: VNode,
    emitEvent = true,
  ) {
    const node = tree.flattenTreeData.value.find(curr => curr._uuid === uuid);
    if (!node) return;

    const reason: TreeStateReason = evt instanceof KeyboardEvent ? 'keyboard' : 'pointer';
    // Prop watchers are normally flushed before browser interaction, but synchronize the
    // controller here as well so a same-tick checkStrictly/multiple change cannot run stale.
    controller.setOptions({
      multiple: props.multiple.value,
      multipleLimit: props.multipleLimit.value,
      checkStrictly: props.checkStrictly.value,
      parentEffectDisabledChild: props.parentEffectDisabledChild.value,
    });
    if (props.checkStrictly.value) controller.sync(selectedValuesUuid);
    // A linked parent can render checked because every descendant is checked, yet it is not in
    // the strict controller's selected set. Its first strict-mode interaction must therefore
    // select the branch rather than deselect the descendant-derived visual state.
    const nextChecked = props.checkStrictly.value && !selectedValuesUuid.has(uuid) ? true : check;
    const result = controller.set(node.value, nextChecked, reason);
    if (['disabled', 'unselectable', 'branch', 'limit', 'missing'].includes(result.status)) return;
    syncLegacyValues(true);

    if (emitEvent) {
      emit('select', result.values, tree.getOptionValue(node, 'value'), {
        checked: result.selected,
        node: node.originOption,
        nodeComputed: node,
        vnode: vNode,
        allCheckedValues: result.allCheckedValues,
        halfCheckedValues: result.halfCheckedValues,
        nativeEvent: evt,
      });
    }
  }

  function updateSelectedStatusByProps() {
    syncTree();
  }

  function clearSelectedValues() {
    controller.clear('imperative');
    syncLegacyValues(true);
  }

  return {
    selectedValuesUuid,
    selectionChangedByInteraction,
    switchNodeSelectedStatus,
    fullCheckedValues,
    halfCheckedValues,
    isCheckComponentVisible,
    updateSelectedStatusByProps,
    clearSelectedValues,
  };
}
