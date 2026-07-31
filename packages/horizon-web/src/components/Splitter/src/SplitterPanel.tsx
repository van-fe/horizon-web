import type { HorizonWebSetupContext } from '@aurora/utils';
import { ComponentClassBlock, useNamespace } from '@aurora/utils';
import { defineComponent } from 'vue';
import { useSplitterPanelProps } from './composables/useProps';
import type { SplitterPanelSlots } from './composables/useSlots';
import { useSplitterPanelSlots } from './composables/useSlots';

export default defineComponent({
  name: `${useNamespace()}SplitterPanel`,
  desc: 'Splitter 的可调整内容面板',
  descLocales: { en: 'Resizable content panel used by Splitter.' },
  inheritAttrs: false,
  props: useSplitterPanelProps,
  slots: useSplitterPanelSlots,
  setup(_, { attrs, slots }: HorizonWebSetupContext<{}, SplitterPanelSlots>) {
    const classHelper = new ComponentClassBlock('splitter-panel');
    return () => (
      <div {...attrs} class={[classHelper.block, attrs.class]}>
        {slots.default?.()}
      </div>
    );
  },
});
