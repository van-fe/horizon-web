import { mount } from '@vue/test-utils';
import { computed, h } from 'vue';
import { describe, expect, test } from 'vitest';
import { HGrid, HGridItem } from '../index';
import {
  resolveGridValue,
  type ResolvedGridValue,
} from '../src/composables/useGridProps';
import { useGridContainerStyle, useGridItemStyle } from '../src/composables/useGridStyles';
import { useLayoutExposes } from '../src/composables/useExposes';

describe('Grid.tsx', () => {
  test('renders a native grid with responsive columns and gaps', () => {
    const wrapper = mount(HGrid, {
      props: {
        cols: { xs: 2, md: 4 },
        gap: 4,
        columnGap: { md: 12 },
        rowGap: 8,
        align: 'center',
        justify: 'end',
      },
    });
    const style = wrapper.attributes('style');

    expect(wrapper.classes()).toContain('h-grid');
    expect(style).toContain('--h-grid-cols-xs: 2');
    expect(style).toContain('--h-grid-cols-sm: 2');
    expect(style).toContain('--h-grid-cols-md: 4');
    expect(style).toContain('--h-grid-column-gap-sm: 4px');
    expect(style).toContain('--h-grid-column-gap-md: 12px');
    expect(style).toContain('--h-grid-row-gap-md: 8px');
    expect((wrapper.element as HTMLElement).style.alignItems).toBe('center');
    expect((wrapper.element as HTMLElement).style.justifyItems).toBe('end');
  });

  test('provides responsive grid data to items', () => {
    const wrapper = mount(HGrid, {
      props: {
        cols: { xs: 4, md: 12 },
        columnGap: { xs: 4, md: 12 },
      },
      slots: {
        default: () =>
          h(HGridItem, {
            span: { xs: 2, md: 4 },
            offset: { md: 2 },
          }),
      },
    });
    const style = wrapper.find('.h-grid-item').attributes('style');

    expect(style).toContain('--h-grid-item-span-xs: 2');
    expect(style).toContain('--h-grid-item-span-sm: 2');
    expect(style).toContain('--h-grid-item-span-md: 6');
    expect(style).toContain('--h-grid-item-offset-xs: 0px');
    expect(style).toContain('--h-grid-item-offset-md: calc(');
  });

  test('hides an item when its responsive span is zero', () => {
    const wrapper = mount(HGrid, {
      slots: {
        default: () => h(HGridItem, { span: { xs: 0, md: 6 } }),
      },
    });
    const style = wrapper.find('.h-grid-item').attributes('style');

    expect(style).toContain('--h-grid-item-display-xs: none');
    expect(style).toContain('--h-grid-item-display-sm: none');
    expect(style).toContain('--h-grid-item-display-md: block');
  });

  test('exposes GridItem as a compound component', () => {
    expect(HGrid.Item).toBe(HGridItem);
    expect(useLayoutExposes).toEqual({});
  });

  test('custom tag and both default slots render observable native content', () => {
    const wrapper = mount(HGrid, {
      props: { tag: 'section' },
      slots: {
        default: () => h(HGridItem, null, { default: () => h('strong', 'Grid content') }),
      },
    });

    expect(wrapper.element.tagName).toBe('SECTION');
    expect(wrapper.get('.h-grid-item strong').text()).toBe('Grid content');
  });

  test('standalone and oversized items use safe default, clamp and display contracts', () => {
    const standalone = mount(HGridItem, {
      props: { span: -2, offset: -3 },
      slots: { default: () => 'Standalone' },
    });
    expect(standalone.text()).toBe('Standalone');
    expect(standalone.attributes('style')).toContain('--h-grid-item-display-xs: none');
    expect(standalone.attributes('style')).toContain('--h-grid-item-offset-xs: 0px');

    const oversized = mount(HGrid, {
      props: { cols: 4, columnGap: 6 },
      slots: { default: () => h(HGridItem, { span: 20, offset: 20 }) },
    });
    const style = oversized.get('.h-grid-item').attributes('style');
    expect(style).toContain('--h-grid-item-span-xs: 4');
    expect(style).toContain('--h-grid-item-offset-xs: calc((100% - 18px) / 4 * 3 + 18px)');
  });

  test('responsive resolver normalizes invalid, fractional and inherited values', () => {
    expect(resolveGridValue(undefined, 3)).toEqual({
      xs: 3,
      sm: 3,
      md: 3,
      lg: 3,
      xl: 3,
      xxl: 3,
    });
    expect(resolveGridValue(Number.NaN, 7, { integer: true, min: 1 }).xs).toBe(7);
    expect(resolveGridValue(3.8, 1, { integer: true }).xs).toBe(3);
    expect(resolveGridValue(-2, 1, { min: 0 }).xs).toBe(0);

    const fallback: ResolvedGridValue = { xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 };
    expect(resolveGridValue({ xs: 8, md: Number.POSITIVE_INFINITY }, fallback)).toEqual({
      xs: 8,
      sm: 8,
      md: 8,
      lg: 8,
      xl: 8,
      xxl: 8,
    });
  });

  test('style composables support omitted alignment and a custom visible display', () => {
    const { context, style } = useGridContainerStyle({});
    expect(style.value).not.toHaveProperty('alignItems');
    expect(style.value).not.toHaveProperty('justifyItems');
    expect(style.value['--h-grid-cols-xs']).toBe('24');

    const itemStyle = useGridItemStyle(
      { span: 1, offset: 0 },
      {
        cols: computed(() => context.cols.value),
        columnGap: computed(() => context.columnGap.value),
      },
      'flex',
    );
    expect(itemStyle.value['--h-grid-item-display-xs']).toBe('flex');
  });
});
