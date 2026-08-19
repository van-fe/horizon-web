import { useMemo, useState } from 'react';
import type { TreeOption } from '@aurora/horizon-react';
import { Tree } from '@aurora/horizon-react';

export default function TreeBasicDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  const [selected, setSelected] = useState<string[]>(['product']);
  const data = useMemo<TreeOption[]>(
    () => [
      {
        value: 'product',
        label: en ? 'Product' : '产品',
        children: [
          { value: 'roadmap', label: en ? 'Roadmap' : '路线图' },
          { value: 'research', label: en ? 'Research' : '用户研究' },
        ],
      },
      {
        value: 'operations',
        label: en ? 'Operations' : '运营',
        children: [
          { value: 'incidents', label: en ? 'Incidents' : '服务事件' },
          { value: 'releases', label: en ? 'Releases' : '版本发布' },
        ],
      },
    ],
    [en],
  );

  return (
    <section className="docs-demo" style={{ maxWidth: 460 }}>
      <p className="docs-demo__description">
        {en
          ? 'A compact project navigator with linked checkbox selection.'
          : '一个带父子联动复选框的紧凑项目导航。'}
      </p>
      <div className="docs-demo__stage">
        <Tree
          defaultExpandedValues={['product']}
          multiple
          onSelectedValuesChange={values => setSelected(values.map(String))}
          selectedValues={selected}
          showCheckbox
          treeData={data}
        />
      </div>
      <output aria-live="polite" className="docs-demo__status">
        {en ? 'Selected' : '已选择'}: {selected.join(', ') || (en ? 'none' : '无')}
      </output>
    </section>
  );
}
