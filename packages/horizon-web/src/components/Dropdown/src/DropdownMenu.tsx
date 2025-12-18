import { defineComponent, provide, ref } from 'vue';
import { ComponentClassBlock, cls, useNamespace } from '@aurora/shared';
import type { LegoSetupContext } from '@aurora/shared';
import type { DropdownMenuProps } from './composables/useProps';
import { useDropdownMenuEmits } from './composables/useEmits';
import { useDropdownMenuSlots } from './composables/useSlots';
import type { DropdownMenuEmits } from './composables/useEmits';
import type { DropdownMenuSlots } from './composables/useSlots';
import { NDropdownActivatedChildInjectKey } from './utils/InjectedKeys';

export default defineComponent({
  name: `${useNamespace()}DropdownMenu`,
  emits: useDropdownMenuEmits,
  slots: useDropdownMenuSlots,
  setup(
    props: DropdownMenuProps,
    { slots }: LegoSetupContext<DropdownMenuEmits, DropdownMenuSlots>,
  ) {
    const classHelper = new ComponentClassBlock('dropdown-menu');

    const activeChildUuid = ref<string>();

    provide(NDropdownActivatedChildInjectKey, activeChildUuid);

    return () => <div class={cls(classHelper.block)}>{slots.default?.()}</div>;
  },
});
