import { mount } from '@vue/test-utils';
import { computed, defineComponent, nextTick, reactive, ref } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import useRowDraggable from '../src/hooks/useRowDraggable';
import {
  HTableTransformedRowContextKey,
  type HTableTransformedRowDataType,
} from '../src/utils/types';

function transformedRow(
  id: string,
  siblingIndex: number,
  parentUuid: string | null = null,
): HTableTransformedRowDataType {
  return {
    id,
    [HTableTransformedRowContextKey]: {
      uuid: id,
      index: siblingIndex,
      siblingIndex,
      visible: {},
      parentUuid,
      level: parentUuid === null ? 0 : 1,
      isLeaf: true,
    },
  } as HTableTransformedRowDataType;
}

function dragEvent(
  type: string,
  options: { clientY?: number; relatedTarget?: EventTarget | null; dataTransfer?: object } = {},
) {
  const event = new Event(type, { bubbles: true, cancelable: true }) as DragEvent;
  Object.defineProperties(event, {
    clientY: { configurable: true, value: options.clientY ?? 0 },
    dataTransfer: { configurable: true, value: options.dataTransfer ?? null },
    relatedTarget: { configurable: true, value: options.relatedTarget ?? null },
  });
  return event;
}

function mountDraggable(
  source: HTableTransformedRowDataType,
  target: HTableTransformedRowDataType,
  overrides: Record<string, unknown> = {},
) {
  const props = reactive({
    data: [{ id: 'a' }, { id: 'b' }, { id: 'c' }],
    rowKey: 'id',
    ...overrides,
  }) as any;
  const emit = vi.fn();
  const scrollContainer = document.createElement('div');
  scrollContainer.scrollTop = 50;
  Object.defineProperty(scrollContainer, 'getBoundingClientRect', {
    configurable: true,
    value: () => new DOMRect(0, 0, 100, 100),
  });
  let api!: ReturnType<typeof useRowDraggable>;
  const Harness = defineComponent({
    setup() {
      api = useRowDraggable(
        props,
        emit as any,
        computed(() => ({ children: 'children' }) as any),
        computed(() => scrollContainer),
      );
      return () => {
        const handle = api.getDragHandleProps(source);
        const targetEvents = api.getRowDraggableEvents(target);
        return (
          <div>
            <button
              data-drag-handle
              draggable={handle.draggable}
              class={api.getRowDraggableClass(source)}
              onDragstart={handle.onDragstart}
              onDragend={handle.onDragend}
            />
            <div
              data-drop-row
              class={api.getRowDraggableClass(target)}
              onDragover={targetEvents.onDragover}
              onDragleave={targetEvents.onDragleave}
              onDrop={targetEvents.onDrop}
            />
          </div>
        );
      };
    },
  });
  const wrapper = mount(Harness, { attachTo: document.body });
  return { wrapper, props, emit, api, scrollContainer };
}

describe('Table row draggable browser branches', () => {
  test('dispatches native drag events, renders before state and reorders root rows', async () => {
    const source = transformedRow('c', 2);
    const target = transformedRow('a', 0);
    const state = mountDraggable(source, target);
    const transfer = { setData: vi.fn(), effectAllowed: 'none', dropEffect: 'none' };

    state.wrapper.get('[data-drag-handle]').element.dispatchEvent(
      dragEvent('dragstart', { dataTransfer: transfer }),
    );
    await nextTick();
    expect(transfer.setData).toHaveBeenCalledWith('text/plain', 'c');
    expect(transfer.effectAllowed).toBe('move');
    expect(state.wrapper.get('[data-drag-handle]').classes()).toContain('is-row-dragging');

    const targetElement = state.wrapper.get('[data-drop-row]').element;
    Object.defineProperty(targetElement, 'getBoundingClientRect', {
      configurable: true,
      value: () => new DOMRect(0, 20, 100, 20),
    });
    const over = dragEvent('dragover', { clientY: 22, dataTransfer: transfer });
    targetElement.dispatchEvent(over);
    await nextTick();
    expect(over.defaultPrevented).toBe(true);
    expect(transfer.dropEffect).toBe('move');
    expect(state.wrapper.get('[data-drop-row]').classes()).toContain('is-row-drag-over-before');

    const inside = document.createElement('span');
    targetElement.append(inside);
    targetElement.dispatchEvent(dragEvent('dragleave', { relatedTarget: inside }));
    expect(state.wrapper.get('[data-drop-row]').classes()).toContain('is-row-drag-over-before');
    targetElement.dispatchEvent(dragEvent('dragleave'));
    await nextTick();
    expect(state.wrapper.get('[data-drop-row]').classes()).not.toContain(
      'is-row-drag-over-before',
    );

    targetElement.dispatchEvent(dragEvent('dragover', { clientY: 22, dataTransfer: transfer }));
    const drop = dragEvent('drop', { dataTransfer: transfer });
    targetElement.dispatchEvent(drop);
    expect(drop.defaultPrevented).toBe(true);
    expect(state.emit).toHaveBeenCalledWith('update:data', [
      { id: 'c' },
      { id: 'a' },
      { id: 'b' },
    ]);
    await nextTick();
    expect(state.wrapper.get('[data-drag-handle]').classes()).not.toContain('is-row-dragging');
    state.wrapper.unmount();
  });

  test('renders after state and ignores self and cross-parent targets', async () => {
    const source = transformedRow('a', 0);
    const target = transformedRow('b', 1);
    const state = mountDraggable(source, target);
    const transfer = { setData: vi.fn(), effectAllowed: 'none', dropEffect: 'none' };
    state.api.getDragHandleProps(source).onDragstart(
      dragEvent('dragstart', { dataTransfer: transfer }),
    );

    const selfOver = dragEvent('dragover');
    state.api.getRowDraggableEvents(source).onDragover(selfOver);
    expect(selfOver.defaultPrevented).toBe(false);

    const otherParent = transformedRow('child', 0, 'parent');
    const crossOver = dragEvent('dragover');
    state.api.getRowDraggableEvents(otherParent).onDragover(crossOver);
    expect(crossOver.defaultPrevented).toBe(false);

    const targetElement = state.wrapper.get('[data-drop-row]').element;
    Object.defineProperty(targetElement, 'getBoundingClientRect', {
      configurable: true,
      value: () => new DOMRect(0, 0, 100, 20),
    });
    targetElement.dispatchEvent(dragEvent('dragover', { clientY: 19 }));
    await nextTick();
    expect(state.wrapper.get('[data-drop-row]').classes()).toContain('is-row-drag-over-after');
    targetElement.dispatchEvent(dragEvent('drop'));
    expect(state.emit).toHaveBeenCalledWith('update:data', [
      { id: 'b' },
      { id: 'a' },
      { id: 'c' },
    ]);

    state.api.getDragHandleProps(source).onDragend();
    state.wrapper.unmount();
  });

  test('reorders nested siblings and rejects invalid parent and row-key contracts', () => {
    const source = transformedRow('a-2', 1, 'parent');
    const target = transformedRow('a-1', 0, 'parent');
    const nestedData = [
      {
        id: 'outer',
        children: [
          { id: 'parent', children: [{ id: 'a-1' }, { id: 'a-2' }] },
        ],
      },
    ];
    const state = mountDraggable(source, target, { data: nestedData });
    state.api.getDragHandleProps(source).onDragstart(dragEvent('dragstart'));
    const targetEvents = state.api.getRowDraggableEvents(target);
    const currentTarget = document.createElement('div');
    Object.defineProperty(currentTarget, 'getBoundingClientRect', {
      value: () => new DOMRect(0, 0, 20, 20),
    });
    const over = dragEvent('dragover', { clientY: 1 });
    Object.defineProperty(over, 'currentTarget', { configurable: true, value: currentTarget });
    targetEvents.onDragover(over);
    targetEvents.onDrop(dragEvent('drop'));
    expect(state.emit).toHaveBeenCalledWith('update:data', [
      {
        id: 'outer',
        children: [
          { id: 'parent', children: [{ id: 'a-2' }, { id: 'a-1' }] },
        ],
      },
    ]);

    state.emit.mockClear();
    state.props.rowKey = undefined;
    state.api.getDragHandleProps(source).onDragstart(dragEvent('dragstart'));
    targetEvents.onDragover(over);
    targetEvents.onDrop(dragEvent('drop'));
    expect(state.emit).not.toHaveBeenCalled();

    state.props.rowKey = 'id';
    const missingParent = transformedRow('missing', 0, 'absent');
    state.api.getDragHandleProps(missingParent).onDragstart(dragEvent('dragstart'));
    state.api.getRowDraggableEvents(transformedRow('other', 1, 'absent')).onDragover(over);
    state.api.getRowDraggableEvents(transformedRow('other', 1, 'absent')).onDrop(dragEvent('drop'));
    expect(state.emit).not.toHaveBeenCalled();
    state.wrapper.unmount();
  });

  test('auto-scrolls near both edges and stops for center or zero-height containers', async () => {
    const source = transformedRow('a', 0);
    const target = transformedRow('b', 1);
    const state = mountDraggable(source, target);
    state.api.getDragHandleProps(source).onDragstart(dragEvent('dragstart'));
    const events = state.api.getRowDraggableEvents(target);
    const targetElement = document.createElement('div');
    Object.defineProperty(targetElement, 'getBoundingClientRect', {
      value: () => new DOMRect(0, 0, 20, 20),
    });

    const topEvent = dragEvent('dragover', { clientY: 1 });
    Object.defineProperty(topEvent, 'currentTarget', { value: targetElement });
    events.onDragover(topEvent);
    await new Promise(resolve => requestAnimationFrame(() => resolve(undefined)));
    expect(state.scrollContainer.scrollTop).toBeLessThan(50);

    const bottomEvent = dragEvent('dragover', { clientY: 99 });
    Object.defineProperty(bottomEvent, 'currentTarget', { value: targetElement });
    events.onDragover(bottomEvent);
    await new Promise(resolve => requestAnimationFrame(() => resolve(undefined)));
    expect(state.scrollContainer.scrollTop).toBeGreaterThanOrEqual(0);

    const centerEvent = dragEvent('dragover', { clientY: 50 });
    Object.defineProperty(centerEvent, 'currentTarget', { value: targetElement });
    events.onDragover(centerEvent);
    Object.defineProperty(state.scrollContainer, 'getBoundingClientRect', {
      configurable: true,
      value: () => new DOMRect(0, 0, 0, 0),
    });
    const zeroHeightEvent = dragEvent('dragover', { clientY: 0 });
    Object.defineProperty(zeroHeightEvent, 'currentTarget', { value: targetElement });
    events.onDragover(zeroHeightEvent);
    state.wrapper.unmount();
  });

  test('reorders root rows by sibling index when rowKey is omitted and ignores invalid indexes', () => {
    const source = transformedRow('source', 2);
    const target = transformedRow('target', 0);
    const state = mountDraggable(source, target, {
      rowKey: undefined,
      data: [{ id: 'a' }, { id: 'b' }, { id: 'c' }],
    });
    const targetElement = document.createElement('div');
    Object.defineProperty(targetElement, 'getBoundingClientRect', {
      value: () => new DOMRect(0, 0, 20, 20),
    });
    const over = dragEvent('dragover', { clientY: 1 });
    Object.defineProperty(over, 'currentTarget', { value: targetElement });

    state.api.getDragHandleProps(source).onDragstart(dragEvent('dragstart'));
    state.api.getRowDraggableEvents(target).onDragover(over);
    state.api.getRowDraggableEvents(target).onDrop(dragEvent('drop'));
    expect(state.emit).toHaveBeenCalledWith('update:data', [
      { id: 'c' },
      { id: 'a' },
      { id: 'b' },
    ]);

    state.emit.mockClear();
    const invalid = transformedRow('invalid', -1);
    state.api.getDragHandleProps(invalid).onDragstart(dragEvent('dragstart'));
    state.api.getRowDraggableEvents(target).onDragover(over);
    state.api.getRowDraggableEvents(target).onDrop(dragEvent('drop'));
    expect(state.emit).not.toHaveBeenCalled();

    state.api.getDragHandleProps(target).onDragstart(dragEvent('dragstart'));
    state.api.getRowDraggableEvents(target).onDrop(dragEvent('drop'));
    expect(state.emit).not.toHaveBeenCalled();
    state.wrapper.unmount();
  });

  test('covers empty drag lifecycle, missing geometry and nested non-array children', () => {
    const source = transformedRow('a-2', 1, 'parent');
    const target = transformedRow('a-1', 0, 'parent');
    const state = mountDraggable(source, target, {
      data: [{ id: 'parent', children: null }, { id: 'unrelated', children: [] }],
    });
    const events = state.api.getRowDraggableEvents(target);
    const idleOver = dragEvent('dragover');
    events.onDragover(idleOver);
    expect(idleOver.defaultPrevented).toBe(false);
    events.onDragleave(dragEvent('dragleave'));
    const idleDrop = dragEvent('drop');
    events.onDrop(idleDrop);
    expect(idleDrop.defaultPrevented).toBe(false);

    state.api.getDragHandleProps(source).onDragstart(dragEvent('dragstart'));
    const geometryless = dragEvent('dragover', { clientY: 1 });
    Object.defineProperty(geometryless, 'currentTarget', { value: null });
    events.onDragover(geometryless);
    expect(geometryless.defaultPrevented).toBe(true);
    const drop = dragEvent('drop');
    events.onDrop(drop);
    expect(state.emit).not.toHaveBeenCalled();
    state.wrapper.unmount();
  });

  test('does not auto-scroll without a container and stops a stale animation frame', () => {
    const source = transformedRow('a', 0);
    const target = transformedRow('b', 1);
    const props = reactive({ data: [{ id: 'a' }, { id: 'b' }], rowKey: 'id' }) as any;
    const emit = vi.fn();
    const container = ref<HTMLElement>();
    const callbacks: FrameRequestCallback[] = [];
    const request = vi
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation(callback => (callbacks.push(callback), callbacks.length));
    const cancel = vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => undefined);
    const now = vi.spyOn(performance, 'now').mockReturnValue(0);
    let api!: ReturnType<typeof useRowDraggable>;
    const Harness = defineComponent({
      setup() {
        api = useRowDraggable(
          props,
          emit as any,
          computed(() => ({ children: 'children' }) as any),
          computed(() => container.value),
        );
        return () => null;
      },
    });
    const wrapper = mount(Harness);
    api.getDragHandleProps(source).onDragstart(dragEvent('dragstart'));
    api.getRowDraggableEvents(target).onDragover(dragEvent('dragover', { clientY: 1 }));
    expect(request).not.toHaveBeenCalled();

    const scrollContainer = document.createElement('div');
    Object.defineProperty(scrollContainer, 'getBoundingClientRect', {
      value: () => new DOMRect(0, 0, 100, 100),
    });
    container.value = scrollContainer;
    api.getRowDraggableEvents(target).onDragover(dragEvent('dragover', { clientY: 1 }));
    expect(request).toHaveBeenCalledOnce();
    now.mockReturnValue(500);
    callbacks[0](500);
    expect(cancel).toHaveBeenCalled();

    wrapper.unmount();
    request.mockRestore();
    cancel.mockRestore();
    now.mockRestore();
  });
});
