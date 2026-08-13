import type { ReactElement } from 'react';
import { act, createElement as h, createRef, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { TreeHandle, TreeOption } from '..';
import { Tree } from '..';
import { HorizonWebProvider } from '../../../provider';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const OPTIONS: TreeOption[] = [
  {
    value: 'guide',
    label: 'Guide',
    children: [
      { value: 'start', label: 'Start' },
      { value: 'disabled', label: 'Disabled', disabled: true },
    ],
  },
  {
    value: 'api',
    label: h('strong', null, 'API'),
    stringLabel: 'API',
    children: [{ value: 'button', label: 'Button' }],
  },
];

let container: HTMLDivElement;
let root: ReturnType<typeof createRoot>;

async function render(element: ReactElement): Promise<void> {
  await act(async () => root.render(element));
}

async function dispatch(target: EventTarget, event: Event): Promise<void> {
  await act(async () => target.dispatchEvent(event));
}

async function click(target: Element): Promise<void> {
  await dispatch(target, new MouseEvent('click', { bubbles: true }));
}

async function key(target: EventTarget, value: string): Promise<void> {
  await dispatch(target, new KeyboardEvent('keydown', { bubbles: true, key: value }));
}

async function input(target: HTMLInputElement, value: string): Promise<void> {
  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(target, value);
  await dispatch(target, new Event('input', { bubbles: true }));
}

function item(value: string): HTMLElement {
  const result = container.querySelector<HTMLElement>(
    `[role="treeitem"][data-tree-value="string:${value}"]`,
  );
  if (!result) throw new Error(`Missing item ${value}`);
  return result;
}

function pointer(type: string, init: PointerEventInit): PointerEvent {
  return new PointerEvent(type, { bubbles: true, isPrimary: true, ...init });
}

beforeEach(() => {
  container = document.createElement('div');
  document.body.append(container);
  root = createRoot(container);
});

afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
});

describe('React Tree', () => {
  it('rolls controlled expansion and linked selection back while reporting requested values', async () => {
    const onExpandedValuesChange = vi.fn();
    const onSelectedValuesChange = vi.fn();
    await render(
      h(Tree, {
        treeData: OPTIONS,
        expandValues: [],
        selectedValues: [],
        multiple: true,
        onExpandedValuesChange,
        onSelectedValuesChange,
      }),
    );
    await click(item('guide'));
    expect(onExpandedValuesChange).toHaveBeenCalledWith(['guide']);
    expect(item('guide').getAttribute('aria-expanded')).toBe('false');
    await click(item('guide'));
    expect(onExpandedValuesChange).toHaveBeenNthCalledWith(2, ['guide']);
    expect(item('guide').getAttribute('aria-expanded')).toBe('false');
    const controlledRef = createRef<TreeHandle>();

    await render(
      h(Tree, {
        treeData: OPTIONS,
        expandValues: ['guide'],
        selectedValues: [],
        multiple: true,
        ref: controlledRef,
        onExpandedValuesChange,
        onSelectedValuesChange,
      }),
    );
    await click(item('guide').querySelector('input[type="checkbox"]')!);
    expect(onSelectedValuesChange).toHaveBeenCalledWith(['start']);
    expect(item('guide').getAttribute('aria-checked')).toBe('false');
    expect(controlledRef.current?.getSelectedNodes().values).toEqual([]);
  });

  it('updates uncontrolled expansion and selection immediately', async () => {
    await render(
      h(Tree, {
        checkStrictly: true,
        multiple: true,
        treeData: OPTIONS,
      }),
    );
    await click(item('guide'));
    expect(item('guide').getAttribute('aria-expanded')).toBe('true');
    await click(item('guide').querySelector('input[type="checkbox"]')!);
    expect(item('guide').getAttribute('aria-selected')).toBe('true');
  });

  it('supports linked, strict, limits, disabled and selectable states', async () => {
    const onSelectedValuesChange = vi.fn();
    await render(
      h(Tree, {
        checkStrictly: true,
        defaultExpandedValues: ['guide'],
        multiple: true,
        multipleLimit: 1,
        treeData: [...OPTIONS, { value: 'locked', label: 'Locked', selectable: false }],
        onSelectedValuesChange,
      }),
    );
    await click(item('guide').querySelector('input[type="checkbox"]')!);
    await click(item('start').querySelector('input[type="checkbox"]')!);
    await click(item('disabled'));
    await click(item('locked'));
    expect(onSelectedValuesChange).toHaveBeenCalledTimes(1);
    expect(onSelectedValuesChange).toHaveBeenCalledWith(['guide']);
    expect(item('disabled').getAttribute('aria-disabled')).toBe('true');
  });

  it('supports default-expand-all and radio DOM selection paths', async () => {
    const onSelect = vi.fn();
    await render(
      h(Tree, {
        checkStrictly: true,
        isDefaultExpandAll: true,
        showRadio: true,
        treeData: OPTIONS,
        onSelect,
      }),
    );
    expect(item('guide').getAttribute('aria-expanded')).toBe('true');
    await click(item('start').querySelector('input[type="radio"]')!);
    expect(onSelect).toHaveBeenCalledWith(
      ['start'],
      'start',
      expect.objectContaining({ checked: true }),
    );
    await render(
      h(Tree, {
        checkStrictly: false,
        showRadio: true,
        treeData: OPTIONS,
      }),
    );
    expect(item('guide').querySelector<HTMLInputElement>('input[type="radio"]')?.disabled).toBe(
      true,
    );
  });

  it('keeps controlled filters rolled back and supports custom filtering and render regions', async () => {
    const onFilterValueChange = vi.fn();
    const filterMethod = vi.fn((value: string, node: { stringLabel: string }) =>
      node.stringLabel.startsWith(value),
    );
    await render(
      h(Tree, {
        filterable: true,
        filterMethod,
        filterValue: '',
        renderEmpty: h('em', null, 'Nothing'),
        renderNode: ({ node }) => h('span', null, `Node: ${node.stringLabel}`),
        treeData: OPTIONS,
        onFilterValueChange,
      }),
    );
    const filter = container.querySelector<HTMLInputElement>('input[data-tree-filter]')!;
    await input(filter, 'Button');
    expect(onFilterValueChange).toHaveBeenCalledWith('Button');
    expect(filter.value).toBe('');
    expect(container.querySelectorAll('[role="treeitem"]')).toHaveLength(2);
    await render(
      h(Tree, {
        filterable: true,
        filterMethod,
        filterValue: 'Missing',
        renderEmpty: h('em', null, 'Nothing'),
        treeData: OPTIONS,
      }),
    );
    expect(container.querySelector('[role="status"]')?.textContent).toBe('Nothing');
  });

  it('owns an uncontrolled filter and leaves filter keyboard input untouched', async () => {
    const onKeyDown = vi.fn();
    await render(
      h(Tree, {
        defaultFilterValue: '',
        filterable: true,
        treeData: OPTIONS,
        onKeyDown,
      }),
    );
    const filter = container.querySelector<HTMLInputElement>('input[data-tree-filter]')!;
    await input(filter, 'Button');
    expect(filter.value).toBe('Button');
    expect(container.querySelectorAll('[role="treeitem"]')).toHaveLength(2);
    await key(filter, 'ArrowLeft');
    expect(onKeyDown).toHaveBeenCalled();
  });

  it('uses real treeitem focus and complete keyboard tree semantics', async () => {
    const onSelect = vi.fn();
    await render(
      h(Tree, {
        checkStrictly: true,
        treeData: OPTIONS,
        onSelect,
      }),
    );
    await act(async () => item('guide').focus());
    await key(item('guide'), 'ArrowRight');
    expect(item('guide').getAttribute('aria-expanded')).toBe('true');
    await key(item('guide'), 'ArrowRight');
    expect(document.activeElement).toBe(item('start'));
    await key(item('start'), 'End');
    expect(document.activeElement).toBe(item('api'));
    await key(item('api'), 'ArrowLeft');
    await key(item('api'), 'Home');
    await key(item('guide'), 'Enter');
    expect(onSelect).toHaveBeenCalledWith(
      ['guide'],
      'guide',
      expect.objectContaining({
        reason: 'keyboard',
        nativeEvent: expect.objectContaining({ type: 'keydown' }),
      }),
    );
    expect(item('guide').getAttribute('aria-level')).toBe('1');
    expect(item('guide').tabIndex).toBe(0);
  });

  it('navigates only mounted filtered nodes and skips linked disabled descendants', async () => {
    await render(
      h(Tree, {
        defaultExpandedValues: ['blocked'],
        filterable: true,
        filterValue: 'Visible',
        defaultTreeData: [
          {
            value: 'blocked',
            label: 'Blocked',
            disabled: true,
            children: [{ value: 'hidden-child', label: 'Hidden child' }],
          },
          { value: 'visible', label: 'Visible' },
          { value: 'not-mounted', label: 'Other' },
        ],
      }),
    );
    const visible = item('visible');
    await act(async () => visible.focus());
    await key(visible, 'Home');
    expect(document.activeElement).toBe(visible);
    await key(visible, 'End');
    expect(document.activeElement).toBe(visible);
    expect(container.querySelector('[data-tree-value="string:hidden-child"]')).toBeNull();
    expect(visible.tabIndex).toBe(0);
  });

  it('deduplicates dynamic loads, reports rejection and ignores stale/unmounted results in StrictMode', async () => {
    let resolveLoad!: (value: TreeOption[]) => void;
    const dynamicLoad = vi.fn(() => new Promise<TreeOption[]>(resolve => (resolveLoad = resolve)));
    const onTreeDataChange = vi.fn();
    await render(
      h(
        StrictMode,
        null,
        h(Tree, {
          defaultTreeData: [{ value: 'lazy', label: 'Lazy', isLeaf: false }],
          dynamicLoad,
          onTreeDataChange,
        }),
      ),
    );
    await click(item('lazy'));
    await click(item('lazy'));
    await click(item('lazy'));
    expect(dynamicLoad).toHaveBeenCalledTimes(1);
    await act(async () => resolveLoad([{ value: 'child', label: 'Child' }]));
    expect(onTreeDataChange).toHaveBeenCalledTimes(1);
    expect(container.textContent).toContain('Child');

    const onLoadError = vi.fn();
    await render(
      h(Tree, {
        dynamicLoad: async () => {
          throw new Error('load failed');
        },
        treeData: [{ value: 'reject', label: 'Reject', isLeaf: false }],
        onLoadError,
      }),
    );
    await click(item('reject').querySelector('button')!);
    expect(onLoadError).toHaveBeenCalledWith(
      expect.any(Error),
      expect.objectContaining({ value: 'reject' }),
    );

    let resolveStale!: (value: TreeOption[]) => void;
    await render(
      h(Tree, {
        dynamicLoad: () => new Promise(resolve => (resolveStale = resolve)),
        treeData: [{ value: 'old', label: 'Old', isLeaf: false }],
        onTreeDataChange,
      }),
    );
    await click(item('old').querySelector('button')!);
    await render(h(Tree, { treeData: [{ value: 'new', label: 'New' }], onTreeDataChange }));
    onTreeDataChange.mockClear();
    await act(async () => resolveStale([{ value: 'stale', label: 'Stale' }]));
    expect(onTreeDataChange).not.toHaveBeenCalled();
    expect(container.textContent).not.toContain('Stale');

    let resolveMapped!: (value: TreeOption[]) => void;
    await render(
      h(Tree, {
        dynamicLoad: () => new Promise(resolve => (resolveMapped = resolve)),
        fieldMap: { value: 'id', label: 'name' },
        treeData: [{ id: 'mapped', name: 'Mapped', isLeaf: false } as unknown as TreeOption],
        onTreeDataChange,
      }),
    );
    await click(
      container.querySelector('[data-tree-value="string:mapped"]')!.querySelector('button')!,
    );
    await render(
      h(Tree, {
        dynamicLoad: () => [],
        fieldMap: { value: 'value', label: 'label' },
        treeData: [{ value: 'fresh', label: 'Fresh' }],
        onTreeDataChange,
      }),
    );
    onTreeDataChange.mockClear();
    await act(async () => resolveMapped([{ value: 'mapped-stale', label: 'Mapped stale' }]));
    expect(onTreeDataChange).not.toHaveBeenCalled();
  });

  it('exposes Core commands and native scrolling through the ref', async () => {
    const ref = createRef<TreeHandle>();
    const onTreeDataChange = vi.fn();
    await render(
      h(Tree, {
        defaultExpandedValues: ['guide'],
        defaultSelectedValues: ['start'],
        multiple: true,
        ref,
        defaultTreeData: OPTIONS,
        onTreeDataChange,
      }),
    );
    expect(ref.current?.getSelectedNodes().values).toContain('start');
    expect(ref.current?.getExpandNodes().values).toEqual(['guide']);
    await act(async () => ref.current?.setSelectedStatus(['button'], true));
    expect(ref.current?.getSelectedNodes().values).toContain('button');
    await act(async () => ref.current?.setAllExpandedStatus(true));
    expect(ref.current?.getVisibleItems()).toHaveLength(5);
    await act(async () =>
      ref.current?.addNodeChildrenByValue([{ value: 'extra', label: 'Extra' }], 'api'),
    );
    expect(onTreeDataChange).toHaveBeenCalled();
    await act(async () =>
      ref.current?.setNodeByValue({ value: 'changed', label: 'Changed' }, 'extra'),
    );
    await act(async () => ref.current?.deleteNodeByValue('disabled'));
    expect(ref.current?.getNodesByValue(['guide']).get('guide')?.label).toBe('Guide');
    const scroll = vi.fn();
    item('guide').scrollIntoView = scroll;
    ref.current?.scrollTo('guide');
    expect(scroll).toHaveBeenCalled();
    await act(async () => {
      ref.current?.focus('guide');
      await Promise.resolve();
    });
    expect(document.activeElement).toBe(item('guide'));
    expect(ref.current?.element).toBe(container.querySelector('[role="tree"]'));
  });

  it('keeps controlled treeData authoritative while repeating ref mutation proposals', async () => {
    const ref = createRef<TreeHandle>();
    const onTreeDataChange = vi.fn();
    await render(h(Tree, { ref, treeData: OPTIONS, onTreeDataChange }));
    await act(async () => ref.current?.deleteNodeByValue('guide'));
    await act(async () => ref.current?.deleteNodeByValue('guide'));
    expect(onTreeDataChange).toHaveBeenCalledTimes(2);
    expect(onTreeDataChange.mock.calls[0][0]).toEqual(onTreeDataChange.mock.calls[1][0]);
    expect(item('guide')).toBeTruthy();
    expect(ref.current?.getNodesByValue(['guide']).has('guide')).toBe(true);
  });

  it('uses explicit pointer sources and async beforeDrop with cancel and destroy cleanup', async () => {
    let allow!: (value: boolean) => void;
    const beforeDrop = vi.fn(() => new Promise<boolean>(resolve => (allow = resolve)));
    const onTreeDataChange = vi.fn();
    await render(
      h(Tree, {
        beforeDrop,
        draggable: true,
        defaultTreeData: [
          { value: 'one', label: 'One' },
          { value: 'two', label: 'Two' },
        ],
        onTreeDataChange,
      }),
    );
    const one = item('one');
    const two = item('two');
    one.getBoundingClientRect = () =>
      ({ top: 0, bottom: 60, left: 0, right: 200, width: 200, height: 60, x: 0, y: 0 }) as DOMRect;
    two.getBoundingClientRect = () =>
      ({
        top: 60,
        bottom: 120,
        left: 0,
        right: 200,
        width: 200,
        height: 60,
        x: 0,
        y: 60,
      }) as DOMRect;
    await dispatch(
      one.querySelector('[data-tree-drag-handle]')!,
      pointer('pointerdown', { button: 0, pointerId: 9, clientX: 20, clientY: 20 }),
    );
    await dispatch(document, pointer('pointermove', { pointerId: 9, clientX: 20, clientY: 110 }));
    await dispatch(document, pointer('pointerup', { pointerId: 9, clientX: 20, clientY: 110 }));
    expect(beforeDrop).toHaveBeenCalled();
    await act(async () => allow(false));
    expect(onTreeDataChange).not.toHaveBeenCalled();

    await dispatch(
      one.querySelector('[data-tree-drag-handle]')!,
      pointer('pointerdown', { button: 0, pointerId: 10 }),
    );
    await dispatch(document, pointer('pointercancel', { pointerId: 10 }));
    expect(container.querySelector('[role="tree"]')?.className).not.toContain('is-dragging');
    await act(async () => root.unmount());
    await dispatch(document, pointer('pointermove', { pointerId: 10 }));
    root = createRoot(container);
  });

  it('moves through whole-item dragging and reports rejected drops', async () => {
    const onTreeDataChange = vi.fn();
    const onDropError = vi.fn();
    await render(
      h(Tree, {
        beforeDrop: async () => true,
        dragOnHandler: false,
        draggable: true,
        defaultTreeData: [
          { value: 'one', label: 'One' },
          { value: 'two', label: 'Two' },
        ],
        onDropError,
        onTreeDataChange,
      }),
    );
    const one = item('one');
    const two = item('two');
    one.getBoundingClientRect = () =>
      ({
        top: 0,
        bottom: 60,
        left: 0,
        right: 200,
        width: 200,
        height: 60,
        x: 0,
        y: 0,
      }) as DOMRect;
    two.getBoundingClientRect = () =>
      ({
        top: 60,
        bottom: 120,
        left: 0,
        right: 200,
        width: 200,
        height: 60,
        x: 0,
        y: 60,
      }) as DOMRect;
    await dispatch(one, pointer('pointerdown', { button: 0, pointerId: 20 }));
    await dispatch(document, pointer('pointerup', { pointerId: 20, clientX: 20, clientY: 110 }));
    expect(onTreeDataChange).toHaveBeenCalledWith([
      expect.objectContaining({ value: 'two' }),
      expect.objectContaining({ value: 'one' }),
    ]);

    await render(
      h(Tree, {
        beforeDrop: async () => {
          throw new Error('drop failed');
        },
        draggable: true,
        treeData: [
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' },
        ],
        onDropError,
      }),
    );
    const a = item('a');
    const b = item('b');
    a.getBoundingClientRect = one.getBoundingClientRect;
    b.getBoundingClientRect = two.getBoundingClientRect;
    await dispatch(
      a.querySelector('[data-tree-drag-handle]')!,
      pointer('pointerdown', { button: 0, pointerId: 21 }),
    );
    await dispatch(document, pointer('pointerup', { pointerId: 21, clientX: 20, clientY: 90 }));
    expect(onDropError).toHaveBeenCalledWith(expect.any(Error));
  });

  it('does not start whole-row dragging from interactive controls', async () => {
    await render(
      h(Tree, {
        defaultExpandedValues: ['parent'],
        defaultTreeData: [
          {
            value: 'parent',
            label: 'Parent',
            children: [{ value: 'child', label: 'Child' }],
          },
          { value: 'other', label: 'Other' },
        ],
        dragOnHandler: false,
        draggable: true,
        multiple: true,
      }),
    );
    const tree = container.querySelector<HTMLElement>('[role="tree"]')!;
    const parent = item('parent');
    await dispatch(
      parent.querySelector('input[type="checkbox"]')!,
      pointer('pointerdown', { button: 0, pointerId: 22 }),
    );
    expect(tree.className).not.toContain('is-dragging');
    await dispatch(
      parent.querySelector('button')!,
      pointer('pointerdown', { button: 0, pointerId: 23 }),
    );
    expect(tree.className).not.toContain('is-dragging');
    await dispatch(
      parent.querySelector('[data-tree-interactive]')!,
      pointer('pointerdown', { button: 0, pointerId: 24 }),
    );
    expect(tree.className).not.toContain('is-dragging');
    await dispatch(
      parent.querySelector('.h-tree-item__content')!,
      pointer('pointerdown', { button: 0, pointerId: 25 }),
    );
    expect(tree.className).toContain('is-dragging');
    await dispatch(document, pointer('pointercancel', { pointerId: 25 }));
  });

  it('invalidates a pending drop when controlled data or field mapping changes', async () => {
    let allow!: (value: boolean) => void;
    const beforeDrop = vi.fn(() => new Promise<boolean>(resolve => (allow = resolve)));
    const onTreeDataChange = vi.fn();
    await render(
      h(Tree, {
        beforeDrop,
        draggable: true,
        treeData: [
          { value: 'one', label: 'One' },
          { value: 'two', label: 'Two' },
        ],
        onTreeDataChange,
      }),
    );
    const one = item('one');
    const two = item('two');
    one.getBoundingClientRect = () =>
      ({ top: 0, bottom: 60, left: 0, right: 200, width: 200, height: 60, x: 0, y: 0 }) as DOMRect;
    two.getBoundingClientRect = () =>
      ({
        top: 60,
        bottom: 120,
        left: 0,
        right: 200,
        width: 200,
        height: 60,
        x: 0,
        y: 60,
      }) as DOMRect;
    await dispatch(
      one.querySelector('[data-tree-drag-handle]')!,
      pointer('pointerdown', { button: 0, pointerId: 26 }),
    );
    await dispatch(document, pointer('pointerup', { pointerId: 26, clientX: 20, clientY: 110 }));
    expect(beforeDrop).toHaveBeenCalledOnce();

    await render(
      h(Tree, {
        beforeDrop,
        draggable: true,
        fieldMap: { value: 'meta.id', label: 'meta.name' },
        treeData: [{ meta: { id: 'fresh', name: 'Fresh' } } as unknown as TreeOption],
        onTreeDataChange,
      }),
    );
    await act(async () => allow(true));
    expect(onTreeDataChange).not.toHaveBeenCalled();
    expect(container.textContent).toContain('Fresh');
  });

  it('covers invalid drag sources, before/inside geometry and nested targets', async () => {
    const onTreeDataChange = vi.fn();
    await render(
      h(Tree, {
        defaultExpandedValues: ['parent'],
        defaultTreeData: [
          { value: 'disabled', label: 'Disabled', disabled: true },
          { value: 'fixed', label: 'Fixed', draggable: false },
          {
            value: 'parent',
            label: 'Parent',
            children: [{ value: 'nested', label: 'Nested' }],
          },
          { value: 'source', label: 'Source' },
        ],
        draggable: true,
        onTreeDataChange,
      }),
    );
    const disabled = item('disabled');
    const fixed = item('fixed');
    const parent = item('parent');
    const nested = item('nested');
    const source = item('source');
    const rows = [disabled, fixed, parent, nested, source];
    rows.forEach((row, index) => {
      row.getBoundingClientRect = () =>
        ({
          top: index * 60,
          bottom: index * 60 + 60,
          left: 0,
          right: 200,
          width: 200,
          height: 60,
          x: 0,
          y: index * 60,
        }) as DOMRect;
    });
    await dispatch(disabled, pointer('pointerdown', { button: 0, pointerId: 30 }));
    await dispatch(
      disabled.querySelector('[data-tree-drag-handle]')!,
      pointer('pointerdown', { button: 0, pointerId: 34 }),
    );
    await dispatch(fixed, pointer('pointerdown', { button: 0, pointerId: 31 }));
    await dispatch(
      source.querySelector('[data-tree-drag-handle]')!,
      pointer('pointerdown', { button: 0, pointerId: 32 }),
    );
    await dispatch(document, pointer('pointerup', { pointerId: 32, clientX: 20, clientY: 185 }));
    expect(onTreeDataChange).toHaveBeenCalled();

    const nestedHandle = item('nested').querySelector('[data-tree-drag-handle]')!;
    await dispatch(nestedHandle, pointer('pointerdown', { button: 0, pointerId: 33 }));
    await dispatch(document, pointer('pointerup', { pointerId: 33, clientX: 20, clientY: 125 }));
    expect(onTreeDataChange).toHaveBeenCalledTimes(2);
  });

  it('integrates namespace, provider labels, Form state and native context/scroll callbacks', async () => {
    const onNodeContextMenu = vi.fn();
    const onReachTop = vi.fn();
    await render(
      h(
        HorizonWebProvider,
        { namespace: 'Custom', treeLabels: { search: 'Find', empty: 'Empty tree' } },
        h(Tree, {
          filterable: true,
          height: 60,
          treeData: OPTIONS,
          onNodeContextMenu,
          onReachTop,
        }),
      ),
    );
    expect(container.querySelector('[role="tree"]')?.className).toContain('custom-tree');
    expect(container.querySelector('input')?.getAttribute('aria-label')).toBe('Find');
    await dispatch(item('guide'), new MouseEvent('contextmenu', { bubbles: true }));
    expect(onNodeContextMenu).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'contextmenu' }),
      'guide',
      OPTIONS[0],
    );
    await dispatch(
      container.querySelector('[role="tree"]')!,
      new Event('scroll', { bubbles: true }),
    );
    expect(onReachTop).toHaveBeenCalled();
  });

  it('omits optional ARIA checked state when no choice control is requested', async () => {
    await render(
      h(Tree, {
        checkStrictly: true,
        showCheckbox: false,
        showRadio: false,
        treeData: OPTIONS,
      }),
    );
    expect(item('guide').hasAttribute('aria-checked')).toBe(false);
  });

  it('covers disabled guards, default empty labels, missing values and prevented keyboard input', async () => {
    const ref = createRef<TreeHandle>();
    const onExpand = vi.fn();
    const onSelect = vi.fn();
    await render(
      h(Tree, {
        disabled: true,
        expandValues: ['missing'],
        ref,
        treeData: [
          {
            value: 'disabled-branch',
            label: 'Disabled branch',
            disabled: true,
            children: [{ value: 'disabled-leaf', label: 'Disabled leaf' }],
          },
        ],
        onExpand,
        onKeyDown: event => event.preventDefault(),
        onSelect,
      }),
    );
    await click(item('disabled-branch'));
    expect(onExpand).not.toHaveBeenCalled();
    expect(onSelect).not.toHaveBeenCalled();
    await key(item('disabled-branch'), 'ArrowDown');
    expect(ref.current?.getExpandNodes().values).toEqual([]);
    await act(async () => {
      ref.current?.focus();
      await Promise.resolve();
    });

    await render(h(Tree, { defaultTreeData: [] }));
    expect(container.querySelector('[role="status"]')?.textContent).toBe('No data');
    await render(h(Tree, { defaultTreeData: [], emptyText: 'No nodes' }));
    expect(container.querySelector('[role="status"]')?.textContent).toBe('No nodes');
  });

  it('covers the complete visual API, field mapping, numeric identity and ref edge commands', async () => {
    const ref = createRef<TreeHandle>();
    const onExpandedValuesChange = vi.fn();
    const onSelectedValuesChange = vi.fn();
    const onReachBottom = vi.fn();
    await render(
      h(Tree, {
        beforeDrop: () => true,
        checkOnClickLeaf: false,
        checkOnClickNode: true,
        checkStrictly: true,
        className: 'extra-tree',
        defaultExpandedValues: [1],
        defaultFilterValue: '',
        defaultSelectedValues: [1],
        disabled: false,
        dragOnHandler: false,
        dragToLeaf: false,
        draggable: true,
        draggableIcon: h('b', null, 'drag'),
        draggableIconAlwaysVisible: true,
        dynamicLoad: async () => [],
        emptyText: 'Empty override',
        expandFilteredTree: false,
        expandOnClickNode: false,
        fieldMap: { prefixIcon: 'meta.icon', prefixIconClassName: 'meta.className' },
        filterInputProps: { 'aria-label': 'Custom search' },
        filterMethod: (value, node) => node.stringLabel.includes(value),
        filterToHideChildren: false,
        filterable: true,
        height: '100px',
        hideFilterInput: false,
        indent: 12,
        isDefaultExpandAll: false,
        isDefaultExpandParent: false,
        maxHeight: 120,
        multiple: false,
        multipleLimit: 2,
        parentEffectDisabledChild: true,
        ref,
        renderEmpty: () => h('i', null, 'Function empty'),
        searchInputPlaceholder: 'Search here',
        showCheckbox: false,
        showLine: true,
        showRadio: true,
        size: 'large',
        stress: true,
        style: { overflow: 'hidden' },
        tooltip: false,
        defaultTreeData: [
          {
            value: 1,
            label: 'Number one',
            children: [
              {
                value: 'child',
                label: 'Child',
                meta: { icon: h('span', null, 'icon'), className: 'mapped-icon' },
              },
            ],
          },
          { value: '1', label: 'String one', draggable: false },
        ],
        undraggableIcon: h('b', null, 'locked'),
        onExpandedValuesChange,
        onReachBottom,
        onSelectedValuesChange,
      }),
    );
    const numeric = container.querySelector<HTMLElement>('[data-tree-value="number:1"]')!;
    const string = container.querySelector<HTMLElement>('[data-tree-value="string:1"]')!;
    expect(numeric).not.toBe(string);
    expect(container.querySelector('.mapped-icon')?.textContent).toBe('icon');
    await click(numeric.querySelector('input[type="radio"]')!);
    await act(async () => ref.current?.setExpandedStatus([1], false));
    await act(async () => ref.current?.setSelectedStatus(['1'], true));
    await act(async () => ref.current?.clearSelectedValues());
    expect(ref.current?.getPartSelectedNodes().values).toEqual([]);
    expect(ref.current?.getUnselectedNodes().values).toContain('1');
    await act(async () => ref.current?.setNodeByValue({ value: 'root', label: 'Root' }));
    await act(async () => ref.current?.deleteNodeByValue());
    expect(container.querySelector('[role="status"]')?.textContent).toContain('Function empty');
    ref.current?.scrollTo();
    await dispatch(
      container.querySelector('[role="tree"]')!,
      new Event('scroll', { bubbles: true }),
    );
    expect(onReachBottom).toHaveBeenCalled();
  });
});
