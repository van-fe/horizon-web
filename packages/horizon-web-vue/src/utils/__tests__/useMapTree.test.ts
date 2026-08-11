import { nextTick } from 'vue';
import useMapTree, { findMapTreePath, flattenMapTree } from '../useMapTree';

interface TestNode {
  uuid: string;
  value: string;
  children: Map<string, TestNode> | null;
}

function createNode(uuid: string, children: TestNode[] = []): TestNode {
  return {
    uuid,
    value: uuid,
    children: children.length ? new Map(children.map(child => [child.uuid, child])) : null,
  };
}

describe('useMapTree', () => {
  test('registers nodes and keeps a reactive flattened view', async () => {
    const { tree, flattenedNodes, appendChild, removeChild, getNodeByUuid } =
      useMapTree<TestNode>();
    const child = createNode('child');
    const root = createNode('root', [child]);

    appendChild(root);
    await nextTick();

    expect(flattenedNodes.value).toEqual([root, child]);
    expect(getNodeByUuid('child')).toEqual(child);

    removeChild('root');
    await nextTick();

    expect(tree.value.size).toBe(0);
    expect(flattenedNodes.value).toEqual([]);
    expect(getNodeByUuid('child')).toBeUndefined();
  });

  test('finds the first matching path in stable insertion order', () => {
    const firstMatch = createNode('first-match');
    const secondMatch = createNode('second-match');
    const firstRoot = createNode('first-root', [firstMatch]);
    const secondRoot = createNode('second-root', [secondMatch]);
    const tree = new Map([
      [firstRoot.uuid, firstRoot],
      [secondRoot.uuid, secondRoot],
    ]);

    expect(findMapTreePath(tree, node => node.uuid.endsWith('match'))).toEqual([
      firstMatch,
      firstRoot,
    ]);
  });

  test('traverses deeply nested trees without recursive stack overflow', () => {
    const depth = 10_000;
    let current = createNode(`node-${depth - 1}`);

    for (let index = depth - 2; index >= 0; index--) {
      current = createNode(`node-${index}`, [current]);
    }

    const tree = new Map([[current.uuid, current]]);
    const flattened = flattenMapTree(tree);
    const path = findMapTreePath(tree, node => node.uuid === `node-${depth - 1}`);

    expect(flattened).toHaveLength(depth);
    expect(path).toHaveLength(depth);
    expect(path[0].uuid).toBe(`node-${depth - 1}`);
    expect(path.at(-1)?.uuid).toBe('node-0');
  });

  test('does not loop forever when malformed data contains a cycle', () => {
    const root = createNode('root');
    const child = createNode('child');

    root.children = new Map([[child.uuid, child]]);
    child.children = new Map([[root.uuid, root]]);

    expect(flattenMapTree(new Map([[root.uuid, root]]))).toEqual([root, child]);
  });
});
