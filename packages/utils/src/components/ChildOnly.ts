import { computed, defineComponent } from 'vue';
import type { VNode } from 'vue';
import { useNamespace } from '../useHelpler';

export const HChildOnly = defineComponent({
  name: `${useNamespace()}ChildOnly`,
  setup(_, { slots, expose }) {
    let slotArr: VNode[] | undefined = undefined;
    const elComputed = computed(() => slotArr?.[0]?.el);
    expose({ el: elComputed });
    return () => {
      slotArr = slots?.default?.();
      return slotArr;
    };
  },
});
