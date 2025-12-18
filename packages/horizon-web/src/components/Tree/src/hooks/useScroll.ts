import type { ToRefs, Ref, VNode, ComputedRef } from 'vue';
import { watch, ref } from 'vue';
import type { TreeProps } from '../composables/useProps';
import type Tree from '~/utils/useTree/index';
import type { NTreeData, NTreeExtendsData } from '../utils/types';
import { warn } from '~/utils/useLog';
import type { LegoComponentInstance } from '@aurora/utils';
import { ComponentClassBlock } from '@aurora/utils';
import type { VirtualScrollerExposes } from '~/components/VirtualScroller/src/composables/useExposes';
import { sleep } from '~/utils/tools';
import type { NVirtualScroller } from '~/components/VirtualScroller';

export default function useScroll(
  props: ToRefs<TreeProps>,
  tree: Tree<NTreeData, NTreeExtendsData>,
  scrollerDomRef: Ref<LegoComponentInstance<
    typeof NVirtualScroller,
    VirtualScrollerExposes
  > | null>,
  visibleItems: ComputedRef<NTreeExtendsData[]>,
  vNodesMapping: Map<string | number, VNode | undefined>,
  setCollapseStatusByValue: (values: Array<string | number>, isExpand: boolean) => void,
) {
  const isScrolling = ref(false);
  const scrollingEndQueue: Function[] = [];

  watch(isScrolling, () => {
    runScrollEndQueue();
  });

  function runScrollEndQueue() {
    if (!isScrolling.value) {
      let task;

      while ((task = scrollingEndQueue.shift())) {
        task();
      }
    }
  }

  async function scrollTo(value?: string | number) {
    if (value === undefined) {
      value = props.selectedValues?.value?.[0];

      if (value === undefined) {
        warn('tree', 'ScrollTo have no target. Because selectedValues is empty');
        return;
      }
    }

    setCollapseStatusByValue([value], true);
    await sleep();

    if (props.useVirtualScroll.value) {
      const index = visibleItems.value.findIndex(curr => curr.value === value);

      scrollerDomRef.value?.scrollToItem(index);
    }

    scrollingEndQueue.push(() => {
      const itemClassHelper = new ComponentClassBlock('tree-item');

      vNodesMapping
        .get(value)
        ?.el?.querySelector(`.${itemClassHelper.e('content')}`)
        ?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
    });

    runScrollEndQueue();
  }

  return {
    isScrolling,
    scrollTo,
  };
}
