import { afterEach, describe, expect, it, vi } from 'vitest';
import { createTreePointerDrag, focusActiveTreeitem } from '..';

function pointer(type: string, init: PointerEventInit): PointerEvent {
  return new PointerEvent(type, { bubbles: true, cancelable: true, isPrimary: true, ...init });
}

function rect(top: number, height = 60): DOMRect {
  return {
    top,
    bottom: top + height,
    left: 0,
    right: 200,
    width: 200,
    height,
    x: 0,
    y: top,
  } as DOMRect;
}

afterEach(() => document.body.replaceChildren());

describe('Tree browser primitives', () => {
  it('focuses and scrolls treeitems across role and data-tree-value hooks', () => {
    const tree = document.createElement('div');
    tree.innerHTML =
      '<button role="treeitem" data-tree-value="one">One</button><button data-tree-value="two">Two</button><button role="treeitem" data-tree-value="disabled" disabled>Disabled</button>';
    document.body.append(tree);
    const two = tree.querySelectorAll<HTMLElement>('[data-tree-value]')[1]!;
    const scroll = vi.fn();
    two.scrollIntoView = scroll;

    expect(focusActiveTreeitem(tree, 'two')).toBe(true);
    expect(document.activeElement).toBe(two);
    expect(scroll).toHaveBeenCalledWith({ block: 'nearest', inline: 'nearest' });
    expect(focusActiveTreeitem(tree, 'disabled')).toBe(false);
    expect(focusActiveTreeitem(null, 'one')).toBe(false);
  });

  it('reports before, inside and after drop geometry', () => {
    const tree = document.createElement('div');
    const zone = document.createElement('div');
    tree.append(zone);
    document.body.append(tree);
    zone.getBoundingClientRect = () => rect(30);
    const moves: string[] = [];
    const drops: string[] = [];
    const controller = createTreePointerDrag({
      container: tree,
      getDropZones: () => [zone],
      onMove: target => moves.push(target?.position ?? 'none'),
      onDrop: target => drops.push(target?.position ?? 'none'),
    });

    tree.dispatchEvent(
      pointer('pointerdown', { button: 0, pointerId: 7, clientX: 20, clientY: 40 }),
    );
    document.dispatchEvent(pointer('pointermove', { pointerId: 7, clientX: 20, clientY: 40 }));
    document.dispatchEvent(pointer('pointermove', { pointerId: 7, clientX: 20, clientY: 60 }));
    document.dispatchEvent(pointer('pointerup', { pointerId: 7, clientX: 20, clientY: 80 }));
    expect(moves).toEqual(['before', 'inside']);
    expect(drops).toEqual(['after']);
    expect(controller.dragging).toBe(false);
    controller.destroy();
  });

  it('handles pointer cancellation and active destroy without leaked document listeners', () => {
    const tree = document.createElement('div');
    const zone = document.createElement('div');
    tree.append(zone);
    document.body.append(tree);
    zone.getBoundingClientRect = () => rect(0);
    const cancel = vi.fn();
    const move = vi.fn();
    const controller = createTreePointerDrag({
      container: tree,
      getDropZones: () => [zone],
      onMove: move,
      onCancel: cancel,
    });

    tree.dispatchEvent(pointer('pointerdown', { button: 0, pointerId: 8 }));
    document.dispatchEvent(pointer('pointercancel', { pointerId: 8 }));
    expect(cancel).toHaveBeenCalledOnce();
    expect(controller.dragging).toBe(false);
    tree.dispatchEvent(pointer('pointerdown', { button: 0, pointerId: 9 }));
    controller.destroy();
    document.dispatchEvent(pointer('pointermove', { pointerId: 9, clientX: 20, clientY: 20 }));
    expect(move).not.toHaveBeenCalled();
    expect(cancel).toHaveBeenCalledTimes(2);
  });

  it('rejects ineligible starts before capture/listeners without consuming pointerdown', () => {
    const tree = document.createElement('div');
    tree.innerHTML = [
      '<span data-kind="blank">Blank</span>',
      '<input data-kind="input">',
      '<button data-kind="invalid">Invalid handle</button>',
      '<button data-kind="disabled" disabled>Disabled</button>',
      '<button data-kind="non-draggable">Fixed</button>',
      '<button data-kind="valid">Valid</button>',
    ].join('');
    document.body.append(tree);
    const capture = vi.fn();
    tree.setPointerCapture = capture;
    const addDocumentListener = vi.spyOn(document, 'addEventListener');
    const consumer = vi.fn();
    tree.addEventListener('pointerdown', consumer);
    const canStart = vi.fn((event: PointerEvent) => {
      const target = event.target as HTMLElement;
      return target.dataset.kind === 'valid';
    });
    const controller = createTreePointerDrag({
      container: tree,
      canStart,
      getDropZones: () => [],
    });

    for (const kind of ['blank', 'input', 'invalid', 'disabled', 'non-draggable']) {
      tree
        .querySelector<HTMLElement>(`[data-kind="${kind}"]`)!
        .dispatchEvent(pointer('pointerdown', { button: 0, pointerId: kind.length }));
      expect(controller.dragging).toBe(false);
    }
    expect(canStart).toHaveBeenCalledTimes(5);
    expect(consumer).toHaveBeenCalledTimes(5);
    expect(capture).not.toHaveBeenCalled();
    expect(addDocumentListener).not.toHaveBeenCalled();

    tree
      .querySelector<HTMLElement>('[data-kind="valid"]')!
      .dispatchEvent(pointer('pointerdown', { button: 0, pointerId: 42 }));
    expect(controller.dragging).toBe(true);
    expect(capture).toHaveBeenCalledWith(42);
    expect(addDocumentListener).toHaveBeenCalledTimes(3);
    controller.destroy();
  });

  it('supports imperative starts, renderer targets and start-relative offsets', () => {
    const tree = document.createElement('div');
    const child = document.createElement('button');
    child.dataset.uuid = 'child';
    tree.append(child);
    document.body.append(tree);
    const moves: Array<{ target: string | undefined; x: number; y: number }> = [];
    const drops: Array<{ target: string | undefined; x: number; y: number }> = [];
    const controller = createTreePointerDrag<{ uuid: string }>({
      container: tree,
      autoStart: false,
      capturePointer: false,
      resolveTarget: event => {
        const target = event.target instanceof HTMLElement ? event.target : null;
        return target?.dataset.uuid ? { uuid: target.dataset.uuid } : null;
      },
      onMove: (target, _event, offset) =>
        moves.push({ target: target?.uuid, x: offset.x, y: offset.y }),
      onDrop: (target, _event, offset) =>
        drops.push({ target: target?.uuid, x: offset.x, y: offset.y }),
    });

    const start = pointer('pointerdown', {
      button: 0,
      pointerId: 51,
      clientX: 12,
      clientY: 30,
    });
    expect(controller.start(start)).toBe(true);
    child.dispatchEvent(pointer('pointermove', { pointerId: 52, clientX: 50, clientY: 70 }));
    child.dispatchEvent(pointer('pointermove', { pointerId: 51, clientX: 20, clientY: 45 }));
    child.dispatchEvent(pointer('pointerup', { pointerId: 51, clientX: 30, clientY: 60 }));

    expect(moves).toEqual([{ target: 'child', x: 8, y: 15 }]);
    expect(drops).toEqual([{ target: 'child', x: 18, y: 30 }]);
    expect(controller.dragging).toBe(false);

    tree.dispatchEvent(pointer('pointerdown', { button: 0, pointerId: 53 }));
    expect(controller.dragging).toBe(false);
    expect(
      controller.start(pointer('pointerdown', { button: 0, isPrimary: false, pointerId: 54 })),
    ).toBe(false);
    controller.destroy();
  });

  it('optionally prevents movement and restores owner-document user selection on cleanup', () => {
    const frame = document.createElement('iframe');
    document.body.append(frame);
    const frameDocument = frame.contentDocument!;
    const tree = frameDocument.createElement('div');
    frameDocument.body.append(tree);
    frameDocument.body.style.userSelect = 'text';
    const move = vi.fn();
    const cancel = vi.fn();
    const controller = createTreePointerDrag({
      container: tree,
      preventDefault: true,
      disableUserSelect: true,
      getDropZones: () => [],
      onMove: move,
      onCancel: cancel,
    });

    tree.dispatchEvent(
      pointer('pointerdown', { button: 0, pointerId: 61, clientX: 10, clientY: 20 }),
    );
    expect(frameDocument.body.style.userSelect).toBe('none');
    const movement = pointer('pointermove', { pointerId: 61, clientX: 14, clientY: 28 });
    expect(frameDocument.dispatchEvent(movement)).toBe(false);
    expect(movement.defaultPrevented).toBe(true);
    expect(move).toHaveBeenCalledOnce();

    document.dispatchEvent(pointer('pointercancel', { pointerId: 61 }));
    expect(controller.dragging).toBe(true);
    frameDocument.dispatchEvent(pointer('pointercancel', { pointerId: 61 }));
    expect(controller.dragging).toBe(false);
    expect(frameDocument.body.style.userSelect).toBe('text');
    expect(cancel).toHaveBeenCalledOnce();

    tree.dispatchEvent(pointer('pointerdown', { button: 0, pointerId: 62 }));
    controller.destroy();
    expect(frameDocument.body.style.userSelect).toBe('text');
    expect(cancel).toHaveBeenCalledTimes(2);
  });

  it('cleans up an active drag when the drop target resolver throws', () => {
    const tree = document.createElement('div');
    document.body.append(tree);
    document.body.style.userSelect = 'text';
    const drop = vi.fn();
    const error = vi.fn((event: ErrorEvent) => event.preventDefault());
    window.addEventListener('error', error);
    const controller = createTreePointerDrag({
      container: tree,
      disableUserSelect: true,
      resolveTarget: () => {
        throw new Error('resolver failed');
      },
      onDrop: drop,
    });

    tree.dispatchEvent(pointer('pointerdown', { button: 0, pointerId: 71 }));
    expect(document.body.style.userSelect).toBe('none');
    document.dispatchEvent(pointer('pointerup', { pointerId: 71 }));

    expect(controller.dragging).toBe(false);
    expect(document.body.style.userSelect).toBe('text');
    expect(drop).not.toHaveBeenCalled();
    expect(error).toHaveBeenCalledOnce();
    expect(error.mock.calls[0]![0].error).toEqual(new Error('resolver failed'));
    window.removeEventListener('error', error);
    controller.destroy();
  });
});
