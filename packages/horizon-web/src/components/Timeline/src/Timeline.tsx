import type { VNode } from 'vue';
import { onMounted, defineComponent, toRefs, provide, ref, watch } from 'vue';
import { useTimelineProps } from './composables/useProps';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { ComponentClassBlock, isObject, slotAdapter, useNamespace } from '@aurora/utils';
import type { TimelineSlots } from './composables/useSlots';
import { useTimelineSlots } from './composables/useSlots';

interface InjectObj {
  [key: string]: any;
}
export default defineComponent({
  name: `${useNamespace()}Timeline`,
  desc: '垂直展示的时间流信息，例如对任务跟踪、操作历史的回顾',
  props: useTimelineProps,
  slots: useTimelineSlots,
  setup(props, { slots }: HorizonWebSetupContext<{}, TimelineSlots>) {
    const { sort: sortProp, first: firstProp, last: lastProp } = toRefs(props);
    const classHelper = new ComponentClassBlock('timeline');
    const showItem = ref<VNode[] | undefined>([]);
    let content: VNode[] | undefined = [];
    const onHide = (injectObj: InjectObj) => {
      const deleteIndex =
        content?.findIndex(vnode => vnode.component?.uid === +injectObj.uid) ?? -1;
      if (deleteIndex !== -1) {
        showItem.value?.forEach((vnode, index) => {
          if (index > deleteIndex && index < deleteIndex + 1 + injectObj.number) {
            vnode.el!.classList.add('hidden');
            if ('hiddenUid' in vnode.el!.dataset === false) {
              vnode.el!.dataset.hiddenUid = injectObj.uid;
            }
          }
        });
      }
    };
    const onShow = (injectObj: InjectObj) => {
      showItem.value?.forEach(vnode => {
        if (vnode.el!.dataset.hiddenUid === injectObj.uid) {
          vnode.el!.classList.remove('hidden');
          delete vnode.el!.dataset.hiddenUid;
        }
      });
    };
    provide('HTimeline', {
      hide: onHide,
      show: onShow,
    });
    onMounted(() => {
      content?.forEach(vnode => {
        vnode.el!.dataset.uid = vnode.component!.uid;
      });
    });
    watch(
      () => slots?.default?.(),
      () => {
        content = slotAdapter(slots.default)?.filter(
          (vNode: VNode) =>
            isObject(vNode.type) &&
            'name' in vNode.type &&
            vNode.type?.name?.endsWith('TimelineItem'),
        );
        showItem.value = content;
      },
      {
        immediate: true,
      },
    );
    return () => {
      switch (sortProp.value) {
        case 'order':
          showItem.value?.sort(
            (a: VNode, b: VNode) => +new Date(a.props?.timestamp) - +new Date(b.props?.timestamp),
          );
          break;
        case 'reverse':
          showItem.value?.sort(
            (a: VNode, b: VNode) => +new Date(b.props?.timestamp) - +new Date(a.props?.timestamp),
          );
          break;
      }

      showItem.value?.forEach((vnode, index) => {
        if (firstProp.value && index === 0) {
          vnode.props = {
            ...vnode.props,
            ...firstProp.value,
          };
        }
        if (lastProp.value && index === content!.length - 1 && index !== 0) {
          vnode.props = {
            ...vnode.props,
            ...lastProp.value,
          };
        }
      });
      return <ul class={`${classHelper.block}`}>{showItem.value}</ul>;
    };
  },
});
