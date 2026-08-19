import { useMemo, useState } from 'react';
import type { TreeSelectOption, TreeSelectProps } from '@aurora/horizon-react';
import { TreeSelect } from '@aurora/horizon-react';

function valueCount(value: TreeSelectProps['value']): number {
  if (Array.isArray(value)) return value.length;
  return value == null ? 0 : 1;
}

export default function TreeSelectMultipleFilterDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  const [status, setStatus] = useState(en ? 'Two channels selected' : '已选择 2 个频道');
  const data = useMemo<TreeSelectOption[]>(
    () => [
      {
        value: 'product',
        label: en ? 'Product updates' : '产品动态',
        children: [
          { value: 'releases', label: en ? 'Release notes' : '版本发布' },
          { value: 'research', label: en ? 'Research previews' : '研究预览' },
        ],
      },
      {
        value: 'operations',
        label: en ? 'Operations' : '运营通知',
        children: [
          { value: 'incidents', label: en ? 'Service incidents' : '服务事件' },
          { value: 'maintenance', label: en ? 'Planned maintenance' : '计划维护' },
        ],
      },
    ],
    [en],
  );

  return (
    <section className="docs-demo" style={{ maxWidth: 500 }}>
      <p className="docs-demo__description">
        {en
          ? 'Search the hierarchy and select independent channels. Long selections collapse into a compact summary.'
          : '搜索层级并独立选择通知频道；较长的选择结果会折叠成紧凑摘要。'}
      </p>
      <div className="docs-demo__stage">
        <TreeSelect
          checkStrictly
          clearable
          collapseTags
          collapseTagsTooltip
          defaultExpandedValues={['product', 'operations']}
          defaultTreeData={data}
          defaultValue={['releases', 'incidents']}
          filterable
          maxCollapseTags={1}
          multiple
          multipleLimit={3}
          placeholder={en ? 'Search notification channels' : '搜索通知频道'}
          showCheckbox
          onFilterValueChange={keyword =>
            setStatus(current =>
              keyword ? `${en ? 'Filtering' : '正在筛选'}: ${keyword}` : current,
            )
          }
          onValueChange={value => {
            const count = valueCount(value);
            setStatus(en ? `${count} channels selected` : `已选择 ${count} 个频道`);
          }}
        />
      </div>
      <output aria-live="polite" className="docs-demo__status">
        {status}
      </output>
    </section>
  );
}
