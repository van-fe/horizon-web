import { defineComponent } from 'vue';
import type { LegoSetupContext } from '@nio-fe/shared';
import { cls, ComponentClassBlock, useNamespace } from '@nio-fe/shared';
import type { MainSlots } from './composables/useSlots';
import { useMainSlots } from './composables/useSlots';

export default defineComponent({
  name: `${useNamespace()}Main`,
  slots: useMainSlots,
  setup(props, { slots }: LegoSetupContext<{}, MainSlots>) {
    const classHelper = new ComponentClassBlock('main');

    return () => <main class={cls(classHelper.block)}>{slots?.default?.()}</main>;
  },
});
