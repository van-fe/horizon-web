import { mount } from '@vue/test-utils';
import { defineComponent, nextTick, reactive, ref, toRefs } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import type { TableColumnProps } from '../src/composables/useProps';
import useColumnRuntime, {
  attachColumnRuntime,
  getColumnRuntime,
} from '../src/hooks/useColumnRuntime';
import useHeaderSticky from '../src/hooks/useHeaderSticky';
import type { HTableInsertedColumnData, HTableTransformedRowDataType } from '../src/utils/types';
import { HTableColumnContextKey, HTableTransformedRowContextKey } from '../src/utils/types';

function row(id: number, value: unknown): HTableTransformedRowDataType {
  return {
    id,
    value,
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

function inserted(uuid: string, props: Partial<TableColumnProps>): HTableInsertedColumnData {
  return {
    uuid,
    props: reactive({
      type: 'default',
      filterType: 'input',
      useBuiltInFilter: true,
      multiple: false,
      multipleLimit: Infinity,
      selectable: true,
      checkStrictly: false,
      reserveSelection: false,
      ...props,
    }) as unknown as TableColumnProps,
    emit: vi.fn(),
    slots: {},
    children: [],
  };
}

describe('Table sticky and column runtime browser branches', () => {
  test('uses native sticky only without constrained height or horizontal overflow', async () => {
    const props = reactive({
      headerSticky: true,
      headerStickyContainer: undefined as string | HTMLElement | undefined,
      headerStickyOffset: 5,
      height: undefined as number | undefined,
      maxHeight: undefined as number | undefined,
    });
    const container = document.createElement('div');
    const wrapperElement = document.createElement('div');
    const head = document.createElement('thead');
    const scrollWrap = document.createElement('div');
    container.append(wrapperElement);
    document.body.append(container);
    Object.defineProperties(scrollWrap, {
      scrollWidth: { configurable: true, value: 100 },
      clientWidth: { configurable: true, value: 100 },
    });
    let sticky!: ReturnType<typeof useHeaderSticky>;
    const Harness = defineComponent({
      setup() {
        sticky = useHeaderSticky(
          toRefs(props) as unknown as Parameters<typeof useHeaderSticky>[0],
          ref(wrapperElement),
          ref(head),
          ref(scrollWrap),
        );
        return () => null;
      },
    });
    const mounted = mount(Harness);
    sticky.setScrollListener();
    expect(sticky.isNativeSticky.value).toBe(true);
    expect(sticky.scrollOffset.value).toBe(0);

    props.height = 100;
    await nextTick();
    expect(sticky.isNativeSticky.value).toBe(false);
    props.height = undefined;
    Object.defineProperty(scrollWrap, 'scrollWidth', { configurable: true, value: 200 });
    sticky.setScrollListener(container);
    expect(sticky.isNativeSticky.value).toBe(false);

    props.headerSticky = false;
    await nextTick();
    expect(sticky.scrollOffset.value).toBe(0);
    sticky.removeScrollListener();
    mounted.unmount();
    container.remove();
  });

  test('calculates fallback offsets for selector and element containers at both edges', async () => {
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => {
      callback(0);
      return 1;
    });
    const props = reactive({
      headerSticky: true,
      headerStickyContainer: '#sticky-target' as string | HTMLElement | undefined,
      headerStickyOffset: 5,
      height: 100 as number | undefined,
      maxHeight: undefined as number | undefined,
    });
    const target = document.createElement('div');
    target.id = 'sticky-target';
    const wrapperElement = document.createElement('div');
    const head = document.createElement('thead');
    const scrollWrap = document.createElement('div');
    target.append(wrapperElement);
    document.body.append(target);
    Object.defineProperty(head, 'clientHeight', { configurable: true, value: 20 });
    target.getBoundingClientRect = () => new DOMRect(0, 10, 100, 100);
    wrapperElement.getBoundingClientRect = () => new DOMRect(0, 0, 100, 100);
    let sticky!: ReturnType<typeof useHeaderSticky>;
    const Harness = defineComponent({
      setup() {
        sticky = useHeaderSticky(
          toRefs(props) as unknown as Parameters<typeof useHeaderSticky>[0],
          ref(wrapperElement),
          ref(head),
          ref(scrollWrap),
        );
        return () => null;
      },
    });
    const mounted = mount(Harness);

    sticky.setScrollListener();
    target.dispatchEvent(new Event('scroll'));
    expect(sticky.scrollOffset.value).toBe(15);

    wrapperElement.getBoundingClientRect = () => new DOMRect(0, 0, 100, 15);
    target.dispatchEvent(new Event('scroll'));
    expect(sticky.scrollOffset.value).toBe(-10);

    props.headerStickyContainer = target;
    await nextTick();
    target.dispatchEvent(new Event('scroll'));
    expect(sticky.isNativeSticky.value).toBe(false);
    sticky.removeScrollListener(target);
    mounted.unmount();
    target.remove();
  });

  test('throws for missing runtimes and computes responsive width, overflow, and select options', async () => {
    const missing = inserted('missing', {});
    expect(() => getColumnRuntime(missing)).toThrow("runtime is missing for column 'missing'");

    const rows = ref([row(1, 'A'), row(2, 'A'), row(3, 'B')]);
    const current = inserted('value', {
      field: 'value',
      type: 'default',
      width: 120,
      minWidth: '80px',
      filterType: 'select',
    });
    let runtime!: ReturnType<typeof useColumnRuntime>;
    const Harness = defineComponent({
      setup() {
        runtime = useColumnRuntime(current, vi.fn() as never, rows, () => true);
        return () => null;
      },
    });
    const mounted = mount(Harness);

    expect(runtime.column).toBe(getColumnRuntime(attachColumnRuntime(current, runtime)).column);
    expect(runtime.column).toBe(getColumnRuntime(runtime.column).column);
    expect(runtime.column[HTableColumnContextKey]).toBeDefined();
    expect(runtime.filterUi.selectOptions.value).toEqual([
      { label: 'A', value: 'A' },
      { label: 'B', value: 'B' },
    ]);
    expect(runtime.column.props.width).toBe(120);

    current.props.type = 'drag';
    current.props.width = undefined;
    current.props.minWidth = undefined;
    await nextTick();
    const context = runtime.column[HTableColumnContextKey];
    expect(context.sizeStyle).toEqual({ width: '40px', minWidth: '40px' });
    expect(context.overflowStyle).toEqual({});

    current.props.filterType = 'input';
    await nextTick();
    expect(runtime.filterUi.selectOptions.value).toEqual([]);
    current.props.filterType = 'select';
    current.props.field = undefined;
    await nextTick();
    expect(runtime.filterUi.selectOptions.value).toEqual([]);
    runtime.filter.currentFilterValue.value = 'draft';
    await nextTick();
    expect(runtime.filterUi.searchDraft.value).toBe('draft');
    mounted.unmount();
  });
});
