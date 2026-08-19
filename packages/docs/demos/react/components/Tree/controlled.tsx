import { useMemo, useState } from 'react';
import type { TreeOption, TreeValue } from '@aurora/horizon-react';
import { Button, Tree } from '@aurora/horizon-react';

export default function TreeControlledDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  const data = useMemo<TreeOption[]>(
    () => [
      {
        value: 'guide',
        label: en ? 'Guides' : '使用指南',
        children: [
          { value: 'start', label: en ? 'Getting started' : '快速开始' },
          { value: 'tokens', label: en ? 'Design tokens' : '设计令牌' },
        ],
      },
      {
        value: 'api',
        label: en ? 'API reference' : 'API 参考',
        children: [{ value: 'tree-api', label: 'Tree' }],
      },
    ],
    [en],
  );
  const [expandedValues, setExpandedValues] = useState<TreeValue[]>(['guide']);
  const [selectedValues, setSelectedValues] = useState<TreeValue[]>(['start']);

  return (
    <section className="docs-demo" style={{ maxWidth: 460 }}>
      <p className="docs-demo__description">
        {en
          ? 'The application owns expansion and selection, so external actions and row interaction remain synchronized.'
          : '应用负责展开和选择状态，外部操作与节点交互会始终保持同步。'}
      </p>
      <div className="docs-demo__actions">
        <Button onClick={() => setExpandedValues(['guide', 'api'])}>
          {en ? 'Expand all groups' : '展开全部分组'}
        </Button>
        <Button
          plain
          onClick={() => {
            setExpandedValues([]);
            setSelectedValues([]);
          }}
        >
          {en ? 'Clear state' : '清空状态'}
        </Button>
      </div>
      <div className="docs-demo__stage">
        <Tree
          expandValues={expandedValues}
          onExpandedValuesChange={setExpandedValues}
          onSelectedValuesChange={setSelectedValues}
          selectedValues={selectedValues}
          treeData={data}
        />
      </div>
      <output aria-live="polite" className="docs-demo__status">
        {en ? 'Expanded' : '已展开'}: {expandedValues.join(', ') || '—'} ·{' '}
        {en ? 'Selected' : '已选择'}: {selectedValues.join(', ') || '—'}
      </output>
    </section>
  );
}
