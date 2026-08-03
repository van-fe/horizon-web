import type { ComputedRef, InjectionKey } from 'vue';
import { computed, defineComponent, h, provide } from 'vue';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { ComponentClassBlock, useNamespace } from '@aurora/utils';
import { GRID_BREAKPOINTS, resolveGridValue, useGridProps } from './composables/useGridProps';
import type { ResolvedGridValue } from './composables/useGridProps';
import type { GridSlots } from './composables/useSlots';
import { useGridSlots } from './composables/useSlots';

export type GridProvide = {
  cols: ComputedRef<ResolvedGridValue>;
  columnGap: ComputedRef<ResolvedGridValue>;
};

export const GRID_KEY: InjectionKey<GridProvide> = Symbol('HorizonWeb-grid');

function setResponsiveVariables(
  style: Record<string, string>,
  name: string,
  values: ResolvedGridValue,
  unit = '',
) {
  GRID_BREAKPOINTS.forEach(breakpoint => {
    style[`--h-grid-${name}-${breakpoint}`] = `${values[breakpoint]}${unit}`;
  });
}

export default defineComponent({
  name: `${useNamespace()}Grid`,
  desc: '基于 CSS Grid 的现代响应式栅格布局',
  descLocales: { en: 'Modern responsive layout based on CSS Grid.' },
  props: useGridProps,
  slots: useGridSlots,
  setup(props, { slots }: HorizonWebSetupContext<{}, GridSlots>) {
    const classHelper = new ComponentClassBlock('grid');
    const cols = computed(() => resolveGridValue(props.cols, 24, { integer: true, min: 1 }));
    const gap = computed(() => resolveGridValue(props.gap, 0, { min: 0 }));
    const columnGap = computed(() => resolveGridValue(props.columnGap, gap.value, { min: 0 }));
    const rowGap = computed(() => resolveGridValue(props.rowGap, gap.value, { min: 0 }));

    provide(GRID_KEY, { cols, columnGap });

    const style = computed(() => {
      const result: Record<string, string> = {
        alignItems: props.align,
        justifyItems: props.justify,
      };
      setResponsiveVariables(result, 'cols', cols.value);
      setResponsiveVariables(result, 'column-gap', columnGap.value, 'px');
      setResponsiveVariables(result, 'row-gap', rowGap.value, 'px');
      return result;
    });

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
