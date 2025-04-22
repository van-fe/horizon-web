import { defineComponent } from 'vue';
import { usePanelProps } from './composables/useProps';
import type { LegoSetupContext } from '@nio-fe/shared';
import { slotVNodes, ComponentClassBlock, useNamespace } from '@nio-fe/shared';
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
