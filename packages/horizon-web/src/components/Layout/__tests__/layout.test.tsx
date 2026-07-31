import { mount, shallowMount } from '@vue/test-utils';
import { h } from 'vue';
import { describe, expect, test } from 'vitest';
import { HCol, HGrid, HGridItem, HRow } from '../index';

describe('Row.tsx', () => {
  test('basic', () => {
    const wrapper = shallowMount(() => <HRow />);
    const element = wrapper.findComponent(HRow);

    expect(element.exists()).toBe(true);
  });
});

describe('Col.tsx', () => {
  test('basic', () => {
    const wrapper = shallowMount(() => <HCol />);
    const element = wrapper.findComponent(HCol);

    expect(element.exists()).toBe(true);
  });
});

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
    expect(style).toContain('align-items: center');
    expect(style).toContain('justify-items: end');
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
  });
});
