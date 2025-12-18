import type { TreeProps } from '../composables/useProps';
import type { ComputedRef, Ref } from 'vue';
import { computed, inject } from 'vue';
import { NTreeSizeInjectKey } from '../utils/injectKeys';
import type { NTreeData, NTreeExtendsData } from '../utils/types';
import type Tree from '~/utils/useTree/index';

export default function usePadding(
  treeProps: TreeProps,
  options: {
    treeItem: Ref<NTreeExtendsData>;
    isLoading: ComputedRef<boolean>;
    treeHelper: Tree<NTreeData, NTreeExtendsData>;
    indent: Ref<number>;
  },
) {
  const size = inject(NTreeSizeInjectKey)!;

  function getPadding(level: number) {
    return (
      ((treeProps.foldIcon ? (size.value === 'huge' ? 20 : 16) : 0) + 8) * level +
      (!treeProps.draggable ? 8 : 16)
    );
  }

  const paddingLeft = computed(
    () =>
      getPadding(options.treeItem.value.level) +
      (options.isLoading.value ||
      !options.treeHelper.getOptionValue(options.treeItem.value, 'isLeaf')
        ? 0
        : options.indent.value),
  );

  return {
    paddingLeft,
    getPadding,
  };
}
