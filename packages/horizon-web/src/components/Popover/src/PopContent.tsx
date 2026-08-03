import { defineComponent, inject } from 'vue';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { cls, ComponentClassBlock, useNamespace } from '@aurora/utils';
import type { PopContentSlots } from './composables/useSlots';
import { usePopContentSlots } from './composables/useSlots';
import { HPickerPopoverPropsInjectKey } from './utils/injectKeys';
import { usePopContentProps } from './composables/useProps';

export default defineComponent({
  name: `${useNamespace()}PopContent`,
  props: usePopContentProps,
  slots: usePopContentSlots,
  setup(props, { slots }: HorizonWebSetupContext<{}, PopContentSlots>) {
    const classHelper = new ComponentClassBlock('popover');

    const parentProps = inject(HPickerPopoverPropsInjectKey, undefined);

    return () => (
      <div
        class={cls(classHelper.e('popcontent'), classHelper.is(parentProps?.theme ?? props.theme))}
      >
        {slots.default?.()}
      </div>
    );
  },
});
