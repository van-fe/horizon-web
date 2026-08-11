import { mount } from '@vue/test-utils';
import { defineComponent, nextTick, reactive, ref, toRefs } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import {
  useTableColumnProps,
  useTableProps,
  type TableColumnProps,
  type TableProps,
} from '../src/composables/useProps';
import useBorder from '../src/hooks/useBorder';
import useExpand from '../src/hooks/useExpand';
import useHeaderResizerCursorLine from '../src/hooks/useHeaderResizer';
import useScroll from '../src/hooks/useScroll';
import useSpan from '../src/hooks/useSpan';
import type { HTableColumnData, HTableTransformedRowDataType } from '../src/utils/types';
import { HTableColumnContextKey, HTableTransformedRowContextKey } from '../src/utils/types';

function transformed(id: number): HTableTransformedRowDataType {
  return {
    id,
    [HTableTransformedRowContextKey]: {
      uuid: id,
      index: id - 1,
      siblingIndex: id - 1,
      visible: {},
      parentUuid: null,
      level: 0,
      isLeaf: true,
    },
  } as HTableTransformedRowDataType;
}

function resizableColumn(resizable: boolean, minWidth?: string | number): HTableColumnData {
  return {
    uuid: 'column',
    props: reactive({ resizable, minWidth }) as unknown as TableColumnProps,
    [HTableColumnContextKey]: {
      selfElement: ref<HTMLElement>(),
      isResizing: false,
      resizeWidth: -1,
      childrenEachRowColumnsHeightSum: 10,
    },
  } as unknown as HTableColumnData;
}

describe('Table compact hook browser branches', () => {
  test('returns isolated defaults for every array and object prop factory', () => {
    const dataFactory = useTableProps.data.default as () => unknown[];
    const sortFactory = useTableProps.defaultSort.default as () => unknown[];
    const fieldMapFactory = useTableProps.fieldMap.default as () => Record<string, string>;
    const aggregationsFactory = useTableProps.aggregations.default as () => Record<string, unknown>;
    const sortOrdersFactory = useTableColumnProps.sortOrders.default as () => unknown[];

    expect(dataFactory()).toEqual([]);
    expect(dataFactory()).not.toBe(dataFactory());
    expect(sortFactory()).toEqual([]);
    expect(fieldMapFactory()).toEqual({ children: 'children', isLeaf: 'isLeaf' });
    expect(aggregationsFactory()).toEqual({});
    expect(sortOrdersFactory()).toEqual(['ASC', 'DESC', null]);
    const dataProcessingValidator = useTableProps.dataProcessing.validator!;
    expect(dataProcessingValidator('sync')).toBe(true);
    expect(dataProcessingValidator({ mode: 'worker' })).toBe(true);
    expect(dataProcessingValidator(null)).toBe(false);
    expect(dataProcessingValidator(1)).toBe(false);
  });

  test('normalizes boolean borders and forces full borders for grouped headers', () => {
    const props = reactive({ border: false }) as Pick<TableProps, 'border'>;
    const analysis = ref({ columnGroups: [[]] as HTableColumnData[][], flattenColumns: [] });
    const border = useBorder(
      toRefs(props) as unknown as Parameters<typeof useBorder>[0],
      analysis,
    ).border;

    expect(border.value).toBeNull();
    props.border = true;
    expect(border.value).toBe('full');
    props.border = 'outer';
    expect(border.value).toBe('outer');
    analysis.value = { columnGroups: [[], []], flattenColumns: [] };
    props.border = false;
    expect(border.value).toBe('full');
  });

  test('derives left and right scrolling classes from the real scroll element geometry', () => {
    const scroll = useScroll();
    scroll.initialScrollState();
    expect(scroll.scrollComputedClassName.value).toBe('');

    const target = document.createElement('div');
    Object.defineProperty(target, 'scrollWidth', { configurable: true, value: 321 });
    target.getBoundingClientRect = () => new DOMRect(0, 0, 100, 20);
    scroll.scrollbarDomRef.value = {
      wrapRef: target,
    } as unknown as NonNullable<typeof scroll.scrollbarDomRef.value>;
    scroll.handleScroll({ scrollLeft: 20.9, scrollTop: 3 });
    expect(scroll.scrollComputedClassName.value).toContain('is-scrolling-left');
    expect(scroll.scrollComputedClassName.value).toContain('is-scrolling-right');

    scroll.handleScroll({ scrollLeft: 221, scrollTop: 0 });
    expect(scroll.scrollComputedClassName.value).not.toContain('is-scrolling-right');
  });

  test('clamps header resizing, suppresses unchanged emits, and cleans document listeners', async () => {
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => {
      callback(0);
      return 1;
    });
    const emit = vi.fn();
    const refreshLayout = vi.fn();
    const resizable = resizableColumn(true, 'invalid');
    const fixedElement = document.createElement('th');
    Object.defineProperty(fixedElement, 'clientWidth', { configurable: true, value: 50 });
    fixedElement.getBoundingClientRect = () => new DOMRect(10, 20, 50, 30);
    resizable[HTableColumnContextKey].selfElement.value = fixedElement;
    const locked = resizableColumn(false);
    locked[HTableColumnContextKey].selfElement.value = fixedElement;

    const Harness = defineComponent({
      setup() {
        const api = useHeaderResizerCursorLine(refreshLayout, emit as never);
        return () => (
          <div>
            <div data-cursor style={api.cursorLineStyle.value} />
            <div data-resizable>{api.useHeaderResizerPlugin(resizable, true)}</div>
            <div data-locked>{api.useHeaderResizerPlugin(locked, false)}</div>
          </div>
        );
      },
    });
    const wrapper = mount(Harness, { attachTo: document.body });

    const lockedDown = new MouseEvent('mousedown', { bubbles: true, cancelable: true, clientX: 10 });
    wrapper.get('[data-locked] .h-table__header--divider').element.dispatchEvent(lockedDown);
    expect(lockedDown.defaultPrevented).toBe(true);
    expect(locked[HTableColumnContextKey].isResizing).toBe(false);

    await wrapper.get('[data-resizable] .h-table__header--divider').trigger('mousedown', {
      clientX: 100,
    });
    document.dispatchEvent(new MouseEvent('mouseup', { clientX: 100 }));
    expect(emit).not.toHaveBeenCalled();

    await wrapper.get('[data-resizable] .h-table__header--divider').trigger('mousedown', {
      clientX: 100,
    });
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 0 }));
    expect(resizable[HTableColumnContextKey].resizeWidth).toBe(40);
    expect(refreshLayout).toHaveBeenCalled();
    expect(wrapper.get('[data-cursor]').attributes('style')).toContain('display: block');
    document.dispatchEvent(new MouseEvent('mouseup', { clientX: 0 }));
    await nextTick();
    expect(emit).toHaveBeenCalledWith(
      'headerDragend',
      40,
      50,
      resizable,
      expect.any(MouseEvent),
    );
    expect(wrapper.get('[data-cursor]').attributes('style')).toContain('display: none');

    await wrapper.get('[data-resizable] .h-table__header--divider').trigger('mousedown', {
      clientX: 50,
    });
    wrapper.unmount();
  });

  test('syncs controlled expanded keys and prunes rows removed from the full data set', async () => {
    const rows = ref([transformed(1), transformed(2)]);
    const props = reactive({ expandRowKeys: [1, 3] }) as unknown as TableProps;
    const emit = vi.fn();
    let expand!: ReturnType<typeof useExpand>;
    const Harness = defineComponent({
      setup() {
        expand = useExpand(rows, props, emit as never);
        return () => null;
      },
    });
    const wrapper = mount(Harness);
    expect(expand.expandRows.value).toEqual(new Set([1, 3]));

    rows.value = [transformed(1)];
    await nextTick();
    expect(expand.expandRows.value).toEqual(new Set([1]));

    rows.value = [transformed(2)];
    await nextTick();
    expect(expand.expandRows.value).toEqual(new Set());
    expand.toggleExpandRows(rows.value[0]);
    expect(expand.isExpanded(rows.value[0])).toBe(true);
    expect(emit).toHaveBeenCalledWith('update:expandRowKeys', [2]);
    expand.toggleExpandRows(rows.value[0]);
    expect(expand.isExpanded(rows.value[0])).toBe(false);

    props.expandRowKeys = undefined;
    await nextTick();
    expect(expand.expandRows.value).toEqual(new Set());
    wrapper.unmount();
  });

  test('normalizes partial object spans and invalid span results', () => {
    const props = reactive({ spanMethod: undefined }) as unknown as TableProps;
    const span = useSpan(props);
    const row = transformed(1);
    const column = resizableColumn(false);

    expect(span.spanMethod(row, column, 0, 0)).toEqual({ rowSpan: 1, colSpan: 1 });
    props.spanMethod = (() => ({ rowSpan: 2 })) as unknown as NonNullable<
      TableProps['spanMethod']
    >;
    expect(span.spanMethod(row, column, 0, 0)).toEqual({ rowSpan: 2, colSpan: 1 });
    props.spanMethod = (() => ({ colSpan: 3 })) as unknown as NonNullable<
      TableProps['spanMethod']
    >;
    expect(span.spanMethod(row, column, 0, 0)).toEqual({ rowSpan: 1, colSpan: 3 });
    props.spanMethod = () => null as never;
    expect(span.spanMethod(row, column, 0, 0)).toEqual({ rowSpan: 1, colSpan: 1 });
  });
});
