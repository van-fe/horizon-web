import { defineComponent, provide, toRefs } from 'vue';
import type { ButtonGroupProps } from './composables/useProps';
import { useButtonGroupProps } from './composables/useProps';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { ComponentClassBlock, useNamespace } from '@aurora/utils';
import type { ButtonGroupSlots } from './composables/useSlots';
import { useButtonGroupSlots } from './composables/useSlots';
import { HButtonGroupPropsInjectKey, HButtonGroupSizeInjectKey } from './utils/injectKeys';
import useSize from '~/utils/useSize';

export default defineComponent({
  name: `${useNamespace()}ButtonGroup`,
  desc: "将一组相关按钮组织为连续控件",
  descLocales: { en: "Groups related buttons into a connected control." },
  props: useButtonGroupProps,
  slots: useButtonGroupSlots,
  setup(props: ButtonGroupProps, { slots }: HorizonWebSetupContext<{}, ButtonGroupSlots>) {
    const classHelper = new ComponentClassBlock('button-group');

    const { size } = toRefs(props);

    const sizeRef = useSize(size, 'medium');

    provide(HButtonGroupPropsInjectKey, props);
    provide(HButtonGroupSizeInjectKey, sizeRef);

    return () => <div class={classHelper.block}>{slots.default?.()}</div>;
  },
});
