import { computed, defineComponent, nextTick, reactive } from 'vue';
import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, test, vi } from 'vitest';
import useRecycleScrollerLayout from '../src/composables/useRecycleScrollerLayout';
import useRecycleScrollerPool from '../src/composables/useRecycleScrollerPool';
import useVirtualScrollerResizeObserver from '../src/composables/useVirtualScrollerResizeObserver';
import useRenderlessVirtualScroller from '../src/composables/useRenderlessVirtualScroller';
import type { RecycleScrollerProps, VirtualScrollerProps } from '../src/composables/useProps';
import { getScrollParent } from '../src/utils/scrollParent';

function createLayout(
  overrides: Partial<RecycleScrollerProps> & Pick<RecycleScrollerProps, 'items'>,
) {
  const props = reactive({
    keyField: 'id',
    typeField: 'type',
    sizeField: 'size',
    itemSize: null,
    itemSecondarySize: undefined,
    gridItems: undefined,
    minItemSize: 20,
    buffer: 0,
    ...overrides,
  }) as unknown as Readonly<RecycleScrollerProps>;

  return {
    layout: useRecycleScrollerLayout(props),
    props,
  };
}

describe('virtual scroller hooks', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });
  test('calculates fixed-size, variable-size and grid ranges', () => {
    const fixed = createLayout({
      items: Array.from({ length: 100 }, (_, id) => ({ id })),
      itemSize: 50,
      buffer: 100,
    }).layout;

    expect(fixed.getRange(500, 700)).toEqual({
      startIndex: 8,
      endIndex: 16,
      visibleStartIndex: 10,
      visibleEndIndex: 14,
      totalSize: 5000,
    });

    const variable = createLayout({
      items: [
        { id: 0, size: 20 },
        { id: 1, size: 30 },
        { id: 2, size: 50 },
        { id: 3, size: 40 },
      ],
    }).layout;

    expect(variable.getRange(20, 50)).toEqual({
      startIndex: 1,
      endIndex: 2,
      visibleStartIndex: 1,
      visibleEndIndex: 2,
      totalSize: 140,
    });

    const grid = createLayout({
      items: Array.from({ length: 10 }, (_, id) => ({ id })),
      itemSize: 50,
      itemSecondarySize: 80,
      gridItems: 2,
    }).layout;

    expect(grid.getRange(50, 100)).toEqual({
      startIndex: 2,
      endIndex: 4,
      visibleStartIndex: 2,
      visibleEndIndex: 4,
      totalSize: 250,
    });
    expect(grid.getItemPosition(3)).toEqual({ position: 50, offset: 80 });
  });

  test('subtracts the before slot exactly once', () => {
    const layout = createLayout({
      items: Array.from({ length: 20 }, (_, id) => ({ id })),
      itemSize: 50,
      buffer: 100,
    }).layout;

    expect(layout.getRange(0, 300, 500)).toMatchObject({
      startIndex: 0,
      endIndex: 0,
      visibleStartIndex: 0,
      visibleEndIndex: 0,
    });
    expect(layout.getRange(300, 600, 500)).toMatchObject({
      startIndex: 0,
      endIndex: 4,
      visibleStartIndex: 0,
      visibleEndIndex: 2,
    });
  });

  test('reuses the same pool after a non-continuous jump', () => {
    const { acquireView, pool, releaseAllViews } = useRecycleScrollerPool();

    for (let i = 0; i < 4; i++) {
      acquireView(i, { id: i }, i, 'row');
    }
    expect(pool.value).toHaveLength(4);

    releaseAllViews();
    for (let i = 80; i < 84; i++) {
      acquireView(i, { id: i }, i, 'row');
    }

    expect(pool.value).toHaveLength(4);
    expect(
      pool.value
        .filter(view => view.nr.used)
        .map(view => view.nr.index)
        .sort(),
    ).toEqual([80, 81, 82, 83]);
  });

  test('rejects missing and duplicated keys early', () => {
    const missingKeyLayout = createLayout({
      items: [{ value: 1 }],
      keyField: 'id',
    }).layout;
    expect(() => missingKeyLayout.itemIndexByKey.value).toThrow("keyField is 'id'");

    const duplicatedKeyLayout = createLayout({
      items: [
        { id: 1, value: 1 },
        { id: 1, value: 2 },
      ],
    }).layout;
    expect(() => duplicatedKeyLayout.itemIndexByKey.value).toThrow("Key '1' is duplicated");
  });

  test('keeps object keys by identity', () => {
    const firstKey = { value: 1 };
    const secondKey = { value: 1 };
    const layout = createLayout({
      items: [
        { id: firstKey, value: 1 },
        { id: secondKey, value: 2 },
      ],
    }).layout;

    expect(layout.itemIndexByKey.value.get(firstKey)).toBe(0);
    expect(layout.itemIndexByKey.value.get(secondKey)).toBe(1);
  });

  test('releases, remaps, sorts and reuses pooled views across type changes', () => {
    const pool = useRecycleScrollerPool();
    const first = pool.acquireView(2, { id: 'a' }, 'a', 'odd').view;
    const second = pool.acquireView(0, { id: 'b' }, 'b', 'even').view;
    const third = pool.acquireView(1, { id: 'c' }, 'c', 'odd').view;

    pool.sortViews();
    expect(pool.pool.value.map(view => view.nr.key)).toEqual(['b', 'c', 'a']);
    pool.releaseViewByKey('missing');
    pool.releaseViewByKey('b');
    expect(second.nr.used).toBe(false);
    pool.unuseView(second);

    const replacement = pool.acquireView(3, { id: 'b2' }, 'b', 'odd');
    expect(replacement.newlyUsed).toBe(true);
    expect(replacement.view.nr.type).toBe('odd');
    pool.releaseOutsideRange(
      1,
      3,
      new Map([
        ['a', 4],
        ['b', 2],
        ['c', 1],
      ]),
    );
    expect(first.nr.used).toBe(false);
    expect(third.nr.used).toBe(true);

    const changedType = pool.acquireView(5, { id: 'c2' }, 'c', 'even');
    expect(changedType.view.nr.type).toBe('even');
    expect(changedType.newlyUsed).toBe(true);
  });

  test('reactivates the same pooled key and handles empty, simple and invalid layouts', () => {
    const pool = useRecycleScrollerPool();
    const original = pool.acquireView(0, { id: 'same' }, 'same', 'row').view;
    pool.unuseView(original);
    const reused = pool.acquireView(1, { id: 'updated' }, 'same', 'row');
    expect(reused.newlyUsed).toBe(true);
    expect(reused.view).toBe(original);
    pool.unuseView(reused.view);
    pool.unuseView(reused.view);

    const empty = createLayout({ items: [], itemSize: 20 }).layout;
    expect(empty.getRange(0, 100)).toEqual({
      startIndex: 0,
      endIndex: 0,
      visibleStartIndex: 0,
      visibleEndIndex: 0,
      totalSize: 0,
    });
    expect(empty.getScrollPosition(99)).toBe(0);

    const simple = createLayout({ items: ['a', 'b', 'c'], itemSize: 20 }).layout;
    expect(simple.isSimpleArray.value).toBe(true);
    expect(simple.getItemKey('b', 1)).toBe(1);
    expect(simple.getItemType('b')).toBeUndefined();
    expect(simple.getScrollPosition(-2)).toBe(0);
    expect(simple.getScrollPosition(99)).toBe(40);

    const invalid = createLayout({ items: [{ id: 1 }], itemSize: 0 }).layout;
    expect(() => invalid.getRange(0, 20)).toThrow('itemSize must be a positive number');
  });

  test('finds HTML and SVG scrolling ancestors and browser fallback roots', () => {
    expect(getScrollParent(null as never)).toBeNull();

    const outer = document.createElement('div');
    outer.style.overflowY = 'auto';
    const middle = document.createElement('div');
    const child = document.createElement('div');
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    middle.append(child, svg);
    outer.append(middle);
    document.body.append(outer);
    expect(getScrollParent(child)).toBe(outer);
    expect(getScrollParent(svg)).toBe(outer);

    outer.style.overflowY = 'visible';
    expect(getScrollParent(child)).toBe(document.scrollingElement || document.documentElement);
    const scrollingElement = Object.getOwnPropertyDescriptor(document, 'scrollingElement');
    Object.defineProperty(document, 'scrollingElement', { configurable: true, value: null });
    expect(getScrollParent(child)).toBe(document.documentElement);
    if (scrollingElement) Object.defineProperty(document, 'scrollingElement', scrollingElement);
    outer.remove();
  });

  test('batches ResizeObserver entries and disconnects or cancels pending work on unmount', () => {
    let callback!: ResizeObserverCallback;
    const observe = vi.fn();
    const unobserve = vi.fn();
    const disconnect = vi.fn();
    vi.stubGlobal(
      'ResizeObserver',
      class {
        constructor(cb: ResizeObserverCallback) {
          callback = cb;
        }
        observe = observe;
        unobserve = unobserve;
        disconnect = disconnect;
      },
    );
    const frames: FrameRequestCallback[] = [];
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation(frame => {
      frames.push(frame);
      return frames.length;
    });
    const cancel = vi.spyOn(window, 'cancelAnimationFrame');
    let observer: ResizeObserver | undefined;
    const Harness = defineComponent({
      setup() {
        observer = useVirtualScrollerResizeObserver();
        return () => null;
      },
    });
    const wrapper = mount(Harness);
    const resize = vi.fn();
    const missingHandler = document.createElement('div');
    missingHandler.$_vs_id = 'missing-handler';
    const missingId = document.createElement('div');
    missingId.$_vs_onResize = resize;
    const target = document.createElement('div');
    target.$_vs_id = 'row-a';
    target.$_vs_onResize = resize;
    const entries = [missingHandler, missingId, target].map(
      element =>
        ({
          target: element,
          borderBoxSize: [{ inlineSize: 120, blockSize: 36 }],
        }) as unknown as ResizeObserverEntry,
    );

    callback(entries, observer!);
    callback([entries[2]], observer!);
    expect(frames).toHaveLength(1);
    frames.shift()?.(0);
    expect(resize).toHaveBeenCalledTimes(2);
    expect(resize).toHaveBeenLastCalledWith('row-a', 120, 36);

    callback([entries[2]], observer!);
    wrapper.unmount();
    expect(disconnect).toHaveBeenCalledOnce();
    expect(cancel).toHaveBeenCalledWith(1);
  });

  test('returns no ResizeObserver when the browser API is unavailable', () => {
    vi.stubGlobal('ResizeObserver', undefined);
    let observer: ResizeObserver | undefined;
    const Harness = defineComponent({
      setup() {
        observer = useVirtualScrollerResizeObserver();
        return () => null;
      },
    });
    mount(Harness);
    expect(observer).toBeUndefined();
  });

  test('drives renderless vertical fallbacks and horizontal external scrolling', async () => {
    const items = [
      { id: 'a', size: 10 },
      { id: 'b', size: 20 },
      { id: 'c', size: 30 },
    ];
    const props = reactive({
      items,
      renderless: true,
      scrollContainer: undefined as HTMLElement | undefined,
      itemSize: undefined as number | undefined,
      minItemSize: 10,
      buffer: 0,
      direction: 'vertical' as 'vertical' | 'horizontal',
      scrollerHeight: '40px',
      emitUpdate: false,
    }) as unknown as VirtualScrollerProps;
    const emit = vi.fn();
    let api!: ReturnType<typeof useRenderlessVirtualScroller>;
    const Harness = defineComponent({
      setup() {
        api = useRenderlessVirtualScroller(
          props,
          computed(() => items.map(item => ({ item, id: item.id, size: item.size }))),
          emit,
        );
        return () => null;
      },
    });
    const wrapper = mount(Harness);

    expect(api.scope.value.views.map(view => view.item.id)).toEqual(['a', 'b', 'c']);
    expect(api.scope.value.startOffset).toBe(0);
    api.scrollToItem(2);
    api.scrollToBottom();
    expect(emit).not.toHaveBeenCalled();

    const target = document.createElement('div');
    Object.defineProperties(target, {
      clientHeight: { configurable: true, value: 0 },
      clientWidth: { configurable: true, value: 40 },
      scrollLeft: { configurable: true, writable: true, value: 0 },
    });
    document.body.append(target);
    props.scrollContainer = target;
    props.itemSize = 20;
    props.direction = 'horizontal';
    props.emitUpdate = true;
    await nextTick();

    target.scrollLeft = 20;
    api.updateRange();
    expect(emit).toHaveBeenLastCalledWith('update', 1, 3, 1, 3);
    api.scrollToItem(0);
    expect(target.scrollLeft).toBe(0);
    api.scrollToBottom();
    expect(target.scrollLeft).toBe(60);

    Object.defineProperties(target, {
      clientWidth: { configurable: true, value: 0 },
      scrollTop: { configurable: true, writable: true, value: 0 },
    });
    props.direction = 'vertical';
    target.scrollTop = 200;
    api.updateRange();
    expect(api.scope.value.startOffset).toBe(api.scope.value.totalSize);
    api.scrollToBottom();
    expect(target.scrollTop).toBe(60);

    props.renderless = false;
    api.updateRange();
    target.remove();
    wrapper.unmount();
  });

  test('normalizes invalid layout inputs and variable fallback sizes', () => {
    const { layout } = createLayout({
      items: [{ id: 0, size: 0 }, { id: 1 }],
      minItemSize: 0,
      gridItems: Number.NaN,
    });

    expect(layout.gridItems.value).toBe(1);
    expect(layout.computedMinItemSize.value).toBe(0);
    expect(layout.getItemPosition(0)).toEqual({ position: 0, offset: 0 });
    expect(layout.getItemType(null)).toBeUndefined();
    expect(layout.getRange(0, 0)).toMatchObject({ startIndex: 2, endIndex: 0, totalSize: 0 });

    const primitive = createLayout({
      items: ['first', 'second'],
      minItemSize: 12,
    }).layout;
    expect(primitive.getRange(0, 24)).toMatchObject({ startIndex: 0, endIndex: 2 });
    expect(primitive.getItemPosition(-2)).toEqual({ position: 0, offset: 0 });
  });

  test('covers pooled-view bookkeeping after external type metadata changes', () => {
    const pool = useRecycleScrollerPool();
    const target = pool.acquireView(0, { id: 'target' }, 'target', 'row').view;
    const other = pool.acquireView(1, { id: 'other' }, 'other', 'other').view;
    pool.unuseView(target);
    pool.unuseView(other);

    target.nr.type = 'missing-pool';
    expect(pool.acquireView(2, { id: 'target-1' }, 'target', 'missing-pool').view).toBe(target);
    pool.unuseView(target);

    target.nr.type = 'other';
    expect(pool.acquireView(3, { id: 'target-2' }, 'target', 'other').view).toBe(target);
  });
});
