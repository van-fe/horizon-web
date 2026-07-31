import type { ToRefs, VNode } from 'vue';
import { computed, reactive, watch } from 'vue';
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
  const selectedValuesUuid = reactive<Set<HTreeUuidType>>(
    new Set<HTreeUuidType>(props.selectedValues?.value),
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
      const checkedStatus = new Map<HTreeExtendsData, boolean>();
      const stack = tree.transformedTreeData.value
        .slice()
        .reverse()
        .map(node => ({ node, visited: false }));

      while (stack.length > 0) {
        const { node, visited } = stack.pop()!;

        if (node.isLeaf) {
          checkedStatus.set(node, selectedValuesUuid.has(node._uuid));
          continue;
        }

        if (!visited) {
          stack.push({ node, visited: true });

          for (let i = node.transformedChildren.length - 1; i >= 0; i--) {
            stack.push({ node: node.transformedChildren[i], visited: false });
          }

          continue;
        }

        const checked =
          node.transformedChildren.length > 0 &&
          node.transformedChildren.every(child => checkedStatus.get(child));

        checkedStatus.set(node, checked);

        if (checked) {
          res.push(tree.getOptionValue(node, 'value'));
        }
      }

      return res;
    }
  });

  const halfCheckedValues = computed<Array<string | number>>(() => {
    if (props.checkStrictly.value || selectedValuesUuid.size === 0) {
      return [];
    } else {
      const res: Array<string | number> = [];
      const fullyCheckedUuid = new Set(fullCheckedValues.value);
      const indeterminateUuid = new Set<string | number>();

      for (const uuid of selectedValuesUuid) {
        let current = tree.flattenTreeDataMapping.value.get(uuid);

        while (current) {
          indeterminateUuid.add(current._uuid);
          current = current.parent ?? undefined;
        }
      }

      tree.flattenTreeData.value.forEach(node => {
        if (
          !node.isLeaf &&
          !fullyCheckedUuid.has(node._uuid) &&
          indeterminateUuid.has(node._uuid)
        ) {
          res.push(node._uuid);
        }
      });

      return res;
    }
  });

  watch(
    [() => props.selectedValues?.value?.slice(), tree.flattenTreeData],
    updateSelectedStatusByProps,
    {
      immediate: true,
    },
  );

  /**
   * in order to remove child/root node when checkStrictly set false
   * @en Description for watch.
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

  function switchChildrenCheckedStatus(node: HTreeExtendsData, check = true) {
    const stack = [node];

    while (stack.length > 0) {
      const current = stack.pop()!;

      if (
        (!current.disabled || (current.disabled && props.parentEffectDisabledChild.value)) &&
        current.selectable !== false &&
        !props.checkStrictly.value &&
        (!current.passingDisabled ||
          (current.passingDisabled && props.parentEffectDisabledChild.value))
      ) {
        if (current.isLeaf) {
          check
            ? props.multipleLimit.value > selectedValuesUuid.size &&
              selectedValuesUuid.add(current._uuid)
            : selectedValuesUuid.delete(current._uuid);
        } else {
          for (let i = current.transformedChildren.length - 1; i >= 0; i--) {
            stack.push(current.transformedChildren[i]);
          }
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
                    curr._uuid !== node._uuid &&
                    values.includes(curr.value) &&
                    tree.isDescendantOf(curr, node, false),
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
