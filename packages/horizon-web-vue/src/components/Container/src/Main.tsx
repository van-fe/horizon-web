import { defineComponent } from 'vue';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { cls, ComponentClassBlock, useNamespace } from '@aurora/utils';
import type { MainSlots } from './composables/useSlots';
import { useMainSlots } from './composables/useSlots';

export default defineComponent({
  name: `${useNamespace()}Main`,
  desc: "页面布局中的主要内容容器",
  descLocales: { en: "The main content region within a page layout." },
  slots: useMainSlots,
  setup(props, { slots }: HorizonWebSetupContext<{}, MainSlots>) {
    const classHelper = new ComponentClassBlock('main');

    return () => <main class={cls(classHelper.block)}>{slots?.default?.()}</main>;
  },
});
