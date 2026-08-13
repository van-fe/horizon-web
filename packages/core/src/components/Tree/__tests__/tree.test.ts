import { describe, expect, it, vi } from 'vitest';
import {
  TREE_DEFAULTS,
  TreeDropController,
  TreeDynamicLoadController,
  TreeExpansionController,
  TreeSelectionController,
  addTreeChildren,
  canDropTreeNode,
  deleteTreeNode,
  filterTree,
  findTreeNodeByKey,
  findTreeNodeByPath,
  findTreeNodeByValue,
  getTreeAriaState,
  getVisibleTreeNodes,
  isTreeDimension,
  isTreeMultipleLimit,
  isTreeSize,
  isTreeValue,
  isTreeValueArray,
  moveTreeNode,
  normalizeTreeData,
  reduceTreeNavigation,
  replaceTreeChildren,
  replaceTreeNode,
  resolveTreeDropContext,
  resolveTreeDropArguments,
  treeApiContract,
  treeManifest,
} from '..';
import type { TreeOption } from '..';

interface Option extends TreeOption<object | string> {
  meta?: { title?: string };
  nodes?: Option[];
}
const data: Option[] = [
  {
    value: 'root',
    label: { kind: 'renderer-label' },
    stringLabel: 'Root',
    children: [
      { value: 'a', label: 'Alpha' },
      { value: 'disabled', label: 'Disabled', disabled: true },
      { value: 'branch', label: 'Branch', children: [{ value: 'b', label: 'Beta' }] },
    ],
  },
  { value: 'lazy', label: 'Lazy', isLeaf: false },
];

describe('Tree contract and normalization', () => {
  it('publishes compatible defaults, validators and manifest fields', () => {
    expect(TREE_DEFAULTS).toMatchObject({
      defaultTreeData: [],
      filterToHideChildren: true,
      multipleLimit: Infinity,
      indent: 24,
      dragOnHandler: true,
    });
    expect(isTreeValue('a')).toBe(true);
    expect(isTreeValue(NaN)).toBe(false);
    expect(isTreeSize('huge')).toBe(true);
    expect(isTreeDimension('calc(100% - 1px)')).toBe(true);
    expect(isTreeDimension(-1)).toBe(false);
    expect(isTreeMultipleLimit(Infinity)).toBe(true);
    expect(isTreeValueArray(['a', 1])).toBe(true);
    expect(isTreeValueArray(['a', {}])).toBe(false);
    expect(treeApiContract.validators?.multipleLimit?.(3)).toBe(true);
    expect(treeManifest.contract.props.map(field => field.name)).toContain('beforeDrop');
    expect(treeManifest.contract.props.map(field => field.name)).toContain('defaultTreeData');
    expect(treeManifest.contract.exposes.map(field => field.name)).toContain('getVisibleItems');
  });

  it('normalizes renderer labels, paths, disabled inheritance, leaves and indexes', () => {
    const tree = normalizeTreeData(data);
    const beta = findTreeNodeByValue(tree, 'b')!;
    expect(tree.flat.map(node => node.value)).toEqual([
      'root',
      'a',
      'disabled',
      'branch',
      'b',
      'lazy',
    ]);
    expect(tree.roots[0].stringLabel).toBe('Root');
    expect(beta).toMatchObject({ level: 2, passingDisabled: false, isLeaf: true });
    expect(beta.path).toEqual(['root', 'branch', 'b']);
    expect(beta.labelPath).toEqual(['Root', 'Branch', 'Beta']);
    expect(findTreeNodeByKey(tree, 'b')).toBe(beta);
    expect(findTreeNodeByPath(tree.roots, beta.path)).toBe(beta);
    expect(() =>
      normalizeTreeData([
        { value: 'x', label: 'x' },
        { value: 'x', label: 'duplicate' },
      ]),
    ).toThrow(/unique/);
    expect(() => normalizeTreeData([{ value: NaN, label: 'bad' }])).toThrow(TypeError);
  });

  it('supports nested field mapping without losing custom option fields', () => {
    const mapped = [
      {
        meta: { code: 1, title: 'One' },
        nodes: [{ meta: { code: 2, title: 'Two' }, nodes: [] }],
        custom: true,
      },
    ] as unknown as Option[];
    const tree = normalizeTreeData(mapped, {
      value: 'meta.code',
      label: 'meta.title',
      children: 'nodes',
    });
    expect(tree.flat.map(node => [node.value, node.stringLabel])).toEqual([
      [1, 'One'],
      [2, 'Two'],
    ]);
    expect((tree.roots[0].originOption as Option & { custom: boolean }).custom).toBe(true);
  });
});

describe('Tree immutable algorithms and filtering', () => {
  it('replaces, appends, deletes and patches without mutating input', () => {
    const replaced = replaceTreeChildren(data, 'branch', [{ value: 'c', label: 'Gamma' }]);
    expect(findTreeNodeByValue(normalizeTreeData(replaced), 'c')).toBeDefined();
    expect(findTreeNodeByValue(normalizeTreeData(data), 'b')).toBeDefined();
    const added = addTreeChildren(replaced, 'branch', [{ value: 'd', label: 'Delta' }]);
    expect(normalizeTreeData(added).byValue.has('d')).toBe(true);
    const patched = replaceTreeNode(added, 'd', { disabled: true });
    expect(findTreeNodeByValue(normalizeTreeData(patched), 'd')?.disabled).toBe(true);
    const deleted = deleteTreeNode(patched, 'branch');
    expect(deleted.deleted[0].value).toBe('branch');
    expect(normalizeTreeData(deleted.data).byValue.has('branch')).toBe(false);
    expect(deleteTreeNode(data).deleted).toHaveLength(2);
    expect(data).toHaveLength(2);
  });

  it('moves root, child and sibling nodes and rejects invalid moves', () => {
    expect(moveTreeNode(data, { fromValue: 'missing', position: 'root' }).status).toBe(
      'missing-source',
    );
    expect(
      moveTreeNode(data, { fromValue: 'a', toValue: 'missing', position: 'child' }).status,
    ).toBe('missing-target');
    expect(moveTreeNode(data, { fromValue: 'root', toValue: 'b', position: 'child' }).status).toBe(
      'descendant',
    );
    const child = moveTreeNode(data, { fromValue: 'a', toValue: 'branch', position: 'child' });
    expect(findTreeNodeByValue(normalizeTreeData(child.data), 'a')?.parent?.value).toBe('branch');
    const after = moveTreeNode(data, { fromValue: 'a', toValue: 'branch', position: 'after' });
    expect(findTreeNodeByValue(normalizeTreeData(after.data), 'a')?.index).toBe(2);
    const root = moveTreeNode(data, { fromValue: 'branch', position: 'root' });
    expect(root.data[0].value).toBe('branch');
  });

  it('keeps match ancestors, expands included branches and derives visible nodes', () => {
    const tree = normalizeTreeData(data);
    const result = filterTree(tree, 'beta');
    expect(result.matches.map(node => node.value)).toEqual(['b']);
    expect(result.included.map(node => node.value)).toEqual(['root', 'branch', 'b']);
    expect(result.expandValues).toEqual(['root', 'branch']);
    expect(
      filterTree(tree, 'root', { filterToHideChildren: false }).matches.map(node => node.value),
    ).toContain('b');
    expect(filterTree(tree, '', { expand: true }).included).toHaveLength(tree.flat.length);
    expect(getVisibleTreeNodes(tree.flat, new Set(['root'])).map(node => node.value)).toEqual([
      'root',
      'a',
      'disabled',
      'branch',
      'lazy',
    ]);
  });
});

describe('Tree expansion and selection controllers', () => {
  it('expands ancestors, collapses descendants, emits optimistic values, and syncs rollback', () => {
    const tree = normalizeTreeData(data);
    const change = vi.fn();
    const controller = new TreeExpansionController({
      value: ['branch'],
      defaultExpandParent: true,
      onValueChange: change,
    });
    controller.setTree(tree);
    expect(controller.expandedValues).toEqual(['branch', 'root']);
    controller.set('root', false, 'pointer');
    expect(controller.expandedValues).toEqual([]);
    expect(change).toHaveBeenCalledWith([], 'pointer');
    controller.set('branch', true, 'keyboard');
    expect(controller.expandedValues).toEqual(['branch', 'root']);
    controller.sync(['lazy']);
    expect(controller.expandedValues).toEqual(['lazy']);
    controller.setAll(true);
    expect(controller.expandedValues).toEqual(['root', 'branch', 'lazy']);
    controller.setMany(['root'], false);
    expect(controller.isExpanded('branch')).toBe(false);
  });

  it('stores linked leaves and derives full and half checks', () => {
    const tree = normalizeTreeData(data);
    const change = vi.fn();
    const controller = new TreeSelectionController({ multiple: true, onValueChange: change });
    controller.setTree(tree);
    expect(controller.set('a', true, 'pointer').status).toBe('selected');
    expect(controller.selectedValues).toEqual(['a']);
    expect(controller.halfCheckedValues).toEqual(['root']);
    expect(controller.set('root', true).status).toBe('selected');
    expect(controller.selectedValues).toEqual(['a', 'b']);
    expect(controller.allCheckedValues).toEqual(['a', 'branch', 'b']);
    expect(controller.halfCheckedValues).toEqual(['root']);
    expect(controller.set('disabled', true).status).toBe('disabled');
    expect(change).toHaveBeenCalled();
    controller.clear();
    expect(controller.selectedValues).toEqual([]);
  });

  it('supports strict checks, limits, unselectable nodes, missing values and controlled rollback', () => {
    const tree = normalizeTreeData([...data, { value: 'no', label: 'No', selectable: false }]);
    const controller = new TreeSelectionController({
      value: ['a'],
      multiple: true,
      multipleLimit: 1,
      checkStrictly: true,
    });
    controller.setTree(tree);
    expect(controller.set('branch', true).status).toBe('limit');
    expect(controller.set('no', true).status).toBe('unselectable');
    expect(controller.set('missing', true).status).toBe('missing');
    controller.set('a', false);
    controller.set('branch', true);
    expect(controller.selectedValues).toEqual(['branch']);
    controller.sync(['a']);
    expect(controller.selectedValues).toEqual(['a']);
    controller.setOptions({ checkStrictly: false });
    expect(controller.selectedValues).toEqual(['a']);
    const single = new TreeSelectionController();
    single.setTree(tree);
    expect(single.set('root', true).status).toBe('branch');
    expect(single.set('a', true).values).toEqual(['a']);
  });

  it('partially fills linked branches in DFS order and preserves legacy disabled aggregation', () => {
    const tree = normalizeTreeData([
      {
        value: 'root',
        label: 'Root',
        children: [
          { value: 'first', label: 'First' },
          { value: 'disabled', label: 'Disabled', disabled: true },
          { value: 'unselectable', label: 'Unselectable', selectable: false },
          {
            value: 'branch',
            label: 'Branch',
            children: [
              { value: 'second', label: 'Second' },
              { value: 'third', label: 'Third' },
            ],
          },
        ],
      },
    ]);
    const controller = new TreeSelectionController({ multiple: true, multipleLimit: 2 });
    controller.setTree(tree);
    const result = controller.set('root', true, 'pointer');
    expect(result).toMatchObject({
      status: 'selected',
      selected: true,
      values: ['first', 'second'],
    });
    expect(controller.allCheckedValues).toEqual(['first', 'second']);
    expect(controller.halfCheckedValues).toEqual(['root', 'branch']);
    expect(controller.set('root', true)).toMatchObject({ status: 'limit', selected: false });

    const parentEffectsDisabled = new TreeSelectionController({
      multiple: true,
      multipleLimit: 3,
      parentEffectDisabledChild: true,
    });
    parentEffectsDisabled.setTree(tree);
    expect(parentEffectsDisabled.set('root', true).values).toEqual(['first', 'disabled', 'second']);
    expect(parentEffectsDisabled.allCheckedValues).not.toContain('root');
    expect(parentEffectsDisabled.halfCheckedValues).toEqual(['root', 'branch']);
  });
});

describe('Tree dynamic load, navigation and drag', () => {
  it('deduplicates loads and invalidates data/loader generations and destroy', async () => {
    const node = normalizeTreeData(data).byValue.get('lazy')!;
    let resolve!: (value: TreeOption[]) => void;
    const controller = new TreeDynamicLoadController();
    const pending = controller.load(
      node,
      () =>
        new Promise(value => {
          resolve = value;
        }),
    );
    await expect(controller.load(node, () => [])).resolves.toMatchObject({
      status: 'deduplicated',
    });
    expect(controller.pendingValues).toEqual(['lazy']);
    controller.invalidateData();
    resolve([{ value: 'child', label: 'Child' }]);
    await expect(pending).resolves.toMatchObject({ status: 'stale' });
    controller.invalidateLoader();
    const rejected = controller.load(node, () => {
      throw new Error('load');
    });
    await expect(rejected).resolves.toMatchObject({ status: 'rejected' });
    controller.destroy();
    await expect(controller.load(node, () => [])).resolves.toMatchObject({ status: 'stale' });
  });

  it('reduces keyboard commands and exposes renderer-independent aria state', () => {
    const tree = normalizeTreeData(data);
    const state = { focusedValue: 'root' as const, expandedValues: new Set<TreeOption['value']>() };
    expect(reduceTreeNavigation(tree.flat, state, 'ArrowRight')).toEqual({
      type: 'expand',
      value: 'root',
    });
    const expanded = {
      focusedValue: 'root' as const,
      expandedValues: new Set<TreeOption['value']>(['root']),
    };
    expect(reduceTreeNavigation(tree.flat, expanded, 'ArrowRight')).toEqual({
      type: 'focus',
      value: 'a',
    });
    expect(
      reduceTreeNavigation(tree.flat, { ...expanded, focusedValue: 'a' }, 'ArrowLeft'),
    ).toEqual({ type: 'focus', value: 'root' });
    expect(reduceTreeNavigation(tree.flat, { ...expanded, focusedValue: 'a' }, ' ')).toEqual({
      type: 'select',
      value: 'a',
    });
    expect(reduceTreeNavigation(tree.flat, expanded, 'End')).toEqual({
      type: 'focus',
      value: 'lazy',
    });
    expect(
      getTreeAriaState(tree.roots[0], { selected: false, expanded: true, indeterminate: true }),
    ).toEqual({
      role: 'treeitem',
      level: 1,
      disabled: false,
      selected: false,
      expanded: true,
      checked: 'mixed',
    });
  });

  it('navigates renderer-filtered visible order with one disabled predicate', () => {
    const tree = normalizeTreeData([
      {
        value: 'root',
        label: 'Root',
        children: [
          { value: 'filtered-sibling', label: 'Filtered sibling' },
          {
            value: 'disabled-parent',
            label: 'Disabled parent',
            disabled: true,
            children: [
              {
                value: 'deep-parent',
                label: 'Deep parent',
                children: [{ value: 'deep-match', label: 'Deep match' }],
              },
            ],
          },
          { value: 'last-match', label: 'Last match' },
        ],
      },
    ]);
    const expandedValues = new Set<TreeOption['value']>(['root', 'disabled-parent', 'deep-parent']);
    const visibleNodes = ['root', 'disabled-parent', 'deep-parent', 'deep-match', 'last-match'].map(
      value => tree.byValue.get(value)!,
    );
    const options = {
      visibleNodes,
      isDisabled: (node: (typeof tree.flat)[number]) => node.passingDisabled,
    };

    expect(
      reduceTreeNavigation(
        tree.flat,
        { focusedValue: 'root', expandedValues },
        'ArrowDown',
        options,
      ),
    ).toEqual({ type: 'focus', value: 'last-match' });
    expect(
      reduceTreeNavigation(
        tree.flat,
        { focusedValue: 'last-match', expandedValues },
        'ArrowUp',
        options,
      ),
    ).toEqual({ type: 'focus', value: 'root' });
    expect(
      reduceTreeNavigation(
        tree.flat,
        { focusedValue: 'root', expandedValues },
        'ArrowRight',
        options,
      ),
    ).toEqual({ type: 'focus', value: 'last-match' });
    expect(
      reduceTreeNavigation(
        tree.flat,
        { focusedValue: 'disabled-parent', expandedValues },
        'Enter',
        options,
      ),
    ).toEqual({ type: 'none' });
    expect(
      reduceTreeNavigation(tree.flat, { focusedValue: 'deep-match', expandedValues }, 'ArrowLeft', {
        visibleNodes,
        isDisabled: node => node.disabled,
      }),
    ).toEqual({ type: 'focus', value: 'deep-parent' });
    expect(
      reduceTreeNavigation(
        tree.flat,
        { focusedValue: 'deep-parent', expandedValues },
        'ArrowLeft',
        { visibleNodes, isDisabled: node => node.disabled },
      ),
    ).toEqual({ type: 'collapse', value: 'deep-parent' });
    expect(
      reduceTreeNavigation(
        tree.flat,
        { focusedValue: 'deep-parent', expandedValues: new Set(['root']) },
        'ArrowLeft',
        { visibleNodes, isDisabled: node => node.disabled },
      ),
    ).toEqual({ type: 'focus', value: 'root' });
    expect(
      reduceTreeNavigation(
        tree.flat,
        { focusedValue: 'last-match', expandedValues },
        'Home',
        options,
      ),
    ).toEqual({ type: 'focus', value: 'root' });
    expect(
      reduceTreeNavigation(tree.flat, { focusedValue: 'root', expandedValues }, 'End', options),
    ).toEqual({ type: 'focus', value: 'last-match' });
  });

  it('resolves drop arguments, guards descendants/leaves, vetoes, deduplicates and reports actual move', async () => {
    const tree = normalizeTreeData(data);
    const source = tree.byValue.get('a')!;
    const target = tree.byValue.get('branch')!;
    expect(resolveTreeDropArguments({ source, target, position: 'after' })).toEqual([
      source,
      tree.roots[0],
      target,
    ]);
    expect(
      canDropTreeNode({ source: tree.roots[0], target: tree.byValue.get('b'), position: 'child' }),
    ).toBe(false);
    expect(
      canDropTreeNode({ source, target: tree.byValue.get('a'), position: 'child' }, false),
    ).toBe(false);
    expect(
      resolveTreeDropContext({ source, target, overChildRegion: true, dragToLeaf: true }),
    ).toEqual({ source, target, position: 'child' });
    expect(
      resolveTreeDropContext({
        source: tree.roots[0],
        target: tree.byValue.get('b'),
        overChildRegion: true,
      }),
    ).toBeUndefined();
    const controller = new TreeDropController<Option>();
    await expect(
      controller.drop(data, { source, target, position: 'child' }, { beforeDrop: () => false }),
    ).resolves.toMatchObject({ status: 'vetoed' });
    let release!: (value: boolean) => void;
    const pending = controller.drop(
      data,
      { source, target, position: 'child' },
      {
        beforeDrop: () =>
          new Promise(value => {
            release = value;
          }),
      },
    );
    await expect(
      controller.drop(data, { source, target, position: 'child' }),
    ).resolves.toMatchObject({ status: 'pending' });
    release(true);
    await expect(pending).resolves.toMatchObject({ status: 'moved' });
    const stale = controller.drop(
      data,
      { source, target, position: 'child' },
      { beforeDrop: async () => true },
    );
    controller.destroy();
    await expect(stale).resolves.toMatchObject({ status: 'stale' });
  });
});
