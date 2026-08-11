import { defineComponent, provide, ref } from 'vue';
import { ComponentClassBlock, cls, useNamespace } from '@aurora/utils';
import type { HorizonWebSetupContext } from '@aurora/utils';
import type { DropdownMenuProps } from './composables/useProps';
import { useDropdownMenuEmits } from './composables/useEmits';
import { useDropdownMenuSlots } from './composables/useSlots';
import type { DropdownMenuEmits } from './composables/useEmits';
import type { DropdownMenuSlots } from './composables/useSlots';
import { HDropdownActivatedChildInjectKey } from './utils/InjectedKeys';

export default defineComponent({
  name: `${useNamespace()}DropdownMenu`,
  desc: "下拉菜单的内容容器",
  descLocales: { en: "The content container for a dropdown menu." },
  emits: useDropdownMenuEmits,
  slots: useDropdownMenuSlots,
  setup(
    props: DropdownMenuProps,
    { slots }: HorizonWebSetupContext<DropdownMenuEmits, DropdownMenuSlots>,
  ) {
    const classHelper = new ComponentClassBlock('dropdown-menu');

    const activeChildUuid = ref<string>();

    provide(HDropdownActivatedChildInjectKey, activeChildUuid);

    return () => (
      <div class={cls(classHelper.block)} role="menu">
        {slots.default?.()}
      </div>
    );
  },
});
