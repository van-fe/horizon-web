import type { ReactElement } from 'react';
import { act, createElement as h, createRef, StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { CascaderHandle, CascaderOption } from '..';
import { Cascader } from '..';
import { HorizonWebProvider } from '../../../provider';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const OPTIONS: CascaderOption[] = [
  {
    value: 'guide',
    label: 'Guide',
    children: [
      { value: 'overview', label: 'Overview' },
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

async function input(target: HTMLInputElement, value: string): Promise<void> {
  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(target, value);
  await dispatch(target, new Event('input', { bubbles: true }));
}

async function key(target: EventTarget, value: string): Promise<void> {
  await dispatch(target, new KeyboardEvent('keydown', { bubbles: true, key: value }));
}

function optionByText(text: string): HTMLElement {
  const option = Array.from(container.querySelectorAll<HTMLElement>('[role="treeitem"]')).find(
    item => item.textContent?.includes(text),
  );
  if (!option) throw new Error(`Could not find cascader option: ${text}`);
  return option;
}

beforeEach(() => {
  container = document.createElement('div');
  document.body.append(container);
  root = createRoot(container);
});

afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
  document.querySelectorAll('[id$="-picker-popup"]').forEach(element => element.remove());
});

describe('React Cascader', () => {
  it('selects a leaf through progressive tree panels and exposes ARIA', async () => {
    const onValueChange = vi.fn();
    const onSelect = vi.fn();
    await render(
      h(Cascader, {
        defaultOpen: true,
        options: OPTIONS,
        portal: false,
        onSelect,
        onValueChange,
      }),
    );
    const inputElement = container.querySelector('input')!;
    expect(inputElement.getAttribute('role')).toBe('combobox');
    expect(container.querySelector('[role="tree"]')).not.toBeNull();
    const guide = Array.from(container.querySelectorAll('[role="treeitem"]')).find(item =>
      item.textContent?.includes('Guide'),
    )!;
    expect(guide.getAttribute('aria-expanded')).toBe('false');
    await click(guide);
    expect(container.querySelectorAll('[role="group"]')).toHaveLength(2);
    const overview = Array.from(container.querySelectorAll('[role="treeitem"]')).find(item =>
      item.textContent?.includes('Overview'),
    )!;
    await click(overview);
    expect(onValueChange).toHaveBeenCalledWith(['guide', 'overview']);
    expect(onSelect).toHaveBeenCalledWith(
      ['guide', 'overview'],
      expect.objectContaining({ stringLabel: 'Overview' }),
    );
    expect(inputElement.value).toBe('Guide / Overview');
  });

  it('stages multiple selection, applies limits and confirms atomically', async () => {
    const onConfirm = vi.fn();
    const onValueChange = vi.fn();
    await render(
      h(Cascader, {
        checkStrictly: true,
        defaultOpen: true,
        multiple: true,
        multipleLimit: 1,
        needConfirm: true,
        options: OPTIONS,
        portal: false,
        onConfirm,
        onValueChange,
      }),
    );
    const items = container.querySelectorAll<HTMLElement>('[role="treeitem"]');
    await click(items[0]);
    await click(items[1]);
    expect(onValueChange).not.toHaveBeenCalled();
    const confirm = Array.from(container.querySelectorAll('button')).find(
      button => button.textContent === 'Confirm',
    )!;
    await click(confirm);
    expect(onConfirm).toHaveBeenCalledWith([['guide']], expect.objectContaining({ type: 'click' }));
    expect(onValueChange).toHaveBeenCalledWith([['guide']]);
  });

  it('cancels staged selection without committing it', async () => {
    const onCancel = vi.fn();
    const onValueChange = vi.fn();
    await render(
      h(Cascader, {
        checkStrictly: true,
        defaultOpen: true,
        defaultValue: ['guide'],
        needConfirm: true,
        options: OPTIONS,
        portal: false,
        onCancel,
        onValueChange,
      }),
    );
    await click(container.querySelectorAll('[role="treeitem"]')[1]);
    const cancel = Array.from(container.querySelectorAll('button')).find(
      button => button.textContent === 'Cancel',
    )!;
    await click(cancel);
    expect(onCancel).toHaveBeenCalledWith(['guide'], expect.objectContaining({ type: 'click' }));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('filters without mutating option order and supports custom rendering', async () => {
    const onSearch = vi.fn();
    const renderOption = vi.fn(({ option }) => h('span', null, `Result: ${option.stringLabel}`));
    await render(
      h(Cascader, {
        defaultOpen: true,
        filterable: true,
        options: OPTIONS,
        portal: false,
        renderOption,
        onSearch,
      }),
    );
    const inputElement = container.querySelector('input')!;
    await input(inputElement, 'button');
    expect(onSearch).toHaveBeenCalledWith('button');
    expect(container.querySelectorAll('[role="treeitem"]')).toHaveLength(1);
    expect(container.querySelector('[role="treeitem"]')?.textContent).toContain('Result: Button');
    expect(OPTIONS.map(option => option.value)).toEqual(['guide', 'api']);
  });

  it('navigates and selects only the mounted filtered result', async () => {
    const onValueChange = vi.fn();
    await render(
      h(Cascader, {
        checkStrictly: true,
        defaultOpen: true,
        filterable: true,
        options: OPTIONS,
        portal: false,
        onValueChange,
      }),
    );
    const inputElement = container.querySelector('input')!;
    await input(inputElement, 'button');
    await key(inputElement, 'ArrowDown');
    const activeId = inputElement.getAttribute('aria-activedescendant');
    expect(activeId).toBeTruthy();
    expect(document.getElementById(activeId!)).not.toBeNull();
    expect(document.getElementById(activeId!)?.textContent).toContain('Button');
    await key(inputElement, 'Enter');
    expect(onValueChange).toHaveBeenCalledWith(['api', 'button']);
    expect(onValueChange).not.toHaveBeenCalledWith(['guide']);
  });

  it('matches numeric and string paths loosely for controlled values and ref focus', async () => {
    const ref = createRef<CascaderHandle>();
    await render(
      h(Cascader, {
        checkStrictly: true,
        defaultOpen: true,
        options: [
          { value: 1, label: 'One', children: [{ value: 2, label: 'Two' }] },
          { value: '3', label: 'Three' },
        ],
        portal: false,
        ref,
        value: ['1', '2'],
      }),
    );
    expect(container.querySelector('input')!.value).toBe('One / Two');
    await act(async () => ref.current?.focusOption(['1', 2]));
    const inputElement = container.querySelector('input')!;
    const activeId = inputElement.getAttribute('aria-activedescendant')!;
    expect(document.getElementById(activeId)?.textContent).toContain('Two');
    expect(container.querySelectorAll('[role="group"]')).toHaveLength(2);
  });

  it('loads children once, reports updated options and ignores obsolete results', async () => {
    let resolveLoad!: (children: CascaderOption[]) => void;
    const loadChildren = vi.fn(
      () => new Promise<CascaderOption[]>(resolve => (resolveLoad = resolve)),
    );
    const onOptionsChange = vi.fn();
    const lazy: CascaderOption[] = [{ value: 'lazy', label: 'Lazy', isLeaf: false }];
    await render(
      h(Cascader, {
        defaultOpen: true,
        loadChildren,
        options: lazy,
        portal: false,
        onOptionsChange,
      }),
    );
    const item = container.querySelector('[role="treeitem"]')!;
    await click(item);
    await click(item);
    expect(loadChildren).toHaveBeenCalledTimes(1);
    await act(async () => resolveLoad([{ value: 'child', label: 'Child' }]));
    expect(onOptionsChange).toHaveBeenCalledTimes(1);
    expect(container.textContent).toContain('Child');

    let resolveStale!: (children: CascaderOption[]) => void;
    const staleLoader = () => new Promise<CascaderOption[]>(resolve => (resolveStale = resolve));
    await render(
      h(Cascader, {
        defaultOpen: true,
        loadChildren: staleLoader,
        options: [{ value: 'old', label: 'Old', isLeaf: false }],
        portal: false,
        onOptionsChange,
      }),
    );
    await click(container.querySelector('[role="treeitem"]')!);
    await render(
      h(Cascader, {
        defaultOpen: true,
        loadChildren: staleLoader,
        options: [{ value: 'new', label: 'New' }],
        portal: false,
        onOptionsChange,
      }),
    );
    onOptionsChange.mockClear();
    await act(async () => resolveStale([{ value: 'stale', label: 'Stale' }]));
    expect(onOptionsChange).not.toHaveBeenCalled();
    expect(container.textContent).not.toContain('Stale');
  });

  it('loads dynamic children after StrictMode replays mount effects', async () => {
    const loadChildren = vi.fn(async () => [{ value: 'child', label: 'Child' }]);
    const onOptionsChange = vi.fn();
    const consoleError = vi.spyOn(console, 'error');
    await render(
      h(
        StrictMode,
        null,
        h(Cascader, {
          defaultOpen: true,
          loadChildren,
          options: [{ value: 'lazy', label: 'Lazy', isLeaf: false }],
          portal: false,
          onOptionsChange,
        }),
      ),
    );
    await click(optionByText('Lazy'));
    await vi.waitFor(() => expect(container.textContent).toContain('Child'));
    expect(loadChildren).toHaveBeenCalledOnce();
    expect(onOptionsChange).toHaveBeenCalledOnce();
    expect(
      consoleError.mock.calls.some(call =>
        call.some(value => String(value).includes('Cannot update a component while rendering')),
      ),
    ).toBe(false);
    consoleError.mockRestore();
  });

  it('reports load failures and does not update after unmount', async () => {
    const onLoadError = vi.fn();
    await render(
      h(Cascader, {
        defaultOpen: true,
        loadChildren: async () => {
          throw new Error('failed');
        },
        options: [{ value: 'lazy', label: 'Lazy', isLeaf: false }],
        portal: false,
        onLoadError,
      }),
    );
    await click(container.querySelector('[role="treeitem"]')!);
    await act(async () => undefined);
    expect(onLoadError).toHaveBeenCalledWith(
      expect.any(Error),
      expect.objectContaining({ value: 'lazy' }),
    );

    let resolveLoad!: (children: CascaderOption[]) => void;
    const onOptionsChange = vi.fn();
    await render(
      h(Cascader, {
        defaultOpen: true,
        loadChildren: () => new Promise(resolve => (resolveLoad = resolve)),
        options: [{ value: 'later', label: 'Later', isLeaf: false }],
        portal: false,
        onOptionsChange,
      }),
    );
    await click(container.querySelector('[role="treeitem"]')!);
    await act(async () => root.unmount());
    resolveLoad([{ value: 'ignored', label: 'Ignored' }]);
    await Promise.resolve();
    expect(onOptionsChange).not.toHaveBeenCalled();
    root = createRoot(container);
  });

  it('invalidates field-map races and calls the latest load error callback', async () => {
    let rejectFirst!: (error: Error) => void;
    let rejectLatest!: (error: Error) => void;
    const oldError = vi.fn();
    const latestError = vi.fn();
    const mappedOptions = [{ code: 'remote', name: 'Remote', terminal: false }];
    const fieldMap = { value: 'code', label: 'name', isLeaf: 'terminal' };
    const firstLoader = () =>
      new Promise<readonly CascaderOption[]>((_resolve, reject) => (rejectFirst = reject));
    const latestLoader = () =>
      new Promise<readonly CascaderOption[]>((_resolve, reject) => (rejectLatest = reject));
    await render(
      h(Cascader, {
        defaultOpen: true,
        fieldMap,
        loadChildren: firstLoader,
        options: mappedOptions as CascaderOption[],
        portal: false,
        onLoadError: oldError,
      }),
    );
    await click(optionByText('Remote'));
    await render(
      h(Cascader, {
        defaultOpen: true,
        fieldMap: { ...fieldMap },
        loadChildren: latestLoader,
        options: mappedOptions as CascaderOption[],
        portal: false,
        onLoadError: latestError,
      }),
    );
    await act(async () => rejectFirst(new Error('obsolete')));
    expect(oldError).not.toHaveBeenCalled();
    expect(latestError).not.toHaveBeenCalled();
    await click(optionByText('Remote'));
    await act(async () => rejectLatest(new Error('latest')));
    expect(latestError).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'latest' }),
      expect.objectContaining({ value: 'remote' }),
    );
  });

  it('supports keyboard navigation, disabled items and imperative commands', async () => {
    const ref = createRef<CascaderHandle>();
    const onValueChange = vi.fn();
    await render(
      h(Cascader, {
        defaultOpen: true,
        options: OPTIONS,
        portal: false,
        ref,
        onValueChange,
      }),
    );
    const inputElement = container.querySelector('input')!;
    await dispatch(inputElement, new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowDown' }));
    expect(inputElement.getAttribute('aria-activedescendant')).toBeTruthy();
    await dispatch(
      inputElement,
      new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowRight' }),
    );
    await dispatch(inputElement, new KeyboardEvent('keydown', { bubbles: true, key: 'Enter' }));
    expect(onValueChange).toHaveBeenCalledWith(['guide', 'overview']);
    await act(async () => ref.current?.focusOption(['api', 'button']));
    expect(inputElement.getAttribute('aria-activedescendant')).toContain('cascader-option');
    await act(async () => ref.current?.clear());
    expect(onValueChange).toHaveBeenLastCalledWith(undefined);
    await act(async () => ref.current?.focus());
    expect(document.activeElement).toBe(inputElement);
    await act(async () => ref.current?.blur());
    expect(document.activeElement).not.toBe(inputElement);
  });

  it('ignores irrelevant keys and activates lazy leaves without an extra expand step', async () => {
    const onValueChange = vi.fn();
    await render(
      h(Cascader, {
        checkStrictly: true,
        defaultOpen: true,
        options: [{ value: 'leaf', label: 'Leaf' }],
        portal: false,
        onValueChange,
      }),
    );
    const inputElement = container.querySelector('input')!;
    await key(inputElement, 'Tab');
    expect(onValueChange).not.toHaveBeenCalled();
    await click(optionByText('Leaf'));
    expect(onValueChange).toHaveBeenCalledWith(['leaf']);
  });

  it('keeps controlled value authoritative and merges Provider labels', async () => {
    function Controlled(): ReactElement {
      const [open, setOpen] = useState(true);
      return h(
        HorizonWebProvider,
        { cascaderLabels: { empty: 'Nothing here', level: 'Column', placeholder: 'Pick path' } },
        h(Cascader, {
          checkStrictly: true,
          open,
          options: OPTIONS,
          portal: false,
          value: ['guide'],
          onOpenChange: next => setOpen(next),
        }),
      );
    }
    await render(h(Controlled));
    const inputElement = container.querySelector('input')!;
    expect(inputElement.value).toBe('Guide');
    await click(container.querySelectorAll('[role="treeitem"]')[1]);
    expect(inputElement.value).toBe('Guide');
    expect(container.querySelector('[aria-label="Column 1"]')).not.toBeNull();
  });

  it('reconciles an uncontrolled value when selection mode and limit change at runtime', async () => {
    const baseProps = {
      checkStrictly: true,
      defaultOpen: true,
      defaultValue: [['guide'], ['api']],
      options: OPTIONS,
      portal: false,
    } as const;
    await render(h(Cascader, { ...baseProps, multiple: true, multipleLimit: 2 }));
    const inputElement = container.querySelector('input')!;
    expect(inputElement.value).toBe('Guide, API');

    await render(h(Cascader, { ...baseProps, multiple: true, multipleLimit: 1 }));
    expect(inputElement.value).toBe('Guide');

    await render(h(Cascader, { ...baseProps, multiple: false, multipleLimit: 1 }));
    expect(inputElement.value).toBe('Guide');
  });

  it('restores the controlled value after every immediately committed selection', async () => {
    const onValueChange = vi.fn();
    await render(
      h(Cascader, {
        checkStrictly: true,
        multiple: true,
        open: true,
        options: OPTIONS,
        portal: false,
        value: [['guide']],
        onValueChange,
      }),
    );
    await click(optionByText('API'));
    await click(optionByText('API'));
    expect(onValueChange).toHaveBeenCalledTimes(2);
    expect(onValueChange).toHaveBeenNthCalledWith(1, [['guide'], ['api']]);
    expect(onValueChange).toHaveBeenNthCalledWith(2, [['guide'], ['api']]);
  });

  it('keeps a controlled confirm/clear transaction authoritative until the parent syncs it', async () => {
    const ref = createRef<CascaderHandle>();
    const onConfirm = vi.fn();
    const onValueChange = vi.fn();
    function Controlled(): ReactElement {
      const [value, setValue] = useState<CascaderOption['value'][]>(['guide']);
      return h(
        'div',
        null,
        h(Cascader, {
          checkStrictly: true,
          clearable: true,
          defaultOpen: true,
          needConfirm: true,
          options: OPTIONS,
          portal: false,
          ref,
          value,
          onConfirm,
          onValueChange,
        }),
        h('button', { onClick: () => setValue(['api']) }, 'Parent sync'),
      );
    }
    await render(h(Controlled));
    const inputElement = container.querySelector('input')!;
    await click(optionByText('API'));
    await click(
      Array.from(container.querySelectorAll('button')).find(
        button => button.textContent === 'Confirm',
      )!,
    );
    expect(onValueChange).toHaveBeenLastCalledWith(['api']);
    expect(onConfirm).toHaveBeenLastCalledWith(['api'], expect.anything());
    expect(inputElement.value).toBe('Guide');
    await act(async () => ref.current?.clear());
    expect(onValueChange).toHaveBeenLastCalledWith(undefined);
    expect(inputElement.value).toBe('Guide');
    await click(
      Array.from(container.querySelectorAll('button')).find(
        button => button.textContent === 'Parent sync',
      )!,
    );
    expect(inputElement.value).toBe('API');
  });

  it('rolls back staged values on Escape and outside pointer dismissal', async () => {
    const onValueChange = vi.fn();
    await render(
      h(Cascader, {
        checkStrictly: true,
        defaultOpen: true,
        defaultValue: ['guide'],
        needConfirm: true,
        options: OPTIONS,
        portal: false,
        onValueChange,
      }),
    );
    const inputElement = container.querySelector('input')!;
    await click(optionByText('API'));
    await key(inputElement, 'Escape');
    expect(inputElement.getAttribute('aria-expanded')).toBe('false');
    expect(inputElement.value).toBe('Guide');
    expect(onValueChange).not.toHaveBeenCalled();
    await key(inputElement, 'ArrowDown');
    await click(optionByText('API'));
    await click(document.body);
    expect(inputElement.getAttribute('aria-expanded')).toBe('false');
    expect(inputElement.value).toBe('Guide');
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('rolls back staged values when a controlled parent closes the popup', async () => {
    function Controlled(): ReactElement {
      const [open, setOpen] = useState(true);
      return h(
        'div',
        null,
        h(Cascader, {
          checkStrictly: true,
          defaultValue: ['guide'],
          needConfirm: true,
          open,
          options: OPTIONS,
          portal: false,
        }),
        h('button', { onClick: () => setOpen(false) }, 'Close from parent'),
      );
    }
    await render(h(Controlled));
    await click(optionByText('API'));
    await click(
      Array.from(container.querySelectorAll('button')).find(
        button => button.textContent === 'Close from parent',
      )!,
    );
    const inputElement = container.querySelector('input')!;
    expect(inputElement.getAttribute('aria-expanded')).toBe('false');
    expect(inputElement.value).toBe('Guide');
  });

  it('toggles linked branches, clears keywords and reports deselection', async () => {
    const onDeselect = vi.fn();
    const onValueChange = vi.fn();
    await render(
      h(Cascader, {
        defaultOpen: true,
        defaultValue: [['guide', 'overview']],
        filterable: true,
        multiple: true,
        options: OPTIONS,
        portal: false,
        reserveKeyword: false,
        onDeselect,
        onValueChange,
      }),
    );
    const inputElement = container.querySelector('input')!;
    await click(optionByText('Guide'));
    await input(inputElement, 'overview');
    const overview = Array.from(container.querySelectorAll('[role="treeitem"]')).find(item =>
      item.textContent?.includes('Overview'),
    )!;
    await click(overview);
    expect(onDeselect).toHaveBeenCalledWith(
      ['guide'],
      expect.objectContaining({ stringLabel: 'Guide' }),
    );
    expect(onValueChange).toHaveBeenCalledWith([]);
    expect(inputElement.value).toBe('');
    expect(onValueChange).toHaveBeenLastCalledWith([['guide', 'overview']]);
  });

  it('retains search keywords according to every reserveKeyword mode', async () => {
    const cases: Array<[true | false | 'reserve-deselect', string, string]> = [
      [true, 'overview', 'overview'],
      [false, 'overview', ''],
      ['reserve-deselect', 'overview', 'overview'],
    ];
    for (const [reserveKeyword, query, expected] of cases) {
      await render(
        h(Cascader, {
          checkStrictly: true,
          defaultOpen: true,
          defaultValue: [['guide', 'overview']],
          filterable: true,
          multiple: true,
          options: OPTIONS,
          portal: false,
          reserveKeyword,
        }),
      );
      const inputElement = container.querySelector('input')!;
      await input(inputElement, query);
      await click(optionByText('Overview'));
      expect(inputElement.value).toBe(expected);
    }
  });

  it('renders linked partial selection, enforces branch limits, and blocks disabled options', async () => {
    const onValueChange = vi.fn();
    await render(
      h(Cascader, {
        defaultOpen: true,
        defaultValue: [['parent', 'one']],
        multiple: true,
        multipleLimit: 1,
        options: [
          {
            value: 'parent',
            label: 'Parent',
            children: [
              { value: 'one', label: 'One' },
              { value: 'two', label: 'Two' },
            ],
          },
          { value: 'locked', label: 'Locked', disabled: true },
          { value: 'display', label: 'Display only', selectable: false },
        ],
        portal: false,
        onValueChange,
      }),
    );
    const parent = optionByText('Parent');
    const checkbox = parent.querySelector('input[type="checkbox"]')!;
    expect(checkbox.indeterminate).toBe(true);
    await click(parent);
    expect(onValueChange).not.toHaveBeenCalled();
    await click(optionByText('Locked'));
    await click(optionByText('Display only'));
    expect(onValueChange).not.toHaveBeenCalled();
    expect(optionByText('Locked').getAttribute('aria-disabled')).toBe('true');
    expect(optionByText('Display only').getAttribute('aria-disabled')).toBe('true');
  });

  it('uses filter object settings, custom trigger/value and empty rendering', async () => {
    const ref = createRef<CascaderHandle>();
    const renderValue = vi.fn((_options, labels: readonly string[]) =>
      h('b', null, labels.join('>')),
    );
    await render(
      h(Cascader, {
        checkStrictly: true,
        defaultOpen: true,
        defaultValue: ['api'],
        filter: {
          filter: (query, paths) => paths.some(path => path.label.includes(query.toUpperCase())),
          limit: 1,
          sort: () => 0,
        },
        options: OPTIONS,
        portal: false,
        ref,
        renderTrigger: ({ labels, triggerProps }) =>
          h(
            'button',
            { ...triggerProps, 'data-test': 'custom-trigger', type: 'button' },
            labels.join('>'),
          ),
        renderValue,
      }),
    );
    expect(container.querySelector('[data-test="custom-trigger"]')?.textContent).toBe('API');
    expect(renderValue).toHaveBeenCalled();
    const customTrigger = container.querySelector('[data-test="custom-trigger"]')!;
    await dispatch(customTrigger, new KeyboardEvent('keydown', { bubbles: true, key: 'End' }));
    expect(customTrigger.getAttribute('aria-expanded')).toBe('true');
    expect(ref.current?.input).toBeNull();
    expect(ref.current?.popup).not.toBeNull();
    await act(async () => ref.current?.updatePosition());

    await render(
      h(Cascader, {
        defaultOpen: true,
        emptyContent: h('span', { 'data-test': 'empty' }, 'No destinations'),
        options: [],
        portal: false,
      }),
    );
    expect(container.querySelector('[data-test="empty"]')).not.toBeNull();
  });

  it('renders mapped group labels, search widths, and complete trigger ARIA', async () => {
    await render(
      h(Cascader, {
        checkStrictly: true,
        defaultOpen: true,
        filterable: true,
        fieldMap: { groupLabel: 'heading' },
        filter: { searchPanelWidth: 320 },
        inputProps: { 'aria-describedby': 'cascader-help', 'data-test': 'native-input' },
        options: [
          { value: 'a', label: 'Alpha', heading: 'First group' },
          { value: 'b', label: 'Beta' },
        ] as CascaderOption[],
        portal: false,
      }),
    );
    const inputElement = container.querySelector('[data-test="native-input"]')!;
    const tree = container.querySelector('[role="tree"]')!;
    expect(inputElement.getAttribute('aria-haspopup')).toBe('tree');
    expect(inputElement.getAttribute('aria-controls')).toBe(tree.id);
    expect(inputElement.getAttribute('aria-describedby')).toBe('cascader-help');
    expect(tree.getAttribute('aria-multiselectable')).toBeNull();
    expect(container.textContent).toContain('First group');
    await input(inputElement, 'alpha');
    const searchPanel = container.querySelector('[role="group"]') as HTMLElement;
    expect(searchPanel.style.inlineSize).toBe('320px');

    await render(
      h(Cascader, {
        defaultOpen: true,
        multiple: true,
        options: OPTIONS,
        portal: false,
        renderTrigger: ({ triggerProps }) =>
          h(
            'button',
            { ...triggerProps, 'data-test': 'tree-trigger', type: 'button' },
            'Open tree',
          ),
      }),
    );
    const customTrigger = container.querySelector('[data-test="tree-trigger"]')!;
    expect(customTrigger.getAttribute('aria-haspopup')).toBe('tree');
    expect(customTrigger.getAttribute('aria-controls')).toBe(
      container.querySelector('[role="tree"]')!.id,
    );
    expect(container.querySelector('[role="tree"]')?.getAttribute('aria-multiselectable')).toBe(
      'true',
    );
  });

  it('expands on hover, exposes loading state and ignores disabled/unselectable options', async () => {
    let resolveLoad!: (children: CascaderOption[]) => void;
    const onChange = vi.fn();
    await render(
      h(Cascader, {
        checkStrictly: true,
        defaultOpen: true,
        expandTrigger: 'hover',
        loadChildren: () => new Promise(resolve => (resolveLoad = resolve)),
        options: [
          { value: 'lazy', label: 'Lazy', isLeaf: false },
          { value: 'blocked', label: 'Blocked', disabled: true },
          { value: 'view', label: 'View only', selectable: false },
        ],
        portal: false,
        renderOption: ({ loading, option }) =>
          `${option.stringLabel}:${loading ? 'loading' : 'idle'}`,
        onChange,
      }),
    );
    const items = container.querySelectorAll<HTMLElement>('[role="treeitem"]');
    await dispatch(items[0], new MouseEvent('mouseover', { bubbles: true }));
    expect(items[0].textContent).toContain('loading');
    await click(items[1]);
    await click(items[2]);
    expect(onChange).not.toHaveBeenCalled();
    await act(async () => resolveLoad([]));
    expect(items[0].textContent).toContain('idle');
  });

  it('uses the checkbox control to toggle linked selections', async () => {
    const onValueChange = vi.fn();
    await render(
      h(Cascader, {
        defaultOpen: true,
        multiple: true,
        options: [
          {
            value: 'parent',
            label: 'Parent',
            children: [
              { value: 'one', label: 'One' },
              { value: 'two', label: 'Two' },
            ],
          },
        ],
        portal: false,
        onValueChange,
      }),
    );
    await click(optionByText('Parent').querySelector('input[type="checkbox"]')!);
    expect(onValueChange).toHaveBeenCalledWith([
      ['parent', 'one'],
      ['parent', 'two'],
    ]);
  });

  it('covers close/open navigation and ref open/close/confirm/cancel commands', async () => {
    const ref = createRef<CascaderHandle>();
    const onCancel = vi.fn();
    const onConfirm = vi.fn();
    await render(
      h(Cascader, {
        defaultOpen: false,
        needConfirm: true,
        options: OPTIONS,
        portal: false,
        ref,
        onCancel,
        onConfirm,
      }),
    );
    const inputElement = container.querySelector('input')!;
    await dispatch(inputElement, new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowUp' }));
    expect(inputElement.getAttribute('aria-expanded')).toBe('true');
    await dispatch(inputElement, new KeyboardEvent('keydown', { bubbles: true, key: 'Escape' }));
    expect(inputElement.getAttribute('aria-expanded')).toBe('false');
    await act(async () => ref.current?.open());
    await act(async () => ref.current?.confirm());
    expect(onConfirm).toHaveBeenCalledWith(undefined, undefined);
    await act(async () => ref.current?.open());
    await act(async () => ref.current?.cancel());
    expect(onCancel).toHaveBeenCalledWith(undefined, undefined);
    await act(async () => ref.current?.close());
  });
});
