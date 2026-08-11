import { transformModelValue } from '../src/utils/useOptions';
import Tree from '~/utils/useTree';
import type { BaseTreeData, ExtendTreeData } from '~/utils/useTree/types';

type TestNode = BaseTreeData & { children?: TestNode[] };
type TransformedTestNode = ExtendTreeData<TestNode>;

describe('Cascader UUID handling', () => {
  it('keeps model value paths structured instead of encoding them into UUID strings', () => {
    expect(transformModelValue(['root / value', 1])).toEqual([['root / value', 1]]);
    expect(
      transformModelValue([
        ['root / value', 1],
        ['root', 'value / child'],
      ]),
    ).toEqual([
      ['root / value', 1],
      ['root', 'value / child'],
    ]);
  });

  it('distinguishes paths that previously produced the same joined UUID', () => {
    let nextUuid = 0;
    const tree = new Tree<TestNode, TransformedTestNode>(
      [
        {
          label: 'first root',
          value: 'root / value',
          children: [{ label: 'first child', value: 'child' }],
        },
        {
          label: 'second root',
          value: 'root',
          children: [{ label: 'second child', value: 'value / child' }],
        },
      ],
      {},
      () => nextUuid++,
    );
    const first = tree.getInfoByPath(['root / value', 'child']);
    const second = tree.getInfoByPath(['root', 'value / child']);

    expect(first?._uuid).not.toBe(second?._uuid);
    expect(first?.label).toBe('first child');
    expect(second?.label).toBe('second child');
  });
});
