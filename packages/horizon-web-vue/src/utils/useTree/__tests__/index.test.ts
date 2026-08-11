import Tree from '../index';
import type { BaseTreeData, ExtendTreeData } from '../types';

type TestTreeNode = BaseTreeData & {
  children?: TestTreeNode[];
};

type TransformedTestTreeNode = ExtendTreeData<TestTreeNode>;

function createDeepTree(depth: number) {
  let result: TestTreeNode[] = [];

  for (let i = depth - 1; i >= 0; i--) {
    result = [
      {
        label: `node-${i}`,
        value: i,
        children: result,
      },
    ];
  }

  return result;
}

describe('useTree', () => {
  it('keeps transformed tree data and ancestry information consistent', () => {
    const tree = new Tree<TestTreeNode, TransformedTestTreeNode>(
      [
        {
          label: 'root',
          value: 'root',
          children: [
            { label: 'first', value: 'first' },
            { label: 'second', value: 'second', disabled: true },
          ],
        },
      ],
      {},
      option => option.value,
    );
    const [root, first, second] = tree.flattenTreeData.value;

    expect(tree.transformedTreeData.value).toEqual([root]);
    expect(root.transformedChildren).toEqual([first, second]);
    expect(first.parent).toBe(root);
    expect(first.__context).toEqual({ prev: null, next: second });
    expect(second.__context).toEqual({ prev: first, next: null });
    expect(second.passingDisabled).toBe(true);
    expect(second.paths).toEqual([root, second]);
    expect(second.path).toEqual(['root', 'second']);
    expect(second.labels).toEqual(['root', 'second']);
    expect(second.uuidPath).toEqual(['root', 'second']);
    expect(second.fullPathLabel).toBe('root / second');
    expect(tree.flattenTreeDataMapping.value.get('second')).toBe(second);
    expect(tree.getInfoByValue('second')).toBe(second);
    expect(tree.getInfoByPath(['root', 'second'])).toBe(second);
    expect(tree.getInfoByPath(['root', 'missing'])).toBeUndefined();
  });

  it('calculates full and indeterminate checkbox states for the whole tree', () => {
    const tree = new Tree<TestTreeNode, TransformedTestTreeNode>(
      [
        {
          label: 'root',
          value: 'root',
          children: [
            { label: 'first', value: 'first' },
            { label: 'second', value: 'second', disabled: true },
          ],
        },
      ],
      {},
      option => option.value,
    );

    const partialStatus = tree.getCheckboxStatus(['first'], false);
    expect(partialStatus.get('root')).toEqual({ checked: false, indeterminate: true });
    expect(partialStatus.get('first')).toEqual({ checked: true, indeterminate: false });

    const fullStatus = tree.getCheckboxStatus(['first', 'second'], false);
    expect(fullStatus.get('root')).toEqual({ checked: true, indeterminate: false });

    const selectableStatus = tree.getCheckboxStatus(['first'], false, node => !node.disabled);
    expect(selectableStatus.get('root')).toEqual({ checked: true, indeterminate: false });

    const strictStatus = tree.getCheckboxStatus(['root'], true);
    expect(strictStatus.get('root')).toEqual({ checked: true, indeterminate: false });
    expect(strictStatus.get('first')).toEqual({ checked: false, indeterminate: false });
  });

  it('supports deeply nested trees without recursive stack overflow', () => {
    const depth = 10_000;
    const treeData = createDeepTree(depth);
    const tree = new Tree<TestTreeNode, TransformedTestTreeNode>(
      treeData,
      {},
      option => option.value,
    );
    const root = tree.flattenTreeData.value[0];
    const leaf = tree.flattenTreeData.value.at(-1)!;

    expect(tree.flattenTreeData.value).toHaveLength(depth);
    expect(leaf.level).toBe(depth - 1);
    expect(leaf.path).toHaveLength(depth);
    expect(leaf.paths[0]).toBe(root);
    expect(leaf.paths.at(-1)).toBe(leaf);
    expect(leaf.uuidPath.at(-1)).toBe(depth - 1);
    expect(tree.isNodeCheckedForCheckbox(root, [leaf._uuid], false)).toBe(true);
    expect(tree.isNodeIndeterminateForCheckbox(root, [leaf._uuid])).toBe(true);
    const target = tree.getBaseTreeTargetByValue(treeData, depth - 1);
    expect(target && target.value).toBe(depth - 1);

    const clonedRoot = tree.getBaseTreeDataWithLevel(root);
    let current: BaseTreeData | undefined = clonedRoot;
    let clonedDepth = 0;

    while (current) {
      clonedDepth++;
      current = current.children?.[0];
    }

    expect(clonedDepth).toBe(depth);

    tree.setBaseTreeTargetByValue(treeData, depth - 1, { label: 'updated' });
    const updatedTarget = tree.getBaseTreeTargetByValue(treeData, depth - 1);
    expect(updatedTarget && updatedTarget.label).toBe('updated');
    expect(tree.deleteNodeByValue(treeData, depth - 1)).toHaveLength(1);
    expect(tree.getBaseTreeTargetByValue(treeData, depth - 1)).toBe(false);
  });

  it('rebuilds lookup indexes when tree data changes', () => {
    const tree = new Tree<TestTreeNode, TransformedTestTreeNode>(
      [{ label: 'old', value: 'old' }],
      {},
      option => option.value,
    );

    tree.setTreeData([{ label: 'new', value: 'new' }]);

    expect(tree.getInfoByValue('old')).toBeUndefined();
    expect(tree.getInfoByValue('new')).toBe(tree.flattenTreeData.value[0]);
    expect(tree.flattenTreeDataMapping.value.has('old')).toBe(false);
    expect(tree.flattenTreeDataMapping.value.get('new')).toBe(tree.flattenTreeData.value[0]);
  });

  it('makes the lazy value path available to custom uuid transforms', () => {
    const tree = new Tree<TestTreeNode, TransformedTestTreeNode>(
      [
        {
          label: 'root',
          value: 'root',
          children: [{ label: 'child', value: 'child' }],
        },
      ],
      {},
      option => option.path.join(' / '),
    );

    expect(tree.flattenTreeData.value.map(node => node._uuid)).toEqual(['root', 'root / child']);
  });

  it('rejects duplicate values returned by a uuid transform', () => {
    expect(
      () =>
        new Tree<TestTreeNode, TransformedTestTreeNode>(
          [
            { label: 'first', value: 'first' },
            { label: 'second', value: 'second' },
          ],
          {},
          () => 'duplicate',
        ),
    ).toThrow('Tree uuidTransform must return a unique value');
  });
});
