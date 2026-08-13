import { describe, expect, it, vi } from 'vitest';
import {
  CASCADER_DEFAULTS,
  CascaderDynamicLoadController,
  CascaderSelectionController,
  cascaderApiContract,
  cascaderManifest,
  collectCascaderPath,
  collectSelectableCascaderLeaves,
  defaultCascaderFilter,
  filterCascaderOptions,
  findCascaderOptionByPath,
  getCascaderDisplayLabel,
  getCascaderDescendantSelectionState,
  isCascaderExpandTrigger,
  isCascaderModelValue,
  isCascaderMultipleLimit,
  isCascaderReserveKeyword,
  isCascaderShowStrategy,
  isCascaderTrigger,
  limitCascaderSelection,
  looselyEqualCascaderValues,
  normalizeCascaderModelValue,
  normalizeCascaderOptions,
  reduceCascaderFlatNavigation,
  reduceCascaderNavigation,
  replaceCascaderOptionChildren,
} from '..';
import type { CascaderOption } from '..';

const options: CascaderOption[] = [
  {
    label: 'Guides',
    value: 'guide',
    children: [
      { label: 'Feedback', value: 'feedback' },
      { label: 'Disabled', value: 'disabled', disabled: true },
      {
        label: 'Advanced',
        value: 'advanced',
        children: [{ label: 'Performance', value: 'performance' }],
      },
    ],
  },
  { label: 'API', value: 'api' },
];

describe('Cascader contract', () => {
  it('defines defaults, validators and manifest API', () => {
    expect(CASCADER_DEFAULTS).toMatchObject({
      trigger: 'click',
      expandTrigger: 'click',
      multiple: false,
      multipleLimit: Number.POSITIVE_INFINITY,
      showCheckedStrategy: 'fullPath',
      reserveKeyword: true,
    });
    expect(isCascaderTrigger('never')).toBe(true);
    expect(isCascaderTrigger('manual')).toBe(false);
    expect(isCascaderExpandTrigger('hover')).toBe(true);
    expect(isCascaderShowStrategy('leaf')).toBe(true);
    expect(isCascaderReserveKeyword('reserve-deselect')).toBe(true);
    expect(isCascaderReserveKeyword('reserve-select')).toBe(false);
    expect(isCascaderModelValue(['guide', 1])).toBe(true);
    expect(isCascaderModelValue([['guide'], ['api']])).toBe(true);
    expect(isCascaderModelValue(['guide', {}])).toBe(false);
    expect(isCascaderMultipleLimit(Number.POSITIVE_INFINITY)).toBe(true);
    expect(isCascaderMultipleLimit(-1)).toBe(false);
    expect(cascaderApiContract.validators?.trigger?.('hover')).toBe(true);
    expect(cascaderManifest.contract.exposes.map(field => field.name)).toContain('focusOption');
  });
});

describe('Cascader tree and values', () => {
  it('normalizes trees with parent, paths, disabled propagation and stable ids', () => {
    const tree = normalizeCascaderOptions(options);
    expect(tree.roots.map(option => option.value)).toEqual(['guide', 'api']);
    expect(tree.flat).toHaveLength(6);
    const performance = findCascaderOptionByPath(tree.roots, ['guide', 'advanced', 'performance'])!;
    expect(performance).toMatchObject({ isLeaf: true, level: 2, passingDisabled: false });
    expect(performance.path).toEqual(['guide', 'advanced', 'performance']);
    expect(performance.labelPath).toEqual(['Guides', 'Advanced', 'Performance']);
    expect(collectCascaderPath(performance).map(option => option.value)).toEqual(performance.path);
    expect(tree.byId.get(performance.id)).toBe(performance);
    expect(findCascaderOptionByPath(tree.roots, ['missing'])).toBeUndefined();
  });

  it('supports nested field mapping and explicit metadata', () => {
    const source = [
      {
        meta: { code: 1, name: 'Root', blocked: true },
        nodes: [{ meta: { code: 2, name: 'Leaf' }, nodes: [] }],
      },
    ] as unknown as CascaderOption[];
    const tree = normalizeCascaderOptions(source, {
      value: 'meta.code',
      label: 'meta.name',
      disabled: 'meta.blocked',
      children: 'nodes',
    });
    expect(tree.roots[0]).toMatchObject({ value: 1, stringLabel: 'Root', disabled: true });
    expect(tree.flat[1]).toMatchObject({ value: 2, passingDisabled: true, isLeaf: true });
    expect(() => normalizeCascaderOptions([{ label: 'Invalid', value: Number.NaN }])).toThrow(
      TypeError,
    );
  });

  it('accepts renderer-owned labels while preserving stringLabel fallback', () => {
    const rendererLabel = { kind: 'renderer-node' };
    const tree = normalizeCascaderOptions([
      { label: rendererLabel, stringLabel: 'Readable label', value: 'node' },
      { label: rendererLabel, value: 'fallback' },
    ]);
    expect(tree.roots[0].label).toBe(rendererLabel);
    expect(tree.roots[0].stringLabel).toBe('Readable label');
    expect(tree.roots[1].stringLabel).toBe('fallback');
  });

  it('normalizes copied paths and uses loose primitive/context comparison', () => {
    const input = [['guide', 'feedback'], ['api']] as Array<Array<string | number>>;
    const normalized = normalizeCascaderModelValue(input);
    expect(normalized).toEqual(input);
    expect(normalized).not.toBe(input);
    expect(normalized[0]).not.toBe(input[0]);
    expect(normalizeCascaderModelValue(['guide', 1])).toEqual([['guide', 1]]);
    expect(normalizeCascaderModelValue(null)).toEqual([]);
    expect(looselyEqualCascaderValues(undefined, [])).toBe(true);
    expect(looselyEqualCascaderValues([['1']], [[1]])).toBe(true);
    expect(looselyEqualCascaderValues({ value: 1, _ctx: { scope: true } }, { value: '1' })).toBe(
      true,
    );
    expect(looselyEqualCascaderValues([1], [2])).toBe(false);
  });

  it('formats full and leaf labels, including unmatched paths', () => {
    const tree = normalizeCascaderOptions(options);
    const leaf = findCascaderOptionByPath(tree.roots, ['guide', 'feedback'])!;
    expect(getCascaderDisplayLabel(leaf, leaf.path, 'fullPath', '/')).toBe('Guides / Feedback');
    expect(getCascaderDisplayLabel(leaf, leaf.path, 'leaf', '/')).toBe('Feedback');
    expect(getCascaderDisplayLabel(undefined, ['external', 2], 'fullPath', '>')).toBe(
      'external > 2',
    );
    expect(getCascaderDisplayLabel(undefined, ['external', 2], 'leaf', '>')).toBe('2');
  });

  it('immutably replaces children by path with direct and nested field mappings', () => {
    const children = [{ label: 'New', value: 'new' }];
    const replaced = replaceCascaderOptionChildren(options, ['guide', 'advanced'], children);
    expect(replaced).not.toBe(options);
    expect(replaced[0]).not.toBe(options[0]);
    expect(replaced[1]).toBe(options[1]);
    expect(
      (replaced[0].children?.find(option => option.value === 'advanced')?.children ?? [])[0]?.value,
    ).toBe('new');
    expect(
      options[0].children?.find(option => option.value === 'advanced')?.children?.[0].value,
    ).toBe('performance');
    expect(
      replaceCascaderOptionChildren(options, ['missing'], children).every(
        (option, index) => option === options[index],
      ),
    ).toBe(true);
    expect(replaceCascaderOptionChildren(options, [], children)).toEqual(options);

    const mapped = [
      {
        meta: { code: 'root' },
        data: { nodes: [{ meta: { code: 'leaf' }, data: { nodes: [] } }] },
      },
    ] as unknown as CascaderOption[];
    const mappedChildren = [
      { meta: { code: 'child' }, data: { nodes: [] } },
    ] as unknown as CascaderOption[];
    const mappedResult = replaceCascaderOptionChildren(mapped, ['root', 'leaf'], mappedChildren, {
      value: 'meta.code',
      children: 'data.nodes',
    });
    expect(
      (
        ((mappedResult[0] as Record<string, any>).data.nodes[0] as Record<string, any>).data
          .nodes[0] as Record<string, any>
      ).meta.code,
    ).toBe('child');
    expect((mapped[0] as Record<string, any>).data.nodes[0].data.nodes).toEqual([]);
    expect((mappedChildren[0] as Record<string, any>).meta.code).toBe('child');
  });
});

describe('Cascader filtering and limits', () => {
  it('filters leaves, sorts results and applies limits without mutating input', () => {
    const tree = normalizeCascaderOptions(options);
    const original = tree.flat.slice();
    const result = filterCascaderOptions(tree.flat, {
      input: 'e',
      limit: 2,
      sort: (left, right) => right.stringLabel.localeCompare(left.stringLabel),
    });
    expect(result.map(option => option.stringLabel)).toEqual(['Performance', 'Feedback']);
    expect(tree.flat).toEqual(original);
    expect(filterCascaderOptions(tree.flat, { input: 'guide', checkStrictly: true })).toHaveLength(
      5,
    );
    expect(
      filterCascaderOptions(tree.flat, { input: 'guide' }).map(option => option.value),
    ).toEqual(['feedback', 'disabled', 'performance']);
    expect(filterCascaderOptions(tree.flat, { input: '', limit: 0 })).toEqual([]);
  });

  it('passes complete path data to custom filters', () => {
    const tree = normalizeCascaderOptions(options);
    const filter = vi.fn((_input, paths) => paths.some(path => path.value === 'advanced'));
    const result = filterCascaderOptions(tree.flat, { input: 'custom', filter });
    expect(result.map(option => option.value)).toEqual(['performance']);
    expect(filter).toHaveBeenCalled();
    expect(
      defaultCascaderFilter('feed', [
        { label: 'Feedback', value: 'feedback', option: tree.flat[1] },
      ]),
    ).toBe(true);
  });

  it('limits copied selections', () => {
    const paths = [['a'], ['b'], ['c']] as Array<Array<string | number>>;
    expect(limitCascaderSelection(paths, 2)).toEqual([['a'], ['b']]);
    expect(limitCascaderSelection(paths, 0)).toEqual([]);
    const unlimited = limitCascaderSelection(paths, Number.POSITIVE_INFINITY);
    expect(unlimited).toEqual(paths);
    expect(unlimited[0]).not.toBe(paths[0]);
  });

  it('collects selectable leaves and computes aggregate branch state', () => {
    const tree = normalizeCascaderOptions([
      {
        label: 'Root',
        value: 'root',
        children: [
          { label: 'One', value: 1 },
          { label: 'Disabled', value: 2, disabled: true },
          { label: 'Unavailable', value: 3, selectable: false },
          { label: 'Branch', value: 4, children: [{ label: 'Two', value: 5 }] },
        ],
      },
    ]);
    const leaves = collectSelectableCascaderLeaves(tree.roots[0]);
    expect(leaves.map(option => option.value)).toEqual([1, 5]);
    expect(getCascaderDescendantSelectionState(tree.roots[0], [])).toBe('none');
    expect(getCascaderDescendantSelectionState(tree.roots[0], [leaves[0].path])).toBe(
      'indeterminate',
    );
    expect(
      getCascaderDescendantSelectionState(
        tree.roots[0],
        leaves.map(leaf => leaf.path),
      ),
    ).toBe('all');
    const disabledRoot = normalizeCascaderOptions([
      {
        label: 'Root',
        value: 'root',
        disabled: true,
        children: [{ label: 'Leaf', value: 'leaf' }],
      },
    ]).roots[0];
    expect(collectSelectableCascaderLeaves(disabledRoot)).toEqual([]);
    expect(collectSelectableCascaderLeaves(disabledRoot, true).map(option => option.value)).toEqual(
      ['leaf'],
    );
  });
});

describe('CascaderSelectionController', () => {
  it('selects leaves immediately and rejects disabled, unselectable and branch options', () => {
    const tree = normalizeCascaderOptions([
      ...options,
      { label: 'Unavailable', value: 'unavailable', selectable: false },
    ]);
    const changes = vi.fn();
    const controller = new CascaderSelectionController({ onValueChange: changes });
    expect(controller.select(tree.roots[0]).status).toBe('branch');
    expect(controller.select(tree.flat.find(option => option.value === 'disabled')!).status).toBe(
      'disabled',
    );
    expect(
      controller.select(tree.flat.find(option => option.value === 'unavailable')!).status,
    ).toBe('unselectable');
    const result = controller.select(tree.flat.find(option => option.value === 'feedback')!);
    expect(result).toMatchObject({ status: 'selected', selected: true, committed: true });
    expect(controller.value).toEqual(['guide', 'feedback']);
    expect(changes).toHaveBeenCalledWith(['guide', 'feedback']);
    expect(controller.select(tree.flat.find(option => option.value === 'feedback')!).status).toBe(
      'unchanged',
    );
  });

  it('supports multiple limit, deselection, clear and mode changes', () => {
    const tree = normalizeCascaderOptions(options);
    const feedback = tree.flat.find(option => option.value === 'feedback')!;
    const performance = tree.flat.find(option => option.value === 'performance')!;
    const api = tree.flat.find(option => option.value === 'api')!;
    const controller = new CascaderSelectionController({ multiple: true, multipleLimit: 2 });
    expect(controller.select(feedback).status).toBe('selected');
    expect(controller.select(performance).status).toBe('selected');
    expect(controller.select(api).status).toBe('limit');
    expect(controller.select(feedback).status).toBe('deselected');
    expect(controller.pendingValue).toEqual([performance.path]);
    expect(controller.clear()).toEqual([]);
    controller.syncValue([feedback.path, performance.path]);
    controller.setOptions({ multiple: false });
    expect(controller.value).toEqual(feedback.path);
  });

  it('toggles selectable descendant leaves for linked multiple branches', () => {
    const tree = normalizeCascaderOptions(options);
    const controller = new CascaderSelectionController({ multiple: true, multipleLimit: 3 });
    expect(controller.toggleBranch(tree.roots[0])).toMatchObject({
      status: 'selected',
      selected: true,
    });
    expect(controller.value).toEqual([
      ['guide', 'feedback'],
      ['guide', 'advanced', 'performance'],
    ]);
    expect(controller.toggleBranch(tree.roots[0]).status).toBe('deselected');
    expect(controller.value).toEqual([]);
    const limited = new CascaderSelectionController({ multiple: true, multipleLimit: 1 });
    expect(limited.toggleBranch(tree.roots[0]).status).toBe('limit');
    const single = new CascaderSelectionController();
    expect(single.toggleBranch(tree.roots[0]).status).toBe('branch');
  });

  it('stages confirmation and restores pending values on cancel', () => {
    const tree = normalizeCascaderOptions(options);
    const feedback = tree.flat.find(option => option.value === 'feedback')!;
    const api = tree.flat.find(option => option.value === 'api')!;
    const changes = vi.fn();
    const controller = new CascaderSelectionController({
      defaultValue: feedback.path,
      multiple: true,
      needConfirm: true,
      onValueChange: changes,
    });
    expect(controller.select(api)).toMatchObject({ status: 'selected', committed: false });
    expect(controller.value).toEqual([feedback.path]);
    expect(controller.pendingValue).toEqual([feedback.path, api.path]);
    controller.cancel();
    expect(controller.pendingValue).toEqual([feedback.path]);
    controller.select(api);
    expect(controller.confirm()).toEqual([feedback.path, api.path]);
    expect(changes).toHaveBeenCalledWith([feedback.path, api.path]);
  });

  it('reports controlled changes without mutating committed state', () => {
    const tree = normalizeCascaderOptions(options);
    const feedback = tree.flat.find(option => option.value === 'feedback')!;
    const changes = vi.fn();
    const controller = new CascaderSelectionController({ value: ['api'], onValueChange: changes });
    controller.select(feedback);
    expect(controller.value).toEqual(['api']);
    expect(changes).toHaveBeenCalledWith(feedback.path);
    controller.setOptions({ value: feedback.path });
    expect(controller.value).toEqual(feedback.path);
  });

  it('returns a proposed confirmed value while controlled props remain authoritative', () => {
    const tree = normalizeCascaderOptions(options);
    const feedback = tree.flat.find(option => option.value === 'feedback')!;
    const api = tree.flat.find(option => option.value === 'api')!;
    const changes = vi.fn();
    const controller = new CascaderSelectionController({
      value: [feedback.path],
      multiple: true,
      needConfirm: true,
      onValueChange: changes,
    });
    controller.select(api);
    expect(controller.confirm()).toEqual([feedback.path, api.path]);
    expect(changes).toHaveBeenCalledWith([feedback.path, api.path]);
    expect(controller.value).toEqual([feedback.path]);
    controller.syncValue([feedback.path]);
    expect(controller.pendingValue).toEqual([feedback.path]);
  });
});

describe('CascaderDynamicLoadController', () => {
  it('deduplicates nodes and returns loaded children', async () => {
    const option = normalizeCascaderOptions([{ label: 'Lazy', value: 'lazy', isLeaf: false }])
      .roots[0];
    let resolve!: (value: readonly CascaderOption[]) => void;
    const loader = vi.fn(
      () =>
        new Promise<readonly CascaderOption[]>(done => {
          resolve = done;
        }),
    );
    const controller = new CascaderDynamicLoadController();
    const first = controller.load(option, loader);
    expect(loader).toHaveBeenCalledTimes(1);
    await expect(controller.load(option, loader)).resolves.toMatchObject({
      status: 'deduplicated',
    });
    expect(controller.pendingIds).toEqual([option.id]);
    resolve([{ label: 'Child', value: 'child' }]);
    await expect(first).resolves.toMatchObject({ status: 'loaded' });
    expect(loader).toHaveBeenCalledOnce();
    expect(controller.pendingIds).toEqual([]);
  });

  it('ignores invalidated and destroyed results and reports rejections', async () => {
    const option = normalizeCascaderOptions([{ label: 'Lazy', value: 'lazy', isLeaf: false }])
      .roots[0];
    let resolve!: (value: readonly CascaderOption[]) => void;
    const controller = new CascaderDynamicLoadController();
    const stale = controller.load(
      option,
      () =>
        new Promise(done => {
          resolve = done;
        }),
    );
    await Promise.resolve();
    controller.invalidate();
    resolve([]);
    await expect(stale).resolves.toMatchObject({ status: 'stale' });
    await expect(
      controller.load(option, () => Promise.reject(new Error('network'))),
    ).resolves.toMatchObject({ status: 'rejected', error: expect.any(Error) });

    let resolveDestroyed!: (value: readonly CascaderOption[]) => void;
    const destroyed = controller.load(
      option,
      () =>
        new Promise(done => {
          resolveDestroyed = done;
        }),
    );
    await Promise.resolve();
    controller.destroy();
    resolveDestroyed([]);
    await expect(destroyed).resolves.toMatchObject({ status: 'stale' });
    const afterDestroy = vi.fn(() => []);
    await expect(controller.load(option, afterDestroy)).resolves.toMatchObject({ status: 'stale' });
    expect(afterDestroy).not.toHaveBeenCalled();
  });
});

describe('Cascader keyboard navigation', () => {
  it('opens, moves within panels, enters children, returns and activates', () => {
    const tree = normalizeCascaderOptions(options);
    let state = { open: false };
    let result = reduceCascaderNavigation(tree.roots, state, 'ArrowDown');
    expect(result.action).toBe('open');
    expect(result.state.activeId).toBe(tree.roots[0].id);
    state = result.state;
    result = reduceCascaderNavigation(tree.roots, state, 'ArrowRight');
    expect(result.state.activeId).toBe(tree.flat.find(option => option.value === 'feedback')!.id);
    state = result.state;
    result = reduceCascaderNavigation(tree.roots, state, 'ArrowDown');
    expect(result.state.activeId).toBe(tree.flat.find(option => option.value === 'advanced')!.id);
    state = result.state;
    result = reduceCascaderNavigation(tree.roots, state, 'ArrowRight');
    expect(result.state.activeId).toBe(
      tree.flat.find(option => option.value === 'performance')!.id,
    );
    state = result.state;
    result = reduceCascaderNavigation(tree.roots, state, 'ArrowLeft');
    expect(result.state.activeId).toBe(tree.flat.find(option => option.value === 'advanced')!.id);
    expect(reduceCascaderNavigation(tree.roots, result.state, 'Enter').action).toBe('activate');
    expect(reduceCascaderNavigation(tree.roots, result.state, 'Escape')).toMatchObject({
      action: 'close',
      state: { open: false },
    });
  });

  it('clamps sibling navigation and honors Home, End and disabled propagation', () => {
    const tree = normalizeCascaderOptions(options);
    const guide = tree.roots[0];
    expect(
      reduceCascaderNavigation(tree.roots, { open: true, activeId: guide.id }, 'ArrowUp').state
        .activeId,
    ).toBe(guide.id);
    expect(
      reduceCascaderNavigation(tree.roots, { open: true, activeId: guide.id }, 'End').state
        .activeId,
    ).toBe(tree.roots[1].id);
    expect(
      reduceCascaderNavigation(
        tree.roots,
        { open: true, activeId: tree.flat.find(option => option.value === 'feedback')!.id },
        'End',
      ).state.activeId,
    ).toBe(tree.flat.find(option => option.value === 'advanced')!.id);
    expect(reduceCascaderNavigation(tree.roots, { open: true }, 'Enter').action).toBe('none');
    expect(reduceCascaderNavigation(tree.roots, { open: true }, 'ArrowLeft').action).toBe('none');
  });

  it('navigates a flat filtered panel without leaving its visible results', () => {
    const tree = normalizeCascaderOptions(options);
    const results = [
      tree.flat.find(option => option.value === 'feedback')!,
      tree.flat.find(option => option.value === 'performance')!,
    ];
    let result = reduceCascaderFlatNavigation(results, { open: false }, 'ArrowUp');
    expect(result).toMatchObject({ action: 'open', state: { activeId: results[1].id } });
    result = reduceCascaderFlatNavigation(results, result.state, 'Home');
    expect(result).toMatchObject({ action: 'focus', state: { activeId: results[0].id } });
    result = reduceCascaderFlatNavigation(results, result.state, 'ArrowDown');
    expect(result.state.activeId).toBe(results[1].id);
    expect(reduceCascaderFlatNavigation(results, result.state, 'Enter').action).toBe('activate');
    expect(reduceCascaderFlatNavigation(results, result.state, 'ArrowRight').action).toBe('none');
    expect(reduceCascaderFlatNavigation([], { open: true }, 'End').action).toBe('none');
    expect(reduceCascaderFlatNavigation(results, result.state, 'Escape').action).toBe('close');
  });
});
