import type { VNode } from 'vue';
import { cloneVNode, computed, defineComponent, onMounted, onUpdated, provide, toRefs } from 'vue';
import type { TimelineDotCommonProps } from '@aurora/core';
import {
  getTimelineFoldIndexes,
  resolveTimelineEndpointDot,
  sortTimelineItems,
} from '@aurora/core';
import { applyTimelineFoldVisibility } from '@aurora/horizon-web-core';
import { useTimelineProps } from './composables/useProps';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { ComponentClassBlock, isObject, slotAdapter, useNamespace } from '@aurora/utils';
import type { TimelineSlots } from './composables/useSlots';
import { useTimelineSlots } from './composables/useSlots';

interface TimelineFoldRequest {
  number: number;
  uid: string;
}
export default defineComponent({
  name: `${useNamespace()}Timeline`,
  desc: '垂直展示的时间流信息，例如对任务跟踪、操作历史的回顾',
  descLocales: {
    en: 'Use a timeline for milestones, state changes, or activity records arranged by time. Forward and reverse order support different reading directions.',
  },
  props: useTimelineProps,
  slots: useTimelineSlots,
  setup(props, { slots }: HorizonWebSetupContext<{}, TimelineSlots>) {
    const { sort: sortProp, first: firstProp, last: lastProp } = toRefs(props);
    const classHelper = new ComponentClassBlock('timeline');

    const renderedItems = computed(() => {
      const content =
        slotAdapter(slots.default)?.filter(
          (vNode: VNode) =>
            isObject(vNode.type) &&
            'name' in vNode.type &&
            vNode.type?.name?.endsWith('TimelineItem'),
        ) ?? [];
      const sorted = sortTimelineItems(content, sortProp.value, vnode => vnode.props?.timestamp);
      return sorted.map((vnode, index) =>
        cloneVNode(
          vnode,
          resolveTimelineEndpointDot(
            (vnode.props ?? {}) as TimelineDotCommonProps<string>,
            index,
            sorted.length,
            firstProp.value,
            lastProp.value,
          ) as Record<string, unknown>,
        ),
      );
    });

    function applyFold(request: TimelineFoldRequest, hidden: boolean) {
      const ownerIndex = renderedItems.value.findIndex(
        vnode => vnode.component?.uid === Number(request.uid),
      );
      if (ownerIndex === -1) return;
      const itemElements = renderedItems.value.map(vnode =>
        vnode.el instanceof HTMLElement ? vnode.el : undefined,
      );
      if (itemElements.some(element => element === undefined)) return;

      applyTimelineFoldVisibility({
        hidden,
        indexes: getTimelineFoldIndexes(ownerIndex, request.number, itemElements.length),
        items: itemElements as HTMLElement[],
        ownerId: request.uid,
      });
    }

    provide('HTimeline', {
      hide: (request: TimelineFoldRequest) => applyFold(request, true),
      show: (request: TimelineFoldRequest) => applyFold(request, false),
    });

    function syncItemUids() {
      renderedItems.value.forEach(vnode => {
        if (vnode.el instanceof HTMLElement && vnode.component) {
          vnode.el.dataset.uid = String(vnode.component.uid);
        }
      });
    }

    onMounted(syncItemUids);
    onUpdated(syncItemUids);

    return () => <ul class={`${classHelper.block}`}>{renderedItems.value}</ul>;
  },
});
