import { computed, defineComponent, h, inject } from 'vue';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { ComponentClassBlock, useNamespace } from '@aurora/utils';
import { resolveGridValue, useGridItemProps } from './composables/useGridProps';
import { GRID_KEY, useGridItemStyle } from './composables/useGridStyles';
import type { GridItemSlots } from './composables/useSlots';
import { useGridItemSlots } from './composables/useSlots';

const defaultCols = resolveGridValue(24, 24);
const defaultColumnGap = resolveGridValue(0, 0);

export default defineComponent({
  name: `${useNamespace()}GridItem`,
  desc: 'CSS Grid 布局中的单个网格项',
  descLocales: { en: 'A single grid item within a CSS Grid layout.' },
  props: useGridItemProps,
  slots: useGridItemSlots,
  setup(props, { slots }: HorizonWebSetupContext<{}, GridItemSlots>) {
    const classHelper = new ComponentClassBlock('grid-item');
    const grid = inject(GRID_KEY, {
      cols: computed(() => defaultCols),
      columnGap: computed(() => defaultColumnGap),
    });
    const style = useGridItemStyle(props, grid);

    return () =>
      h(
        'div',
        {
          class: classHelper.block,
          style: style.value,
        },
        slots?.default?.(),
      );
  },
});
