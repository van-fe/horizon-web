import type { ReactElement } from 'react';
import { act, createElement as h, createRef, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { TreeSelectHandle, TreeSelectOption } from '..';
import { TreeSelect } from '..';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const DATA: TreeSelectOption[] = [
  {
    value: 'guide',
    label: 'Guide',
    children: [
      { value: 'start', label: 'Start' },
      { value: 'disabled', label: 'Disabled', disabled: true },
    ],
  },
  { value: 'api', label: 'API' },
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

async function key(target: Element, value: string): Promise<void> {
  await dispatch(target, new KeyboardEvent('keydown', { bubbles: true, key: value }));
}

async function input(target: HTMLInputElement, value: string): Promise<void> {
  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(target, value);
  await dispatch(target, new Event('input', { bubbles: true }));
}

function pickerInput(): HTMLInputElement {
  return container.querySelector<HTMLInputElement>('.h-picker__input input')!;
}

function item(value: string): HTMLElement {
  return document.querySelector<HTMLElement>(`[data-tree-value="string:${value}"]`)!;
}

beforeEach(() => {
  container = document.createElement('div');
  document.body.append(container);
  root = createRoot(container);
});

afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
  document.querySelectorAll('.h-picker__pop-content--wrapper').forEach(node => node.remove());
});

describe('React TreeSelect', () => {
  it('selects an uncontrolled value and exposes Picker plus Tree commands', async () => {
    const ref = createRef<TreeSelectHandle>();
    const onValueChange = vi.fn();
    await render(h(TreeSelect, { defaultTreeData: DATA, ref, onValueChange }));
    await click(pickerInput());
    await click(item('api'));
    expect(onValueChange).toHaveBeenCalledWith('api');
    expect(pickerInput().value).toBe('API');
    expect(ref.current?.getSelectedNodes().values).toEqual(['api']);
    expect(ref.current?.getPartSelectedNodes().values).toEqual([]);
    expect(ref.current?.getUnselectedNodes().values).toContain('guide');
    expect(ref.current?.getExpandNodes().values).toEqual([]);
    expect(ref.current?.getNodesByValue(['api']).get('api')?.stringLabel).toBe('API');
    expect(ref.current?.getVisibleItems().map(node => node.value)).toEqual(['guide', 'api']);
    ref.current?.focus();
    expect(document.activeElement).toBe(pickerInput());
    expect(ref.current?.input).toBe(pickerInput());
  });

  it('rolls controlled rejection back for repeated interactions', async () => {
    const onValueChange = vi.fn();
    await render(
      h(TreeSelect, {
        defaultExpandedValues: ['guide'],
        treeData: DATA,
        value: 'api',
        onValueChange,
      }),
    );
    await click(pickerInput());
    await click(item('start'));
    await click(pickerInput());
    await click(item('start'));
    expect(onValueChange).toHaveBeenCalledTimes(2);
    expect(onValueChange).toHaveBeenNthCalledWith(1, 'start');
    expect(onValueChange).toHaveBeenNthCalledWith(2, 'start');
    expect(pickerInput().value).toBe('API');
  });

  it('treats an explicit undefined value as controlled', async () => {
    const onValueChange = vi.fn();
    await render(
      h(TreeSelect, {
        defaultExpandedValues: ['guide'],
        treeData: DATA,
        value: undefined,
        onValueChange,
      }),
    );
    await click(pickerInput());
    await click(item('start'));
    await click(pickerInput());
    await click(item('start'));
    expect(onValueChange).toHaveBeenNthCalledWith(1, 'start');
    expect(onValueChange).toHaveBeenNthCalledWith(2, 'start');
    expect(pickerInput().value).toBe('');
  });

  it('filters from the built-in panel input and forwards placement', async () => {
    const onFilterValueChange = vi.fn();
    await render(
      h(TreeSelect, {
        defaultTreeData: DATA,
        defaultOpen: true,
        panelFilterable: true,
        placement: 'top-end',
        onFilterValueChange,
      }),
    );
    const panelInput = document.querySelector<HTMLInputElement>('.h-tree__filter input')!;
    await input(panelInput, 'API');
    expect(onFilterValueChange).toHaveBeenCalledWith('API');
    expect(item('api')).toBeTruthy();
    expect(document.querySelector('[data-tree-value="string:guide"]')).toBeNull();
    expect(
      document.querySelector('.h-picker__pop-content--wrapper')?.getAttribute('style'),
    ).toEqual(expect.any(String));
  });

  it('stages, confirms, cancels and dismisses need-confirm selection', async () => {
    const ref = createRef<TreeSelectHandle>();
    const onValueChange = vi.fn();
    const onConfirm = vi.fn();
    const onCancel = vi.fn();
    await render(
      h(TreeSelect, {
        defaultValue: 'api',
        defaultTreeData: DATA,
        defaultExpandedValues: ['guide'],
        needConfirm: true,
        ref,
        onValueChange,
        onConfirm,
        onCancel,
      }),
    );
    await click(pickerInput());
    await click(item('start'));
    expect(ref.current?.getPendingValue()).toBe('start');
    expect(onValueChange).not.toHaveBeenCalled();
    let cancelled: unknown;
    await act(async () => {
      cancelled = ref.current?.cancel();
    });
    expect(cancelled).toBe('api');
    expect(onCancel).toHaveBeenCalledWith('api', undefined);
    await click(pickerInput());
    await click(item('start'));
    let confirmed: unknown;
    await act(async () => {
      confirmed = ref.current?.confirm();
    });
    expect(confirmed).toBe('start');
    expect(onConfirm).toHaveBeenCalledWith('start', undefined);
    expect(onValueChange).toHaveBeenCalledWith('start');
  });

  it('renders multiple tags, collapse summary and removes a tag', async () => {
    const onValueChange = vi.fn();
    await render(
      h(TreeSelect, {
        defaultValue: ['start', 'api'],
        defaultTreeData: DATA,
        defaultExpandedValues: ['guide'],
        multiple: true,
        checkStrictly: true,
        collapseTags: true,
        collapseTagsTooltip: true,
        maxCollapseTags: 1,
        onValueChange,
      }),
    );
    expect(container.querySelectorAll('.h-tree-select__tag')).toHaveLength(2);
    expect(container.textContent).toContain('+1');
    await click(container.querySelector('.h-tree-select__tag-remove')!);
    expect(onValueChange).toHaveBeenCalledWith(['api']);
  });

  it('filters with native combobox aria and transfers focus to the real tree', async () => {
    const onFilterValueChange = vi.fn();
    await render(
      h(TreeSelect, {
        defaultTreeData: DATA,
        filterable: true,
        onFilterValueChange,
      }),
    );
    const inputNode = pickerInput();
    await click(inputNode);
    expect(inputNode.getAttribute('role')).toBe('combobox');
    expect(inputNode.getAttribute('aria-haspopup')).toBe('tree');
    expect(inputNode.getAttribute('aria-controls')).toBeTruthy();
    await input(inputNode, 'API');
    expect(onFilterValueChange).toHaveBeenCalledWith('API');
    expect(document.querySelectorAll('[role="treeitem"]')).toHaveLength(1);
    await key(inputNode, 'ArrowDown');
    expect(document.activeElement?.getAttribute('role')).toBe('treeitem');
  });

  it('supports field maps, dynamic loading and custom render regions', async () => {
    const load = vi.fn(async () => [{ id: 'child', text: 'Loaded child' }]);
    const onTreeDataChange = vi.fn();
    await render(
      h(TreeSelect, {
        treeData: [{ id: 'root', text: 'Mapped root', leaf: false, nodes: [] }] as never,
        fieldMap: { value: 'id', label: 'text', children: 'nodes', isLeaf: 'leaf' },
        dynamicLoad: load as never,
        renderNode: ({ node }) => h('strong', null, node.stringLabel),
        panelHeader: h('header', null, 'Header'),
        panelFooter: h('footer', null, 'Footer'),
        onTreeDataChange,
      }),
    );
    await click(pickerInput());
    expect(document.body.textContent).toContain('Header');
    expect(item('root').textContent).toContain('Mapped root');
    await click(item('root'));
    await vi.waitFor(() => expect(load).toHaveBeenCalledOnce());
    await vi.waitFor(() => expect(onTreeDataChange).toHaveBeenCalledOnce());
  });

  it('survives StrictMode lifecycle and cleans popup state on unmount', async () => {
    await render(h(StrictMode, null, h(TreeSelect, { defaultTreeData: DATA, defaultOpen: true })));
    expect(document.querySelector('[role="tree"]')).toBeTruthy();
    await act(async () => root.unmount());
    expect(document.querySelector('[role="tree"]')).toBeNull();
    root = createRoot(container);
  });

  it('supports controlled open/filter, summary, custom trigger and custom selection', async () => {
    const onOpenChange = vi.fn();
    const onFilterValueChange = vi.fn();
    const renderTrigger = vi.fn(context =>
      h('button', { ...context.triggerProps, 'data-test': 'trigger' }, context.tags.length),
    );
    await render(
      h(TreeSelect, {
        treeData: DATA,
        value: ['api'],
        open: true,
        filterValue: 'API',
        multiple: true,
        useStatistic: true,
        statisticText: 'Chosen',
        renderTrigger,
        onOpenChange,
        onFilterValueChange,
      }),
    );
    const trigger = container.querySelector<HTMLButtonElement>('[data-test="trigger"]')!;
    expect(trigger.getAttribute('aria-haspopup')).toBe('tree');
    expect(trigger.textContent).toBe('1');
    await click(trigger);
    expect(onOpenChange).toHaveBeenCalledWith(
      false,
      expect.objectContaining({ reason: 'trigger' }),
    );
    await render(
      h(TreeSelect, {
        treeData: DATA,
        value: ['api'],
        multiple: true,
        useStatistic: true,
        statisticText: 'Chosen',
        renderSelection: (_nodes, tags) => h('strong', null, `Custom ${tags.length}`),
      }),
    );
    expect(container.textContent).toContain('Custom 1');
  });

  it('covers clear/filter and all forwarded ref commands', async () => {
    const ref = createRef<TreeSelectHandle>();
    const onClear = vi.fn();
    const onFilterValueChange = vi.fn();
    const onTreeDataChange = vi.fn();
    await render(
      h(TreeSelect, {
        defaultTreeData: DATA,
        defaultValue: ['api'],
        defaultExpandedValues: ['guide'],
        multiple: true,
        checkStrictly: true,
        filterable: true,
        ref,
        onClear,
        onFilterValueChange,
        onTreeDataChange,
      }),
    );
    await act(async () => {
      ref.current?.setFilterValue('API');
      ref.current?.blur();
      ref.current?.open();
      ref.current?.setSelectedStatus(['start'], true);
      ref.current?.setExpandedStatus(['guide'], true);
      ref.current?.setAllExpandedStatus(true);
      ref.current?.scrollTo('start');
      await ref.current?.updatePosition();
    });
    expect(onFilterValueChange).toHaveBeenCalledWith('API');
    expect(ref.current?.popup).toBeTruthy();
    expect(ref.current?.getPartSelectedNodes().values).toEqual([]);
    expect(ref.current?.getUnselectedNodes().values).toContain('guide');
    expect(ref.current?.getExpandNodes().values).toContain('guide');
    expect(ref.current?.getNodesByValue(['api']).get('api')?.stringLabel).toBe('API');
    expect(ref.current?.getVisibleItems().length).toBeGreaterThan(0);
    await act(async () => {
      ref.current?.setNodeByValue({ value: 'extra', label: 'Extra' });
      ref.current?.addNodeChildrenByValue([{ value: 'child', label: 'Child' }], 'guide');
      ref.current?.deleteNodeByValue('extra');
      ref.current?.clearSelectedValues();
      ref.current?.clear();
      ref.current?.close();
    });
    expect(onTreeDataChange).toHaveBeenCalled();
    expect(onClear).toHaveBeenCalled();
  });

  it('renders statistic fallback, custom tags, disabled tags and uncropped values', async () => {
    const renderTag = vi.fn(tag => h('em', null, `Tag ${tag.label}`));
    await render(
      h(TreeSelect, {
        treeData: DATA,
        value: ['start', 'disabled'],
        multiple: true,
        checkStrictly: true,
        defaultExpandedValues: ['guide'],
        renderTag,
      }),
    );
    expect(renderTag).toHaveBeenCalledTimes(2);
    expect(container.textContent).toContain('Tag Start');
    expect(container.querySelector('[aria-disabled="true"]')).toBeTruthy();
    await render(
      h(TreeSelect, {
        treeData: DATA,
        value: ['api', 'start'],
        multiple: true,
        useStatistic: true,
      }),
    );
    expect(container.textContent).toContain('Selections (2)');
  });

  it('forwards Tree pointer, context, expansion and error callbacks', async () => {
    const onExpand = vi.fn();
    const onNodeClick = vi.fn();
    const onNodeContextMenu = vi.fn();
    const onSelect = vi.fn();
    const onLoadError = vi.fn();
    await render(
      h(TreeSelect, {
        treeData: [{ value: 'lazy', label: 'Lazy', isLeaf: false, children: [] }],
        dynamicLoad: async () => {
          throw new Error('load');
        },
        onExpand,
        onNodeClick,
        onNodeContextMenu,
        onSelect,
        onLoadError,
      }),
    );
    await click(pickerInput());
    await dispatch(item('lazy'), new MouseEvent('contextmenu', { bubbles: true }));
    await click(item('lazy'));
    await vi.waitFor(() => expect(onLoadError).toHaveBeenCalled());
    expect(onExpand).toHaveBeenCalled();
    expect(onNodeClick).toHaveBeenCalled();
    expect(onNodeContextMenu).toHaveBeenCalled();
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('executes Picker confirm, cancel, clear and passive key paths', async () => {
    const onConfirm = vi.fn();
    const onCancel = vi.fn();
    const onClear = vi.fn();
    const onFilterValueChange = vi.fn();
    await render(
      h(TreeSelect, {
        defaultTreeData: DATA,
        defaultValue: 'api',
        defaultOpen: true,
        needConfirm: true,
        clearable: true,
        filterable: true,
        onConfirm,
        onCancel,
        onClear,
        onFilterValueChange,
      }),
    );
    await key(pickerInput(), 'Tab');
    await click(document.querySelector('.h-picker__pop-content--confirm-wrapper button')!);
    expect(onCancel).toHaveBeenCalled();
    await click(pickerInput());
    const buttons = document.querySelectorAll('.h-picker__pop-content--confirm-wrapper button');
    await click(buttons[buttons.length - 1]);
    expect(onConfirm).toHaveBeenCalled();
    await click(container.querySelector('.h-picker__input--icon.is-clear')!);
    expect(onClear).toHaveBeenCalled();
    expect(onFilterValueChange).not.toHaveBeenCalled();
  });

  it('preserves missing labels, exercises inactive props and omits collapsed tooltip', async () => {
    await render(
      h(TreeSelect, {
        treeData: DATA,
        value: 'api',
        inputStatus: 'warning',
      }),
    );
    await render(h(TreeSelect, { treeData: [], value: 'api' }));
    expect(pickerInput().value).toBe('API');
    await render(
      h(TreeSelect, {
        treeData: DATA,
        value: ['start', 'api'],
        multiple: true,
        collapseTags: true,
        collapseTagsTooltip: false,
        maxCollapseTags: 1,
      }),
    );
    const collapsed = [...container.querySelectorAll('.h-tree-select__tag')].at(-1)!;
    expect(collapsed.getAttribute('title')).toBeNull();
    expect(container.querySelector('.is-warning')).toBeNull();
  });

  it('covers controlled filter, disabled session, closed display and custom trigger controls', async () => {
    const onFilterValueChange = vi.fn();
    await render(
      h(TreeSelect, {
        treeData: DATA,
        value: ['api'],
        open: false,
        filterValue: 'locked',
        filterable: true,
        disabled: true,
        multiple: true,
        onFilterValueChange,
        renderTrigger: context =>
          h(
            'button',
            {
              ...context.triggerProps,
              'data-test': 'closed-trigger',
            },
            context.tags[0]?.label,
          ),
      }),
    );
    expect(container.querySelector('[data-test="closed-trigger"]')?.textContent).toBe('API');
    await act(async () => {
      container.querySelector<HTMLButtonElement>('[data-test="closed-trigger"]')?.focus();
    });
    expect(onFilterValueChange).not.toHaveBeenCalled();
  });

  it('keeps a staged value when a controlled open parent rejects dismissal', async () => {
    const ref = createRef<TreeSelectHandle>();
    const onOpenChange = vi.fn();
    await render(
      h(TreeSelect, {
        treeData: DATA,
        value: 'api',
        open: true,
        needConfirm: true,
        defaultExpandedValues: ['guide'],
        ref,
        onOpenChange,
      }),
    );
    await click(item('start'));
    expect(ref.current?.getPendingValue()).toBe('start');
    await dispatch(document.body, new MouseEvent('click', { bubbles: true }));
    expect(onOpenChange).toHaveBeenCalledWith(
      false,
      expect.objectContaining({ reason: 'outside-pointer' }),
    );
    expect(ref.current?.getPendingValue()).toBe('start');
  });

  it('hoists uncontrolled lazy tree data into the shared session and display', async () => {
    const onValueChange = vi.fn();
    const load = vi.fn(async () => [{ value: 'loaded', label: 'Loaded child' }]);
    await render(
      h(TreeSelect, {
        defaultTreeData: [{ value: 'lazy', label: 'Lazy', isLeaf: false, children: [] }],
        dynamicLoad: load,
        onValueChange,
      }),
    );
    await click(pickerInput());
    await click(item('lazy'));
    await vi.waitFor(() => expect(item('loaded')).toBeTruthy());
    await click(item('loaded'));
    expect(onValueChange).toHaveBeenCalledWith('loaded');
    expect(pickerInput().value).toBe('Loaded child');
  });

  it('keeps controlled tree data authoritative when a mutation proposal is rejected', async () => {
    const ref = createRef<TreeSelectHandle>();
    const onTreeDataChange = vi.fn();
    await render(h(TreeSelect, { treeData: DATA, ref, onTreeDataChange }));
    await act(async () => {
      ref.current?.setNodeByValue({ value: 'proposed', label: 'Proposed' });
    });
    expect(onTreeDataChange).toHaveBeenCalled();
    expect(container.textContent).not.toContain('Proposed');
  });

  it('uses Provider defaults and custom input status branches', async () => {
    await render(
      h(TreeSelect, {
        defaultTreeData: DATA,
        defaultValue: 'api',
        inputStatus: 'warning',
        filterable: true,
      }),
    );
    expect(container.querySelector('.is-warning')).toBeTruthy();
    expect(pickerInput().getAttribute('aria-autocomplete')).toBe('list');
    await click(pickerInput());
    expect(pickerInput().getAttribute('aria-controls')).toBeTruthy();
  });

  it('makes confirm and cancel refs no-op without an enabled confirmation session', async () => {
    const ref = createRef<TreeSelectHandle>();
    const onConfirm = vi.fn();
    const onCancel = vi.fn();
    await render(
      h(TreeSelect, {
        defaultTreeData: DATA,
        defaultValue: 'api',
        ref,
        onConfirm,
        onCancel,
      }),
    );
    expect(ref.current?.confirm()).toBe('api');
    expect(ref.current?.cancel()).toBe('api');
    expect(onConfirm).not.toHaveBeenCalled();
    expect(onCancel).not.toHaveBeenCalled();

    onConfirm.mockClear();
    onCancel.mockClear();
    await render(
      h(TreeSelect, {
        defaultTreeData: DATA,
        defaultValue: 'api',
        disabled: true,
        needConfirm: true,
        ref,
        onConfirm,
        onCancel,
      }),
    );
    expect(ref.current?.confirm()).toBe('api');
    expect(ref.current?.cancel()).toBe('api');
    expect(onConfirm).not.toHaveBeenCalled();
    expect(onCancel).not.toHaveBeenCalled();
  });

  it('closes once for imperative confirmation and preserves the clear fallback shape', async () => {
    const ref = createRef<TreeSelectHandle>();
    const onOpenChange = vi.fn();
    const onClear = vi.fn();
    await render(
      h(TreeSelect, {
        defaultTreeData: DATA,
        defaultOpen: true,
        needConfirm: true,
        ref,
        onOpenChange,
      }),
    );
    expect(pickerInput().getAttribute('aria-expanded')).toBe('true');
    await act(async () => void ref.current?.confirm());
    expect(pickerInput().getAttribute('aria-expanded')).toBe('false');
    expect(onOpenChange).toHaveBeenCalledTimes(1);

    await render(h(TreeSelect, { defaultTreeData: DATA, defaultValue: 'api', ref, onClear }));
    await act(async () => ref.current?.clear());
    expect(onClear).toHaveBeenCalledWith([]);
  });

  it('clears uncontrolled filters only after an accepted close', async () => {
    const onFilterValueChange = vi.fn();
    await render(
      h(TreeSelect, {
        defaultTreeData: DATA,
        defaultOpen: true,
        defaultFilterValue: 'API',
        filterable: true,
        onFilterValueChange,
      }),
    );
    expect(pickerInput().value).toBe('API');
    await dispatch(document.body, new MouseEvent('click', { bubbles: true }));
    expect(onFilterValueChange).toHaveBeenCalledWith('');
    await click(pickerInput());
    expect(pickerInput().value).toBe('');

    onFilterValueChange.mockClear();
    await render(
      h(TreeSelect, {
        treeData: DATA,
        open: true,
        filterValue: 'API',
        filterable: true,
        onFilterValueChange,
      }),
    );
    await dispatch(document.body, new MouseEvent('click', { bubbles: true }));
    expect(onFilterValueChange).not.toHaveBeenCalledWith('');
    expect(pickerInput().value).toBe('API');
  });
});
