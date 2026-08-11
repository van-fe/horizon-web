import { ref } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import useHeaderDraggable from '../src/hooks/useHeaderDraggable';
import {
  HTableColumnContextKey,
  type HTableColumnData,
  type HTableFixedValue,
  type HTableInsertedColumnData,
} from '../src/utils/types';

function column(
  uuid: string,
  overrides: Record<string, unknown> = {},
  parentColumn?: HTableColumnData,
): HTableColumnData {
  return {
    uuid,
    props: { draggable: true, lockPosition: false, ...overrides },
    [HTableColumnContextKey]: { parentColumn },
  } as unknown as HTableColumnData;
}

function raw(uuid: string, children: HTableInsertedColumnData[] = []) {
  return { uuid, children } as HTableInsertedColumnData;
}

function dragEvent(
  type: string,
  options: { clientX?: number; relatedTarget?: EventTarget | null; dataTransfer?: object } = {},
) {
  const event = new Event(type, { bubbles: true, cancelable: true }) as DragEvent;
  const target = document.createElement('div');
  Object.defineProperty(target, 'getBoundingClientRect', {
    value: () => new DOMRect(20, 0, 100, 20),
  });
  Object.defineProperties(event, {
    clientX: { value: options.clientX ?? 0 },
    currentTarget: { configurable: true, value: target },
    relatedTarget: { value: options.relatedTarget ?? null },
    dataTransfer: { value: options.dataTransfer ?? null },
  });
  return { event, target };
}

function createState(
  groups: HTableColumnData[][],
  rawColumns: HTableInsertedColumnData[],
  fixed: Record<string, HTableFixedValue> = {},
) {
  const sortStore = ref(new Map<string, number>());
  const api = useHeaderDraggable({
    columns: ref(rawColumns),
    columnAnalysis: ref({ columnGroups: groups, flattenColumns: groups.flat() }),
    sortStore,
    getFixedState: uuid => fixed[uuid],
  });
  return { api, sortStore, rawColumns };
}

describe('Table header draggable browser branches', () => {
  test('reorders sibling columns before and after with native drag payloads', () => {
    const a = column('a');
    const b = column('b');
    const c = column('c');
    const state = createState([[a, b, c]], [raw('a'), raw('b'), raw('c')]);
    const transfer = { setData: vi.fn(), effectAllowed: 'none', dropEffect: 'none' };
    const source = state.api.getDraggableProps(c);
    const target = state.api.getDraggableProps(a);

    source.onDragstart(dragEvent('dragstart', { dataTransfer: transfer }).event);
    expect(transfer.setData).toHaveBeenCalledWith('text/plain', 'c');
    expect(transfer.effectAllowed).toBe('move');
    expect(state.api.getDraggableProps(c).class).toContain('is-dragging');

    const before = dragEvent('dragover', { clientX: 25, dataTransfer: transfer });
    target.onDragover(before.event);
    expect(before.event.defaultPrevented).toBe(true);
    expect(transfer.dropEffect).toBe('move');
    expect(state.api.getDraggableProps(a).class).toContain('is-drag-over-before');

    const inside = document.createElement('span');
    before.target.append(inside);
    const stay = dragEvent('dragleave', { relatedTarget: inside });
    Object.defineProperty(stay.event, 'currentTarget', { configurable: true, value: before.target });
    target.onDragleave(stay.event);
    expect(state.api.getDraggableProps(a).class).toContain('is-drag-over-before');
    target.onDragleave(dragEvent('dragleave').event);
    expect(state.api.getDraggableProps(a).class).not.toContain('is-drag-over-before');

    target.onDragover(before.event);
    const drop = dragEvent('drop');
    target.onDrop(drop.event);
    expect(drop.event.defaultPrevented).toBe(true);
    expect(state.rawColumns.map(item => item.uuid)).toEqual(['c', 'a', 'b']);
    expect([...state.sortStore.value.entries()]).toEqual([
      ['c', 0],
      ['a', 1],
      ['b', 2],
    ]);

    const nextSource = state.api.getDraggableProps(c);
    const nextTarget = state.api.getDraggableProps(b);
    nextSource.onDragstart(dragEvent('dragstart').event);
    nextTarget.onDragover(dragEvent('dragover', { clientX: 119 }).event);
    expect(state.api.getDraggableProps(b).class).toContain('is-drag-over-after');
    nextTarget.onDrop(dragEvent('drop').event);
    expect(state.rawColumns.map(item => item.uuid)).toEqual(['a', 'b', 'c']);
    nextSource.onDragend();
  });

  test('blocks disabled, locked, cross-parent and cross-fixed drag contracts', () => {
    const parent = column('parent');
    const otherParent = column('other-parent');
    const disabled = column('disabled', { draggable: false });
    const locked = column('locked', { lockPosition: true });
    const a = column('a', {}, parent);
    const barrier = column('barrier', { lockPosition: true }, parent);
    const b = column('b', {}, parent);
    const crossParent = column('cross-parent', {}, otherParent);
    const fixed = column('fixed', {}, parent);
    const state = createState(
      [[disabled, locked, a, barrier, b, crossParent, fixed]],
      [raw('disabled'), raw('locked'), raw('a'), raw('barrier'), raw('b'), raw('cross-parent'), raw('fixed')],
      { fixed: 'left' },
    );

    for (const blocked of [disabled, locked]) {
      const event = dragEvent('dragstart').event;
      state.api.getDraggableProps(blocked).onDragstart(event);
      expect(event.defaultPrevented).toBe(true);
      expect(state.api.getDraggableProps(blocked).draggable).toBe(false);
    }

    state.api.getDraggableProps(a).onDragstart(dragEvent('dragstart').event);
    for (const target of [a, b, crossParent, fixed]) {
      const over = dragEvent('dragover').event;
      state.api.getDraggableProps(target).onDragover(over);
      expect(over.defaultPrevented).toBe(false);
    }

    state.api.getDraggableProps(a).onDragend();
    const noSource = dragEvent('dragover').event;
    state.api.getDraggableProps(b).onDragover(noSource);
    expect(noSource.defaultPrevented).toBe(false);
    state.api.getDraggableProps(b).onDrop(dragEvent('drop').event);
  });

  test('reorders nested raw siblings while retaining hidden raw columns', () => {
    const parent = column('parent');
    const a = column('a', {}, parent);
    const b = column('b', {}, parent);
    const hidden = raw('hidden');
    const nested = [raw('parent', [raw('a'), hidden, raw('b')])];
    const state = createState([[parent], [a, b]], nested);

    state.api.getDraggableProps(b).onDragstart(dragEvent('dragstart').event);
    state.api.getDraggableProps(a).onDragover(dragEvent('dragover', { clientX: 0 }).event);
    state.api.getDraggableProps(a).onDrop(dragEvent('drop').event);
    expect(nested[0].children.map(item => item.uuid)).toEqual(['b', 'hidden', 'a']);

    const orphan = column('orphan');
    const orphanState = createState([[orphan, a]], [raw('a')]);
    orphanState.api.getDraggableProps(orphan).onDragstart(dragEvent('dragstart').event);
    orphanState.api.getDraggableProps(a).onDragover(dragEvent('dragover').event);
    orphanState.api.getDraggableProps(a).onDrop(dragEvent('drop').event);
    expect(orphanState.rawColumns.map(item => item.uuid)).toEqual(['a']);
  });
});
