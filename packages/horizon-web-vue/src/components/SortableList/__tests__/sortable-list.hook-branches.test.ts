import { mount } from '@vue/test-utils';
import { defineComponent, nextTick, ref } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import useSortableList, {
  moveSortableListItem,
  reorderSortableListItem,
} from '../src/hooks/useSortableList';

const items = () => [
  { id: 'a', disabled: false },
  { id: 'b', disabled: false },
  { id: 'c', disabled: true },
];

function rect(top: number): DOMRect {
  return new DOMRect(0, top, 100, 40);
}

function dragEvent(
  type: string,
  options: {
    clientY?: number;
    currentTarget?: EventTarget | null;
    relatedTarget?: EventTarget | null;
    dataTransfer?: object | null;
  } = {},
) {
  const event = new Event(type, { bubbles: true, cancelable: true }) as DragEvent;
  Object.defineProperties(event, {
    clientY: { configurable: true, value: options.clientY ?? 0 },
    currentTarget: { configurable: true, value: options.currentTarget ?? null },
    relatedTarget: { configurable: true, value: options.relatedTarget ?? null },
    dataTransfer: { configurable: true, value: options.dataTransfer ?? null },
  });
  return event;
}

function mountHook() {
  const list = ref(items());
  const disabled = ref(false);
  const itemKey = ref<string | ((item: any, index: number) => string)>('id');
  const itemDisabled = ref<string | ((item: any, index: number) => boolean) | undefined>(
    'disabled',
  );
  const onSort = vi.fn();
  const onDragStart = vi.fn();
  const onDragEnd = vi.fn();
  const onPointerStart = vi.fn();
  const onPointerEnd = vi.fn();
  const focusHandle = vi.fn();
  let api!: ReturnType<typeof useSortableList>;
  const Harness = defineComponent({
    setup() {
      api = useSortableList({
        items: list,
        disabled,
        itemKey,
        itemDisabled,
        onSort,
        onDragStart,
        onDragEnd,
        onPointerStart,
        onPointerEnd,
        focusHandle,
        animated: ref(false),
      });
      return () => null;
    },
  });
  const wrapper = mount(Harness);
  return {
    wrapper,
    api,
    list,
    disabled,
    itemKey,
    itemDisabled,
    onSort,
    onDragStart,
    onDragEnd,
    onPointerStart,
    onPointerEnd,
    focusHandle,
  };
}

describe('SortableList hook browser branches', () => {
  test('covers invalid helper boundaries and both drop positions', () => {
    const list = items();
    expect(moveSortableListItem(list, list.length, 0)).toBeUndefined();
    expect(moveSortableListItem(list, 0, -1)).toBeUndefined();
    expect(moveSortableListItem(list, 0, list.length)).toBeUndefined();
    expect(reorderSortableListItem(list, 'missing', 'a', 'before', 'id')).toBeUndefined();
    expect(reorderSortableListItem(list, 'a', 'missing', 'before', 'id')).toBeUndefined();
    expect(reorderSortableListItem(list, 'a', 'a', 'before', 'id')).toBeUndefined();
    expect(reorderSortableListItem(list, 'c', 'a', 'before', 'id')?.newIndex).toBe(0);
  });

  test('runs native drag guards, before/after targets, leave and drop lifecycles', () => {
    const state = mountHook();
    const [first, second, third] = state.list.value;
    const transfer = { setData: vi.fn(), effectAllowed: 'none', dropEffect: 'none' };

    const disabledStart = dragEvent('dragstart', { dataTransfer: transfer });
    state.api.onDragStart(disabledStart, third, 2);
    expect(disabledStart.defaultPrevented).toBe(true);

    const idleOver = dragEvent('dragover');
    state.api.onDragOver(idleOver, second, 1);
    expect(idleOver.defaultPrevented).toBe(false);

    const start = dragEvent('dragstart', { dataTransfer: transfer });
    state.api.onDragStart(start, first, 0);
    expect(transfer.setData).toHaveBeenCalledWith('text/plain', 'a');
    expect(transfer.effectAllowed).toBe('move');
    expect(state.onDragStart).toHaveBeenCalled();

    const disabledOver = dragEvent('dragover');
    state.api.onDragOver(disabledOver, third, 2);
    expect(disabledOver.defaultPrevented).toBe(false);
    state.itemDisabled.value = undefined;

    const target = document.createElement('div');
    target.getBoundingClientRect = () => rect(20);
    const before = dragEvent('dragover', {
      clientY: 21,
      currentTarget: target,
      dataTransfer: transfer,
    });
    state.api.onDragOver(before, third, 2);
    expect(before.defaultPrevented).toBe(true);
    expect(transfer.dropEffect).toBe('move');
    expect(state.api.dropTarget.value).toEqual({ key: 'c', position: 'before' });

    const child = document.createElement('span');
    target.append(child);
    state.api.onDragLeave(
      dragEvent('dragleave', { currentTarget: target, relatedTarget: child }),
      third,
      2,
    );
    expect(state.api.dropTarget.value).toBeDefined();
    state.api.onDragLeave(dragEvent('dragleave', { currentTarget: target }), third, 2);
    expect(state.api.dropTarget.value).toBeUndefined();

    const afterWithoutRect = dragEvent('dragover', { currentTarget: null });
    state.api.onDragOver(afterWithoutRect, second, 1);
    expect(state.api.dropTarget.value).toEqual({ key: 'b', position: 'after' });
    const wrongDrop = dragEvent('drop');
    state.api.onDrop(wrongDrop, third, 2);
    expect(wrongDrop.defaultPrevented).toBe(false);
    const drop = dragEvent('drop');
    state.api.onDrop(drop, second, 1);
    expect(drop.defaultPrevented).toBe(true);
    expect(state.onSort).toHaveBeenCalledWith(
      expect.objectContaining({ oldIndex: 0, newIndex: 1, trigger: 'drag' }),
      expect.objectContaining({ sourceItem: first, targetItem: second, position: 'after' }),
    );

    state.api.onDragEnd(dragEvent('dragend'), first, 0);
    expect(state.onDragEnd).toHaveBeenCalledWith(expect.any(Event), first, 0, 'a');
    state.wrapper.unmount();
  });

  test('covers pointer guards, candidate selection, cancellation and optional callbacks', async () => {
    const state = mountHook();
    const [first, second] = state.list.value;
    const firstElement = document.createElement('div');
    const secondElement = document.createElement('div');
    const thirdElement = document.createElement('div');
    firstElement.getBoundingClientRect = () => rect(0);
    secondElement.getBoundingClientRect = () => rect(50);
    thirdElement.getBoundingClientRect = () => rect(100);
    state.api.setItemElement('a', firstElement);
    state.api.setItemElement('b', secondElement);
    state.api.setItemElement('c', thirdElement);

    state.api.onPointerDown(new PointerEvent('pointerdown', { button: 1 }), first, 0);
    expect(state.onPointerStart).not.toHaveBeenCalled();
    state.disabled.value = true;
    state.api.onPointerDown(new PointerEvent('pointerdown', { button: 0 }), first, 0);
    state.disabled.value = false;
    expect(state.onPointerStart).not.toHaveBeenCalled();

    const button = document.createElement('button');
    state.api.onPointerDown(
      new PointerEvent('pointerdown', { button: 0, bubbles: true }),
      first,
      0,
      true,
    );
    expect(state.onPointerStart).toHaveBeenCalledOnce();
    window.dispatchEvent(new PointerEvent('pointercancel', { bubbles: true }));
    const interactive = new PointerEvent('pointerdown', { button: 0, bubbles: true });
    Object.defineProperty(interactive, 'target', { value: button });
    state.api.onPointerDown(interactive, first, 0, true);
    expect(state.onPointerStart).toHaveBeenCalledOnce();

    const start = new PointerEvent('pointerdown', {
      button: 0,
      bubbles: true,
      cancelable: true,
      clientY: 10,
    });
    state.api.onPointerDown(start, first, 0);
    expect(start.defaultPrevented).toBe(true);
    expect(state.onPointerStart).toHaveBeenLastCalledWith(start, first, 0, 'a');

    window.dispatchEvent(
      new PointerEvent('pointermove', { bubbles: true, cancelable: true, clientY: 55 }),
    );
    expect(state.api.dropTarget.value).toEqual({ key: 'b', position: 'before' });
    window.dispatchEvent(
      new PointerEvent('pointermove', { bubbles: true, cancelable: true, clientY: 200 }),
    );
    expect(state.api.dropTarget.value).toEqual({ key: 'c', position: 'after' });
    window.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, clientY: 200 }));
    expect(state.onSort).toHaveBeenCalled();
    expect(state.onPointerEnd).toHaveBeenCalled();

    state.itemDisabled.value = undefined;
    state.api.onPointerDown(
      new PointerEvent('pointerdown', { button: 0, bubbles: true, clientY: 10 }),
      second,
      1,
    );
    window.dispatchEvent(new PointerEvent('pointercancel', { bubbles: true }));
    expect(state.onPointerEnd).toHaveBeenCalledTimes(3);

    state.api.setItemElement('a', null);
    state.api.setItemElement('b', null);
    state.api.setItemElement('c', null);
    await nextTick();
    state.wrapper.unmount();
  });

  test('covers move and every keyboard boundary', async () => {
    const state = mountHook();
    const [first, second, third] = state.list.value;
    state.disabled.value = true;
    state.api.move(0, 1);
    state.disabled.value = false;
    state.api.move(9, 0);
    state.api.move(2, 0);
    state.api.move(0, 0);
    expect(state.onSort).not.toHaveBeenCalled();

    state.api.move(0, 1, 'drag');
    await nextTick();
    expect(state.onSort).toHaveBeenCalledWith(
      expect.objectContaining({ trigger: 'drag' }),
      undefined,
    );
    expect(state.focusHandle).toHaveBeenCalledWith('a');

    state.api.onHandleKeydown(new KeyboardEvent('keydown', { key: 'Escape' }), first, 0);
    state.api.onHandleKeydown(new KeyboardEvent('keydown', { key: 'ArrowUp' }), first, 0);
    state.api.onHandleKeydown(new KeyboardEvent('keydown', { key: 'ArrowDown' }), first, 0);
    state.api.onHandleKeydown(new KeyboardEvent('keydown', { key: 'Home' }), second, 1);
    state.api.onHandleKeydown(new KeyboardEvent('keydown', { key: 'End' }), second, 1);
    state.api.onHandleKeydown(new KeyboardEvent('keydown', { key: 'ArrowUp' }), third, 2);
    expect(state.onSort.mock.calls.length).toBeGreaterThan(1);
    state.wrapper.unmount();
  });
});
