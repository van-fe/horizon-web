import { ComponentClassBlock, type LegoSetupContext } from '@aurora/shared';
import { defineComponent } from 'vue';
import { useNamespace } from '~/globalMethods';
import { type SpaceExposes, useSpaceExposes } from './composables/useExposes';
import { useSpaceItemProps } from './composables/useProps';
import { type SpaceSlots, useSpaceItemSlots } from './composables/useSlots';

export default defineComponent({
  name: `${useNamespace()}SpaceItem`,
  desc: '设置元素之间的间距',
  inheritAttrs: false,
  props: useSpaceItemProps,
  slots: useSpaceItemSlots,
  exposes: useSpaceExposes,
  setup(props, { slots, attrs }: LegoSetupContext<any, SpaceSlots, SpaceExposes>) {
    const classHelper = new ComponentClassBlock('space');
    return () => (
      <div {...attrs} class={[classHelper.m('item'), props.class]} style={props.style}>
        {slots.default?.()}
      </div>
    );
  },
});
