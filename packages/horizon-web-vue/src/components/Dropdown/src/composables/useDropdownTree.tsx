import { nextTick, onScopeDispose, ref, watch } from 'vue';
import type { VNodeChild } from 'vue';
import type { HDropdownTreeData } from '../utils/types';
import HScrollbar from '~/components/Scrollbar/src/Scrollbar';
import useMapTree from '~/utils/useMapTree';

export default function useDropdownTree() {
  const { tree, appendChild, removeChild } = useMapTree<HDropdownTreeData>();
  const dropdownTree = tree.value;
  const hasNestedChildren = ref(false);
  let updateVersion = 0;

  function getHasNestedChildren(tree = dropdownTree) {
    return Array.from(tree.values()).some(item => (item.children?.size || 0) > 0);
  }

  watch(
    dropdownTree,
    tree => {
      const currentVersion = ++updateVersion;

      if (getHasNestedChildren(tree)) {
        hasNestedChildren.value = true;
        return;
      }

      // 切换滚动容器时会短暂卸载子节点，等同一批生命周期结束后再确认层级已减少。
      nextTick(() => {
        if (currentVersion !== updateVersion) return;

        hasNestedChildren.value = getHasNestedChildren();
      });
    },
    {
      deep: true,
      flush: 'post',
    },
  );

  onScopeDispose(() => {
    updateVersion++;
  });

  function renderContent(content: VNodeChild) {
    if (hasNestedChildren.value) return content;

    return (
      <HScrollbar maxHeight={296} size="small">
        {content}
      </HScrollbar>
    );
  }

  return {
    dropdownTree,
    hasNestedChildren,
    appendChild,
    removeChild,
    renderContent,
  };
}
