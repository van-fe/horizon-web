import { defineComponent, h, provide } from 'vue';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { ComponentClassBlock, useNamespace } from '@aurora/utils';
import { useGridProps } from './composables/useGridProps';
import { GRID_KEY, useGridContainerStyle } from './composables/useGridStyles';
import type { GridSlots } from './composables/useSlots';
import { useGridSlots } from './composables/useSlots';

export { GRID_KEY, type GridProvide } from './composables/useGridStyles';

export default defineComponent({
  name: `${useNamespace()}Grid`,
  desc: '基于 CSS Grid 的现代响应式栅格布局',
  descLocales: { en: 'Modern responsive layout based on CSS Grid.' },
  props: useGridProps,
  slots: useGridSlots,
  setup(props, { slots }: HorizonWebSetupContext<{}, GridSlots>) {
    const classHelper = new ComponentClassBlock('grid');
    const { context, style } = useGridContainerStyle(props);
    provide(GRID_KEY, context);

    return () =>
      h(
        props.tag,
        {
          class: classHelper.block,
          style: style.value,
        },
        slots?.default?.(),
      );
  },
});
