import { defineComponent } from 'vue';
import { usePanelProps } from './composables/useProps';
import type { LegoSetupContext } from '@aurora/utils';
import { slotVNodes, ComponentClassBlock, useNamespace } from '@aurora/utils';
import type { PanelSlots } from './composables/useSlots';
import { usePanelSlots } from './composables/useSlots';

export default defineComponent({
  name: `${useNamespace()}Panel`,
  props: usePanelProps,
  slots: usePanelSlots,
  setup(props, { slots }: LegoSetupContext<{}, PanelSlots>) {
    const cls = new ComponentClassBlock('panels');
    return () => <div class={cls.e('content')}>{slotVNodes(slots.default)}</div>;
  },
});
