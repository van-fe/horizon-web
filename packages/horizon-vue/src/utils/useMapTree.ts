import { computed, ref } from 'vue';
import type { Ref } from 'vue';

export interface MapTreeNode {
  uuid: string;
  children: Map<string, unknown> | null;
}

interface TraversalFrame<Node> {
  node: Node;
  parent: TraversalFrame<Node> | null;
}

function getChildren<Node extends MapTreeNode>(node: Node) {
  return node.children as Map<string, Node> | null;
}

function createRootFrames<Node extends MapTreeNode>(tree: Map<string, Node>) {
  return Array.from(tree.values(), node => ({
    node,
    parent: null,
  })).reverse() as TraversalFrame<Node>[];
}

function traverseMapTree<Node extends MapTreeNode>(
  tree: Map<string, Node>,
  visitor: (frame: TraversalFrame<Node>) => boolean | void,
) {
  const visited = new Set<Node>();
  const stack = createRootFrames(tree);

  while (stack.length > 0) {
    const current = stack.pop()!;

    if (visited.has(current.node)) continue;

    visited.add(current.node);

    if (visitor(current) === false) return;

    const children = getChildren(current.node);

    if (children?.size) {
      const childNodes = Array.from(children.values());

      for (let index = childNodes.length - 1; index >= 0; index--) {
        stack.push({
          node: childNodes[index],
          parent: current,
        });
      }
    }
  }
}

export function flattenMapTree<Node extends MapTreeNode>(tree: Map<string, Node>) {
  const result: Node[] = [];

  traverseMapTree(tree, current => {
    result.push(current.node);
  });

  return result;
}

/**
 * Find the first matching node in insertion order.
 * The returned path starts at the matched node and ends at its root.
 */
export function findMapTreePath<Node extends MapTreeNode>(
  tree: Map<string, Node>,
  predicate: (node: Node) => boolean,
) {
  let matchedFrame: TraversalFrame<Node> | null = null;

  traverseMapTree(tree, current => {
    if (predicate(current.node)) {
      matchedFrame = current;
      return false;
    }
  });

  const result: Node[] = [];
  let frame = matchedFrame as TraversalFrame<Node> | null;

  while (frame) {
    result.push(frame.node);
    frame = frame.parent;
  }

  return result;
}

export default function useMapTree<Node extends MapTreeNode>() {
  const tree = ref(new Map<string, Node>()) as Ref<Map<string, Node>>;
  const flattenedNodes = computed(() => flattenMapTree(tree.value));
  const nodesByUuid = computed(() => new Map(flattenedNodes.value.map(node => [node.uuid, node])));

  function appendChild(node: Node) {
    tree.value.set(node.uuid, node);
  }

  function removeChild(uuid: string) {
    tree.value.delete(uuid);
  }

  function findPath(predicate: (node: Node) => boolean) {
    return findMapTreePath(tree.value, predicate);
  }

  function getNodeByUuid(uuid: string) {
    return nodesByUuid.value.get(uuid);
  }

  return {
    tree,
    flattenedNodes,
    appendChild,
    removeChild,
    findPath,
    getNodeByUuid,
  };
}
