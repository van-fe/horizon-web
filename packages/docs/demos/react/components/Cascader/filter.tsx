import { useMemo, useState } from 'react';
import type { CascaderOption } from '@aurora/horizon-react';
import { Cascader } from '@aurora/horizon-react';

interface DestinationOption extends CascaderOption {
  children?: DestinationOption[];
  code?: string;
  detail?: string;
}

export default function CascaderFilterDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  const [query, setQuery] = useState('');
  const options = useMemo<DestinationOption[]>(
    () => [
      {
        value: 'engineering',
        label: en ? 'Engineering' : '工程团队',
        children: [
          {
            value: 'design-system',
            label: en ? 'Design System' : '设计系统',
            stringLabel: `${en ? 'Design System' : '设计系统'} DS-14`,
            code: 'DS-14',
            detail: en ? 'Components and tokens' : '组件与设计令牌',
          },
          {
            value: 'accessibility',
            label: en ? 'Accessibility' : '无障碍体验',
            stringLabel: `${en ? 'Accessibility' : '无障碍体验'} AX-07`,
            code: 'AX-07',
            detail: en ? 'Keyboard and assistive technology' : '键盘与辅助技术',
          },
        ],
      },
      {
        value: 'experience',
        label: en ? 'Customer Experience' : '客户体验',
        children: [
          {
            value: 'research',
            label: en ? 'Product Research' : '产品研究',
            stringLabel: `${en ? 'Product Research' : '产品研究'} UX-21`,
            code: 'UX-21',
            detail: en ? 'Interviews and usability studies' : '访谈与可用性研究',
          },
        ],
      },
    ],
    [en],
  );

  return (
    <section className="docs-demo" style={{ maxWidth: 460 }}>
      <p className="docs-demo__description">
        {en
          ? 'Search by a team name or code. Rendering functions add supporting context without changing the value path.'
          : '可按团队名称或编号搜索；渲染函数补充上下文，但不会改变值路径。'}
      </p>
      <div className="docs-demo__stage">
        <Cascader
          filterable
          filterMaxResult={8}
          options={options}
          panelFooter={
            en ? 'Search matches every level in the path.' : '搜索会匹配路径中的每一级。'
          }
          panelHeader={en ? 'Route this request' : '分派此请求'}
          placeholder={en ? 'Search team or code' : '搜索团队或编号'}
          renderOption={({ active, option, selected }) => {
            const origin = option.originOption as DestinationOption;
            return (
              <span style={{ display: 'grid', gap: 2 }}>
                <strong style={{ fontWeight: active || selected ? 700 : 500 }}>
                  {option.label} {origin.code ? `· ${origin.code}` : ''}
                </strong>
                {origin.detail ? (
                  <small style={{ color: 'var(--h-text-secondary)' }}>{origin.detail}</small>
                ) : null}
              </span>
            );
          }}
          renderValue={(_, labels) => (
            <strong>{labels.at(-1) ?? (en ? 'No team selected' : '未选择团队')}</strong>
          )}
          onSearch={setQuery}
        />
      </div>
      <output aria-live="polite" className="docs-demo__status">
        {query
          ? en
            ? `Searching for “${query}”`
            : `正在搜索“${query}”`
          : en
            ? 'Type to filter available teams'
            : '输入关键词以筛选可用团队'}
      </output>
    </section>
  );
}
