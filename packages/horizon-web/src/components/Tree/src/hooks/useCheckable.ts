import type { ToRefs, VNode } from 'vue';
import { computed, reactive, watch } from 'vue';
import type { TreeProps } from '../composables/useProps';
import type Tree from '~/utils/useTree/index';
import type { NTreeData, NTreeExtendsData, NTreeUuidType } from '../utils/types';
import type { LegoSetupContext } from '@aurora/shared';
import type { TreeEmits } from '../composables/useEmits';

export default function (
  props: ToRefs<TreeProps>,
  tree: Tree<NTreeData, NTreeExtendsData>,
  emit: LegoSetupContext<TreeEmits>['emit'],
) {
  const selectedValuesUuid = reactive<Set<NTreeUuidType>>(
    new Set<NTreeUuidType>(props.selectedValues?.value),
  );

  const isCheckComponentVisible = computed(
    () =>
      props.showRadio.value ||
      props.showCheckbox.value ||
      (props.checkable?.value && props.multiple.value),
  );

  const fullCheckedValues = computed(() => {
    if (props.checkStrictly.value) {
      return Array.from(selectedValuesUuid.values());
    } else {
      const res: Array<string | number> = Array.from(selectedValuesUuid.values());

      function action(node: NTreeExtendsData) {
        if (node.isLeaf) return selectedValuesUuid.has(node._uuid);

        let count = 0;

        for (const child of node.transformedChildren) {
          if (action(child)) {
            count++;
          }
        }

        if (count === node.transformedChildren.length && count > 0) {
          res.push(tree.getOptionValue(node, 'value'));
          return true;
        }

        return false;
      }

      tree.transformedTreeData.value.forEach(rootNode => action(rootNode));

      return res;
    }
  });

  const halfCheckedValues = computed<Array<string | number>>(() => {
    if (props.checkStrictly.value || selectedValuesUuid.size === 0) {
      return [];
    } else {
      const res: Array<string | number> = [];

      tree.flattenTreeData.value.forEach(node => {
        if (!node.isLeaf && !fullCheckedValues.value.includes(node._uuid)) {
          if (tree.isNodeIndeterminateForCheckbox(node, Array.from(selectedValuesUuid.values()))) {
            res.push(node._uuid);
          }
        }
      });

      return res;
    }
  });

  watch(
    () => [props.selectedValues?.value, tree.flattenTreeData.value],
    updateSelectedStatusByProps,
    {
      immediate: true,
      deep: true,
    },
  );

  /**
   * in order to remove child/root node when checkStrictly set false
   */
  watch(props.checkStrictly, val => {
    if (!val) {
      for (const uuid of selectedValuesUuid.values()) {
        const node = tree.flattenTreeData.value.find(item => item._uuid === uuid);
        if (node && !node.isLeaf) {
          selectedValuesUuid.delete(uuid);
        }
      }
    }
  });

  /** methods **/
  function switchNodeSelectedStatus(
    uuid: string | number,
    check: boolean,
    evt?: Event,
    vNode?: VNode,
    emitEvent = true,
  ) {
    const node = tree.flattenTreeData.value.find(curr => curr._uuid === uuid);

    if (node) {
      if (node.selectable === false) return;

      if (props.multiple.value) {
        if (props.checkStrictly.value) {
          if (selectedValuesUuid.has(uuid)) {
            !check && selectedValuesUuid.delete(uuid);
          } else {
            if (check && props.multipleLimit.value > selectedValuesUuid.size) {
              selectedValuesUuid.add(uuid);
            }
          }
        } else {
          switchChildrenCheckedStatus(node, check);
        }
      } else {
        if (!node.isLeaf && !props.checkStrictly.value) return;

        selectedValuesUuid.clear();
        selectedValuesUuid.add(uuid);
      }

      if (emitEvent) {
        emit(
          'select',
          Array.from(selectedValuesUuid.values()),
          tree.getOptionValue(node, 'value'),
          {
            checked: check,
            node: node.originOption,
            nodeComputed: node,
            vnode: vNode,
            allCheckedValues: fullCheckedValues.value,
            halfCheckedValues: halfCheckedValues.value,
            nativeEvent: evt,
          },
        );
      }
    }
  }

  function switchChildrenCheckedStatus(node: NTreeExtendsData, check = true) {
    if (
      (!node.disabled || (node.disabled && props.parentEffectDisabledChild.value)) &&
      node.selectable !== false
    ) {
      if (
        !props.checkStrictly.value &&
        (!node.passingDisabled || (node.passingDisabled && props.parentEffectDisabledChild.value))
      ) {
        if (node.isLeaf) {
          check
            ? props.multipleLimit.value > selectedValuesUuid.size &&
              selectedValuesUuid.add(node._uuid)
            : selectedValuesUuid.delete(node._uuid);
        } else {
          node.transformedChildren.forEach(currNode =>
            switchChildrenCheckedStatus(currNode, check),
          );
        }
      }
    }
  }

  function updateSelectedStatusByProps() {
    const values = props.selectedValues?.value;

    if (Array.isArray(values) && tree.flattenTreeData.value.length) {
      selectedValuesUuid.clear();
      values.forEach(value => {
        if (props.checkStrictly.value) {
          selectedValuesUuid.add(value);
        } else {
          const node = tree.getInfoByValue(value);
          if (node) {
            if (node.isLeaf) {
              selectedValuesUuid.add(value);
            } else {
              if (
                !tree.flattenTreeData.value.some(
                  curr =>
                    curr.path.includes(value) &&
                    curr._uuid !== node._uuid &&
                    values.includes(curr.value),
                )
              ) {
                switchNodeSelectedStatus(value, true, undefined, undefined, false);
              }
            }
          } else {
            selectedValuesUuid.add(value);
          }
        }
      });
    }
  }

  return {
    selectedValuesUuid,
    switchNodeSelectedStatus,
    fullCheckedValues,
    halfCheckedValues,
    isCheckComponentVisible,
    updateSelectedStatusByProps,
  };
}
