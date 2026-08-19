import { describe, expect, test } from 'vitest';
import { getTreeLevels } from '../src/utils/treeHelper';
import type { HDropdownTreeData } from '../src/utils/types';

function node(children: Map<string, HDropdownTreeData> | null = null): HDropdownTreeData {
  return {
    uuid: crypto.randomUUID(),
    children,
    props: {} as HDropdownTreeData['props'],
    slots: {} as HDropdownTreeData['slots'],
    emits: (() => undefined) as HDropdownTreeData['emits'],
    type: children ? 'submenu' : 'item',
  };
}

describe('Dropdown treeHelper', () => {
  test('returns the deepest nested level and honors a starting level', () => {
    const third = new Map([['leaf', node()]]);
    const second = new Map([['nested', node(third)]]);
    const tree = new Map<string, HDropdownTreeData>([
      ['flat', node()],
      ['branch', node(second)],
    ]);

    expect(getTreeLevels(new Map())).toBe(0);
    expect(getTreeLevels(tree)).toBe(2);
    expect(getTreeLevels(tree, 3)).toBe(5);
  });
});
