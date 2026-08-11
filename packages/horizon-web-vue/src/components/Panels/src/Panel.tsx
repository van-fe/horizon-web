import { defineComponent } from 'vue';
import { usePanelProps } from './composables/useProps';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { slotVNodes, ComponentClassBlock, useNamespace } from '@aurora/utils';
import type { PanelSlots } from './composables/useSlots';
import { usePanelSlots } from './composables/useSlots';

export default defineComponent({
  name: `${useNamespace()}Panel`,
  desc: "Panels 中的单个可切换内容面板",
  descLocales: { en: "A single switchable content panel within Panels." },
  props: usePanelProps,
  slots: usePanelSlots,
  setup(props, { slots }: HorizonWebSetupContext<{}, PanelSlots>) {
    const cls = new ComponentClassBlock('panels');
    return () => <div class={cls.e('content')}>{slotVNodes(slots.default)}</div>;
  },
});
