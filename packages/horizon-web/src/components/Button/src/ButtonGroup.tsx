import { defineComponent, provide, toRefs } from 'vue';
import type { ButtonGroupProps } from './composables/useProps';
import { useButtonGroupProps } from './composables/useProps';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { ComponentClassBlock, useNamespace } from '@aurora/utils';
import type { ButtonGroupSlots } from './composables/useSlots';
import { useButtonGroupSlots } from './composables/useSlots';
import { NButtonGroupPropsInjectKey, NButtonGroupSizeInjectKey } from './utils/injectKeys';
import useSize from '~/utils/useSize';

export default defineComponent({
  name: `${useNamespace()}ButtonGroup`,
  props: useButtonGroupProps,
  slots: useButtonGroupSlots,
  setup(props: ButtonGroupProps, { slots }: HorizonWebSetupContext<{}, ButtonGroupSlots>) {
    const classHelper = new ComponentClassBlock('button-group');

    const { size } = toRefs(props);

    const sizeRef = useSize(size, 'medium');

    provide(NButtonGroupPropsInjectKey, props);
    provide(NButtonGroupSizeInjectKey, sizeRef);

    return () => <div class={classHelper.block}>{slots.default?.()}</div>;
  },
});
