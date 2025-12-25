import { describe, expect, test } from 'vitest';
import { createInstance } from './tree-helper';
import HTreeItem from '../src/components/TreeItem';

describe('Tree.tsx slots', () => {
  test('tree-node-render', async () => {
    const { element } = await createInstance({}, false, {
      treeNodeRender: ({ data }) => [<span>{data.value}</span>],
    });

    const guide = element.findComponent(HTreeItem);

    expect(guide.text()).toBe('guide');
  });

  test('empty', async () => {
    const { element } = await createInstance(
      {
        filterable: true,
        filterInputValue: '1234',
      },
      false,
      {
        empty: () => [<span>EMPTY</span>],
      },
    );

    expect(element.text()).toBe('EMPTY');
  });
});
