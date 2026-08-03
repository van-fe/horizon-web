import { computed, defineComponent, h, inject } from 'vue';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { ComponentClassBlock, useNamespace } from '@aurora/utils';
import { GRID_KEY } from './Grid';
import { GRID_BREAKPOINTS, resolveGridValue, useGridItemProps } from './composables/useGridProps';
import type { ResolvedGridValue } from './composables/useGridProps';
import type { GridItemSlots } from './composables/useSlots';
import { useGridItemSlots } from './composables/useSlots';

const defaultCols = resolveGridValue(24, 24);
const defaultColumnGap = resolveGridValue(0, 0);

function getOffsetMargin(totalSpan: number, offset: number, columnGap: number) {
  if (!offset) {
    return '0px';
  }

  const occupiedGaps = (totalSpan - 1) * columnGap;
  const offsetGaps = columnGap * offset;
  return `calc((100% - ${occupiedGaps}px) / ${totalSpan} * ${offset} + ${offsetGaps}px)`;
}

function setItemResponsiveVariables(
  style: Record<string, string>,
  spans: ResolvedGridValue,
  offsets: ResolvedGridValue,
  cols: ResolvedGridValue,
  columnGaps: ResolvedGridValue,
) {
  GRID_BREAKPOINTS.forEach(breakpoint => {
    const columnCount = cols[breakpoint];
    const span = Math.min(spans[breakpoint], columnCount);
    const offset = Math.min(offsets[breakpoint], Math.max(0, columnCount - 1));
    const totalSpan = Math.max(1, Math.min(span + offset, columnCount));

    style[`--h-grid-item-display-${breakpoint}`] = span === 0 ? 'none' : 'block';
    style[`--h-grid-item-span-${breakpoint}`] = String(totalSpan);
    style[`--h-grid-item-offset-${breakpoint}`] = getOffsetMargin(
      totalSpan,
      offset,
      columnGaps[breakpoint],
    );
  });
}

export default defineComponent({
  name: `${useNamespace()}GridItem`,
  props: useGridItemProps,
  slots: useGridItemSlots,
  setup(props, { slots }: HorizonWebSetupContext<{}, GridItemSlots>) {
    const classHelper = new ComponentClassBlock('grid-item');
    const grid = inject(GRID_KEY, {
      cols: computed(() => defaultCols),
      columnGap: computed(() => defaultColumnGap),
    });
    const spans = computed(() => resolveGridValue(props.span, 1, { integer: true, min: 0 }));
    const offsets = computed(() => resolveGridValue(props.offset, 0, { integer: true, min: 0 }));
    const style = computed(() => {
      const result: Record<string, string> = {};
      setItemResponsiveVariables(
        result,
        spans.value,
        offsets.value,
        grid.cols.value,
        grid.columnGap.value,
      );
      return result;
    });

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
